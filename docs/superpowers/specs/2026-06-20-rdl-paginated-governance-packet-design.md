# RDL Paginated Governance Packet — Design Spec

**Sub-project:** 2 of 3 (Semantic Model + Reports → **RDL Paginated** → Microsoft Integration)
**Date:** 2026-06-20
**Status:** Approved

## Goal

Build a single multi-section RDL paginated report that mirrors the QQ-Studios web app's governance packet — cover page, TOC, and 5 report sections — styled to match the A4 print layout, using direct Postgres queries against the same `bi_reader` role.

## Data Source

- **Connection:** Same `bi_reader` Postgres role as the semantic model (`db.meosdrvquwybipqjrzwv.supabase.co:5432/postgres`)
- **Query approach:** Embedded SQL datasets per section — no dependency on the published semantic model
- **Auth:** `bi_reader` credentials configured as a shared data source when published to Power BI Service

## Report Structure

Single RDL file with 7 logical sections rendered as a continuous paginated document.

### Cover Page

- Full-page dark background (`#1E1E21`)
- QQ-Studios logo centered, white-filtered
- Gold accent border inset (1px `rgba(230,198,88,0.18)` at 14mm from edges)
- Title: "Governance & Status Reports" in Georgia 42px, `#FAF4E8`
- Subtitle line 1: project name(s) or "Portfolio Governance Packet" when all projects selected
- Subtitle line 2: reporting period + generation date
- Footer: "QQ-Studios" in Consolas 10px, `#74747A`
- Driven by `@ProjectId` and `@ReportDate` parameters

### Table of Contents

- Section titles with page numbers, auto-generated via RDL page references
- Georgia headings, Consolas page numbers
- Gold accent dot before each entry
- Sections listed:
  1. Executive Summary
  2. Project Status Report
  3. Controlled Document Register
  4. Change-Control Register
  5. Baseline & Phase-Gate Register

### Section 1 — Executive Summary

**Dataset: `ds_executive_summary`**

```sql
SELECT
  p.id AS project_id,
  p.code,
  p.name,
  p.phase,
  p.status,
  p.pm,
  p.pct,
  p.bac,
  p.spent,
  sr.rag,
  sr.period,
  sr.summary_rag_status,
  sr.updated_at AS report_date
FROM projects p
LEFT JOIN LATERAL (
  SELECT rag, period, summary_rag_status, updated_at
  FROM form_status_report
  WHERE project_id = p.id
  ORDER BY updated_at DESC
  LIMIT 1
) sr ON true
WHERE (@ProjectId = 'ALL' OR p.id::text = @ProjectId)
ORDER BY p.code;
```

**Layout:**
- KPI tiles row (6): Total Projects, On Track, Watch, At Risk, Open Risks (from separate dataset), Open Changes (from separate dataset)
- Project RAG table: code, name, phase, rag, PM, pct — one row per project
- Conditional formatting: rag cell background green=#5FA463, amber=#C9962B, red=#C2603F with white text

**Supporting datasets for KPI counts:**

`ds_risk_count`:
```sql
SELECT COUNT(*) AS open_risks
FROM form_risk_register_risks rr
JOIN form_risk_register r ON rr.parent_id = r.id
WHERE (@ProjectId = 'ALL' OR r.project_id::text = @ProjectId);
```

`ds_change_count`:
```sql
SELECT
  COUNT(*) FILTER (WHERE status IN ('open','pending')) AS open_changes
FROM form_change_request
WHERE (@ProjectId = 'ALL' OR project_id::text = @ProjectId);
```

### Section 2 — Project Status Report

**Dataset: `ds_status_detail`**

```sql
SELECT
  p.code,
  p.name,
  sr.rag,
  sr.owner,
  sr.period,
  sr.date AS report_date,
  sr.summary_rag_status,
  sr.progress_this_period,
  sr.risks_issues,
  sr.decisions_needed_next_period
FROM form_status_report sr
JOIN projects p ON sr.project_id = p.id
WHERE (@ProjectId = 'ALL' OR p.id::text = @ProjectId)
ORDER BY p.code, sr.updated_at DESC;
```

