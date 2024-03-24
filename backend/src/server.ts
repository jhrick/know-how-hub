import fastify from "fastify";
import postgres from "postgres";
import { sql } from "./lib/sql.ts";

interface ContentSchema {
  title: string;
  content: string;
}

const app = fastify();

app.get("/", (request, reply) => {
  reply.code(200).send("oi, tu tá na rota raiz");
});

app.get("/api/show_all", async (request, reply) => {
  const result = await sql`SELECT title FROM school_presentations`;

  reply.status(200).send(result);
});

app.post("/api/content", async (request, reply) => {
  const { title, content } = request.body as ContentSchema;

  if (!title || !content) reply.status(500).send("Invalid request body");

  try {
    const result = await sql`INSERT INTO school_presentations (title, content) 
    VALUES (${title}, ${content})

    RETURNING *
  `;

    reply.status(201).send(result[0]);
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
