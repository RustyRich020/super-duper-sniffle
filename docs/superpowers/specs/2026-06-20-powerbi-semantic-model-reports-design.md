# QQ-Studios Power BI Semantic Model + Reports — Design Spec

**Sub-project:** 1 of 3 (Semantic Model + Reports → RDL Paginated → Microsoft Integration)
**Date:** 2026-06-20
**Status:** Approved

## Goal

Build a Power BI `.pbip` project that connects to the QQ-Studios Supabase Postgres database, models the governance and planner data as a star schema, and delivers 7 interactive report pages matching the web app's visual identity.

## Data Source

- **Connection:** Direct Import from Supabase Postgres (`meosdrvquwybipqjrzwv.supabase.co`, port 5432)
- **Auth:** A dedicated `bi_reader` Postgres role with SELECT-only access and RLS bypass
- **Refresh:** Scheduled refresh via Power BI Service (frequency TBD by deployment environment)
- **Scope:** Organization-wide visibility — no per-user filtering. All authorized viewers see all project data.

### Postgres Read-Only Role

Create a `bi_reader` role in the Supabase database:

```sql
CREATE ROLE bi_reader WITH LOGIN PASSWORD '<secure-password>' BYPASSRLS;
GRANT USAGE ON SCHEMA public TO bi_reader;
GRANT SELECT ON
  projects,
  form_status_report,
  form_risk_register, form_risk_register_risks,
  form_change_request,
  form_cdoc, form_cdoc_raci_assignments, form_cdoc_version_history, form_cdoc_approval_attestations,
  form_bpg, form_bpg_baselines, form_bpg_phase_gate_transitions,
  form_sow, form_sow_timeline_milestones,
  form_project_charter
TO bi_reader;
```

Password stored as a Power BI Service data source credential, never committed to the repo.

## Star Schema

### Dimension Tables

**`dim_project`** — sourced from `projects`
| Column | Source | Description |
|--------|--------|-------------|
| project_id | id | PK |
| code | code | Short project code (e.g., "ATLAS") |
| name | name | Full project name |
| phase | phase | Current phase |
| status | status | Current status |
| pm | pm | Project manager |
| bac | bac | Budget at completion |
| spent | spent | Amount spent to date |
| pct | pct | Percent complete |

**`dim_form_type`** — static reference table (not from Postgres, built from `lib/forms-data.ts`)
| Column | Description |
|--------|-------------|
| form_id | PK — form identifier (e.g., "prd", "adr") |
| code | Short code (e.g., "PRD", "ADR") |
| title | Full title |
| domain | Domain name (e.g., "Product & Requirements") |
| domain_index | Domain sort order (0-7) |
| section_count | Number of sections in the form |

This table enables future Forms Activity reporting (sub-project C) without schema changes — just add a `fact_submission` table and relate it to `dim_form_type`.

### Fact Tables — Governance

**`fact_status_report`** — sourced from `form_status_report`
- FK: project_id → dim_project
- Fields: overall_rag, schedule_rag, budget_rag, scope_rag, quality_rag, risk_rag, resource_rag, stakeholder_rag, health metrics, report_date, updated_at
- Grain: one row per status report submission

**`fact_risk`** — sourced from `form_risk_register_risks` (child rows of `form_risk_register`)
- FK: project_id (via parent join) → dim_project
- Fields: risk_description, category, likelihood, impact, score (likelihood x impact), status (open/mitigated/closed), mitigation, owner, position
- Grain: one row per individual risk

**`fact_change_request`** — sourced from `form_change_request`
- FK: project_id → dim_project
- Fields: change_type, status (open/pending/approved/rejected), priority, impact_description, requested_date, resolved_date, updated_at
- Grain: one row per change request