**Dataset: `ds_raid_log`**

```sql
SELECT
  p.code AS project_code,
  rr.risk AS description,
  rr.likelihood,
  rr.impact,
  CASE
    WHEN rr.likelihood ~ '^\d+$' AND rr.impact ~ '^\d+$'
    THEN rr.likelihood::int * rr.impact::int
    ELSE NULL
  END AS score,
  rr.mitigation,
  rr.owner,
  rr.position
FROM form_risk_register_risks rr
JOIN form_risk_register r ON rr.parent_id = r.id
JOIN projects p ON r.project_id = p.id
WHERE (@ProjectId = 'ALL' OR p.id::text = @ProjectId)
ORDER BY p.code, score DESC NULLS LAST, rr.position;
```

**Layout:**
- Grouped by project (page break between projects)
- Per project: RAG badge, owner, period, report date
- Narrative blocks: progress, risks/issues, decisions needed
- RAID log table: description, likelihood, impact, score, owner, mitigation
- Score conditional formatting: >=16 red, 10-15 amber, <10 green

### Section 3 — Controlled Document Register

**Dataset: `ds_controlled_docs`**

```sql
SELECT
  p.code AS project_code,
  c.doc_id,
  c.document_title,
  c.document_type,
  c.status,
  c.owner,
  c.department,
  c.classification,
  c.version,
  c.review_cycle,
  c.next_review
FROM form_cdoc c
LEFT JOIN projects p ON c.project_id = p.id
WHERE (@ProjectId = 'ALL' OR c.project_id::text = @ProjectId)
ORDER BY p.code, c.document_title;
```

**Layout:**
- Full-width table: doc_id, title, type, status, owner, department, classification, version, next review
- Status column conditional formatting (draft=muted, review=amber, approved=green, superseded=faint)
- Grouped by project when multiple projects selected
- Summary footer: total documents, approved count, compliance %

### Section 4 — Change-Control Register

**Dataset: `ds_change_requests`**

```sql
SELECT
  p.code AS project_code,
  cr.cr AS cr_number,
  cr.title,
  cr.requester,
  cr.status,
  cr.date AS request_date,
  cr.change_description,
  cr.reason_business_case,
  cr.impact_analysis,
  cr.rollback_plan
FROM form_change_request cr
LEFT JOIN projects p ON cr.project_id = p.id
WHERE (@ProjectId = 'ALL' OR cr.project_id::text = @ProjectId)
ORDER BY p.code, cr.date DESC;
```

**Dataset: `ds_cab_approvals`**

```sql
SELECT
  ca.parent_id AS change_request_id,
  ca.name,
  ca.decision,
  ca.date
FROM form_change_request_cab_approval ca
JOIN form_change_request cr ON ca.parent_id = cr.id
WHERE (@ProjectId = 'ALL' OR cr.project_id::text = @ProjectId)
ORDER BY ca.position;
```

**Layout:**
- Change log table: CR#, requester, status, date, description
- Expandable detail: reason, impact, rollback plan
- CAB approval sub-table nested per change request (name, decision, date)
- Summary footer: total, approved count, pending count, rejected count
- Status conditional formatting

### Section 5 — Baseline & Phase-Gate Register

**Dataset: `ds_baselines`**

```sql
SELECT
  p.code AS project_code,
  b.type AS baseline_type,
  b.version,
  b.status,
  b.change_summary,
  b.baselined_by,
  b.date AS baseline_date,
  b.budget,
  b.activities
FROM form_bpg_baselines b
JOIN form_bpg bg ON b.parent_id = bg.id
LEFT JOIN projects p ON bg.project_id = p.id
WHERE (@ProjectId = 'ALL' OR bg.project_id::text = @ProjectId)
ORDER BY p.code, b.position;
```

