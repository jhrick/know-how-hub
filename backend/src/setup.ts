import { sql } from "./lib/sql.ts";

async function setup() {
  await sql`CREATE TABLE IF NOT EXISTS presentations (
    id      SERIAL PRIMARY KEY,
    title   TEXT UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;

  await sql`CREATE TABLE IF NOT EXISTS sections (
    id SERIAL PRIMARY KEY,
    content_id INT REFERENCES presentations(id),
    presenter TEXT DEFAULT 'anyone',
    paragraph_text TEXT,
    image_url VARCHAR(255)
  )`;

  await sql.end();
}

async function clear() {
  await sql`TRUNCATE TABLE presentations, sections`;

  await sql.end();
}

async function deleteTable() {
  await sql`DROP TABLE presentations, sections`;

  await sql.end();
}

setup();

// clear();

// deleteTable();
