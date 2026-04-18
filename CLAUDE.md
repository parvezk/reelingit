# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

ReelingIt is a movie/TV discovery app with a dark, cinematic UI. It is **read-heavy** — v1 has no accounts, ratings, or social features. The `apps/` workspaces are being scaffolded incrementally; check Linear for current milestone status.

Linear project: https://linear.app/pk-hq/project/reelingit-vercel-85344fa77a04/overview

## Monorepo layout

```
reelingit/
  apps/
    api/    # Express BFF — owns DATABASE_URL, Drizzle queries/migrations
    web/    # Next.js App Router + Tailwind + shadcn/ui
  docs/
```

`apps/api` is the **only** service that holds `DATABASE_URL` and communicates with Supabase Postgres. `apps/web` talks exclusively to the API via `NEXT_PUBLIC_API_URL`.

## Tech stack

| Layer | Choice |
|---|---|
| Frontend | Next.js (App Router), Tailwind CSS, shadcn/ui |
| API | Node.js + Express (BFF pattern) |
| Database | Supabase Postgres + Drizzle ORM + drizzle-kit |
| Analytics | PostHog (no PII in events) |
| CI/CD | GitHub Actions |

## Environment variables

`apps/api/.env`
- `DATABASE_URL` — Supabase Postgres (use pooler URI for serverless deploys)
- `PORT` — e.g. `4002`
- `CORS_ORIGIN` — e.g. `http://localhost:3000`

`apps/web/.env`
- `NEXT_PUBLIC_API_URL` — e.g. `http://localhost:4002`

## API contract (v1, read-only)

```
GET /v1/rows/:rowId?cursor=&limit=     → { row, items: TitleCard[], nextCursor }
GET /v1/search?q=&type=title|person&cursor=  → { q, results, nextCursor }
GET /v1/titles/:id                     → { title, credits, keywords, related }
GET /v1/people/:id                     → { person, knownFor, credits }
```

Responses are shaped for the UI — never expose raw DB structure.

## Database schema (conceptual)

- `Title` (movie/tv) ↔ `Person` is many-to-many via `Credit` (role, billing_order)
- `Title` ↔ `Keyword` is many-to-many via `TitleKeyword`
- Drizzle-kit is the migration source of truth

For DB access, see [docs/database-cli-guide-reelingit.md](./docs/database-cli-guide-reelingit.md).

## Frontend rendering rules

- Default to **Server Components** for layout and initial data
- Use **Client Components** only for carousel interactions, search input, and filters
- Use Next `<Image />` with blur/solid placeholder and responsive sizes
- Prefer route-level loading UI and streaming

## Performance targets (p75, mobile)

- LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1
- Avoid heavy client bundles for carousels/search
- Prefer virtualization or capped DOM nodes per carousel row
- Defer non-critical UI and PostHog until after first render

## Spec documents

- [`spec-reelingit.md`](./spec-reelingit.md) — product goals, UX principles, scope
- [`tech-spec-reelingit.md`](./tech-spec-reelingit.md) — full technical spec with data model and API design
