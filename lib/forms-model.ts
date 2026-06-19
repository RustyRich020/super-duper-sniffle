// Pure form-model logic ported from "Interactive Forms.dc.html" (the DCLogic
// class) — definitions, section mapping, column resolver, and schema (DDL +
// JSON Schema) generation. No DOM dependencies, so it is reused by the
// interactive app and the workbook.
import { DOMAINS, FORMS } from "./forms-data";
import { FORMS_RICH } from "./forms-rich";

export type FieldType = "long" | "text" | "table" | "check";

export interface MetaField {
  key: string;
  label: string;
  type?: "select";
  options?: string[];
  placeholder?: string;
}

export interface Column {
  key: string;
  label: string;
}

export interface CheckItem {
  key: string;
  label: string;
}

export interface Section {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  guidance?: string;
  example?: string;
  why?: string;
  placeholder?: string;
  columns?: Column[];
  items?: CheckItem[];
}

export interface FormDef {
  id: string;
  code: string;
  title: string;
  d: number;
  purpose: string;
  meta: MetaField[];
  sections: Section[];
}

export interface CatalogEntry {
  id: string;
  code: string;
  title: string;
  d: number;
}

export function snake(s: string): string {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/__+/g, "_");
}

// ---- the 4 deeply-detailed anchor forms (rich guidance / example / why) ----
export function buildDefs(): FormDef[] {
  return [
    {
      id: "prd",
      code: "PRD",
      title: "Product Requirements Document",
      d: 0,
      purpose:
        "Define what a product or feature should do, and how you will know it worked.",
      meta: [
        { key: "owner", label: "Owner (PM)" },
        { key: "author", label: "Author" },
        {
          key: "status",
          label: "Status",
          type: "select",
          options: ["Draft", "In Review", "Approved"],
        },
        { key: "release", label: "Target release", placeholder: "e.g. Q3 2026" },
      ],
      sections: [
        {
          key: "problem",
          label: "Problem statement & evidence",
          type: "long",
          required: true,
          guidance:
            "Describe the user or business problem in plain language, then back it with evidence — data, support tickets, or direct quotes.",
          example:
            "Support logs ~300 tickets/month about failed CSV imports; three of last quarter’s churn interviews named it unprompted.",
          why: "A problem no one can verify becomes a feature no one needs. Evidence is what earns the build.",
          placeholder: "What problem are we solving, and how do we know it’s real?",
        },
        {
          key: "goals",
          label: "Goals & success metrics",
          type: "long",
          required: true,
          guidance:
            "List each goal with the metric, target, and timeframe that proves it was achieved.",
          example:
            "Reduce failed imports from 12% to under 3% within one quarter of launch.",
          why: "Goals without metrics can’t be judged shipped or successful — they just drift.",
          placeholder: "Goal — measured by [metric, target, timeframe]",
        },
        {
          key: "nongoals",
          label: "Non-goals",
          type: "long",
          required: false,
          guidance: "State plainly what this effort will not do or cover.",
          example: "Not redesigning the importer UI; not adding XLSX support this release.",
          why: "Naming non-goals up front prevents the majority of scope creep and review churn.",
          placeholder: "Explicitly out of scope…",
        },
        {
          key: "requirements",
          label: "Requirements",
          type: "table",
          required: true,
          columns: [
            { key: "n", label: "#" },
            { key: "requirement", label: "Requirement" },
            { key: "priority", label: "Priority (P0–P2)" },
          ],
          guidance:
            "Enumerate concrete, testable requirements with a priority. Keep each one to a single verifiable statement.",
          example: "P0 — Reject malformed rows and return a downloadable error report.",
          why: "A flat, prioritized list is what engineering actually estimates and builds against.",
        },
        {
          key: "risks",
          label: "Dependencies, risks & open questions",
          type: "long",
          required: false,
          guidance:
            "Capture what this depends on, what could go wrong, and what is still undecided.",
          example:
            "Depends on the new validation service (team Atlas) landing by week 3; open question: do we block or warn on partial failures?",
          why: "Surfacing risk early is far cheaper than discovering it at launch.",
          placeholder: "Dependencies, risks, open questions…",
        },
      ],
    },
    {
      id: "adr",
      code: "ADR",
      title: "Architecture Decision Record",
      d: 1,
      purpose:
        "Capture one architectural decision — its context, the options, the choice, and the consequences.",
      meta: [
        { key: "author", label: "Author" },
        { key: "number", label: "ADR #", placeholder: "e.g. ADR-021" },
        {
          key: "status",
          label: "Status",
          type: "select",
          options: ["Proposed", "Accepted", "Superseded"],
        },
        { key: "date", label: "Date" },
      ],
      sections: [
        {
          key: "context",
          label: "Context",
          type: "long",
          required: true,
          guidance:
            "Describe the situation forcing a decision now — the constraints, requirements, and deadlines in play.",
          example:
            "We need multi-region writes; our single-primary Postgres can’t meet the new 5-minute RPO.",
          why: "Future readers judge a decision by the constraints you faced, not by what’s obvious today.",
          placeholder: "What situation forces this decision?",
        },
        {
          key: "options",
          label: "Options considered",
          type: "long",
          required: true,
          guidance:
            "List the realistic options with their pros and cons. Always include “do nothing.”",
          example: "A) CockroachDB  B) Postgres + Citus  C) Do nothing and accept the RPO gap.",
          why: "Recording the rejected options stops the team re-litigating them six months later.",
          placeholder: "Option A — pros / cons …",
        },
        {
          key: "decision",
          label: "Decision",
          type: "long",
          required: true,
          guidance: "State what was chosen, in one or two sentences.",
          example: "Adopt CockroachDB for the orders service; migrate during Q3.",
          why: "The decision is the single load-bearing sentence this whole record exists to preserve.",
          placeholder: "We chose…",
        },
        {
          key: "consequences",
          label: "Consequences",
          type: "long",
          required: true,
          guidance:
            "Spell out what becomes easier, what becomes harder, and what you’re committing to maintain.",
          example:
            "Gain multi-region writes and stronger durability; take on a new operational learning curve and ~20% cost increase.",
          why: "Honest consequences make the trade-off auditable instead of forgotten.",
          placeholder: "Easier… / Harder… / We now own…",
        },
        {
          key: "related",
          label: "Supersedes / related",
          type: "text",
          required: false,
          guidance: "Note any ADRs this replaces or relates to.",
          example: "Supersedes ADR-014; related to ADR-009.",
          why: "Links keep the decision history navigable as it grows.",
          placeholder: "Supersedes ADR-…",
        },
      ],
    },
    {
      id: "postmortem",
      code: "PM",
      title: "Postmortem / RCA",
      d: 3,
      purpose:
        "A blameless account of an incident: what happened, why, and what will prevent a recurrence.",
      meta: [
        {
          key: "severity",
          label: "Severity",
          type: "select",
          options: ["SEV1", "SEV2", "SEV3"],
        },
        { key: "author", label: "Author" },
        { key: "duration", label: "Duration", placeholder: "e.g. 42 min" },
        {
          key: "status",
          label: "Status",
          type: "select",
          options: ["Draft", "Reviewed"],
        },
      ],
      sections: [
        {
          key: "summary",
          label: "Summary",
          type: "long",
          required: true,
          guidance:
            "In two or three sentences, say what broke, the impact, and how it was resolved.",
          example:
            "A bad deploy dropped the cache layer; checkout latency spiked for 42 minutes until we rolled back.",
          why: "Most people only ever read the summary — make it carry the whole story.",
          placeholder: "What broke, the impact, and the resolution…",
        },
        {
          key: "timeline",
          label: "Timeline",
          type: "table",
          required: true,
          columns: [
            { key: "time", label: "Time" },
            { key: "event", label: "Event" },
          ],
          guidance:
            "Log the key events with timestamps in a single timezone, from first signal to full resolution.",
          example:
            "14:02 — deploy v812 ships · 14:09 — latency alert fires · 14:44 — rollback complete.",
          why: "A precise timeline is the backbone every root-cause analysis hangs on.",
        },
        {
          key: "rootcause",
          label: "Root cause",
          type: "long",
          required: true,
          guidance:
            "Use 5 Whys. Name the systems and processes involved — never the people.",
          example:
            "The cache client defaulted to a 1s timeout; under load it tripped, and no fallback path existed.",
          why: "Blameless, systemic root cause is what actually prevents the next incident.",
          placeholder: "Why did it happen? Keep asking why…",
        },
        {
          key: "actions",
          label: "Action items",
          type: "table",
          required: true,
          columns: [
            { key: "action", label: "Action" },
            { key: "owner", label: "Owner" },
            { key: "due", label: "Due" },
          ],
          guidance:
            "List concrete, owned, dated prevention items — each one a ticket someone will close.",
          example: "Add a cache-miss fallback path — A. Rivera — Aug 30.",
          why: "A postmortem with no owned actions is just a sad story you’ll repeat.",
        },
        {
          key: "lucky",
          label: "Where we got lucky",
          type: "long",
          required: false,
          guidance:
            "Name the near-misses — the things that could have made this far worse.",
          example:
            "It hit off-peak; at peak traffic the same fault would have breached the customer SLA.",
          why: "Near-misses are free lessons, but only if you write them down.",
          placeholder: "Near-misses and close calls…",
        },
      ],
    },
    {
      id: "onboarding",
      code: "Onboard",
      title: "Onboarding / Developer Setup",
      d: 2,
      purpose:
        "Everything a new engineer needs to become productive in their first days.",
      meta: [
        { key: "owner", label: "Owner" },
        { key: "team", label: "Team" },
        { key: "role", label: "Role" },
        { key: "start", label: "Start date" },
      ],
      sections: [
        {
          key: "access",
          label: "Accounts & access",
          type: "check",
          required: true,
          items: [
            { key: "sso", label: "Email & SSO" },
            { key: "repo", label: "Repository access" },
            { key: "infra", label: "Cloud / infrastructure" },
            { key: "tickets", label: "Ticketing & project tools" },
            { key: "comms", label: "Comms channels" },
          ],
          guidance:
            "Tick each access grant as it’s completed so nothing blocks day one.",
          why: "A new hire idle on day one because access wasn’t ready is pure, avoidable cost.",
        },
        {
          key: "env",
          label: "Environment setup",
          type: "long",
          required: true,
          guidance:
            "Give the exact, copy-pasteable steps to a running local environment.",
          example:
            "git clone …; make setup; make test — the suite should pass green before you change anything.",
          why: "If setup isn’t written down, it lives in one person’s memory and silently rots.",
          placeholder: "Step-by-step from zero to a running app…",
        },
        {
          key: "arch",
          label: "Architecture orientation",
          type: "long",
          required: false,
          guidance:
            "Point the newcomer to the right starting place and reading order for the system.",
          example:
            "Start with the C4 context diagram in /docs, then the orders-service README, then shadow an on-call.",
          why: "Context turns code-reading from archaeology into actual learning.",
          placeholder: "Where to start, what to read…",
        },
        {
          key: "contacts",
          label: "Key contacts & first tasks",
          type: "long",
          required: false,
          guidance: "Say who to ask for what, and give a concrete first task.",
          example:
            "Infra questions → #ops; product context → Dana. First task: close a “good first issue” ticket.",
          why: "Knowing who-to-ask is the single biggest driver of time-to-first-contribution.",
          placeholder: "Who to ask, and a first task…",
        },
      ],
    },
  ];
}