**Dataset: `ds_gate_transitions`**

```sql
SELECT
  p.code AS project_code,
  gt.from_phase,
  gt.to_phase,
  gt.gate_decision,
  gt.approved_by,
  gt.date AS transition_date,
  gt.notes
FROM form_bpg_phase_gate_transitions gt
JOIN form_bpg bg ON gt.parent_id = bg.id
LEFT JOIN projects p ON bg.project_id = p.id
WHERE (@ProjectId = 'ALL' OR bg.project_id::text = @ProjectId)
ORDER BY p.code, gt.position;
```

**Layout:**
- Two tables grouped by project:
  1. Baselines: type, version, status, date, change summary, baselined by
  2. Gate Transitions: from → to, decision, approver, date, notes
- Gate decision conditional formatting (approved=green, conditional=amber, rejected=red)

## Parameters

| Parameter | Type | Default | Values | Description |
|-----------|------|---------|--------|-------------|
| `@ProjectId` | Text | `ALL` | `ALL` + available project IDs | Filter to specific project |
| `@ReportDate` | Date | `=Today()` | Any date | Display date on cover page |

**Parameter dataset: `ds_projects_param`**

```sql
SELECT 'ALL' AS id, '— All Projects —' AS label, '' AS sort_key
UNION ALL
SELECT id::text, code || ' — ' || name, code
FROM projects
ORDER BY sort_key;
```

## Page Layout

- **Page size:** A4 portrait (210mm x 297mm / 8.27in x 11.69in)
- **Margins:** 14mm all sides (0.55in)
- **Header:** 12mm height — QQ-Studios logo (left), section title (center, Georgia 11px), page number (right, Consolas 9px)
- **Footer:** 8mm height — "Generated [date]" (left, Consolas 8px), "Confidential" (right, Consolas 8px)
- **Section breaks:** page break before each new section
- **Project breaks:** page break before each new project within Section 2

## Typography

| Role | Font | Size | Color |
|------|------|------|-------|
| Cover title | Georgia | 42px | #FAF4E8 |
| Section headings | Georgia | 20px | #222226 |
| Sub-headings | Georgia | 14px | #222226 |
| Body text | Segoe UI | 10px | #222226 |
| Table headers | Consolas | 8.5px uppercase | #FBFBF9 on #1E1E21 |
| Table body | Segoe UI | 9px | #222226 |
| Labels / kickers | Consolas | 8px uppercase | #9C9C98 |
| KPI values | Georgia | 26px | #222226 |
| KPI labels | Consolas | 8px uppercase | #9C9C98 |

## Colors

Same palette as `qq-studios-theme.json`:
- Page background: `#FBFBF9`
- Table borders: `#E3E3DE`
- Table alternate row: `#F2F2EF`
- Header background: `#1E1E21`
- Accent: `#B5862A`
- RAG green: `#5FA463`
- RAG amber: `#C9962B`
- RAG red: `#C2603F`
- Muted text: `#6A6A6F`
- Faint text: `#9C9C98`

## File Structure

```
qq-studios-reports/
├── rdl/
│   ├── governance-packet.rdl
│   └── README.md
└── ... (existing PBIP files)
```

## Constraints

- RDL is XML — can be authored programmatically or in Power BI Report Builder
- All SQL datasets use the `bi_reader` Postgres connection
- The `@ProjectId` parameter uses text comparison (`id::text`) since RDL parameters are strings
- LATERAL join in `ds_executive_summary` requires Postgres 9.3+ (Supabase is 15+, confirmed)
- `FILTER` clause in `ds_change_count` requires Postgres 9.4+ (confirmed)
- Delivery mechanism (subscriptions, email, SharePoint) deferred to sub-project 3
- RDL must render correctly in Power BI Service paginated report viewer and export to PDF
