# ReelingIt — product spec

Linear project: https://linear.app/pk-hq/project/reelingit-vercel-85344fa77a04/overview

ReelingIt is a **movie (and optional TV) discovery experience** with an **original product design and visual theme** (designed for ReelingIt; not copied from an external template). Use **your own poster imagery** where needed to respect copyright.

This doc is intentionally **product-focused**. Technical decisions and implementation details live in `tech-spec-reelingit.md`.

## Milestones & status (Linear)

- [M1 — Foundation](https://linear.app/pk-hq/project/reelingit-vercel-85344fa77a04/milestone/e6463d93-16bb-415f-935c-acc2ad1ca3c9)
- [M2 — Data & API](https://linear.app/pk-hq/project/reelingit-vercel-85344fa77a04/milestone/bf401261-f8e7-4490-b082-8b09b476615d)
- [M3 — Web shell & design](https://linear.app/pk-hq/project/reelingit-vercel-85344fa77a04/milestone/28e92b28-df44-4b47-b593-cf386b6f2ae9)
- [M4 — Core product UX](https://linear.app/pk-hq/project/reelingit-vercel-85344fa77a04/milestone/5de3f76a-9bfc-4bf4-b852-372c935f3a16)
- [M5 — Deploy & handoff](https://linear.app/pk-hq/project/reelingit-vercel-85344fa77a04/milestone/84e317a3-fe72-4c95-8853-a0e936144580)

## Product goals

- **Fast discovery**: users can quickly browse, search, and open detail pages without friction
- **Streaming-style browsing**: curated rows/carousels that encourage exploration
- **Great details**: each title has enough context to decide “watch / skip”

## Target users

- People who want **quick recommendations** (browse first, search second)
- People who want **specific info** about a title, actor, or theme/keyword

## Scope (v1)

- **Sections**: Movies (primary). TV Shows / Actors are optional in v1 depending on available data.
- **Core flows**:
  - Browse rows / collections
  - Search
  - Open a title detail page
  - (Optional) Open a person detail page

## UX / UI principles

- **Dark, cinematic theme**; brand **ReelingIt**
- **Horizontal rows** / carousels (e.g. “Top 10 this week”, “Award winners”, “Hidden gems”)
- **Search** that feels instant (with sensible empty/loading/error states)
- **Progressive enhancement**: prioritize **browse + detail** first, then richer filters, localization, etc.

## Quality bar (v1)

- **Performance-first**: keep interactions snappy; avoid heavy client bundles for core browse/search/detail
- **Resilient UI**: strong empty/loading/error states for rows, search, and detail pages
- **Privacy-aware analytics**: measure key interactions without collecting PII (details in `tech-spec-reelingit.md`)

## Content & data assumptions

- ReelingIt is read-heavy. Most screens are **browse/list/detail**.
- Data source can be a seeded catalog (movies, people, credits, keywords). Exact schema and API contract are defined in `tech-spec-reelingit.md`.

## Non-goals (v1)

- User accounts, ratings, reviews, watchlists, social features
- Payments or subscriptions
- Sharing the database or infrastructure with RecipeGuru (ReelingIt remains isolated)
