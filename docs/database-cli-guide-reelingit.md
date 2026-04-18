# ReelingIt — DB CLI & REPL (Supabase)

**Read first:** [shared playbook](./database-cli-guide-shared.md) (`psql` meta-commands, `EXPLAIN`, transactions, optional course Docker).

**Product spec:** [spec-reelingit.md](./spec-reelingit.md)

---

## Where this database lives

ReelingIt uses a **dedicated Supabase project** (Postgres). The Express API uses **`DATABASE_URL`** (see spec); your CLI access uses the same project’s connection info from the Supabase dashboard.

**Docs:** [Connecting to Postgres](https://supabase.com/docs/guides/database/connecting-to-postgres) (direct vs **pooler** vs session mode).

---

## Option A: SQL Editor (fastest)

1. Open your project in [Supabase](https://supabase.com/dashboard).  
2. **SQL Editor** → new query.  
3. Run exploration SQL from the [shared guide](./database-cli-guide-shared.md) (`SELECT`, `EXPLAIN`, etc.).  

No local install; good for quick checks and saved snippets.

---

## Option B: `psql` from your machine

1. **Project Settings → Database** → copy the URI (often **direct** or **session** for ad-hoc `psql`; pooler is tuned for many short server connections).  
2. Run:

```bash
psql "postgresql://postgres.[ref]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres"
```

Or the **direct** connection string if Supabase recommends it for your use case—match what the dashboard shows.

Always use **`sslmode=require`** (or stricter) unless docs say otherwise.

---

## What to explore

Schema should align with the course **`omdb`** dataset (movies, casts, people, keywords, etc.—confirm names after seeding):

```sql
\dt
SELECT COUNT(*) FROM movies;
```

Then `\d movies`, join experiments, and `EXPLAIN ANALYZE` on read queries per the shared guide.

---

## Hygiene (Supabase-specific)

- **Service role** vs **anon** keys are for the **client/API**, not required for `psql`—the DB password / connection string is what matters for CLI.  
- Do not paste the **database password** into issues, commits, or screenshots.  
- Rotate the DB password in the dashboard if it leaks.