**`fact_controlled_doc`** — sourced from `form_cdoc` with flattened children
- FK: project_id → dim_project
- Fields: doc_title, doc_type, status (draft/review/approved/superseded), owner, classification
- Child data loaded as related tables:
  - `controlled_doc_raci` (parent_id → fact_controlled_doc, role, person, assignment)
  - `controlled_doc_versions` (parent_id → fact_controlled_doc, version, date, author, changes)
  - `controlled_doc_attestations` (parent_id → fact_controlled_doc, attester, date, decision)
- Grain: one row per controlled document

**`fact_baseline_gate`** — sourced from `form_bpg` with flattened children
- FK: project_id → dim_project
- Fields: record_type, record_title
- Child data loaded as related tables:
  - `baseline_entries` (parent_id → fact_baseline_gate, baseline_name, baseline_date, value)
  - `gate_transitions` (parent_id → fact_baseline_gate, gate_name, decision, date, approver)
- Grain: one row per baseline/phase-gate record

### Fact Tables — Planner

**`fact_milestone`** — sourced from `form_sow_timeline_milestones` (child of `form_sow`)
- FK: project_id (via parent SOW join) → dim_project
- Fields: milestone_name, due_date, status, position
- Grain: one row per milestone
- Note: the Supabase schema stores milestones as text fields on SOW child rows. Baseline/forecast/slip tracking requires enriching this data over time — initial load captures the current snapshot.

