import fastify from "fastify";
import postgres from "postgres";
import { sql } from "./lib/sql.ts";

interface PresentationSchema {
  id: int;
  title: string;
  createdAt: string;
}

interface SectionStruct {
  content_id: number;
  paragraph: string;
  image: string;
}

const app = fastify();

app.get("/", (request, reply) => {
  reply.code(200).send("oi, tu tá na rota raiz");
});

app.get("/api/show_all", async (request, reply) => {
  const allPresentations = await sql`SELECT * FROM presentations`;

  let currentPresentationContent;

  if (!allPresentations[0]) {
    return reply.status(404).send("Not found");
  }

  const allPresentationsContent = allPresentations.map(
    async (presentationInfos: PresentationSchema) => {
      currentPresentationContent =
        await sql`SELECT * FROM sections WHERE content_id = ${presentationInfos.id}`;

      const sections: Array<string, string> = currentPresentationContent.map(
        (section) => {
          return [section.paragraph_text, section.image_url];
        },
      );

      return { presentationInfos, sections };
    },
  );

  return reply.status(200).send(await Promise.all(allPresentationsContent));
});

app.post("/api/content", async (request, reply) => {
  const { title, content } = request.body as presentationschema;

  if (!title[0] || !content[0])
    return reply.status(500).send("Invalid request body");

  try {
    const result = await sql`INSERT INTO presentations (title) 
    VALUES (${title})

    RETURNING *
  `;

    const presentationId =
      await sql`SELECT id FROM presentations WHERE title = ${result[0].title}`;

    const contents: Array<SectionStruct> = content.map((obj) => {
      return {
        content_id: presentationId[0].id,
        paragraph_text: obj.paragraph,
        image_url: obj.image,
      };
    });

    await sql`INSERT INTO sections ${sql(contents, "content_id", "paragraph_text", "image_url")}`;

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