function mapSection(s: import("./forms-data").RawSection, id: string): Section {
  const base: Section = {
    key: snake(s.l),
    label: s.l,
    type: "long",
    guidance: s.h || "",
    required: false,
  };
  const rich = (FORMS_RICH && id && FORMS_RICH[id] && FORMS_RICH[id][s.l]) || null;
  if (rich) {
    if (rich.ex) base.example = rich.ex;
    if (rich.why) base.why = rich.why;
  }
  if (s.t === "cols")
    return { ...base, type: "table", columns: (s.c || []).map((c) => ({ key: snake(c), label: c })) };
  if (s.t === "check")
    return {
      ...base,
      type: "check",
      items: (s.items || []).map((it) => ({ key: snake(it), label: it })),
    };
  if (s.t === "draw")
    return {
      ...base,
      type: "long",
      placeholder: "Describe the diagram here, or attach it in your design tool…",
    };
  return { ...base, type: "long" };
}

// ---- all forms: rich overrides + generated from catalog ----
export function allDefs(): FormDef[] {
  const rich: Record<string, FormDef> = {};
  buildDefs().forEach((d) => {
    rich[d.id] = d;
  });
  const seen: Record<string, number> = {};
  return FORMS.map((f) => {
    let id = snake(f.code);
    if (seen[id]) id = id + "_" + snake(f.title).slice(0, 8);
    seen[id] = 1;
    if (rich[id]) return rich[id];
    const meta: MetaField[] = (f.meta && f.meta.length ? f.meta : ["Owner", "Author", "Status", "Date"]).map(
      (l) => ({ key: snake(l), label: l }),
    );
    return {
      id,
      code: f.code,
      title: f.title,
      d: f.d,
      purpose: f.purpose || "",
      meta,
      sections: (f.s || []).map((s) => mapSection(s, id)),
    };
  });
}

