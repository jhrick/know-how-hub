import { sql } from "./lib/sql.ts";

async function setup() {
  await sql`CREATE TABLE IF NOT EXISTS school_presentations (
    id      SERIAL PRIMARY KEY,
    title   TEXT UNIQUE,
    content TEXT
  )`;

  await sql.end();
}

async function clear() {
  await sql`TRUNCATE TABLE school_presentations`;

  await sql.end();
}

async function deleteTable() {
  await sql`DROP TABLE school_presentations`;

  await sql.end();
}

setup();

// clear();

// deleteTable();
