import fastify, { FastifyRequest } from "fastify";
import postgres from "postgres";
import { sql } from "./lib/sql";
import { getPresentationFromTitle } from "./usecases/GetPresentationFromTitle";

interface SectionStruct {
  content_id: number;
  presenter?: string;
  paragraph: string;
  image: string;
}

interface IPresentationSchema {
  id: number;
  title: string;
  content: Array<SectionStruct>;
  createdAt: string;
}

interface IAppParams {
  title: string;
}

type Params = FastifyRequest<{ Params: IAppParams }>;

type RequestBody = FastifyRequest<{ Body: IPresentationSchema }>;

const app = fastify();

app.get("/", (request, reply) => {
  reply.code(200).send("oi, tu tá na rota raiz");
});

app.get("/:title", async (request: Params, reply) => {
  const title = request.params.title;

  try {
    const presentation = await getPresentationFromTitle(title);

    return reply.status(200).send(presentation);
  } catch (err) {
    console.error(err);
  }
});

app.get("/api/show_all", async (request, reply) => {
  const allPresentations = await sql<
    IPresentationSchema[]
  >`SELECT * FROM presentations`;

  let currentPresentationContent;

  if (!allPresentations[0]) {
    return reply.status(404).send("Not found");
  }

  const allPresentationsContent = await Promise.all(
    allPresentations.map(async (presentationInfos: IPresentationSchema) => {
      currentPresentationContent =
        await sql`SELECT * FROM sections WHERE content_id = ${presentationInfos.id}`;

      const sections: Object[] = currentPresentationContent.map((section) => {
        const { presenter, paragraph_text, image_url } = section;

        return { presenter, paragraph_text, image_url };
      });

      return { presentationInfos, sections };
    }),
  );

  return reply.status(200).send(allPresentationsContent);
});

app.post("/api/content", async (request: RequestBody, reply) => {
  const { title, content } = request.body as IPresentationSchema;

  if (!title[0] || !content)
    return reply.status(500).send("Invalid request body");

  try {
    const result = await sql`INSERT INTO presentations (title) 
    VALUES (${title})

    RETURNING *
  `;

    const presentationId =
      await sql`SELECT id FROM presentations WHERE title = ${result[0].title}`;

    const contents = content.map((obj) => {
      return {
        content_id: presentationId[0].id as number,
        presenter: obj.presenter || "anyone",
        paragraph_text: obj.paragraph,
        image_url: obj.image,
      };
    });

    await sql`INSERT INTO sections ${sql(contents)}`;

    reply.status(201).send("Presentation created!");
  } catch (err) {
    if (err instanceof postgres.PostgresError) {
      if (err.code === "23505")
        return reply.status(400).send({ message: "Duplicate Title" });
    }

    console.error(err);

    return reply.status(500).send({ message: "Internal error" });
  }
});

app.listen({
  host: "0.0.0.0",
  port: 2242,
});