export function allCatalog(): CatalogEntry[] {
  return FORMS.map((f) => ({ id: snake(f.code), code: f.code, title: f.title, d: f.d }));
}

export const domains = DOMAINS;

// ---- column-name resolver (shared by DDL + sync, collision-safe) ----
export interface Cols {
  meta: Record<string, string>;
  sec: Record<string, string>;
  child: Record<string, Record<string, string>>;
}

const colsCache: Record<string, Cols> = {};

export function colsFor(def: FormDef): Cols {
  if (colsCache[def.id]) return colsCache[def.id];
  const used = new Set(["id", "user_id", "title", "created_at", "updated_at"]);
  const uniq = (base: string) => {
    let b = base || "col",
      n = b,
      i = 2;
    while (used.has(n)) {
      n = b + "_" + i;
      i++;
    }
    used.add(n);
    return n;
  };
  const meta: Record<string, string> = {};
  def.meta.forEach((m) => {
    meta[m.key] = uniq(snake(m.label));
  });
  const sec: Record<string, string> = {};
  def.sections
    .filter((s) => s.type !== "table")
    .forEach((s) => {
      sec[s.key] = uniq(snake(s.key));
    });
  const child: Record<string, Record<string, string>> = {};
  def.sections
    .filter((s) => s.type === "table")
    .forEach((s) => {
      const cu = new Set(["id", "parent_id", "position"]);
      const cm: Record<string, string> = {};
      (s.columns || []).forEach((c) => {
        let b = snake(c.label) || snake(c.key) || "col",
          n = b,
          i = 2;
        while (cu.has(n)) {
          n = b + "_" + i;
          i++;
        }
        cu.add(n);
        cm[c.key] = n;
      });
      child[s.key] = cm;
    });
  const r: Cols = { meta, sec, child };
  colsCache[def.id] = r;
  return r;
}

