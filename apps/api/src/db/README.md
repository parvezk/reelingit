# apps/api — database layer

Drizzle ORM + drizzle-kit wiring for the BFF. The API is the only service that
holds `DATABASE_URL` and talks to Supabase Postgres.

## Files

- `client.ts` — exports a singleton `pg.Pool` and a `drizzle()` instance (`db`).
- `schema.ts` — Drizzle schema (placeholder in M1; populated in M2 / PK-129).
- `../../drizzle.config.ts` — drizzle-kit config (schema path + `./migrations` output).
- `../../migrations/` — generated SQL migrations (committed).

## Environment variables

| Name           | Required | Notes                                                                                     |
| -------------- | -------- | ----------------------------------------------------------------------------------------- |
| `DATABASE_URL` | yes      | Supabase Postgres connection string. **Use the pooler URI** for serverless / short-lived API instances. |

Both `drizzle.config.ts` and `client.ts` fail fast with a clear error if
`DATABASE_URL` is missing.

## Running migrations

From the repo root:

```sh
# Generate SQL from the current schema.ts (writes to apps/api/migrations/)
pnpm -F @reelingit/api db:generate

# Apply pending migrations to the DATABASE_URL target
pnpm -F @reelingit/api db:migrate

# Open Drizzle Studio against DATABASE_URL
pnpm -F @reelingit/api db:studio
```

Set `DATABASE_URL` in the shell (or via `apps/api/.env` loaded by the runtime)
before invoking any `db:*` script.