**`fact_budget`** — derived from `dim_project` fields (bac, spent) and `form_project_charter` budget field
- FK: project_id → dim_project
- Fields: bac (budget at completion), spent, variance (bac - spent), utilization_pct
- Grain: one row per project (not per cost category — the schema doesn't break budget into categories)
- Note: budget data is currently summary-level. Per-category breakdown would require schema additions in a future iteration.

### Relationships

```
dim_project (1) ──→ (*) fact_status_report
dim_project (1) ──→ (*) fact_risk
dim_project (1) ──→ (*) fact_change_request
dim_project (1) ──→ (*) fact_controlled_doc
dim_project (1) ──→ (*) fact_baseline_gate
dim_project (1) ──→ (*) fact_milestone

fact_controlled_doc (1) ──→ (*) controlled_doc_raci
fact_controlled_doc (1) ──→ (*) controlled_doc_versions
fact_controlled_doc (1) ──→ (*) controlled_doc_attestations

fact_baseline_gate (1) ──→ (*) baseline_entries
fact_baseline_gate (1) ──→ (*) gate_transitions
```

All relationships are single-direction (dimension → fact), cross-filter from dimension to fact only.

### Future Extensibility (Sub-project C: Forms Activity)

When Forms Activity is added later, the only changes are:
- Add `fact_submission` table (from `submissions` or individual `form_*` tables)
- Relate `fact_submission.form_id` → `dim_form_type.form_id`
- Relate `fact_submission.project_id` → `dim_project.project_id`
- Add a `dim_user` table if per-user filtering is needed at that point

No changes to existing tables or relationships.

## DAX Measures

### Project Overview
- `Total Projects` = `COUNTROWS(dim_project)` — format `"#,0"`
- `Projects On Track` = `CALCULATE(COUNTROWS(dim_project), fact_status_report[overall_rag] = "green")` — format `"#,0"`
- `Projects At Risk` = `CALCULATE(COUNTROWS(dim_project), fact_status_report[overall_rag] = "red")` — format `"#,0"`
- `Projects Watch` = `CALCULATE(COUNTROWS(dim_project), fact_status_report[overall_rag] = "amber")` — format `"#,0"`

### Risk
- `Open Risks` = `CALCULATE(COUNTROWS(fact_risk), fact_risk[status] = "open")` — format `"#,0"`
- `High Risks` = `CALCULATE(COUNTROWS(fact_risk), fact_risk[score] >= 16)` — format `"#,0"`
- `Risk Exposure` = `SUM(fact_risk[score])` — format `"#,0"` — description: "Sum of all open risk scores (likelihood x impact)"
- `Avg Risk Score` = `AVERAGE(fact_risk[score])` — format `"0.0"`

### Change Control
- `Total Changes` = `COUNTROWS(fact_change_request)` — format `"#,0"`
- `Change Approval Rate` = `DIVIDE(CALCULATE(COUNTROWS(fact_change_request), fact_change_request[status] = "approved"), COUNTROWS(fact_change_request))` — format `"0.0%"`
- `Open Changes` = `CALCULATE(COUNTROWS(fact_change_request), fact_change_request[status] IN {"open", "pending"})` — format `"#,0"`

### Financial
- `CPI` = `DIVIDE(SUM(dim_project[bac]) * SUM(dim_project[pct]) / 100, SUM(dim_project[spent]))` — format `"0.00"` — description: "Cost Performance Index (EV / AC)"
- `Budget Variance` = `SUM(dim_project[bac]) - SUM(dim_project[spent])` — format `"$#,0"`
- `Budget Utilization %` = `DIVIDE(SUM(dim_project[spent]), SUM(dim_project[bac]))` — format `"0.0%"`

### Document Governance
- `Total Documents` = `COUNTROWS(fact_controlled_doc)` — format `"#,0"`
- `Doc Compliance %` = `DIVIDE(CALCULATE(COUNTROWS(fact_controlled_doc), fact_controlled_doc[status] = "approved"), COUNTROWS(fact_controlled_doc))` — format `"0.0%"`

### Schedule
- `Total Milestones` = `COUNTROWS(fact_milestone)` — format `"#,0"`

All measures include a `description` property for self-documenting the model.

## Report Pages

### Page 1 — Executive Summary
- **KPI tiles row:** Total Projects, On Track, Watch, At Risk, Open Risks, Open Changes
- **RAG status cards:** one card per project showing overall RAG, phase, PM, percent complete
- **Trend line:** overall RAG distribution over time (if historical status reports exist)
- **Slicers:** project multi-select, phase, date range (shared slicer panel on all pages)

### Page 2 — Project Status Detail
- **Drillthrough** from Executive Summary (by project)
- **Health grid:** 10 PMBOK knowledge area RAG indicators in a matrix
- **RAG comparison:** current vs prior period
- **RAID log table:** filtered risks from `fact_risk` for selected project
- **Summary tiles:** CPI, SPI, budget utilization, schedule slip

### Page 3 — Risk Matrix
- **5x5 heatmap:** likelihood (y) x impact (x), bubble size = count of risks in each cell
- **Risk register table:** description, category, score, status, owner, mitigation — conditional formatting by score (green < 10, amber 10-15, red >= 16)
- **Filters:** project, status (open/mitigated/closed), category

### Page 4 — Change Control
- **Volume over time:** bar chart of change requests by month
- **Status breakdown:** donut chart (open/pending/approved/rejected)
- **Change log table:** full detail with priority, impact, dates
- **Summary tiles:** Total, Approval Rate, Open, Avg Cycle Days

### Page 5 — Controlled Documents
- **Document register table:** title, type, status, owner, classification — status icons (draft/review/approved/superseded)
- **RACI matrix visual:** drillthrough per document showing role assignments
- **Version history:** drillthrough showing version timeline per document
- **Summary tiles:** Total Documents, Compliance %, Documents in Review

### Page 6 — Baseline & Phase Gates
- **Phase gate timeline:** horizontal timeline per project showing gate transitions with decision indicators (approved/conditional/rejected)
- **Baseline comparison table:** original vs current values with variance highlighting
- **Gate approval status:** summary cards per project

### Page 7 — PMBOK Planner Dashboard
- **Six KPI tiles:** Budget Health, Schedule Variance, Risk Exposure, Change Volume, Doc Compliance %, Team Utilization
- **Budget summary:** BAC vs Spent per project (clustered bar chart), variance highlighting
- **Milestone table:** from SOW milestones, showing due date and status per project
- **CPI gauge:** target = 1.0, color bands for under/over (SPI deferred — no schedule baseline data yet)
- **Project progress:** percent complete bars per project from `dim_project`

### Shared Elements (all pages)
- **Slicer panel:** project, phase, date range — synchronized across pages
- **Header:** QQ-Studios logo, page title, last refresh timestamp
- **Navigation:** page navigation buttons or tab strip

## Theme (`qq-studios-theme.json`)

### Colors
```json
{
  "name": "QQ-Studios",
  "dataColors": ["#B5862A", "#E6C658", "#5FA463", "#C9962B", "#C2603F", "#1E1E21", "#6A6A6F", "#9C9C98"],
  "background": "#FBFBF9",
  "foreground": "#222226",
  "tableAccent": "#B5862A",
  "good": "#5FA463",
  "neutral": "#C9962B",
  "bad": "#C2603F"
}
```

### Typography
- Titles/headings: `Georgia` (closest Power BI-compatible equivalent to Spectral)
- Body/UI: `Segoe UI` (Power BI native, close to IBM Plex Sans)
- Labels/KPI kickers: `Consolas` (monospace, close to IBM Plex Mono)

### Visual Style
- Card visuals: 12px border radius, 1px `#E3E3DE` border, `#FFFFFF` fill
- KPI tile top accent: gold bar (simulated via card formatting or image overlay)
- Table headers: `#1E1E21` background, `#FBFBF9` text, `Consolas` font
- Conditional formatting: RAG colors (`#5FA463` / `#C9962B` / `#C2603F`) applied to status fields, risk scores, project health

## Project Structure

```
qq-studios-reports/                          (new repo: RustyRich020/qq-studios-reports)
├── .gitignore
├── README.md
├── qq-studios-reports.pbip
├── qq-studios-reports.SemanticModel/
│   ├── definition.pbism
│   └── definition/
│       ├── model.tmdl
│       ├── tables/
│       │   ├── dim_project.tmdl
│       │   ├── dim_form_type.tmdl
│       │   ├── fact_status_report.tmdl
│       │   ├── fact_risk.tmdl
│       │   ├── fact_change_request.tmdl
│       │   ├── fact_controlled_doc.tmdl
│       │   ├── controlled_doc_raci.tmdl
│       │   ├── controlled_doc_versions.tmdl
│       │   ├── controlled_doc_attestations.tmdl
│       │   ├── fact_baseline_gate.tmdl
│       │   ├── baseline_entries.tmdl
│       │   ├── gate_transitions.tmdl
│       │   └── fact_milestone.tmdl
│       └── relationships.tmdl
├── qq-studios-reports.Report/
│   ├── definition.pbir
│   └── definition/
│       ├── pages/
│       │   ├── executive-summary/
│       │   ├── project-status-detail/
│       │   ├── risk-matrix/
│       │   ├── change-control/
│       │   ├── controlled-documents/
│       │   ├── baseline-phase-gates/
│       │   └── pmbok-planner/
│       └── report.json
├── themes/
│   └── qq-studios-theme.json
├── sql/
│   └── create-bi-reader-role.sql
└── docs/
    └── data-dictionary.md
```

## Naming Conventions

- Tables: `dim_` prefix for dimensions, `fact_` prefix for facts, snake_case
- Measures: `Total {Metric}`, `{Metric} %`, `{Metric} YTD`, `Avg {Metric}` — title case
- Columns: snake_case matching Postgres source columns
- Report pages: kebab-case folder names, title case display names

## Constraints

- No new dependencies in the Next.js app — this is a standalone Power BI project
- Power BI Desktop required for development (TMDL editing + visual layout)
- Supabase Postgres connection string required (not committed to repo)
- The `bi_reader` role SQL is committed to `sql/` for reproducibility but the password is not
- Theme JSON must be valid Power BI theme format (v3 schema)
- All measures must include `description` and `formatString` properties
