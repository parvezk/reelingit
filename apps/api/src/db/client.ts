import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import * as schema from "./schema.js";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is not set. The API cannot talk to Postgres without it. See apps/api/src/db/README.md.",
  );
}

export const pool = new pg.Pool({ connectionString: databaseUrl });

export const db = drizzle(pool, { schema });

export type Db = typeof db;