export function tname(def: FormDef): string {
  return "form_" + def.id;
}

export function supaSQL(): string {
  return (
    "create table if not exists qq_forms (\n" +
    "  id          text primary key,\n" +
    "  data        jsonb not null default '{}',\n" +
    "  updated_at  timestamptz not null default now()\n" +
    ");\n\n" +
    "alter table qq_forms enable row level security;\n" +
    'drop policy if exists "qq_forms_anon" on qq_forms;\n' +
    'create policy "qq_forms_anon" on qq_forms\n  for all using (true) with check (true);'
  );
}

export function sqlDDL(defs: FormDef[]): string {
  const q = (x: string) => '"' + x + '"';
  let out =
    "-- QQ-Studios Forms — relational schema\n-- One table per form (prefixed form_), child tables for multi-row sections,\n-- per-user row-level security. Run once in the Supabase SQL editor.\n\n";
  out +=
    "-- Project Planner (powers the Planner dashboard)\ncreate table if not exists projects (\n  " +
    q("id") +
    " uuid primary key default gen_random_uuid(),\n  " +
    q("user_id") +
    " uuid not null references auth.users(id) on delete cascade,\n  " +
    q("code") +
    " text,\n  " +
    q("name") +
    " text,\n  " +
    q("phase") +
    " text,\n  " +
    q("status") +
    " text,\n  " +
    q("pct") +
    " int,\n  " +
    q("pm") +
    " text,\n  " +
    q("bac") +
    " numeric,\n  " +
    q("spent") +
    " numeric,\n  " +
    q("created_at") +
    " timestamptz not null default now(),\n  " +
    q("updated_at") +
    " timestamptz not null default now()\n);\nalter table projects enable row level security;\ndrop policy if exists " +
    q("own_projects") +
    " on projects;\ncreate policy " +
    q("own_projects") +
    " on projects for all using (auth.uid() = " +
    q("user_id") +
    ") with check (auth.uid() = " +
    q("user_id") +
    ");\n\n";
  for (const d of defs) {
    const t = tname(d);
    const C = colsFor(d);
    const cols = [
      "  " + q("id") + " uuid primary key default gen_random_uuid()",
      "  " + q("user_id") + " uuid not null references auth.users(id) on delete cascade",
      "  " + q("title") + " text",
      "  " + q("project_id") + " uuid references projects(id) on delete set null",
    ];
    d.meta.forEach((m) => cols.push("  " + q(C.meta[m.key]) + " text"));
    d.sections
      .filter((s) => s.type !== "table")
      .forEach((s) => cols.push("  " + q(C.sec[s.key]) + " " + (s.type === "check" ? "jsonb" : "text")));
    cols.push("  " + q("created_at") + " timestamptz not null default now()");
    cols.push("  " + q("updated_at") + " timestamptz not null default now()");
    out += "-- " + d.title + "\ncreate table if not exists " + t + " (\n" + cols.join(",\n") + "\n);\n";
    out += "alter table " + t + " enable row level security;\n";
    out += "drop policy if exists " + q("own_" + t) + " on " + t + ";\n";
    out +=
      "create policy " +
      q("own_" + t) +
      " on " +
      t +
      " for all using (auth.uid() = " +
      q("user_id") +
      ") with check (auth.uid() = " +
      q("user_id") +
      ");\n\n";
    d.sections
      .filter((s) => s.type === "table")
      .forEach((s) => {
        const ct = t + "_" + snake(s.key);
        const cm = C.child[s.key];
        const c2 = [
          "  " + q("id") + " uuid primary key default gen_random_uuid()",
          "  " + q("parent_id") + " uuid not null references " + t + "(id) on delete cascade",
          "  " + q("position") + " int not null default 0",
        ];
        (s.columns || []).forEach((c) => c2.push("  " + q(cm[c.key]) + " text"));
        out += "create table if not exists " + ct + " (\n" + c2.join(",\n") + "\n);\n";
        out += "alter table " + ct + " enable row level security;\n";
        out += "drop policy if exists " + q("own_" + ct) + " on " + ct + ";\n";
        out +=
          "create policy " +
          q("own_" + ct) +
          " on " +
          ct +
          " for all using (exists (select 1 from " +
          t +
          " p where p." +
          q("id") +
          " = " +
          q("parent_id") +
          " and p." +
          q("user_id") +
          " = auth.uid())) with check (exists (select 1 from " +
          t +
          " p where p." +
          q("id") +
          " = " +
          q("parent_id") +
          " and p." +
          q("user_id") +
          " = auth.uid()));\n\n";
      });
  }
  return out.trim() + "\n";
}

export function jsonSchema(defs: FormDef[]): string {
  const out: Record<string, unknown> = {};
  for (const d of defs) {
    const props: Record<string, unknown> = {};
    d.meta.forEach((m) => {
      props[snake(m.label)] = { type: "string", title: m.label };
    });
    for (const s of d.sections) {
      const key = snake(s.key);
      if (s.type === "table") {
        props[key] = {
          type: "array",
          title: s.label,
          items: {
            type: "object",
            properties: Object.fromEntries(
              (s.columns || []).map((c) => [snake(c.label), { type: "string", title: c.label }]),
            ),
          },
        };
      } else if (s.type === "check") {
        props[key] = {
          type: "object",
          title: s.label,
          properties: Object.fromEntries(
            (s.items || []).map((i) => [i.key, { type: "boolean", title: i.label }]),
          ),
        };
      } else {
        props[key] = { type: "string", title: s.label, description: s.guidance || "" };
      }
    }
    out[snake(d.code)] = {
      type: "object",
      title: d.title,
      description: d.purpose,
      properties: props,
    };
  }
  return JSON.stringify(
    {
      $schema: "http://json-schema.org/draft-07/schema#",
      title: "QQ-Studios Forms",
      definitions: out,
    },
    null,
    2,
  );
}
