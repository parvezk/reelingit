# @reelingit/api

Express BFF API for ReelingIt. The only service that reads `DATABASE_URL` and runs Drizzle queries.

## Status

Stub only — filled in by:

- [PK-124](https://linear.app/pk-hq/issue/PK-124) — Express skeleton (PORT, CORS_ORIGIN, /health)
- [PK-125](https://linear.app/pk-hq/issue/PK-125) — Drizzle ORM + drizzle-kit
- [PK-210](https://linear.app/pk-hq/issue/PK-210) — request IDs + structured logging

## Env (planned)

See `.env.example` at the repo root. Keys:

- `DATABASE_URL` — Supabase Postgres pooler URL
- `PORT` — default `4002`
- `CORS_ORIGIN` — Next.js origin (e.g. `http://localhost:3000`)
