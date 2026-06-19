# QQ-Studios Documentation Workspace — Implementation

This is the real implementation of the five Claude Design prototypes in
`project/` (see `README.md` and `chats/` for the design intent). Built as a
**Next.js 14 (App Router) + TypeScript + React 18** app, with Supabase for auth
and data.

## Routes (one per design artifact)

| Route | Artifact | Notes |
|---|---|---|
| `/` | **Interactive Forms** | Landing + auth, sidebar/search, gallery, 79+ guided forms (auto-save), 8-page PMBOK Planner, Schema/Connect/Account modals, Supabase auth + per-user relational sync. |
| `/notebook` | **Documentation Reference Notebook** | Paginated A4 book; client-side paginator flows `marked`-rendered markdown into sheets; clickable TOC; print-to-PDF. |
| `/workbook` | **Forms Workbook** | Print-only fillable forms, one per page, with `e.g.` hints. |
| `/operating-model` | **Operating Model** | Static artifact: personas, swimlane, service blueprint, lifecycle ring, RACI. |
| `/governance-reports` | **Governance Reports** | Paginated packet (cover, exec summary, 5 reports); live Supabase feed with reference-sample fallback; scope slicer; per-report + full-packet PDF export. |

## Shared foundation (`lib/`)

- `forms-data.ts` / `forms-rich.ts` — the form schemas + bespoke example/why content (ported from the prototypes' `forms-data.js` / `forms-rich.js`).
- `forms-model.ts` — pure model logic: form definitions (incl. the 4 rich anchor forms), the collision-safe column resolver, and the **SQL DDL + JSON Schema generators**.
- `supabase.ts` — env-based client factory (`@supabase/supabase-js`) with localStorage credential override.
- `planner-sample.ts` — the planner's representative sample data.

Each route ships the prototype's CSS **verbatim** (injected via a `<style>` tag)
so the visual output matches pixel-for-pixel; fonts (Spectral, IBM Plex
Sans/Mono) load globally in `app/layout.tsx`.

## Setup

1. `npm install`
2. Copy `.env.local.example` → `.env.local` and set the public Supabase values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon public key>
   ```
   (The app degrades gracefully to local-only / reference-sample mode when these
   are absent.)
3. **One-time Supabase schema** — in the Supabase SQL editor, run the DDL emitted
   by the **Schema → Download** button on `/` (it creates `qq_forms`, the
   `projects` table, and one `form_*` table per form with per-user RLS + child
   tables). The `qq_forms` setup snippet is also shown in the **Connect DB** dialog.
4. `npm run dev` → http://localhost:3000

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build (all routes prerender statically)
- `npm start` — serve the production build
