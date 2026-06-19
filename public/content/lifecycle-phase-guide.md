# Documentation Through the Development Lifecycle

This chapter organizes the same document types **chronologically** — by when they are created in a product's life. Each phase lists its purpose, the documents born in it, the typical owner, and the "exit artifact": the document that signals the phase is done and the next can begin.

A note before the timeline: three tracks run **in parallel** across every phase rather than belonging to any one of them — **Project Governance** (charters, RACI, status reports, risk registers), **Security & Compliance** (threat models, audit evidence, access reviews), and **Quality** (test strategy through defect reports). They appear at the end of this chapter as parallel tracks.

---

## Phase 0 — Strategy & Discovery

*"Should we build anything at all, and in what direction?"*

The earliest phase. The organization is exploring markets, problems, and opportunities. Documents here are persuasive and directional, not specific.

| Document | Purpose | Typical Owner |
|---|---|---|
| Product Vision / Strategy Doc | The 1–3 year north star: where the product is going and why | Product leadership |
| MRD — Market Requirements Doc | Market opportunity, competitive landscape, customer segments | Product marketing |
| Competitive Analysis / Brief | How competitors position, price, and differentiate | Product / marketing |
| Business Case | Cost, benefit, and risk justification for investment | Sponsor / finance |
| One-Pager / Product Brief | Condensed pitch to win alignment before deeper investment | PM / proposer |
| RFI / RFP / RFQ | Vendor sourcing when buying instead of building | Procurement / IT |

**Exit artifact:** an approved business case or one-pager — permission to spend time defining requirements.

---

## Phase 1 — Requirements & Definition

*"What exactly are we building, for whom, and how will we know it worked?"*

The problem space gets converted into specific, testable intent. This is the most documentation-heavy phase in traditional environments and the most lightweight in agile ones — but the questions answered are the same.

| Document | Purpose | Typical Owner |
|---|---|---|
| BRD — Business Requirements Doc | Business objectives and stakeholder needs (the *why*) | Business analyst / sponsor |
| PRD — Product Requirements Doc | Product goals, scope, user problems, success metrics (the *what*) | Product manager |
| FRD / FRS | System-behavior statements bridging business and technical | Business/systems analyst |
| SRS | Formal functional + non-functional spec (regulated environments) | Systems engineering |
| NFR Document | Performance, security, availability, accessibility targets | Architecture / PM |
| Use Case Document | Actor–system interactions including exception flows | Analyst |
| User Stories / Epics | Agile-format requirements living in the backlog | PM / team |
| Acceptance Criteria | Story-level testable completion conditions | PM + QA |
| Roadmap | Time-phased or Now/Next/Later initiative view | PM |

**Sequence within the phase:** Vision → MRD → BRD → PRD → FRD/stories. Each step trades breadth for specificity.

**Exit artifact:** a signed-off PRD (or groomed epic) — engineering has enough clarity to design against.

---

## Phase 2 — Architecture & Design

*"How will we build it, and what decisions will we regret least?"*

Requirements get converted into technical structure. Two documentation rhythms coexist here: **big up-front design** (HLD/LLD/SAD — one large effort) and **continuous decision capture** (RFCs and ADRs — small documents written whenever a significant decision arises, including long after this phase ends).

| Document | Purpose | Typical Owner |
|---|---|---|
| RFC — Request for Comments | A proposal circulated for feedback *before* committing | Proposing engineer |
| Design Doc / TDD | The full solution blueprint: architecture, data, APIs, trade-offs, rollout | Tech lead |
| HLD — High-Level Design | System-level components, services, integrations | Architect |
| LLD — Low-Level Design | Module-level classes, schemas, algorithms | Implementing engineers |
| SAD — System Architecture Doc | Formal multi-view architecture description (4+1, arc42) | Architect |
| ADR — Architecture Decision Record | One decision: context, options, choice, consequences | Decision maker |
| C4 Diagrams | Context → Container → Component → Code zoom levels | Architect / lead |
| ERD | Database entities and relationships | Data engineer / DBA |
| DFD — Data Flow Diagram | How data moves through the system (also feeds threat modeling) | Engineer / security |
| Sequence Diagrams | Message flow over time — API chains, auth handshakes | Engineer |
| API Specification (OpenAPI etc.) | Machine-readable interface contract | API owner |
| ICD — Interface Control Doc | Formal contract between two systems (defense/aerospace/integrations) | Integration lead |
| Data Dictionary | Field-level definitions, types, lineage | Data team |
| Threat Model | Attack surface analysis (STRIDE) — done during design, not after | Security + engineering |

