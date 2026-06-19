# Supabase

This app reuses the Supabase project **`meosdrvquwybipqjrzwv`** (region us-west-2).
Public client credentials live in `.env.local` (see `.env.local.example`).

## Schema

`migrations/0001_qq_studios_schema.sql` is the full schema, generated from
`lib/forms-model.ts` — the same generator the app's **Schema → Download** button
uses. It is idempotent (`create table if not exists` + `drop policy if exists`)
and is **already applied** to the remote project. It defines:

- `qq_forms` — legacy shared per-form JSONB blob (anon-writable; used in
  local/Connect-DB mode).
- `submissions` — per-user multi-record JSONB store (RLS: own rows only).
- `projects` — the Planner's portfolio table (RLS: own rows only).
- `form_<id>` — one typed table per form (79 forms), with `form_<id>_<section>`
  child tables for multi-row sections. Every table has per-user RLS.

## Linking the CLI (optional)

The `supabase` CLI is not bundled here. To manage migrations locally:

```bash
# 1. Install the CLI (see https://supabase.com/docs/guides/cli)
# 2. Authenticate
supabase login
# 3. Link this repo to the remote project (prompts for the DB password)
supabase link --project-ref meosdrvquwybipqjrzwv
# 4. (already applied, but to re-sync a fresh project)
supabase db push
```

Direct connection string (fill in the DB password):

```
postgresql://postgres:[YOUR-PASSWORD]@db.meosdrvquwybipqjrzwv.supabase.co:5432/postgres
```
