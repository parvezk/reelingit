# ReelingIt — Supabase setup

How to provision the dedicated Supabase Postgres project that backs ReelingIt's Express API and wire it into local `.env` files.

See also:
- [`spec-reelingit.md`](../spec-reelingit.md) — product goals
- [`tech-spec-reelingit.md`](../tech-spec-reelingit.md) — full tech spec
- [`database-cli-guide-reelingit.md`](./database-cli-guide-reelingit.md) — `psql` / SQL Editor usage once the DB exists

## 1. Create a dedicated Supabase project

ReelingIt uses its **own** Supabase project. Do **not** share infrastructure with RecipeGuru — these services must remain isolated (see spec-reelingit.md "Non-goals").

1. Sign in to the [Supabase dashboard](https://supabase.com/dashboard).
2. **New project**:
   - **Name**: `reelingit` (or similar)
   - **Organization**: your personal or team org
   - **Region**: closest to where the API will run
   - **Database password**: generate a strong password and store it in your password manager
3. Wait for provisioning to finish.

## 2. Copy the pooler connection string

The Express API runs as short-lived / serverless instances, so it connects through Supabase's **connection pooler** (PgBouncer, Transaction mode, port `6543`) rather than the direct Postgres port (`5432`). The pooler multiplexes many short-lived client connections onto a small pool of real Postgres connections, preventing connection exhaustion under load.

1. In the project, go to **Project Settings → Database → Connection string**.
2. Select the **URI** tab and the **Transaction** pooler mode (recommended for serverless).
3. Copy the string. It looks like:

   ```
   postgresql://postgres.<project-ref>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres
   ```

4. Append `?sslmode=require` if not already present. Supabase requires TLS.

Use the **direct** (`5432`) connection instead only for one-off migrations or `psql` sessions that need session-level features (e.g. `LISTEN/NOTIFY`, prepared statements). For everything the API does at runtime, prefer the pooler.

## 3. Wire local `.env` files

At the repo root, [`.env.example`](../.env.example) lists every variable both apps need. Copy it into the appropriate app directories:

```bash
cp .env.example apps/api/.env
cp .env.example apps/web/.env
```

Then edit each file to keep only the vars that app uses (per `CLAUDE.md`):

- **`apps/api/.env`**
  - `DATABASE_URL` — the pooler URI from step 2
  - `PORT=4002`
  - `CORS_ORIGIN=http://localhost:3000`
- **`apps/web/.env`**
  - `NEXT_PUBLIC_API_URL=http://localhost:4002`

`.env` files are gitignored (see [`.gitignore`](../.gitignore)); never commit them.

## 4. Verify the connection

Once your `apps/api/.env` is in place, you can sanity-check it with `psql`:

```bash
psql "$DATABASE_URL"
```

You should land at the `postgres=>` prompt. From there, see [`database-cli-guide-reelingit.md`](./database-cli-guide-reelingit.md) for schema exploration.

## Security hygiene

- Do not commit `.env`, the database password, or the full pooler URI to git, issues, screenshots, or chat logs.
- If the password leaks, rotate it in **Project Settings → Database → Reset database password**.
- The Supabase **anon** and **service_role** keys are for client/SDK use, not for the Express API — the API authenticates with the Postgres password embedded in `DATABASE_URL`.