**Typical flow:** RFC (propose) → Design Doc (commit) → ADRs (record each pivotal decision) → diagrams and specs (communicate the result).

**Exit artifact:** an approved design doc plus the API contract — implementation can begin without redesign churn.

---

## Phase 3 — Implementation

*"Build it — and leave a trail the next person can follow."*

Documentation during build is mostly **embedded in the repository** and written by the people writing the code. The discipline here is keeping docs adjacent to code so they evolve together.

| Document | Purpose | Typical Owner |
|---|---|---|
| README | What the project is, how to install/run/test | Repo maintainers |
| CONTRIBUTING Guide | Branching, PR process, review expectations | Team lead |
| Coding Standards / Style Guide | Conventions, patterns, anti-patterns (linter-enforced where possible) | Team / org |
| Inline Docs / Docstrings | Function-level intent, parameters, gotchas | Every engineer |
| CHANGELOG | Notable changes per version (Keep a Changelog convention) | Maintainers |
| API Reference Docs | Generated developer docs from specs/docstrings | API owner |
| ADRs (continued) | Decisions keep happening during build — keep recording them | Whoever decides |
| Developer Onboarding Doc | Environment setup, architecture orientation, tribal knowledge | Team |

**Exit artifact:** feature-complete code with a current README, passing the team's Definition of Done.

---

## Phase 4 — Testing & Validation

*"Prove it works — and in regulated shops, prove that you proved it."*

Quality documentation actually *starts* back in Phase 1 (test strategy should be drafted alongside the PRD), but the bulk of artifacts are produced here.

| Document | Purpose | Typical Owner |
|---|---|---|
| Test Strategy | Org/product-wide testing philosophy, levels, automation approach | QA lead |
| Test Plan | This project's scope, schedule, entry/exit criteria | QA lead |
| Test Cases / Scripts | Repeatable specs: steps, preconditions, expected results | QA engineers |
| RTM — Requirements Traceability Matrix | Requirements → design → tests coverage proof | QA / compliance |
| UAT Plan | How business users validate before go-live; sign-off criteria | PM + business |
| Bug / Defect Reports | Reproduction steps, severity, environment | Anyone; triaged by QA |
| Validation Docs (IQ/OQ/PQ) | Formal qualification evidence (FDA / regulated) | Validation engineer |

**Exit artifact:** UAT sign-off and a passing RTM (where required) — the release gate opens.

---

## Phase 5 — Release & Deployment

*"Ship it safely, tell people what changed, leave a way back."*

| Document | Purpose | Typical Owner |
|---|---|---|
| Release Plan / Checklist | Pre-flight verification: approvals, migrations, flags, rollback triggers | Release manager / lead |
| CR — Change Request | Formal change record with impact analysis and rollback plan (CAB review) | Change owner |
| Release Notes | Curated user-facing summary: features, fixes, breaking changes | PM / docs |
| Migration Guide | How users move between major versions | Engineering |
| Deployment Runbook | Exact steps to deploy, verify, and roll back | DevOps / SRE |
| Rollback Plan | Pre-written reversal procedure (often a runbook section) | DevOps / SRE |
| Comms Plan / Launch Announcement | Internal and customer-facing notifications | PM / marketing |

**Exit artifact:** the change record closed as successful, release notes published.

---

## Phase 6 — Operations

*"Keep it running. Make 3 AM survivable."*

Operational documentation is unusual in that it's written *before* it's needed and judged entirely by how it performs under stress. The test of a runbook is whether someone unfamiliar with the system can execute it during an outage.

| Document | Purpose | Typical Owner |
|---|---|---|
| Runbook | Exact recipe for one operational procedure | Service owner |
| Playbook | Decision guide for a *class* of situations with diagnosis branches | SRE / ops |
| SOP | Formal, compliance-grade procedure documentation | Ops / compliance |
| On-Call Guide | Rotation expectations, escalation paths, severity definitions | SRE lead |
| Monitoring & Alerting Docs | What each alert means and what to do about it | Service owner |
| SLA / SLO / SLI Docs | Contract / target / measurement definitions for reliability | SRE + business |
| Incident Report | Live record during an event: timeline, impact, actions | Incident commander |
| Postmortem / RCA | Blameless retro: causes and prevention actions | Incident owner |
| DR Plan | System restoration: RTO/RPO, failover, backups | Infrastructure |
| BCP | Business-level continuity during major disruption | Business + IT leadership |
| Capacity Plan | Resource forecasting against growth | Infrastructure / finance |
| KB Articles | Searchable troubleshooting and how-to content | Support / docs |

