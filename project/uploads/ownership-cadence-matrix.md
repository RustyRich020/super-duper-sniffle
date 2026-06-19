# Ownership, Audience & Cadence Matrix

A quick-scan operational view: for each major document type, who owns it, who reads it, when it's created, how often it should be updated, and where it typically lives. Use this to assign owners and audit documentation health.

**Update cadence legend:**
- **Once** — written once, amended only on major change
- **Living** — continuously updated; staleness is a defect
- **Per-event** — created each time the triggering event occurs
- **Periodic** — scheduled refresh (review cycle noted)

| Document | Owner | Primary Audience | Created When | Cadence | Typical Home |
|---|---|---|---|---|---|
| Product Vision | Product leadership | Whole org | Annually / at inflection | Periodic (annual) | Wiki / strategy deck |
| MRD | Product marketing | Product, exec | New market / product | Once | Wiki |
| Business Case | Sponsor | Exec, finance | Before investment | Once | Doc repo |
| One-Pager | Proposer | Decision makers | Per proposal | Per-event | Wiki / docs |
| BRD | Business analyst | Product, engineering | Project start | Once | Doc repo |
| PRD | Product manager | Eng, design, QA | Per feature/initiative | Living until shipped | Wiki / PM tool |
| User Stories | PM + team | Dev team | Continuous | Living | Jira / ADO / Linear |
| Roadmap | PM | Stakeholders | Quarterly planning | Periodic (quarterly) | PM tool / wiki |
| RFC | Proposing engineer | Eng team | Before significant change | Per-event, then frozen | Repo / wiki |
| Design Doc / TDD | Tech lead | Engineers, architects | Before build | Frozen post-approval; superseded, not edited | Repo / wiki |
| HLD / LLD | Architect / engineers | Eng team | Design phase | Once, amended | Repo / wiki |
| ADR | Decision maker | Future engineers | Per decision | Per-event; immutable (superseded by new ADRs) | Repo (`/docs/adr`) |
| API Spec | API owner | Integrators | With API design | Living, versioned | Repo (OpenAPI file) |
| ERD / Data Dictionary | Data team | Analysts, engineers | Schema design | Living | Catalog tool / repo |
| Threat Model | Security + eng | Security, architects | Design phase | Periodic (on arch change) | Security repo |
| README | Repo maintainers | Anyone touching repo | Repo creation | Living | Repo root |
| CONTRIBUTING | Team lead | Contributors | Repo creation | Living | Repo root |
| Style Guide | Team / org | All engineers | Team formation | Periodic | Repo / wiki |
| CHANGELOG | Maintainers | Developers, users | Per release | Per-event (release) | Repo root |
| Release Notes | PM / docs | Users / customers | Per release | Per-event | Docs site |
| Migration Guide | Engineering | Upgrading users | Major versions | Per-event | Docs site |
| Onboarding Doc | Team | New hires | Team formation | Living (test with each new hire) | Wiki |
| Test Strategy | QA lead | QA, eng leadership | Product start | Periodic (annual) | Wiki |
| Test Plan | QA lead | QA, PM | Per project | Once per project | QA tool / wiki |
| Test Cases | QA engineers | QA | Per feature | Living | Test mgmt tool |
| RTM | QA / compliance | Auditors, QA | Regulated projects | Living during project | Spreadsheet / ALM tool |
| Bug Reports | Anyone | Dev team | Per defect | Per-event | Tracker |
| Release Checklist | Release manager | Deploy team | Per release | Per-event (template reused) | Wiki / pipeline |
| Change Request | Change owner | CAB, ops | Per production change | Per-event | ITSM tool |
| Deployment Runbook | DevOps / SRE | On-call, deployers | Service launch | Living — **test it regularly** | Wiki / repo |
| Runbooks (general) | Service owner | On-call | Per procedure | Living — stale runbooks are dangerous | Wiki / repo |
| Playbook | SRE / ops | On-call | Per scenario class | Living | Wiki |
| SOP | Ops / compliance | Operators, auditors | Per regulated process | Periodic (review cycle, often annual) | Controlled doc system |
| On-Call Guide | SRE lead | Rotation members | Rotation setup | Living | Wiki |
| SLO/SLA/SLI Docs | SRE + business | Eng, customers | Service launch | Periodic (quarterly review) | Wiki / contract |
| Incident Report | Incident commander | Responders, stakeholders | During incident | Per-event | Incident tool |
| Postmortem / RCA | Incident owner | Whole eng org | Within ~5 days of incident | Per-event; action items tracked | Wiki / incident tool |
| DR Plan | Infrastructure | Ops, leadership, auditors | Service criticality assessment | Periodic — **exercised** at least annually | Controlled docs |
| BCP | Business + IT | Leadership, auditors | Org-level | Periodic (annual) | Controlled docs |
| Capacity Plan | Infrastructure | Finance, leadership | Planning cycles | Periodic (quarterly/annual) | Wiki / finance |
| KB Articles | Support / docs | Users, helpdesk | Per resolved pattern | Living | KB platform |
| Project Charter | Sponsor / PM | Stakeholders | Project start | Once | PM repo |
| RACI | PM | Whole team | Project start | Per-phase review | Wiki |
| Risk Register | PM | Stakeholders | Project start | Living (weekly/monthly review) | PM tool |
| Status Report | PM / lead | Leadership | Recurring | Periodic (weekly/biweekly) | Email / wiki |
| Decision Log | PM / scribe | Whole team | Continuous | Living | Wiki |
| Retro Notes | Facilitator | Team | Per sprint/phase | Per-event | Wiki |
| Security Policy | Security / CISO | Whole org | Org-level | Periodic (annual) | Controlled docs |
| DPIA / Privacy Review | Privacy officer | Legal, security | Before new data processing | Per-event | Controlled docs |
| Access Control / RLS Docs | IT / data governance | Auditors, admins | System design | Living + periodic access reviews | Controlled docs |
| Audit Evidence | Compliance | Auditors | Continuous | Living accumulation | GRC tool |
| Vendor Risk Assessment | Security / procurement | Leadership | Per vendor | Per-event + renewal review | GRC tool |
| Deprecation / EOL Notices | Product | Users, integrators | Sunset decision | Per-event | Docs site |
| Tech Debt Register | Eng lead | Eng, PM | Continuous | Living (planning-cycle review) | Tracker / wiki |
| Decommission Runbook | Ops | Ops | Per teardown | Per-event | Wiki |
| Closure Report | PM | Future teams, PMO | Project end | Once | PM repo |

---

## Documentation Health Heuristics

A few rules of thumb for auditing whether the documentation estate is healthy:

**The staleness test.** For every *Living* document, check the last-modified date against the last meaningful change to the thing it describes. A runbook untouched since before the last architecture change is a liability wearing the costume of an asset.

**The stranger test.** Hand a runbook to someone outside the team and watch them execute it. Every place they hesitate is a missing step. This is the single highest-value documentation exercise an ops team can run.

**The bus-factor test.** For each critical system, ask: if the owner vanished tomorrow, which documents would the successor need, and do they exist? ADRs and onboarding docs are usually the gaps.

**The duplication smell.** If the same information lives in three places, two of them are wrong (or will be within a quarter). Pick a single source of truth and link to it.

**The audit dry-run.** In compliance environments, periodically pull the evidence an auditor would request — access reviews, change records, SOP sign-offs — *before* the audit. Evidence that can't be produced in an hour effectively doesn't exist.

**Frozen vs. living confusion.** ADRs, RFCs, and postmortems are *records* — they should never be edited to reflect new reality; write a new one that supersedes the old. READMEs, runbooks, and API specs are *living* — editing them is the job. Teams that mix these up either rewrite history or ship stale operational docs.