**The incident loop:** Alert fires → On-Call Guide routes it → Playbook diagnoses → Runbook executes the fix → Incident Report records it → Postmortem prevents recurrence → new/updated runbooks. Each incident should leave the documentation better than it found it.

---

## Phase 7 — Maintenance, Evolution & Sunset

*"Products age. Document the aging."*

| Document | Purpose | Typical Owner |
|---|---|---|
| Deprecation Notice | Formal warning that a feature/API/version is going away, with timeline | Product / engineering |
| EOL — End-of-Life Announcement | Final support dates and migration paths | Product |
| Tech Debt Register | Known shortcuts, their cost, and remediation priority | Engineering lead |
| Refactoring / Modernization Proposal | RFC-style case for paying down debt or replatforming | Engineering |
| Data Retention & Archival Docs | What's kept, for how long, where, and why (compliance-driven) | Data governance |
| Decommissioning Runbook | Safe teardown: data export, access revocation, DNS, billing | Ops |
| Lessons-Learned / Project Closure Report | Final retrospective archived for future teams | PM |

**Exit artifact:** a closure report and a clean decommission — nothing orphaned, nothing still billing.

---

## Parallel Track A — Project Governance (spans all phases)

| Document | Created | Cadence |
|---|---|---|
| Project Charter | Phase 0–1 | Once, amended on scope change |
| SOW | Phase 0–1 (vendor work) | Per engagement |
| WBS | Phase 1–2 | Updated as scope decomposes |
| RACI Matrix | Phase 1 | Revisited each phase |
| Risk Register | Phase 1 | Living — reviewed weekly/monthly |
| Status Reports | All phases | Weekly or biweekly |
| Meeting Minutes / Decision Log | All phases | Every significant meeting |
| Retrospectives | End of each sprint/phase | Recurring |

## Parallel Track B — Security & Compliance (spans all phases)

| Document | Created | Notes |
|---|---|---|
| Security Policy | Org-level, precedes projects | Reviewed annually |
| Threat Model | Phase 2 (design) | Updated when architecture changes |
| DPIA / Privacy Review | Phase 1–2, before processing personal data | GDPR/HIPAA-style gates |
| Access Control / RLS Docs | Phase 2–3, then living | Reviewed each access-review cycle |
| Vendor Risk Assessment | Before any vendor engagement | Re-assessed on renewal |
| Compliance Matrix / Control Mapping | Continuous | Audit-cycle driven |
| Audit Trail / Evidence | Continuous accumulation | Never deleted within retention window |

## Parallel Track C — Quality (starts Phase 1, peaks Phase 4)

Test Strategy is drafted alongside the PRD; acceptance criteria are written with stories; test plans/cases peak during Phase 4; defect reports and regression documentation continue for the life of the product.

---

## The Lifecycle at a Glance

```
Phase 0     Phase 1      Phase 2       Phase 3      Phase 4     Phase 5      Phase 6        Phase 7
STRATEGY -> REQUIRE-  -> DESIGN     -> BUILD     -> TEST     -> RELEASE   -> OPERATE     -> EVOLVE/
            MENTS                                                                          SUNSET
─────────────────────────────────────────────────────────────────────────────────────────────────
Vision      BRD          RFC           README       Test Plan   Release      Runbooks       Deprecation
MRD         PRD          Design Doc    CONTRIBUTING Test Cases  Notes        Playbooks      Notices
Bus. Case   FRD/SRS      HLD / LLD     Style Guide  RTM         Change Req   On-Call Guide  EOL Docs
One-Pager   User Stories ADRs ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━▶ UAT Plan     Migration Gd   Incident/RCA   Tech Debt Reg
RFP/RFI     Acceptance   API Spec      CHANGELOG    Defect      Deploy       SLO/SLA Docs   Decommission
            Criteria     ERD/DFD/C4    Docstrings   Reports     Runbook      DR Plan / BCP  Runbook
            Roadmap      Threat Model  Onboarding               Rollback     KB Articles    Closure Report
─────────────────────────────────────────────────────────────────────────────────────────────────
  ║ Governance track:  Charter ── RACI ── Risk Register ── Status Reports ── Retros ── Closure  ║
  ║ Compliance track:  Policy ── DPIA ── Access Docs ── Audit Evidence (continuous)             ║
  ║ Quality track:     Test Strategy ──────────────▶ peaks at Phase 4 ──▶ regression forever    ║
```

Note the ADR arrow: decision records don't belong to one phase — they're written whenever a consequential decision is made, from design through operations.
