# Development Documentation Reference Book

**A complete field guide to software development documentation** — every major document type, organized multiple ways, with lifecycle models, prescriptive stacks for different org types, ready-to-use templates, and the best practices that keep it all from rotting.

---

## What's Inside

| Chapter | Contents | Use It When |
|---|---|---|
| **1. Introduction** | How the book is organized, core concepts | Orienting |
| **2. Glossary by Domain** | ~70 document types grouped by discipline + disambiguation cheat sheet | You need to look up *what a document is* |
| **3. Lifecycle-Phase Guide** | The documents arranged chronologically across 8 phases + 3 parallel tracks, with exit artifacts | You need to know *when a document gets created* |
| **4. Ownership & Cadence Matrix** | One table: owner, audience, trigger, update cadence, home — plus health heuristics | You're assigning owners or auditing doc health |
| **5. Starter Templates** | Copy-paste skeletons for the 8 highest-value docs | You need to write one *right now* |
| **6. Lifecycle Models** | How documentation bends across Waterfall, Scrum, Kanban, SSDLC, Data/ML, the incident loop, and open source | You're choosing or working within a delivery model |
| **7. Stack Recipes** | Prescriptive doc stacks for startup, scaling, enterprise, regulated, OSS, and data teams | You're deciding *what your team should actually adopt* |
| **8. Best Practices & Anti-Patterns** | Writing, maintenance, review practices + a named anti-pattern catalog | You want docs that earn their keep and don't rot |

## Table of Contents

- [Introduction](#development-documentation-reference-book)
  - [What's Inside](#whats-inside)
  - [Three Concepts That Organize Everything](#three-concepts-that-organize-everything)
  - [The Universal Minimum](#the-universal-minimum)
- [CHAPTER 2 — GLOSSARY BY DOMAIN](#chapter-2--glossary-by-domain)
  - [1. Product & Requirements Documents](#1-product--requirements-documents)
  - [2. Architecture & Design Documents](#2-architecture--design-documents)
  - [3. Engineering & Code Documentation](#3-engineering--code-documentation)
  - [4. Operations, SRE & Support Documents](#4-operations-sre--support-documents)
  - [5. Project & Process Documents](#5-project--process-documents)
  - [6. Quality & Testing Documents](#6-quality--testing-documents)
  - [7. Security, Compliance & Governance Documents](#7-security-compliance--governance-documents)
  - [8. End-User & Training Documents](#8-end-user--training-documents)
  - [Quick Disambiguation Cheat Sheet](#quick-disambiguation-cheat-sheet)
- [CHAPTER 3 — LIFECYCLE-PHASE GUIDE](#chapter-3--lifecycle-phase-guide)
  - [Phase 0 — Strategy & Discovery](#phase-0--strategy--discovery)
  - [Phase 1 — Requirements & Definition](#phase-1--requirements--definition)
  - [Phase 2 — Architecture & Design](#phase-2--architecture--design)
  - [Phase 3 — Implementation](#phase-3--implementation)
  - [Phase 4 — Testing & Validation](#phase-4--testing--validation)
  - [Phase 5 — Release & Deployment](#phase-5--release--deployment)
  - [Phase 6 — Operations](#phase-6--operations)
  - [Phase 7 — Maintenance, Evolution & Sunset](#phase-7--maintenance-evolution--sunset)
  - [Parallel Track A — Project Governance (spans all phases)](#parallel-track-a--project-governance-spans-all-phases)
  - [Parallel Track B — Security & Compliance (spans all phases)](#parallel-track-b--security--compliance-spans-all-phases)
  - [Parallel Track C — Quality (starts Phase 1, peaks Phase 4)](#parallel-track-c--quality-starts-phase-1-peaks-phase-4)
  - [The Lifecycle at a Glance](#the-lifecycle-at-a-glance)
- [CHAPTER 4 — OWNERSHIP & CADENCE MATRIX](#chapter-4--ownership--cadence-matrix)
  - [Documentation Health Heuristics](#documentation-health-heuristics)
- [CHAPTER 5 — STARTER TEMPLATES](#chapter-5--starter-templates)
  - [Template 1 — PRD (Product Requirements Document)](#template-1--prd-product-requirements-document)
  - [Template 2 — ADR (Architecture Decision Record)](#template-2--adr-architecture-decision-record)
  - [Template 3 — Design Doc / TDD](#template-3--design-doc--tdd)
  - [Template 4 — Runbook](#template-4--runbook)
  - [Template 5 — Postmortem / RCA](#template-5--postmortem--rca)
  - [Template 6 — RFC](#template-6--rfc)
  - [Template 7 — Release Notes](#template-7--release-notes)
  - [Template 8 — Project Charter (one-page form)](#template-8--project-charter-one-page-form)
  - [Adoption Advice](#adoption-advice)
- [CHAPTER 6 — LIFECYCLE MODELS](#chapter-6--lifecycle-models)
  - [1. Waterfall](#1-waterfall)
  - [2. Agile / Scrum](#2-agile--scrum)
  - [3. Kanban / Continuous Flow](#3-kanban--continuous-flow)
  - [4. The Security-Integrated Lifecycle (SSDLC / Shift-Left)](#4-the-security-integrated-lifecycle-ssdlc--shift-left)
  - [5. The Data / ML Lifecycle](#5-the-data--ml-lifecycle)
  - [6. The Incident Management Loop (Operational Lifecycle)](#6-the-incident-management-loop-operational-lifecycle)
  - [7. The Open-Source Contribution Lifecycle](#7-the-open-source-contribution-lifecycle)
  - [8. DevOps / Continuous Delivery](#8-devops--continuous-delivery)
  - [9. Scaled Agile (SAFe, LeSS, and friends)](#9-scaled-agile-safe-less-and-friends)
  - [10. Hybrid Models (Water-Scrum-Fall and Reality)](#10-hybrid-models-water-scrum-fall-and-reality)
  - [Cross-Model Comparison](#cross-model-comparison)
  - [Which Model Are You — and How Should You Document?](#which-model-are-you--and-how-should-you-document)
- [CHAPTER 7 — STACK RECIPES](#chapter-7--stack-recipes)
  - [Recipe 1 — Early-Stage Startup (up to ~15 engineers)](#recipe-1--early-stage-startup-up-to-15-engineers)
  - [Recipe 2 — Scaling Company (~15–150 engineers, multiple teams)](#recipe-2--scaling-company-15150-engineers-multiple-teams)
  - [Recipe 3 — Enterprise / Large Organization (150+ engineers)](#recipe-3--enterprise--large-organization-150-engineers)
  - [Recipe 4 — Regulated Environment (Healthcare, Finance, Defense, etc.)](#recipe-4--regulated-environment-healthcare-finance-defense-etc)
  - [Recipe 5 — Open-Source Project](#recipe-5--open-source-project)
  - [Recipe 6 — Data / Analytics / ML Team](#recipe-6--data--analytics--ml-team)
  - [Picking and Mixing](#picking-and-mixing)
- [CHAPTER 8 — BEST PRACTICES & ANTI-PATTERNS](#chapter-8--best-practices--anti-patterns)
  - [Part 1 — Foundational Principles](#part-1--foundational-principles)
  - [Part 2 — Writing Practices](#part-2--writing-practices)
  - [Part 3 — The Diátaxis Lens (Four Modes of Documentation)](#part-3--the-diátaxis-lens-four-modes-of-documentation)
  - [Part 4 — Maintenance & Fighting Doc Rot](#part-4--maintenance--fighting-doc-rot)
  - [Part 5 — Review & Quality](#part-5--review--quality)
  - [Part 6 — The Anti-Pattern Catalog](#part-6--the-anti-pattern-catalog)
  - [Part 7 — Measuring Documentation Health](#part-7--measuring-documentation-health)
  - [Part 8 — Tooling & Automation](#part-8--tooling--automation)
  - [Part 9 — A Pragmatic Adoption Sequence](#part-9--a-pragmatic-adoption-sequence)
  - [The One-Sentence Version](#the-one-sentence-version)
- [Appendix A — Glossary of Terms](#appendix-a--glossary-of-terms)
- [Appendix B — Index](#appendix-b--index)

---

## Three Concepts That Organize Everything

**1. Documents answer different questions.** Every type exists to answer one dominant question — *why* (business case, BRD), *what* (PRD, stories), *how* (design doc, LLD), *how do I operate it* (runbook), *what happened* (incident report, postmortem), *who decided and why* (ADR, decision log). When two documents seem redundant, check whether they answer different questions — usually they do.

**2. Frozen records vs. living documents.** Some documents are *records* of a moment — ADRs, RFCs, postmortems, change requests, audit trails. They are never edited after the fact; new reality gets a new record that supersedes the old. Others are *living* — READMEs, runbooks, API specs, risk registers — where staleness is a defect and editing is the job. Most documentation dysfunction traces to confusing these two modes. In regulated environments this distinction becomes legally load-bearing.

**3. Heaviness should match risk and rhythm.** A two-person startup needs READMEs, a few ADRs, and runbooks. A regulated platform additionally needs SOPs, audit evidence, validation records, and traceability — because regulators ask for them by name. And a fast-iterating product documents differently than a fixed-scope waterfall build. The formats here range from one paragraph (ADR) to hundreds of pages (SRS); adopt the lightest format that manages the actual risk at the actual pace of the work.

## The Universal Minimum

Under every recipe, model, and methodology, three things are non-negotiable:

```
README          (what is this and how do I run it)
ADRs            (a record of why we decided what we decided)
Runbooks        (how to operate it when it matters)
```

Everything else in this book is added in response to a specific, felt problem — never adopted because a framework said so. The goal is never "complete documentation." The goal is documentation a reader trusts, finds, and acts on correctly. Every doc that doesn't meet that bar is overhead wearing the costume of diligence.

---

*Generated June 2026. Eight chapters follow.*

---

# CHAPTER 2 — GLOSSARY BY DOMAIN

# Development Documentation Glossary

A reference guide to the major document types used across the software development lifecycle — from product ideation through engineering, operations, and governance. Organized by domain, with what each document is, when it's used, and who typically owns it.

---

## 1. Product & Requirements Documents

**PRD — Product Requirements Document**
Defines *what* a product or feature should do: goals, user problems, scope, success metrics, and acceptance criteria. The source of truth for product intent. Owned by Product Management.

**BRD — Business Requirements Document**
Captures *why* the business needs something: business objectives, stakeholder needs, and expected outcomes — at a higher level than a PRD. Common in enterprise and waterfall environments. Owned by business analysts or sponsors.

**MRD — Market Requirements Document**
Describes the market opportunity, target customers, competitive landscape, and market-driven needs. Precedes the PRD in classic product workflows. Owned by Product Marketing/Management.

**FRD / FRS — Functional Requirements Document/Specification**
Translates business requirements into specific system behaviors: "the system shall..." statements. Bridges the BRD and technical design. Owned by business/systems analysts.

**SRS — Software Requirements Specification**
A formal, often IEEE-830-style document covering functional and non-functional requirements (performance, security, reliability). Common in regulated industries (healthcare, defense, finance). Owned by systems engineering.

**NFR Document — Non-Functional Requirements**
Specifies quality attributes: latency targets, availability, scalability, accessibility, compliance constraints. Sometimes a section of the SRS/PRD, sometimes standalone.

**User Stories / Epics**
Agile-format requirements: "As a [user], I want [capability] so that [benefit]." Epics group related stories. Live in backlog tools (Jira, Azure DevOps, Linear) rather than standalone docs.

**Acceptance Criteria / Definition of Done (DoD)**
The testable conditions that mark a story or release as complete. DoD is the team-wide quality bar (tests pass, docs updated, peer reviewed); acceptance criteria are story-specific.

**Use Case Document**
Describes actor-system interactions step by step, including alternate and exception flows. More formal than user stories; common in UML-heavy shops.

**Product Vision / Strategy Doc**
The long-horizon "north star": where the product is going over 1–3 years and why. Owned by product leadership.

**Roadmap**
Time-phased (or Now/Next/Later) view of planned initiatives. A living artifact, not a contract.

**One-Pager / Product Brief**
A condensed pitch for a feature or initiative — problem, proposal, impact, ask — used to get alignment before investing in a full PRD.

**RFP / RFI / RFQ — Request for Proposal / Information / Quote**
Procurement documents used when sourcing vendors or solutions. RFI gathers information, RFP solicits solution proposals, RFQ solicits pricing.

---

## 2. Architecture & Design Documents

**ADR — Architecture Decision Record**
A short, numbered record of a single architectural decision: context, options considered, decision, and consequences. Kept in the repo so the "why" survives team turnover. (Sometimes written "ARD.")

**RFC — Request for Comments**
A proposal document circulated for team feedback before a significant design or process change. Engineering-driven, comment-and-iterate culture (popularized by Google, Stripe, Oxide, etc.).

**Design Doc / TDD — Technical Design Document**
Explains *how* a system or feature will be built: architecture, data models, APIs, trade-offs, alternatives, rollout plan. The engineering counterpart to a PRD.

**HLD — High-Level Design**
System-level view: components, services, integrations, data flow between major pieces. Audience: architects, leads, stakeholders.

**LLD — Low-Level Design**
Component/module-level detail: class structures, algorithms, database schemas, function signatures. Audience: implementing engineers.

**SAD — Software/System Architecture Document**
A comprehensive, formal architecture description, often using views (logical, deployment, process) per standards like the 4+1 model or arc42 template.

**C4 Model Diagrams**
A diagramming convention with four zoom levels — Context, Container, Component, Code — for communicating architecture consistently.

**ERD — Entity-Relationship Diagram**
Visual model of database entities, attributes, and relationships. Foundational for schema design and data modeling.

**DFD — Data Flow Diagram**
Shows how data moves through a system: sources, processes, stores, sinks. Also used in threat modeling.

**Sequence / Interaction Diagrams**
UML diagrams showing message flow between components over time — useful for documenting API call chains and auth flows.

**API Specification (OpenAPI/Swagger, GraphQL schema, protobuf/IDL)**
Machine-readable contract defining endpoints, payloads, types, and errors. Drives codegen, mocking, and API reference docs.

**ICD — Interface Control Document**
Formal specification of the interface between two systems (data formats, protocols, timing). Common in aerospace, defense, and large integrations.

**Threat Model**
Structured analysis of a system's attack surface (e.g., STRIDE methodology): assets, threats, mitigations. Owned jointly by engineering and security.

**Data Dictionary**
Authoritative definitions of every field/column: meaning, type, source, valid values, lineage. Critical in BI/analytics environments.

---

## 3. Engineering & Code Documentation

**README**
The front door of a repository: what the project is, how to install, run, and contribute. The minimum viable documentation.

**CONTRIBUTING Guide**
How to participate in a codebase: branching strategy, PR process, coding standards, review expectations.

**CHANGELOG**
Chronological record of notable changes per release, often following the Keep a Changelog convention with semantic versioning.

**Coding Standards / Style Guide**
Team conventions for naming, formatting, patterns, and anti-patterns across languages. Enforced by linters where possible.

**API Reference Documentation**
Developer-facing docs for every endpoint/method: parameters, responses, errors, examples. Often generated from API specs or docstrings.

**Inline Documentation / Docstrings**
Comments embedded in code (JSDoc, Python docstrings, XML doc comments) explaining intent, parameters, and gotchas at the function level.

**SDK / Integration Guide**
Step-by-step instructions for integrating with a platform or library — quickstarts, auth setup, code samples.

**Release Notes**
User- or customer-facing summary of what changed in a release: new features, fixes, breaking changes, upgrade steps.

**Migration Guide**
Instructions for moving between major versions or platforms: breaking changes, deprecated features, and how to adapt.

**Onboarding / Developer Setup Doc**
Everything a new engineer needs to become productive: environment setup, architecture orientation, tribal knowledge, who-to-ask.

---

## 4. Operations, SRE & Support Documents

**Runbook**
Step-by-step instructions for executing a specific operational procedure (restart a service, rotate credentials, run a failover). Written so someone unfamiliar with the system can execute it correctly at 3 AM.

**Playbook**
Broader than a runbook: decision-oriented guidance for handling a *class* of situations (e.g., "database performance degradation"), including diagnosis branches. Runbooks are recipes; playbooks are strategies.

**SOP — Standard Operating Procedure**
Formalized, often compliance-driven procedure documentation for recurring business or technical processes. Heavier governance than a runbook; common in regulated environments (relevant in HIPAA shops).

**Incident Report**
Real-time or near-time record of an incident: timeline, impact, actions taken, current status.

**Postmortem / RCA — Root Cause Analysis**
Blameless retrospective after an incident: what happened, why (root and contributing causes, e.g., 5 Whys), and action items to prevent recurrence.

**On-Call Guide**
Expectations and procedures for on-call rotation: escalation paths, severity definitions, tooling, handoff process.

**DR Plan — Disaster Recovery Plan**
How to restore systems after catastrophic failure: RTO/RPO targets, backup procedures, failover steps, contact trees.

**BCP — Business Continuity Plan**
The business-level counterpart to DR: how the organization keeps operating during major disruption.

**SLA / SLO / SLI Documentation**
SLA = the contractual promise (99.9% uptime), SLO = the internal objective, SLI = the measured indicator. Documented so everyone agrees on what "reliable" means and how it's measured.

**Capacity Plan**
Forecast of resource needs (compute, storage, licenses, headcount) against expected growth.

**Maintenance / Change Calendar Documentation**
Scheduled maintenance windows, freeze periods, and change procedures.

**Knowledge Base (KB) Articles**
Searchable support content: how-tos, troubleshooting guides, known issues. Audience can be internal (helpdesk) or external (customers).

---

## 5. Project & Process Documents

**Project Charter**
Authorizes a project: objectives, scope, stakeholders, budget, success criteria. The "birth certificate" of a project.

**SOW — Statement of Work**
Contractual definition of deliverables, timeline, and acceptance criteria — standard for vendor/consulting engagements.

**WBS — Work Breakdown Structure**
Hierarchical decomposition of project scope into deliverables and work packages.

**RACI Matrix**
Maps who is **R**esponsible, **A**ccountable, **C**onsulted, and **I**nformed for each task or decision. Kills "I thought you owned that."

**Risk Register**
Living log of identified risks: likelihood, impact, mitigation, owner.

**CR / Change Request Document**
Formal proposal to modify scope, schedule, or a production system — with impact analysis and rollback plan. Central to ITIL-style change management (CAB review).

**Status Report**
Periodic project health summary: progress, RAG status, risks, decisions needed.

**Retrospective Notes**
Team reflection after a sprint or project: what went well, what didn't, what to change.

**Meeting Minutes / Decision Log**
Record of discussions, decisions made, and action items with owners. The decision log is the searchable history of "why did we decide that?"

---

## 6. Quality & Testing Documents

**Test Strategy**
High-level approach to quality for a product or org: test levels, environments, automation philosophy, tooling.

**Test Plan**
Project-specific testing scope: what will be tested, by whom, when, entry/exit criteria, and risk areas.

**Test Cases / Test Scripts**
Individual, repeatable test specifications: preconditions, steps, expected results.

**RTM — Requirements Traceability Matrix**
Maps requirements → design → test cases to prove every requirement is covered. Required in regulated/validated environments.

**UAT Plan — User Acceptance Testing**
Defines how business users will validate the system before go-live, including sign-off criteria.

**Bug / Defect Report**
Structured record of a defect: reproduction steps, expected vs. actual behavior, severity, environment.

**Validation Documentation (IQ/OQ/PQ)**
Installation/Operational/Performance Qualification — formal validation evidence required in FDA-regulated and similar environments.

---

## 7. Security, Compliance & Governance Documents

**Security Policy**
Organizational rules for acceptable use, access control, data handling, and incident response.

**Data Governance Documentation**
Defines data ownership, classification, quality standards, retention, and stewardship — including data lineage docs and the data dictionary.

**Access Control / RLS Documentation**
Who can see what and why: role definitions, group mappings, row-level security rules, and the approval process for access changes.

**Audit Trail / Evidence Documentation**
Records maintained to demonstrate compliance during audits (SOC 2, HIPAA, ISO 27001): access reviews, change logs, training records.

**DPIA — Data Protection Impact Assessment**
GDPR-driven assessment of privacy risk for new processing activities. Analogous privacy reviews exist under HIPAA and CCPA.

**Compliance Matrix / Control Mapping**
Maps regulatory requirements to implemented controls and their evidence.

**Vendor / Third-Party Risk Assessment**
Due-diligence documentation evaluating a vendor's security and compliance posture before engagement.

---

## 8. End-User & Training Documents

**User Guide / Manual**
Comprehensive instructions for end users of a product, organized by task or feature.

**Quick Start Guide**
Minimal path from zero to first success — the "get running in 10 minutes" doc.

**FAQ**
Curated answers to common questions, often distilled from support tickets.

**Training Materials**
Slide decks, videos, exercises, and certification content for structured learning.

**Tooltips / In-App Help / UX Copy**
Microcopy embedded in the product itself — increasingly treated as documentation owned jointly by design and docs teams.

---

## Quick Disambiguation Cheat Sheet

| Confusing Pair | The Difference |
|---|---|
| PRD vs. BRD | PRD = what the product does; BRD = why the business needs it |
| Runbook vs. Playbook | Runbook = exact recipe for one procedure; Playbook = decision guide for a class of situations |
| Runbook vs. SOP | Same spirit; SOP is more formal/compliance-oriented |
| ADR vs. RFC vs. Design Doc | RFC = proposal seeking feedback; Design Doc = full solution blueprint; ADR = short record of one decision made |
| HLD vs. LLD | HLD = system/component view; LLD = module/code-level detail |
| SLA vs. SLO vs. SLI | SLA = contract; SLO = internal target; SLI = the metric measured |
| Incident Report vs. Postmortem | Report = what's happening now; Postmortem = why it happened and prevention |
| Test Strategy vs. Test Plan | Strategy = org/product-wide philosophy; Plan = project-specific execution |
| Release Notes vs. Changelog | Release notes = curated, user-facing; Changelog = exhaustive, developer-facing |
| DR Plan vs. BCP | DR = restore the systems; BCP = keep the business running |

---

*Tip: Most healthy engineering orgs don't use all of these. A typical modern stack: README + ADRs + design docs + runbooks + postmortems + a PRD-per-feature covers 90% of needs. The heavier formats (SRS, ICD, IQ/OQ/PQ, RTM) appear mainly in regulated or contract-driven environments.*

---

# CHAPTER 3 — LIFECYCLE-PHASE GUIDE

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

---

# CHAPTER 4 — OWNERSHIP & CADENCE MATRIX

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

---

# CHAPTER 5 — STARTER TEMPLATES

# Starter Templates

Skeleton templates for the eight highest-leverage document types — the ones a typical team actually needs. Copy, fill in, delete what doesn't apply. Each template includes inline guidance in *italics*.

---

## Template 1 — PRD (Product Requirements Document)

```markdown
# PRD: [Feature / Initiative Name]
**Author:** | **Status:** Draft / In Review / Approved | **Last updated:** | **Target release:**

## Problem Statement
*What user or business problem are we solving? Evidence it's real (data, tickets, quotes).*

## Goals & Success Metrics
- Goal 1 — measured by [metric, target, timeframe]
- Goal 2 — ...

## Non-Goals
*Explicitly out of scope. This section prevents 80% of scope creep.*

## Users & Use Cases
*Who uses this and in what scenarios? Primary persona first.*

## Requirements
| # | Requirement | Priority (P0/P1/P2) | Notes |
|---|---|---|---|

## User Experience
*Flows, wireframes or links to designs.*

## Non-Functional Requirements
*Performance, security, accessibility, compliance constraints.*

## Dependencies & Risks
## Open Questions
## Launch & Rollout Plan
*Phasing, feature flags, comms.*
```

---

## Template 2 — ADR (Architecture Decision Record)

```markdown
# ADR-NNN: [Short decision title]
**Date:** | **Status:** Proposed / Accepted / Superseded by ADR-MMM
**Deciders:** | **Consulted:**

## Context
*What situation forces this decision? Constraints, requirements, deadlines.*

## Options Considered
1. **Option A** — pros / cons
2. **Option B** — pros / cons
3. **Do nothing** — *always list it; sometimes it wins*

## Decision
*What we chose, in one or two sentences.*

## Consequences
*What becomes easier, what becomes harder, what we're committing to maintain,
what would trigger revisiting this decision.*
```

*Keep ADRs under one page. Number sequentially. Never edit an accepted ADR — supersede it.*

---

## Template 3 — Design Doc / TDD

```markdown
# Design: [System / Feature Name]
**Author:** | **Reviewers:** | **Status:** | **Related:** PRD link, RFC link

## Summary
*Three sentences: what we're building and the approach.*

## Background & Requirements
*Link the PRD; restate only the requirements that drive design decisions.*

## Proposed Design
### Architecture Overview
*Diagram (C4 container level works well) + narrative.*
### Data Model
### API / Interface Changes
### Key Flows
*Sequence diagrams for the 2–3 most important paths.*

## Alternatives Considered
*The designs you rejected and why. The most-skipped, most-valuable section.*

## Cross-Cutting Concerns
- **Security & privacy:**
- **Performance & scale:**
- **Observability:** *what we'll log, measure, alert on*
- **Failure modes:** *what breaks and what happens when it does*

## Rollout Plan
*Migration, flags, backward compatibility, rollback.*

## Open Questions
```

---

## Template 4 — Runbook

```markdown
# Runbook: [Procedure Name]
**Service:** | **Owner:** | **Last tested:** ← *if this is blank or old, fix that first*
**Estimated duration:** | **Risk level:** Low / Medium / High

## When to Use This
*The exact symptom or trigger. Include alert names if applicable.*

## Prerequisites
- Access required: [roles, systems]
- Tools required:

## Steps
1. **[Verb-first step]**
   ```
   exact command here
   ```
   *Expected output: [what success looks like]. If you see X instead, go to step N / escalate.*
2. ...

## Verification
*How to confirm the procedure worked.*

## Rollback
*How to undo, if applicable.*

## Escalation
*If this doesn't resolve it: who to page, with what severity.*
```

*The test of a runbook: someone who has never touched the system can execute it at 3 AM. Every command copy-pasteable, every step's success state described.*

---

## Template 5 — Postmortem / RCA

```markdown
# Postmortem: [Incident title] — [date]
**Severity:** | **Duration:** | **Author:** | **Status:** Draft / Reviewed

## Summary
*Two or three sentences: what broke, impact, how it was resolved.*

## Impact
*Customers affected, duration, data loss, SLO burn, revenue if quantifiable.*

## Timeline (all times in [TZ])
| Time | Event |
|---|---|
| | First alert / detection |
| | ... |
| | Full resolution |

## Root Cause
*Use 5 Whys or causal chain. Distinguish the root cause from contributing
factors and from the trigger. Blameless: name systems and processes, not people.*

## What Went Well / What Went Poorly
## Where We Got Lucky
*The most honest section — near-misses that would have made this worse.*

## Action Items
| # | Action | Owner | Priority | Due | Ticket |
|---|---|---|---|---|---|
```

---

## Template 6 — RFC

```markdown
# RFC: [Proposal title]
**Author:** | **Status:** Open for comments until [date] | **Discussion:** [link]

## Problem
*What's wrong or missing today. Why now.*

## Proposal
*The change, in enough detail to evaluate but not full design-doc depth.*

## Alternatives
## Impact
*Who is affected, migration burden, cost.*

## Unresolved Questions
*What you explicitly want reviewers to weigh in on.*
```

---

## Template 7 — Release Notes

```markdown
# [Product] vX.Y.Z — [Date]

## Highlights
*The 1–3 things most users will care about, in plain language. Benefit first, feature second.*

## New Features
- **[Feature]** — what it does and where to find it

## Improvements
## Bug Fixes
## Breaking Changes ⚠️
*What breaks, who's affected, and the exact migration step. Never bury these.*

## Deprecations
*What's going away, and when.*

## Upgrade Notes
```

---

## Template 8 — Project Charter (one-page form)

```markdown
# Charter: [Project Name]
**Sponsor:** | **PM/Lead:** | **Start:** | **Target end:** | **Budget:**

## Objective
*One sentence. If it takes three, the project isn't defined yet.*

## Success Criteria
*Measurable conditions that mean "done and worth it."*

## Scope
**In:** | **Out:**

## Key Stakeholders & Roles
*Mini-RACI: who decides, who builds, who's consulted, who's informed.*

## Major Milestones
| Milestone | Target Date |
|---|---|

## Top Risks & Assumptions
```

---

## Adoption Advice

Don't roll out all eight at once. The highest-ROI sequence for a team starting from zero:

1. **READMEs** — free, immediate, zero process required.
2. **ADRs** — tiny effort, compounds forever; start the next time anyone makes a consequential decision.
3. **Runbooks** — write one per recurring operational pain; write the next one during the next incident's cleanup.
4. **Postmortems** — institute after the next significant incident; the template makes blamelessness structural.
5. **PRDs / Design docs** — add when features start shipping with surprises that alignment would have caught.

Everything else can stay informal until its absence causes a specific, repeated problem — then adopt the format that fixes it.

---

# CHAPTER 6 — LIFECYCLE MODELS

# Lifecycle Models & How Documentation Bends to Each

Chapter 3 mapped documents onto a single generic lifecycle. But teams don't all build the same way — and *how* a team works reshapes *what* it documents, *when*, and *how heavily*. This chapter walks through the major delivery and operational models and shows where documentation lives in each, what matters most, and where each model tends to fail at documentation.

The throughline: a document type doesn't change, but its **timing, granularity, and authority** do. A PRD in waterfall is a signed contract written once; the same intent in Scrum is a living backlog refined every sprint. Same purpose, opposite rhythm.

---

## 1. Waterfall

*Sequential phases, each fully completed and signed off before the next begins.*

**Documentation character:** Heavy, front-loaded, contract-like. Documents are *gates* — you cannot pass to the next phase without the prior phase's signed artifact. The BRD → SRS → design spec → test plan chain is the spine of the project.

**What matters most:** Completeness and sign-off. A requirement not captured in the SRS effectively doesn't exist, because change later is expensive and formal (via change requests). Traceability matrices (RTM) prove every requirement reached test.

**Where it fails:** Documents written once go stale the moment reality diverges from plan, but the process discourages revisiting them. Teams end up with pristine specs that no longer describe the running system — "documentation theater." The fix is treating key docs as living even when the process treats them as frozen.

**Best fit:** Fixed-scope, high-assurance, contractually bound work — defense, infrastructure, regulated builds where the cost of a late discovery dwarfs the cost of up-front documentation.

---

## 2. Agile / Scrum

*Iterative delivery in fixed-length sprints, with working software favored over comprehensive documentation.*

**Documentation character:** Lightweight, distributed, continuous. The Agile Manifesto's "working software over comprehensive documentation" is the most misread line in software — it means *prefer* working software when forced to choose, not *abandon* documentation. Mature Scrum teams document constantly, just in smaller units.

**The Scrum artifact set:**
| Artifact | Documentation role |
|---|---|
| Product Backlog | The living requirements doc — replaces the monolithic PRD |
| Sprint Backlog | Scoped commitment for the iteration |
| User Stories + Acceptance Criteria | Atomized requirements with built-in test conditions |
| Definition of Ready (DoR) | Entry bar: a story can't enter a sprint until it's documented enough |
| Definition of Done (DoD) | Exit bar: includes "docs updated" so documentation can't be skipped |
| Sprint Review notes | What shipped, demoed to stakeholders |
| Retrospective notes | Process improvement record |
| Burndown / velocity charts | Progress as data, not prose |

**What matters most:** The Definition of Done. If "documentation updated" is in the DoD, docs stay current by definition; if it isn't, they rot. This single line is the highest-leverage documentation decision a Scrum team makes.

**Where it fails:** "We're agile, we don't write docs" becomes an excuse for tribal knowledge. Architecture and operational docs — which span many sprints — have no natural home in a story-by-story flow and get orphaned. The fix: maintain *durable* docs (ADRs, runbooks, architecture overviews) outside the sprint cadence, and put *transient* docs (stories, acceptance criteria) inside it.

**Best fit:** Product development with evolving requirements and a stable team that can hold context.

---

## 3. Kanban / Continuous Flow

*Continuous pull-based delivery with no fixed iterations; work flows through stages with WIP limits.*

**Documentation character:** Minimal ceremony, maximal signal. Without sprints, there are no sprint docs. Documentation attaches to the work item (card) and to the flow policies.

**What matters most:** Explicit policies — the written rules for each column ("Definition of Ready to move from In Progress to Review"). Kanban makes process documentation visible on the board itself. Cycle-time and flow metrics replace status reports.

**Where it fails:** The lack of ceremony removes the natural checkpoints where documentation gets written. Continuous flow can mean continuous deferral. The fix is policy-level requirements: a card cannot reach "Done" without its documentation criteria met, same as Scrum's DoD.

**Best fit:** Operations, support, and maintenance teams with a steady stream of varied, unpredictable work.

---

## 4. The Security-Integrated Lifecycle (SSDLC / Shift-Left)

*Security activities embedded into every phase rather than bolted on before release.*

**Documentation character:** Security docs interleave with the normal SDLC rather than forming a separate track. "Shift-left" means the threat model is written during design, not discovered during a pre-launch pen test.

**Phase-by-phase security artifacts:**
| SDLC Phase | Security Document |
|---|---|
| Requirements | Security requirements, abuse cases, compliance constraints |
| Design | Threat model (via methods like STRIDE or PASTA), data classification, trust boundaries |
| Implementation | Secure coding standards, dependency/SBOM records |
| Testing | SAST/DAST reports, pen test reports, security test cases |
| Release | Security sign-off, vulnerability disclosure plan |
| Operations | Incident response plan, vulnerability management log, audit trail |

**What matters most:** The threat model and the SBOM (Software Bill of Materials). The threat model is the design-time artifact that prevents whole classes of vulnerabilities; the SBOM is the operational artifact that lets you answer "are we affected?" the next time a dependency CVE drops — a question that becomes urgent overnight, periodically, forever.

**Where it fails:** Security docs written as a one-time pre-launch checklist rather than living artifacts. A threat model that isn't revisited when the architecture changes is describing a system that no longer exists. The fix is tying threat-model review to architecture-change triggers (new data flows, new trust boundaries, new third parties).

**Best fit:** Any system handling sensitive data or exposed to untrusted input — which today is nearly everything.

---

## 5. The Data / ML Lifecycle

*Building systems whose behavior is learned from data rather than fully specified in code.*

**Documentation character:** A distinct genre. Traditional docs assume deterministic, specified behavior. ML systems are probabilistic and data-derived, so they need documentation that traditional SDLCs have no equivalent for: you must document the *data* and the *model* as first-class artifacts, not just the code.

**The ML-specific document set:**
| Document | Purpose |
|---|---|
| **Datasheet for Datasets** | Provenance, collection method, composition, biases, consent, intended use of a dataset |
| **Model Card** | What a model does, training data, performance across subgroups, limitations, ethical considerations |
| **Data Dictionary / Feature Spec** | Definition and lineage of every feature fed to the model |
| **Experiment Log** | Hyperparameters, datasets, metrics per training run — reproducibility record |
| **Evaluation Report** | Metrics, slices, fairness analysis, failure modes |
| **Model Lineage / Versioning Doc** | Which data + code + config produced which deployed model |
| **Monitoring Plan** | Drift detection, retraining triggers, performance degradation alerts |

**What matters most:** Reproducibility and provenance. The question "which exact data and code produced the model now serving traffic?" must be answerable, or you cannot debug, audit, or roll back. Model cards and datasheets also carry the ethical and bias documentation that increasingly carries legal weight.

**Where it fails:** Treating an ML system like ordinary software — documenting the serving code while leaving the data and training process undocumented. When the model misbehaves, there's no trail back to the cause. The fix is treating data and models as versioned, documented artifacts equal in importance to source code.

**Distinct rhythm:** ML systems decay even when nobody touches them, because the world they model shifts (data drift). So the *monitoring* and *retraining* documentation is not a post-launch afterthought — it's the core operational loop, more central than in traditional software.

---

## 6. The Incident Management Loop (Operational Lifecycle)

*The cyclical process that runs whenever production breaks — distinct from the linear build lifecycle.*

This isn't a build methodology; it's the loop operations teams live inside. Its documentation is judged entirely under stress.

```
        ┌─────────────────────────────────────────────┐
        │                                               │
        ▼                                               │
   [Alert fires] ──▶ [On-Call Guide routes it]          │
        │                                               │
        ▼                                               │
   [Playbook diagnoses] ──▶ [Runbook executes fix]      │
        │                                               │
        ▼                                               │
   [Incident Report captures timeline]                  │
        │                                               │
        ▼                                               │
   [Postmortem finds root cause] ──▶ [Action items]     │
        │                                               │
        └──────▶ [Docs improved] ───────────────────────┘
              (new runbooks, updated alerts, fixed gaps)
```

**What matters most:** The loop must *close*. The defining feature of a healthy incident lifecycle is that every incident leaves the documentation better than it found it — a new runbook, a clarified alert, a corrected assumption. Teams that detect, fix, and move on without the postmortem-to-improvement step relive the same incident indefinitely.

**Document timing:**
- **Before** incidents: runbooks, playbooks, on-call guides, alert definitions (written in calm, used in chaos)
- **During** incidents: incident report / timeline (written live by the incident commander or scribe)
- **After** incidents: postmortem within ~5 days while memory is fresh; action items tracked to completion

**Where it fails:** Blameful postmortems (people hide information, root causes stay buried) and untracked action items (the postmortem becomes a document graveyard). The fix: structural blamelessness — the template names systems and processes, not people — and treating action items as real backlog work with owners and due dates.

---

## 7. The Open-Source Contribution Lifecycle

*Distributed, asynchronous contribution from people who may never meet.*

**Documentation character:** Documentation *is* the coordination mechanism. With no shared office, standup, or manager, the docs carry the entire weight of onboarding, contribution norms, and decision-making. Poor docs don't just slow an OSS project — they prevent it from existing as a community.

**The OSS documentation set:**
| Document | Why it's load-bearing |
|---|---|
| README | First and often only impression; determines whether anyone tries the project |
| CONTRIBUTING | How to contribute without a human to ask |
| CODE_OF_CONDUCT | Community behavioral norms; required for healthy collaboration |
| LICENSE | Legal foundation; absence makes the code unusable by others |
| Issue / PR templates | Structure contributions so maintainers aren't overwhelmed |
| CHANGELOG | How users track what changed across versions they didn't build |
| Governance doc | How decisions get made and who can make them (critical as projects grow) |
| SECURITY.md | How to report vulnerabilities responsibly |

**What matters most:** README and CONTRIBUTING. In a co-located team, missing onboarding docs cost a few conversations; in OSS, they cost every potential contributor who bounces off the friction.

**Where it fails:** Documentation that assumes the reader has context they can't have. The maintainer knows the architecture; the drive-by contributor knows nothing. The fix is the "stranger test" applied ruthlessly — every doc written for someone who arrived five minutes ago.

---

## 8. DevOps / Continuous Delivery

*Development and operations fused into one continuous pipeline; code flows from commit to production through heavy automation.*

**Documentation character:** Documentation moves *into the pipeline*. The defining DevOps idea — "everything as code" — applies to docs too. Infrastructure is documented as Terraform/config, not prose; deployment procedures become pipeline definitions rather than manual runbooks; environment setup is a Dockerfile, not a setup guide. The documentation doesn't disappear, it changes form: from describing the system to *being executable specification of* the system.

**What matters most:**
| Artifact | Role |
|---|---|
| Infrastructure-as-Code (IaC) | The environment's documentation *is* its definition (Terraform, CloudFormation, Helm) |
| Pipeline-as-Code | CI/CD config (e.g. pipeline YAML) documents the build/test/deploy flow executably |
| README + runbooks | Still needed for the human-judgment parts automation can't encode |
| Observability docs | What's monitored, what alerts mean, dashboards-as-code |
| ADRs | Decisions about the pipeline and platform themselves |

The prize is that executable documentation cannot silently go stale — if the Terraform is wrong, the environment fails to build, so the "doc" is continuously tested by reality. This is the strongest known antidote to doc rot, but it only covers the parts that *can* be automated.

**Where it fails:** Believing automation removes the need for prose. The pipeline documents *what happens* but not *why it's built that way* — that still needs ADRs and architecture docs. And the human-in-the-loop moments (incident response, rollback judgment calls, "should we ship on a Friday") still need written runbooks and playbooks. Teams that go all-in on "the code is the documentation" lose the *why* and the *when-things-break* knowledge.

**Best fit:** Cloud-native teams shipping frequently, where deployment is automated and infrastructure is programmable.

---

## 9. Scaled Agile (SAFe, LeSS, and friends)

*Coordinating many agile teams toward shared objectives — agile at the org level rather than the team level.*

**Documentation character:** Scrum's lightweight, per-team docs don't coordinate across dozens of teams, so scaled frameworks reintroduce *coordination documentation* that single-team agile drops — without (ideally) reverting to waterfall's heaviness. The tension is constant: enough documentation to align many teams, not so much that you've recreated the thing agile was reacting against.

**What gets added on top of team-level Scrum docs:**
| Artifact | Role |
|---|---|
| Portfolio / program backlog | Requirements above the team level — initiatives spanning many teams |
| Capability / feature specs | Mid-level requirements bridging strategy and team stories |
| Cross-team dependency maps | Documenting what teams block each other (the core scaling problem) |
| Architectural runway docs | Shared technical foundation all teams build on |
| PI (Program Increment) planning artifacts | Alignment output from big cross-team planning events |
| Shared Definition of Done | Consistent quality bar across all teams |

**What matters most:** Dependency and interface documentation. When many teams build toward one product, the failures happen at the *seams*. The API contracts, dependency maps, and architectural runway are what keep teams from integrating into a broken whole. The team-level docs matter less than the between-team docs.

**Where it fails:** Two opposite failure modes. Over-correcting back to waterfall (so much program documentation that teams aren't agile anymore), or under-documenting the dependencies (each team stays "agile" locally while the integration quietly breaks). The fix is to keep team-level docs light but treat cross-team contracts as first-class, formal artifacts.

**Best fit:** Large organizations running many coordinated teams on a shared product or platform.

---

## 10. Hybrid Models (Water-Scrum-Fall and Reality)

*The model most organizations actually run, whatever they call themselves.*

**Documentation character:** Most real teams aren't purely anything. The common pattern — sometimes called "water-scrum-fall" — is up-front requirements and design done waterfall-style (because stakeholders or contracts demand a plan), agile iteration during build, and a formal, gated release process at the end. Each segment carries its native documentation rhythm, and the friction lives at the *handoffs* between them.

**The blended documentation flow:**
| Segment | Runs like | Documents like |
|---|---|---|
| Front end (planning) | Waterfall | BRD, PRD, design docs, approved up front |
| Middle (build) | Scrum/Kanban | Backlog, stories, ADRs, continuous |
| Back end (release/ops) | Gated/ITIL | Change requests, release approvals, runbooks |

**What matters most:** Translation at the seams. The up-front PRD must convert cleanly into a living backlog (without becoming a frozen contract the team resents), and the iterative build output must convert into the formal artifacts the release gate demands. The documents that fail are the ones stranded between rhythms — a waterfall PRD nobody updates once sprints start, or sprint output that arrives at the release gate missing the change-control paperwork.

**Where it fails:** Treating the up-front documents as frozen contracts (waterfall's failure) while *also* claiming to be agile — the worst of both, where the plan is obsolete but politically untouchable. The fix is explicit: decide which up-front docs become *living* once build starts (usually the PRD and design doc) and which stay *frozen records* (the original approved scope, for audit/contract purposes — kept, but not pretended to be current).

**Best fit:** Honestly, most organizations. Recognizing you're hybrid — rather than pretending to be purely agile or purely waterfall — is what lets you document each segment in its right rhythm.

---

## Cross-Model Comparison

| Model | Doc Weight | Doc Timing | Authority of Docs | Failure Mode |
|---|---|---|---|---|
| Waterfall | Heavy | Front-loaded | Contractual / gating | Stale specs, doc theater |
| Scrum | Light per-unit | Continuous, per-sprint | Living backlog | Orphaned cross-sprint docs |
| Kanban | Minimal | Flow-attached | Policy-driven | Continuous deferral |
| SSDLC | Interleaved | Every phase | Risk-gating | One-time security checklist |
| Data/ML | Distinct genre | Continuous + monitoring | Reproducibility-critical | Undocumented data/models |
| Incident Loop | Stress-tested | Before/during/after | Operational survival | Open loop, blame, untracked actions |
| Open Source | Coordination-critical | Continuous | Community-enabling | Assumes context readers lack |
| DevOps / CD | Executable | In the pipeline | Self-testing (IaC) | "Code is the docs" loses the *why* |
| Scaled Agile | Medium (at seams) | Continuous + planning events | Coordination-enabling | Either waterfall-creep or broken dependencies |
| Hybrid | Mixed by segment | Phase-dependent | Mixed | Frozen plan masquerading as current |

---

## Which Model Are You — and How Should You Document?

A short decision aid. Find the row that fits and follow the documentation implication.

| If your situation is... | You're likely... | Document by... |
|---|---|---|
| Fixed scope, contract or regulator demands a plan, change is costly | Waterfall | Front-loading; treat key docs as living anyway to fight staleness |
| Evolving product, one stable team, frequent change | Scrum | Living backlog; put "docs updated" in the Definition of Done |
| Steady stream of unpredictable work (ops, support) | Kanban | Column policies; gate "Done" on doc criteria |
| Many teams on one product | Scaled Agile | Light team docs + formal cross-team contracts |
| Automated pipeline, programmable infra, ships often | DevOps/CD | Everything-as-code; keep prose for the *why* and incidents |
| Handling sensitive data or untrusted input | Layer SSDLC on top | Interleave security docs into every phase |
| Behavior learned from data | Layer Data/ML on top | Document data + models as first-class, versioned artifacts |
| Distributed, asynchronous contributors | Open Source | Coordination docs; the stranger test, ruthlessly |
| Plan up front, iterate in the middle, gate the release | Hybrid (most of you) | Each segment in its own rhythm; manage the seams |

Note that the bottom three are *overlays*, not standalone models — you run SSDLC, Data/ML, or open-source documentation *on top of* whichever delivery model (Waterfall, Scrum, etc.) you use.

**The unifying lesson:** choose your documentation rhythm to match your delivery rhythm. Heavy up-front docs in a fast-iterating product create waste; light tribal-knowledge habits in a regulated waterfall build create risk. The model isn't right or wrong — the mismatch between model and documentation habit is what hurts.

---

# CHAPTER 7 — STACK RECIPES

# Documentation Stack Recipes

The full catalog in Chapter 2 lists ~70 document types. No team should use all of them. This chapter gives **prescriptive stacks** for common organization profiles — what to adopt, in what order, what to deliberately skip, and what to add as you grow. Each recipe is opinionated on purpose; the worst documentation outcome is adopting heavy process a team can't sustain.

Read the recipe closest to your situation, then steal from adjacent ones as needed.

---

## Recipe 1 — Early-Stage Startup (up to ~15 engineers)

**Principle:** Documentation should cost minutes, not meetings. At this size the company may pivot before any heavy doc pays off, so favor artifacts that survive pivots (decisions, operational knowledge) over artifacts that describe a product that might not exist next quarter.

**The core stack — adopt these:**
- **README per repo** — non-negotiable, free, immediate
- **ADRs** — the single highest-ROI habit; tiny effort, compounds as the team grows and early engineers forget (or leave)
- **Lightweight PRD / one-pager per feature** — a page, not a treatise; just enough to align before building
- **Runbooks for anything operational run more than twice** — written the second time you do a manual procedure
- **Postmortems** — start the day after your first real outage; the habit matters more than the format

**Deliberately skip (for now):**
- Formal SRS, FRD, ICD — overkill; the PRD covers it
- RTM, IQ/OQ/PQ, compliance matrices — no regulatory driver yet
- Heavy project governance (charters, WBS, RACI) — the team fits in one room
- Separate HLD/LLD — fold into a single short design doc when needed

**Add when triggered:**
| Trigger | Add |
|---|---|
| First feature ships with a surprise alignment misses would have caught | Proper PRD discipline |
| First "how does this work?" with no one who remembers | Architecture overview doc |
| First incident | Postmortem process |
| First enterprise customer asks for your security posture | Security policy, basic SOC 2 prep |

**Home:** One wiki + docs-in-repo. Resist tool sprawl.

---

## Recipe 2 — Scaling Company (~15–150 engineers, multiple teams)

**Principle:** The failure mode shifts from "no docs" to "docs nobody can find or trust." Coordination across teams becomes the problem documentation must solve. Invest in *discoverability* and *cross-team contracts*.

**Build on the startup stack, add:**
- **RFCs** — as teams multiply, decisions need a feedback mechanism before they ripple across boundaries
- **Design docs (proper)** — features now span teams; the design doc is the alignment artifact
- **API specifications (OpenAPI / schema)** — teams consume each other's services; the contract must be explicit and versioned
- **Onboarding docs per team** — you're now hiring faster than osmosis can transfer knowledge
- **Architecture overview / C4 context diagrams** — no single person holds the whole system anymore
- **SLOs** — "is it reliable?" needs a shared definition once multiple teams depend on each other
- **Roadmaps + status reports** — leadership can no longer see everything directly
- **Decision log** — "why did we do it this way?" outlives the people who decided

**Watch for:**
- **Tool sprawl** — docs scattered across five platforms is worse than one mediocre platform. Pick a primary home and enforce it.
- **Staleness at scale** — institute ownership (every doc has a named owner) and a review cadence.

**Home:** A real knowledge platform (Confluence, Notion, internal docs site) + docs-as-code in repos for technical content.

---

## Recipe 3 — Enterprise / Large Organization (150+ engineers)

**Principle:** Documentation is now infrastructure, with the same needs as code: ownership, versioning, search, lifecycle, and governance. The cost of a wrong or missing doc is measured in cross-org coordination failures and compliance exposure.

**The full structured stack:**
- Everything in the scaling recipe, plus formality:
- **Standardized templates** for PRDs, design docs, ADRs — consistency lets readers navigate any team's docs
- **Formal architecture governance** — SAD, architecture review boards, C4 at all levels
- **Project governance suite** — charters, SOWs, WBS, RACI, risk registers, formal change management (CAB — Change Advisory Board review)
- **Comprehensive operational docs** — DR plans, BCP, capacity plans, formal on-call structure
- **Quality documentation** — test strategies, test plans, traceability where products warrant it
- **Knowledge management discipline** — taxonomy, ownership matrix, archival policy, search infrastructure
- **Compliance documentation** — security policies, audit trails, access reviews, vendor risk assessments

**The enterprise-specific risk:** Process becomes the product. Documentation that exists to satisfy process rather than serve readers is pure waste at enterprise scale because there's so much of it. Guard against this by asking of every required doc: *who reads this, and what do they do differently because of it?* If there's no answer, the requirement is theater.

**Home:** Enterprise knowledge platform + docs-as-code + GRC tooling for compliance evidence + a documentation function that owns standards and discoverability.

---

## Recipe 4 — Regulated Environment (Healthcare, Finance, Defense, etc.)

**Principle:** Here documentation isn't just useful — it's *required by law or contract*, and an auditor will ask for specific artifacts by name. The defining shift: documentation must produce **evidence**, not just understanding. "We do this correctly" is worthless without the record proving it.

**Everything in the enterprise stack, plus the evidence layer:**
- **SOPs** — formal, version-controlled, sign-off-tracked procedures for every regulated process
- **Requirements Traceability Matrix (RTM)** — proving every requirement maps to design, code, and a passing test
- **Validation documentation (IQ/OQ/PQ)** — formal qualification evidence that systems were installed, operate, and perform as specified
- **Audit trails** — immutable records of who did what, when, to what
- **Access control / authorization documentation** — who can see what, why, with periodic access-review records
- **Change control records** — every production change formally requested, reviewed, approved, and logged
- **Risk assessments / impact analyses** — documented before changes to validated systems
- **Privacy impact assessments** — before processing regulated personal data
- **Training records** — proof that staff were trained on the SOPs they follow

**The mindset difference:** In an unregulated shop, an undocumented-but-working process is a minor risk. In a regulated one, *it effectively didn't happen* — if you can't produce the evidence, you can't prove compliance, and the working system is a liability. The "frozen record vs. living document" distinction (see Chapter 8) becomes legally load-bearing: audit trails and validation records are immutable evidence; SOPs are controlled living documents with formal revision history.

**The recurring exercise:** the audit dry-run. Periodically pull the evidence an auditor would request — access reviews, change records, validation results, training logs — *before* the real audit. Evidence that can't be produced within an hour effectively doesn't exist when it counts.

**Home:** A controlled document management system (with version control, e-signatures, and audit logging) + GRC platform. Note: a freeform wiki is usually *insufficient* here because it lacks the controlled revision and sign-off features auditors expect.

---

## Recipe 5 — Open-Source Project

**Principle:** Documentation is the project's coordination layer and its growth engine. With no shared workplace, every contributor onboards through docs alone. The bar isn't "adequate for the team" — it's "navigable by a stranger with zero context."

**The essential stack (in priority order):**
1. **README** — what it is, why it exists, how to install and run; the make-or-break first impression
2. **LICENSE** — without it, the code is legally unusable by others
3. **CONTRIBUTING** — how to contribute without a human to ask
4. **CODE_OF_CONDUCT** — community behavioral norms
5. **Issue + PR templates** — structure contributions so maintainers scale
6. **CHANGELOG** — how users track changes across versions
7. **SECURITY.md** — responsible vulnerability disclosure path

**Add as the project grows:**
| Stage | Add |
|---|---|
| Multiple maintainers | Governance doc (who decides, how) |
| Real user base | Versioned docs site, migration guides, API reference |
| Many contributors | Architecture overview so contributors can navigate the codebase |
| Funding / foundation | Formal governance, trademark policy, roadmap |

**The OSS-specific discipline:** Documentation written for someone who arrived five minutes ago. The maintainer's curse is knowing too much — every assumed piece of context is a contributor lost. The README's job is to get a stranger to first success as fast as possible.

**Home:** In the repository itself (docs-as-code) + a generated docs site for anything substantial.

---

## Recipe 6 — Data / Analytics / ML Team

**Principle:** Standard software docs assume specified, deterministic behavior. Data and ML systems are derived from data and behave probabilistically, so this team needs a documentation genre the other recipes don't cover (see Chapter 6's ML lifecycle). The core question is *reproducibility*: can you reconstruct exactly how a number or a model was produced?

**The data-specific stack:**
- **Data dictionary** — authoritative field-level definitions; the single most-referenced doc on a data team
- **Data lineage documentation** — where data comes from, how it's transformed, where it goes
- **Datasheets for datasets** — provenance, composition, biases, intended use
- **Model cards** — what models do, their training data, performance across subgroups, limitations
- **Experiment logs** — reproducibility records for training runs
- **Pipeline / DAG documentation** — how data flows through transformation jobs
- **Metric definitions** — the canonical definition of every business metric (what *exactly* is "active user"?), so two dashboards never disagree
- **Monitoring / drift plans** — because these systems decay as the world shifts, even untouched

**Plus the basics:** README, ADRs (for pipeline and modeling decisions), and runbooks (for pipeline failures — which are frequent and time-sensitive).

**The data-specific risk:** Documenting the serving code while leaving the *data and metric definitions* undocumented. When two reports disagree, the cause is almost always two undocumented, divergent definitions of the same metric. Canonical metric definitions prevent the most common and most corrosive data-team failure: nobody trusting the numbers.

**Home:** A data catalog (with lineage and dictionary features) + docs-as-code for pipelines + experiment-tracking tooling.

---

## Picking and Mixing

Most real organizations are hybrids — a scaling startup with one regulated product line, or an enterprise with an internal OSS project and a data team. The recipes compose: apply the base recipe for your size, then layer the specialized stack (regulated, data, OSS) onto the specific teams or products that need it. Don't impose the data team's model cards on the marketing-site team, and don't impose the regulated product's validation overhead on the internal tools team. **Match the stack to the risk and rhythm of each unit, not the whole org uniformly.**

The headcount ranges above are rough signposts, not hard lines — what actually drives the transition between recipes is *structure*, not size. The real trigger from "startup" to "scaling" is the appearance of *multiple teams that depend on each other*: the moment no single person holds the whole system in their head, you need the cross-team contracts (API specs, design docs, decision logs) the scaling recipe adds. A 12-person company already split into three squads is "scaling"; a 25-person single-team company may still be "startup." Read the recipe whose *situation* matches yours, not just whose number does.

### Worked Example: A 40-Person Company With One Regulated Product

The most common real-world question this chapter gets: *"I'm not on the list — I'm a mid-size company, mostly normal SaaS, but one product handles regulated data. Which recipe?"* The answer is a layered composition, not a single pick:

- **Base layer — Recipe 2 (Scaling).** At 40 people across several teams, the org-wide baseline is the scaling stack: standardized READMEs and ADRs everywhere, design docs and RFCs for cross-team work, API specs as the contracts between teams, onboarding docs per team, SLOs, and a single enforced documentation home. This is what *every* team gets, including the regulated one.
- **Overlay on the regulated product only — Recipe 4 (Regulated).** The one product touching regulated data additionally carries the evidence layer: SOPs, change-control records, access-review documentation, validation evidence, and audit trails — scoped to that product and its data flows. The marketing site and internal tools do *not* carry this overhead.
- **Overlay where it applies — SSDLC and Data/ML.** If the regulated product handles sensitive data (it does, by definition), the security-integrated practices from Chapter 6 layer on: threat model at design, SBOM for dependency tracking. If any team does analytics or ML, the data stack (Recipe 6) layers onto that team.

The mistake to avoid in both directions: imposing the regulated product's heavy evidence requirements on the whole company (everyone drowns in process that only one product legally needs), or letting the regulated product run on the loose company-wide baseline (you fail the audit). The discipline is *scoped layering* — a light, consistent base everywhere, heavy overlays exactly where the risk lives. This is the single most important idea in the chapter for any organization past its first product.

The universal minimum, under every recipe: a README, a way to record decisions (ADRs), and a way to operate the system (runbooks). Everything else is added in response to a specific, felt problem — never adopted because a framework said so.

---

# CHAPTER 8 — BEST PRACTICES & ANTI-PATTERNS

# Best Practices & Anti-Patterns

Knowing *which* document to write is half the battle; the other half is writing it so it actually works and keeping it from rotting. This chapter collects the practices that separate documentation that compounds in value from documentation that becomes a liability — and catalogs the anti-patterns that produce the latter.

---

## Part 1 — Foundational Principles

**Write for the reader who knows least.** The author's curse is knowing too much. Every assumed piece of context is a reader who gets stuck. Picture the specific person who'll read this with the least background — the new hire, the on-call engineer who's never touched this system, the external contributor — and write for them.

**One document, one job.** Each document should answer one dominant question (see Chapter 1). A doc trying to be a PRD and a design doc and a runbook simultaneously serves none of those readers well. When a doc sprawls, split it and link.

**Single source of truth.** The same fact in three places means two are wrong, or soon will be. Pick one canonical location for each piece of information and link to it from everywhere else. Duplication is the seed of contradiction.

**Docs as code.** Keep technical documentation in version control alongside the code it describes. Benefits: changes are reviewed in the same PR, docs and code version together, history is preserved, and "update the docs" becomes part of the change rather than a separate forgotten task. The closer a doc lives to what it describes, the longer it stays accurate.

**Make the right thing the easy thing.** If updating docs requires a separate tool, a separate login, and a separate workflow, it won't happen. If it's a markdown file in the same PR, it will. Documentation processes succeed or fail on friction.

**Match weight to risk.** A throwaway script needs a comment; a payment system needs a design doc, runbooks, and a threat model. Over-documenting low-risk work wastes effort and trains people to ignore docs; under-documenting high-risk work is how outages and audit failures happen.

---

## Part 2 — Writing Practices

**Lead with the conclusion.** Readers scan before they read. Put the decision, the answer, or the summary first; supporting detail after. The inverted-pyramid structure (most important first) respects the reader who only reads the first paragraph — which is most of them.

**Structure for scanning.** Headings, short paragraphs, tables, and lists let readers jump to what they need. A wall of prose forces linear reading nobody does. The structure itself is information.

**Be concrete and specific.** "The system should be performant" is unfalsifiable noise. "p99 latency under 200ms at 1000 req/s" is a requirement you can test. Vague documentation feels written but conveys nothing.

**Show, don't just tell.** Examples, code samples, diagrams, and concrete scenarios teach faster than abstract description. A sequence diagram of an auth flow beats three paragraphs describing it.

**Make commands copy-pasteable.** In runbooks and setup guides, every command should be runnable as-written, with expected output shown. A command with a `<placeholder>` the reader must figure out is a place they'll get stuck at 3 AM.

**Diagrams need alt-text and source.** A diagram nobody can edit becomes a lie the moment the system changes. Keep the source (Mermaid, draw.io, whatever) so the diagram can evolve. Add alt-text — both for accessibility and because readers (and AI assistants) processing the doc can't see images.

**State the date and status.** A reader's first question about any doc is "can I trust this?" A visible last-updated date and status (Draft / Approved / Superseded) answers it. An undated doc of unknown status gets ignored regardless of quality.

**Cut ruthlessly.** Every sentence that doesn't carry weight dilutes the ones that do. After drafting, ask of each section: what can be removed without losing meaning? Shorter docs get read; long ones get skimmed or skipped.

---

## Part 3 — The Diátaxis Lens (Four Modes of Documentation)

A widely used framework: most documentation failures come from mixing four fundamentally different purposes in one document. They serve different reader needs and shouldn't be blended.

| Mode | Reader's need | Reader's question | Example |
|---|---|---|---|
| **Tutorial** | Learning by doing | "Teach me, I'm new" | Getting-started walkthrough |
| **How-to Guide** | Accomplishing a task | "How do I do X?" | Runbook, recipe |
| **Reference** | Looking up facts | "What are the exact parameters?" | API reference, data dictionary |
| **Explanation** | Understanding why | "Why does it work this way?" | Architecture rationale, ADR |

**The core insight:** a tutorial that keeps stopping to explain theory frustrates the learner who wants to *do*; a reference cluttered with tutorial hand-holding frustrates the expert who wants a fact fast. Know which mode a document is in, and keep it in that mode. When you feel a doc fighting itself, it's usually two modes tangled together — separate them.

---

## Part 4 — Maintenance & Fighting Doc Rot

Documentation rot — the slow drift between what docs say and what's true — is the central long-term challenge. Every doc is a liability the moment it's wrong, because readers act on it. A confidently wrong runbook is worse than no runbook.

**Assign ownership.** Every living document needs a named owner accountable for its accuracy. Ownerless docs rot by default because rot is nobody's job. "This team owns this doc" is the precondition for it staying true.

**Tie updates to the work.** The most reliable anti-rot mechanism: make doc updates part of the change that necessitates them. Definition of Done includes "docs updated." The PR that changes the behavior also updates the doc. Documentation maintained as a separate activity always loses to the next deadline.

**Distinguish living from frozen — and treat them differently.**
- **Living docs** (README, runbooks, API specs, risk registers): editing them *is* the job; staleness is a defect; review on a cadence.
- **Frozen records** (ADRs, RFCs, postmortems, change requests, audit trails): never edit after the fact; they record a moment; new reality gets a *new* record that supersedes the old.

Most documentation dysfunction traces to confusing these. Teams that edit ADRs rewrite history and lose the decision trail; teams that let runbooks freeze ship stale operational docs that fail under stress.

**Date and review on a cadence.** Living docs should carry a review date and get re-validated periodically (quarterly for critical ops docs, at least annually for others). A doc untouched since before the last major change to its subject is presumed wrong until verified.

**Prune aggressively.** Outdated docs are worse than missing ones — they actively mislead. When a doc is obsolete, delete it or mark it clearly superseded. A smaller set of trusted docs beats a large set of unknown reliability.

**Run the staleness test.** For each living doc, compare its last-modified date to the last meaningful change in what it describes. Gaps are rot in progress.

**Run the stranger test.** Hand a runbook or setup guide to someone outside the team and watch them execute it. Every hesitation marks a missing step. This is the single highest-value documentation maintenance exercise — it surfaces the assumed context the author can't see.

---

## Part 5 — Review & Quality

**Review docs like code.** Documentation changes deserve review: is it accurate, clear, complete, in the right place? Docs-as-code makes this natural — the doc change rides in the PR. Reviewers catch the author's blind spots.

**Test docs with a fresh reader.** The author can't evaluate their own clarity — they have the context the doc is supposed to supply. Have someone without context (a teammate, a new hire, or a fresh AI assistant given only the document) read it and answer the questions a real reader would ask. Where they get it wrong, the doc has a gap. This catches the blind spots that make sense to authors and confuse everyone else.

**Predict reader questions.** Before publishing, list the questions a reader will arrive with and verify the doc answers each. A doc that doesn't answer its readers' actual questions is decoration.

**Check for the author's curse explicitly.** Ask: what does this assume the reader already knows? Every assumed concept, acronym, or system name is a potential dead end for someone who doesn't have it.

---

## Part 6 — The Anti-Pattern Catalog

Named failure modes, so they can be spotted and called out:

**Documentation Theater.** Docs written to satisfy a process, not a reader — pristine specs nobody consults, status reports nobody reads. Test: who reads this and what do they do differently because of it? No answer means it's theater.

**The Stale Runbook.** An operational doc that no longer matches the system, discovered mid-incident when it's most dangerous. Caused by docs maintained separately from the changes they should track.

**Tribal Knowledge.** Critical information living only in someone's head, justified as "we're agile / move fast." Works until that person is on vacation, in a meeting, or gone — at which point the bus factor bites.

**Tool Sprawl.** The same information scattered across five platforms, so no one knows which is current. Worse than one mediocre source of truth.

**The Write-Only Doc.** A document created to check a box, then never opened again. Common with mandated templates that don't fit the work. If nobody reads it, stop writing it.

**Context-Assuming Docs.** Written for the author's level of knowledge, not the reader's. The OSS and onboarding killer. Every assumed concept is a reader lost.

**Edited History.** Changing a frozen record (ADR, postmortem) to reflect new reality, destroying the trail of why decisions were actually made. Records should be superseded, never rewritten.

**The Mega-Doc.** One document trying to be tutorial, reference, how-to, and explanation at once, serving none of its readers well. Split by Diátaxis mode.

**Premature Process.** A small team adopting enterprise documentation overhead it can't sustain, training everyone to ignore docs because most are pointless ceremony. Match weight to actual risk.

**Orphaned Cross-Cutting Docs.** Architecture and operational docs with no home in a sprint-by-sprint flow, slowly going stale because no single story owns them. Maintain durable docs outside the iteration cadence.

**The Undated Doc.** No date, no status, no owner — so no reader can tell if it's trustworthy. Gets ignored regardless of how good it is.

---

## Part 7 — Measuring Documentation Health

You can't manage what you don't measure, but documentation metrics are easy to get wrong — counting pages rewards bloat, counting docs rewards fragmentation. Measure *outcomes* (do readers succeed?) over *outputs* (how much did we write?).

**Outcome metrics — what you actually want:**
- **Time-to-onboard.** How long until a new hire ships their first meaningful change. The single best proxy for documentation health, because good docs are what shrink it. Track it per cohort.
- **Time-to-first-answer.** When someone has a question, how long until they find it themselves versus interrupting a colleague. Falling "where do I find X?" traffic in team chat is documentation working.
- **Self-service rate.** Fraction of questions answered by existing docs versus requiring a human. Rising rate = docs covering real needs.
- **Incident-repeat rate.** How often the same root cause recurs. A falling rate means postmortems and runbooks are closing the loop (Chapter 6's incident lifecycle).

**Health/hygiene metrics — leading indicators of rot:**
- **Staleness rate.** Fraction of living docs not reviewed within their cadence window. The clearest early warning of decay.
- **Ownership coverage.** Fraction of critical docs with a named owner. Unowned docs rot by default.
- **Orphan/broken-link rate.** Dead links and unreachable pages — cheap to measure automatically, a direct signal of decay.
- **Doc-coverage of critical systems.** Do your most important systems have a README, an architecture doc, and runbooks? A simple checklist audit beats any vanity count.

**Metrics to distrust:** raw page count, word count, number of docs. These reward volume, and volume is not the goal — a smaller set of trusted, current docs beats a sprawling set of unknown reliability. If a metric can be improved by writing more low-value documentation, it's the wrong metric.

**How to use them:** run a lightweight quarterly review — staleness sweep, ownership check, broken-link scan, and a glance at onboarding time. The point isn't a dashboard; it's catching rot before it compounds and proving (or disproving) that documentation effort is paying off.

---

## Part 8 — Tooling & Automation

Good practices survive only when tooling makes them the path of least resistance (Part 1: make the right thing the easy thing). The categories below matter more than specific products, which change constantly.

**Authoring & hosting:** Static-site generators that build docs from markdown in the repo (so docs-as-code works), and wiki/knowledge platforms for less technical content. The key property is keeping technical docs *in version control* so they review and version alongside code.

**Automated quality gates** — the highest-leverage category, because they catch problems without human diligence:
- **Linters / style checkers** enforce writing standards and terminology automatically (prose linters exist alongside code linters).
- **Link checkers** catch the broken/orphan links from Part 7 on every build.
- **Spec-driven generation** keeps API reference docs in sync by generating them from the OpenAPI spec or code — the docs can't drift from the contract because they're derived from it.
- **"Docs required" CI checks** can block a merge that changes an API without touching its docs, making the Definition of Done structural rather than aspirational.

**Diagrams-as-code:** Tools that render diagrams from text (Mermaid, PlantUML, draw.io with stored source) so diagrams live in version control and evolve with the system, instead of becoming the stale, uneditable images Part 2 warned about.

**Discovery:** Search and, increasingly, catalogs/portals that index documentation across the org — because at scale, a doc nobody can find doesn't exist.

### AI-Assisted Authoring & Maintenance

AI assistants change the economics of documentation on both ends — and introduce new failure modes worth naming.

**Where AI genuinely helps:**
- **Drafting from context.** Generating first drafts of postmortems from incident timelines, runbooks from a transcript of doing the task, or release notes from a changelog — turning raw material into a structured draft a human then curates.
- **The fresh-reader test, on demand.** The Part 5 "test with a context-free reader" is now cheap: paste a doc into a fresh AI session and ask it the questions a real reader would. Where it answers wrong, the doc has a gap. This is the most practical new capability — a tireless stand-in for the stranger test.
- **Rot detection.** Flagging docs that reference renamed systems, dead endpoints, or contradicted facts by comparing docs against the current codebase.
- **Translation and reformatting.** Splitting a tangled mega-doc into Diátaxis modes, or adapting one doc for different audiences.

**The new failure modes:**
- **Confident, plausible wrongness.** AI-generated docs read fluently even when wrong — which defeats the usual human heuristic that bad writing signals bad content. AI drafts need *more* fact-checking than human drafts, not less, precisely because they're so plausible.
- **Volume without value.** AI makes it trivial to generate documentation, which makes the Part 7 warning sharper: easy generation tempts teams toward the bloat that the right metrics penalize. Generation is not the bottleneck; *trust and accuracy* are.
- **The provenance question.** A human author is accountable for a doc's accuracy. An AI-drafted doc still needs a human owner who has verified it — "the AI wrote it" is not a chain of accountability.

**The rule:** treat AI as a fast drafter and a tireless reviewer, never as the accountable author. It compresses the *effort* of documentation; it does not remove the *responsibility* for it. Every AI-assisted doc still needs a named human owner who has checked that it's true (Part 4) — the same standard as any other doc, applied with extra care because fluency masks error.

---

## Part 9 — A Pragmatic Adoption Sequence

For a team improving its documentation from a low baseline, in order of return on effort:

1. **READMEs on every repo.** Free, immediate, zero process.
2. **Start recording decisions (ADRs).** The next consequential decision gets a one-page record. Compounds forever.
3. **Add "docs updated" to your Definition of Done.** One line; structurally prevents the most common rot.
4. **Write runbooks for recurring operational pain.** One per procedure you've done manually more than twice.
5. **Institute blameless postmortems.** After the next real incident. Close the loop to improvement.
6. **Assign owners to critical living docs.** Ownership is the precondition for accuracy.
7. **Run a quarterly staleness sweep.** Compare doc dates to system changes; prune and update.

Everything beyond this gets adopted in response to a *specific, repeated, felt problem* — never because a framework prescribed it. The goal is never "complete documentation." The goal is documentation that earns its keep: that a reader trusts, finds, and acts on correctly. Every doc that doesn't meet that bar is overhead wearing the costume of diligence.

---

## The One-Sentence Version

Write for the reader who knows least, keep each doc to one job and one source of truth, store it next to what it describes, tie its updates to the work that changes it, and delete it the moment it starts to lie.

---

# Appendix A — Glossary of Terms

A true alphabetical glossary: every document type, methodology, acronym, and concept used in this book, defined in one or two sentences for fast lookup.

**How this differs from Chapter 2.** Chapter 2 is a *categorized catalog* — document types grouped by discipline, with context on when and why each is used. This appendix is a *flat A–Z reference* covering not only document types but also the methodologies, principles, and jargon that appear throughout the book (doc rot, Diátaxis, shift-left, frozen vs. living, and so on). Use Chapter 2 to understand a family of documents; use this appendix to look up a single term fast.

Acronyms are alphabetized by the acronym, with the expansion in parentheses. *See also* pointers link related concepts.

---

### A

**Acceptance Criteria** — The testable conditions that must be true for a user story or feature to be considered complete. Story-specific, unlike the team-wide Definition of Done. *See also* Definition of Done.

**Access Control Documentation** — Records of who can access what and why: role definitions, group mappings, row-level security (RLS) rules, and the approval process for access changes. Audit-critical in regulated environments. *See also* RLS, Audit Trail.

**ADR (Architecture Decision Record)** — A short, numbered record of one architectural decision: its context, the options considered, the choice made, and the consequences. A *frozen record* — never edited, only superseded by a later ADR. *See also* Frozen Record, RFC.

**Agile** — An iterative, incremental approach to software delivery that values working software, customer collaboration, and responding to change. The umbrella over Scrum, Kanban, and scaled frameworks. *See also* Scrum, Kanban, Scaled Agile.

**Anti-Pattern** — A common, named response to a recurring problem that is counterproductive — recognizable enough to be catalogued and avoided (e.g., Documentation Theater, Tribal Knowledge).

**API Reference Documentation** — Developer-facing documentation of every endpoint or method: parameters, responses, errors, and examples. Often generated from an API specification or docstrings.

**API Specification** — A machine-readable contract defining a service's endpoints, payloads, types, and errors (e.g., OpenAPI/Swagger, GraphQL schema, protobuf IDL). Drives code generation, mocking, and reference docs. *See also* OpenAPI, ICD.

**arc42** — A template for software architecture documentation organizing the architecture into standardized sections. *See also* SAD, 4+1.

**Architectural Runway** — In scaled agile, the shared technical foundation (infrastructure, frameworks, patterns) that exists so multiple teams can deliver features without each rebuilding the basics.

**Audit Dry-Run** — The practice of pulling the evidence an auditor would request *before* the real audit, to confirm it can actually be produced. Evidence that can't be retrieved quickly effectively doesn't exist.

**Audit Trail** — An immutable, chronological record of who did what, when, and to what — maintained as compliance evidence. A *frozen record* by nature. *See also* Frozen Record, Audit Dry-Run.

### B

**BCP (Business Continuity Plan)** — The business-level plan for continuing operations during a major disruption. Broader than disaster recovery, which addresses the systems. *See also* DR Plan.

**Blameless Postmortem** — A postmortem conducted so that contributors can speak freely: it names systems, processes, and contributing factors rather than blaming individuals, on the premise that people rarely cause incidents that bad processes didn't allow. *See also* Postmortem.

**BRD (Business Requirements Document)** — Captures *why* the business needs something: business objectives, stakeholder needs, and expected outcomes, at a higher level than a PRD. *See also* PRD, MRD.

**Bug Report (Defect Report)** — A structured record of a defect: reproduction steps, expected versus actual behavior, severity, and environment.

**Bus Factor** — The number of people who would have to be lost (e.g., "hit by a bus") before a project stalls because critical knowledge lived only in their heads. Low bus factor signals a documentation gap. *See also* Tribal Knowledge.

### C

**C4 Model** — An architecture diagramming convention with four zoom levels — Context, Container, Component, Code — for describing a system consistently at different altitudes.

**CAB (Change Advisory Board)** — The group that reviews and approves significant production changes in ITIL-style change management. *See also* Change Request.

**Capacity Plan** — A forecast of resource needs (compute, storage, licenses, headcount) against expected growth.

**Change Request (CR)** — A formal proposal to modify scope, schedule, or a production system, including impact analysis and a rollback plan. A *frozen record* of the change as approved. *See also* CAB.

**CHANGELOG** — A chronological, developer-facing record of notable changes per release, often following the Keep a Changelog convention. *See also* Release Notes.

**CI/CD (Continuous Integration / Continuous Delivery or Deployment)** — Practices that automatically build, test, and deploy code through a pipeline, enabling frequent, low-risk releases. *See also* DevOps, Pipeline-as-Code.

**CODE_OF_CONDUCT** — A document setting behavioral norms for a community, standard in open-source projects.

**Coding Standards (Style Guide)** — Team conventions for naming, formatting, patterns, and anti-patterns, ideally enforced by linters.

**Compliance Matrix (Control Mapping)** — A document mapping regulatory requirements to the controls that satisfy them and the evidence proving it.

**CONTRIBUTING** — A repository document explaining how to contribute: branching strategy, PR process, review expectations, and coding standards.

### D

**Data Dictionary** — Authoritative definitions of every data field or column: meaning, type, source, valid values, and lineage. The most-referenced document on many data teams. *See also* Data Lineage, Metric Definition.

**Data Drift** — The gradual divergence between the data a model was trained on and the data it now sees in production, degrading model performance even when no code changes. Drives the need for monitoring and retraining documentation.

**Data Governance Documentation** — Documents defining data ownership, classification, quality standards, retention, and stewardship.

**Data Lineage** — Documentation of where data originates, how it is transformed, and where it flows — essential for debugging, auditing, and trust in analytics. *See also* Data Dictionary.

**Datasheet for Datasets** — A document recording a dataset's provenance, collection method, composition, biases, consent basis, and intended use. The data analogue of a spec. *See also* Model Card.

**Decision Log** — A running, searchable record of decisions made and why — the lightweight, ongoing cousin of the ADR.

**Defect Report** — *See* Bug Report.

**Definition of Done (DoD)** — The team-wide checklist a work item must satisfy to be "done" (tests pass, peer reviewed, docs updated). Including "docs updated" in the DoD is a high-leverage anti-rot mechanism. *See also* Acceptance Criteria, Definition of Ready.

**Definition of Ready (DoR)** — The entry bar a backlog item must meet before a team will start it — typically including that it is documented and understood well enough to estimate.

**Deprecation Notice** — A formal warning that a feature, API, or version will be removed, with a timeline and migration path. *See also* EOL.

**Design Doc (TDD, Technical Design Document)** — Explains *how* a system or feature will be built: architecture, data models, APIs, trade-offs, alternatives, and rollout. The engineering counterpart to a PRD. *See also* HLD, LLD, RFC.

**DevOps** — A culture and practice set that fuses development and operations into one continuous, heavily automated pipeline, treating infrastructure and deployment as code. *See also* CI/CD, IaC.

**DFD (Data Flow Diagram)** — A diagram showing how data moves through a system: sources, processes, stores, and sinks. Also used in threat modeling.

**Diátaxis** — A framework identifying four distinct documentation modes — tutorial, how-to guide, reference, and explanation — each serving a different reader need, which should not be mixed in one document. *See also* Tutorial, How-To Guide, Reference, Explanation.

**Diagrams-as-Code** — Generating diagrams from text definitions (e.g., Mermaid, PlantUML) so they live in version control and evolve with the system rather than becoming stale images.

**Docs-as-Code** — Treating documentation like source code: written in plain text, kept in version control, reviewed in pull requests, and versioned alongside the code it describes.

**Docstring** — Documentation embedded directly in source code (e.g., Python docstrings, JSDoc) describing a function's intent, parameters, and behavior.

**Documentation Theater** — The anti-pattern of producing documents to satisfy a process rather than to serve a reader — pristine artifacts nobody consults.

**Doc Rot** — The gradual drift between what documentation says and what is actually true, as systems change but docs don't. The central long-term maintenance challenge. *See also* Staleness Test.

**DoD** — *See* Definition of Done.

**DoR** — *See* Definition of Ready.

**DPIA (Data Protection Impact Assessment)** — A GDPR-driven assessment of the privacy risks of a new data-processing activity, with analogues under other privacy regimes.

**DR Plan (Disaster Recovery Plan)** — The plan for restoring systems after catastrophic failure, defining RTO/RPO targets, backup procedures, and failover steps. *See also* BCP, RTO, RPO.

### E

**EOL (End-of-Life) Announcement** — A document stating a product's or version's final support dates and migration paths. *See also* Deprecation Notice.

**Epic** — A large body of work in agile that groups related user stories under a common goal.

**ERD (Entity-Relationship Diagram)** — A visual model of database entities, their attributes, and the relationships between them.

**Exit Artifact** — The document that signals one lifecycle phase is complete and the next may begin (e.g., a signed-off PRD ends the requirements phase).

**Experiment Log** — A record of machine-learning training runs — hyperparameters, datasets, and metrics — kept so results are reproducible.

**Explanation** — In Diátaxis, documentation that builds understanding of *why* something works the way it does (e.g., architectural rationale). *See also* Diátaxis.

### F

**FAQ (Frequently Asked Questions)** — Curated answers to common questions, often distilled from recurring support tickets.

**FRD / FRS (Functional Requirements Document / Specification)** — Translates business requirements into specific system behaviors ("the system shall…"), bridging the BRD and technical design.

**Frozen Record** — A document that records a moment in time and is never edited afterward; new reality is captured in a new document that supersedes it. ADRs, RFCs, postmortems, change requests, and audit trails are frozen records. Contrast with Living Document. *See also* Living Document.

**4+1 Architectural View Model** — A model describing software architecture through five concurrent views (logical, process, development, physical, plus scenarios that tie them together).

**5 Whys** — A root-cause technique that repeatedly asks "why?" to move past symptoms to an underlying cause, common in postmortems.

### H

**HLD (High-Level Design)** — A system-level design view: major components, services, integrations, and the data flow between them. *See also* LLD, Design Doc.

**How-To Guide** — In Diátaxis, task-oriented documentation that walks a reader through accomplishing a specific goal (e.g., a runbook). *See also* Diátaxis, Runbook.

**Hybrid Model (Water-Scrum-Fall)** — The common real-world pattern of doing up-front requirements and design in a waterfall style, iterating during build with agile, and gating the release formally. *See also* Waterfall, Water-Scrum-Fall.

### I

**IaC (Infrastructure as Code)** — Defining and provisioning infrastructure through machine-readable files (e.g., Terraform) rather than manual setup, so the configuration *is* the documentation and cannot silently go stale.

**ICD (Interface Control Document)** — A formal specification of the interface between two systems — data formats, protocols, and timing — common in defense, aerospace, and large integrations.

**Incident Management Loop** — The cyclical operational process of detecting, diagnosing, fixing, recording, and learning from production incidents, ideally leaving documentation improved after each one. *See also* Incident Report, Postmortem, Runbook.

**Incident Report** — A real-time or near-time record of an incident: timeline, impact, actions taken, and status. *See also* Postmortem.

**Index** — A back-of-book reference mapping terms to where they appear. (You are reading the glossary; the index is Appendix B.)

**IQ/OQ/PQ (Installation / Operational / Performance Qualification)** — Formal validation evidence that a system was installed correctly, operates as specified, and performs under real conditions — required in FDA-regulated and similar environments. *See also* Validation Documentation.

### K

**Kanban** — A continuous-flow delivery method that pulls work through stages with limits on work-in-progress, using explicit column policies instead of fixed iterations. *See also* Agile.

**KB Article (Knowledge Base Article)** — A searchable support document — how-to, troubleshooting, or known-issue — for internal staff or external customers.

### L

**LICENSE** — The document granting legal permission to use, modify, and distribute software; its absence makes code legally unusable by others.

**Living Document** — A document that is expected to be continuously updated to stay accurate; staleness is a defect and editing it is the job. READMEs, runbooks, API specs, and risk registers are living documents. Contrast with Frozen Record. *See also* Frozen Record, Doc Rot.

**LLD (Low-Level Design)** — A component- or module-level design view: class structures, algorithms, schemas, and function signatures. *See also* HLD, Design Doc.

### M

**Mega-Doc** — The anti-pattern of one document trying to be tutorial, reference, how-to, and explanation at once, serving none of its readers well. *See also* Diátaxis.

**Meeting Minutes** — A record of a meeting's discussion, decisions, and action items with owners.

**Metric Definition** — The canonical, documented definition of a business metric (e.g., what exactly counts as an "active user"), kept so that different reports cannot silently disagree.

**Migration Guide** — Instructions for moving between major versions or platforms: breaking changes, deprecated features, and how to adapt.

**Model Card** — A document describing what a machine-learning model does, its training data, its performance across subgroups, its limitations, and ethical considerations. *See also* Datasheet for Datasets.

**Model Lineage** — Documentation tracing which exact data, code, and configuration produced a given deployed model, enabling debugging, audit, and rollback.

**Monitoring Plan** — Documentation of what is monitored, what each alert means, and what triggers action — including, for ML systems, drift detection and retraining triggers.

**MRD (Market Requirements Document)** — Describes the market opportunity, target customers, and competitive landscape that justify building something; precedes the PRD. *See also* BRD, PRD.

### N

**NFR (Non-Functional Requirements)** — Quality-attribute requirements such as performance, availability, scalability, accessibility, and compliance — the "how well," as opposed to functional "what."

### O

**On-Call Guide** — Documentation of on-call expectations and procedures: escalation paths, severity definitions, tooling, and handoff.

**Onboarding Document** — Everything a new team member needs to become productive: environment setup, architecture orientation, tribal knowledge, and who to ask.

**One-Pager (Product Brief)** — A condensed pitch for a feature or initiative — problem, proposal, impact, ask — used to win alignment before investing in a full PRD.

**OpenAPI (Swagger)** — A widely used standard for describing REST APIs in a machine-readable specification. *See also* API Specification.

**Open-Source Lifecycle** — The distributed, asynchronous contribution model in which documentation is the primary coordination mechanism, since contributors share no workplace. *See also* CONTRIBUTING, README.

### P

**PASTA (Process for Attack Simulation and Threat Analysis)** — A risk-centric threat-modeling methodology. *See also* Threat Model, STRIDE.

**PI Planning (Program Increment Planning)** — In scaled agile, a large cross-team planning event whose output aligns many teams for the next increment.

**Pipeline-as-Code** — Defining a CI/CD pipeline in version-controlled configuration, so the build/test/deploy process is documented executably. *See also* CI/CD, IaC.

**Playbook** — Decision-oriented guidance for handling a *class* of situations (e.g., "database performance degradation"), including diagnostic branches. Broader than a runbook. *See also* Runbook.

**Postmortem (RCA, Root Cause Analysis)** — A retrospective after an incident documenting what happened, why (root and contributing causes), and the actions to prevent recurrence. A frozen record. *See also* Blameless Postmortem, 5 Whys.

**PRD (Product Requirements Document)** — Defines *what* a product or feature should do: goals, user problems, scope, success metrics, and acceptance criteria. The source of truth for product intent. *See also* BRD, MRD.

**Premature Process** — The anti-pattern of a small team adopting heavy documentation overhead it cannot sustain, training everyone to ignore docs.

**Project Charter** — The document that authorizes a project: objectives, scope, stakeholders, budget, and success criteria.

### Q

**Quick Start Guide** — The minimal path from zero to first success with a product — the "get running in ten minutes" document.

### R

**RACI Matrix** — A grid mapping who is Responsible, Accountable, Consulted, and Informed for each task or decision.

**RCA** — *See* Postmortem.

**README** — The front door of a repository: what the project is and how to install, run, and contribute. The minimum viable documentation. *See also* Onboarding Document.

**Reference** — In Diátaxis, information-oriented documentation for looking up precise facts (e.g., API reference, data dictionary). *See also* Diátaxis.

**Release Notes** — A curated, user-facing summary of what changed in a release: new features, fixes, breaking changes, and upgrade steps. *See also* CHANGELOG.

**Retrospective** — A team reflection after a sprint or project on what went well, what didn't, and what to change.

**RFC (Request for Comments)** — A proposal circulated for feedback *before* a significant design or process change is committed. A frozen record once resolved. *See also* ADR, Design Doc.

**RFP / RFI / RFQ (Request for Proposal / Information / Quote)** — Procurement documents used to source vendors: RFI gathers information, RFP solicits solution proposals, RFQ solicits pricing.

**Risk Register** — A living log of identified risks with their likelihood, impact, mitigation, and owner.

**RLS (Row-Level Security)** — Access control that restricts which rows of data a user can see; its rules are documented as part of access-control documentation. *See also* Access Control Documentation.

**Roadmap** — A time-phased or Now/Next/Later view of planned initiatives; a living artifact, not a contract.

**RPO (Recovery Point Objective)** — The maximum acceptable amount of data loss, measured as time, after an incident — i.e., how far back the last usable backup may be. *See also* DR Plan, RTO.

**RTM (Requirements Traceability Matrix)** — A document mapping each requirement through design to the test cases that verify it, proving complete coverage. Required in regulated and validated environments.

**RTO (Recovery Time Objective)** — The maximum acceptable time to restore service after an incident. *See also* DR Plan, RPO.

**Runbook** — Step-by-step instructions for executing one operational procedure, written so an unfamiliar operator can run it correctly under stress. *See also* Playbook, SOP.

### S

**SAD (Software/System Architecture Document)** — A comprehensive, formal architecture description, often organized by standardized views or templates. *See also* 4+1, arc42.

**SAFe (Scaled Agile Framework)** — A framework for applying agile across many teams and the portfolio level. *See also* Scaled Agile, LeSS.

**Scaled Agile** — Approaches (e.g., SAFe, LeSS) for coordinating many agile teams toward shared objectives, reintroducing cross-team coordination documentation that single-team agile omits. *See also* SAFe, PI Planning.

**Scrum** — An agile framework delivering work in fixed-length sprints, with defined roles, ceremonies, and artifacts (product backlog, sprint backlog, increment). *See also* Agile, Definition of Done.

**SBOM (Software Bill of Materials)** — A formal inventory of all components and dependencies in a piece of software, enabling rapid answers to "are we affected?" when a dependency vulnerability is disclosed.

**SDLC (Software Development Lifecycle)** — The overall sequence of phases through which software is conceived, built, operated, and retired.

**SECURITY.md** — A repository document explaining how to report security vulnerabilities responsibly.

**Sequence Diagram** — A diagram showing the messages exchanged between components over time — useful for documenting API call chains and authentication flows.

**Shift-Left** — The practice of moving an activity (especially security or testing) earlier in the lifecycle, so problems are caught during design rather than before release. *See also* SSDLC.

**Single Source of Truth** — The principle that each piece of information should have one canonical location, with everything else linking to it, to prevent contradictory copies.

**SLA (Service Level Agreement)** — The contractual reliability promise made to a customer (e.g., 99.9% uptime). *See also* SLO, SLI.

**SLI (Service Level Indicator)** — The actual measured metric of service behavior (e.g., observed error rate) underlying an SLO. *See also* SLA, SLO.

**SLO (Service Level Objective)** — The internal reliability target a team aims to meet, usually stricter than the SLA. *See also* SLA, SLI.

**SOP (Standard Operating Procedure)** — A formal, often compliance-driven, version-controlled procedure document for a recurring process; heavier in governance than a runbook. *See also* Runbook.

**SOW (Statement of Work)** — A contractual definition of deliverables, timeline, and acceptance criteria for a vendor or consulting engagement.

**SRS (Software Requirements Specification)** — A formal specification of functional and non-functional requirements, common in regulated industries. *See also* BRD, FRD.

**SSDLC (Secure/Security-Integrated Software Development Lifecycle)** — An SDLC with security activities embedded into every phase rather than bolted on before release. *See also* Shift-Left, Threat Model, SBOM.

**Staleness Test** — A maintenance check comparing a living document's last-modified date against the last meaningful change to what it describes; a gap signals doc rot in progress. *See also* Doc Rot.

**Status Report** — A periodic summary of project health: progress, status (e.g., red/amber/green), risks, and decisions needed.

**STRIDE** — A threat-modeling methodology categorizing threats as Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, and Elevation of privilege. *See also* Threat Model, PASTA.

**Stranger Test** — Handing a runbook or guide to someone outside the team and watching them execute it; every point of hesitation marks a missing step. The highest-value documentation-quality exercise.

**Style Guide** — *See* Coding Standards.

### T

**TDD (Technical Design Document)** — *See* Design Doc. (Not to be confused with test-driven development.)

**Test Case** — An individual, repeatable test specification: preconditions, steps, and expected results.

**Test Plan** — A project-specific testing document: scope, schedule, responsibilities, environments, and entry/exit criteria. *See also* Test Strategy.

**Test Strategy** — A high-level, org- or product-wide approach to quality: test levels, environments, automation philosophy, and tooling. *See also* Test Plan.

**Threat Model** — A structured analysis of a system's attack surface — assets, threats, and mitigations — produced during design. *See also* STRIDE, PASTA, SSDLC.

**Time-to-Onboard** — The time from a new hire's start to their first meaningful contribution; a leading outcome metric for documentation health.

**Tool Sprawl** — The anti-pattern of the same information scattered across many platforms, so no one knows which copy is current.

**Tribal Knowledge** — Critical information that exists only in people's heads rather than in documentation, creating risk when those people are unavailable. *See also* Bus Factor.

**Tutorial** — In Diátaxis, learning-oriented documentation that teaches a newcomer by guiding them through a hands-on exercise. *See also* Diátaxis.

### U

**UAT (User Acceptance Testing) Plan** — A document defining how business users will validate a system before go-live, including sign-off criteria.

**Use Case Document** — A description of actor–system interactions step by step, including alternate and exception flows.

**User Guide (Manual)** — Comprehensive end-user instructions for a product, organized by task or feature.

**User Story** — An agile requirement in the form "As a [user], I want [capability] so that [benefit]," small enough to deliver within an iteration. *See also* Epic, Acceptance Criteria.

**UX Copy** — The microcopy embedded in a product interface (labels, tooltips, error messages), increasingly treated as documentation.

### V

**Validation Documentation** — Formal evidence, especially in regulated environments, that a system meets its specification — including IQ/OQ/PQ qualification records. *See also* IQ/OQ/PQ, RTM.

**Vendor Risk Assessment** — Due-diligence documentation evaluating a vendor's security and compliance posture before and during an engagement.

### W

**Waterfall** — A sequential delivery model in which each phase is fully completed and signed off before the next begins; documentation is heavy, front-loaded, and gating. *See also* Hybrid Model.

**Water-Scrum-Fall** — The common hybrid in which planning is waterfall, build is agile, and release is gated. *See also* Hybrid Model.

**WBS (Work Breakdown Structure)** — A hierarchical decomposition of project scope into deliverables and work packages.

**Write-Only Doc** — The anti-pattern of a document created to satisfy a requirement and then never read again.

---

# Appendix B — Index

An alphabetical index of terms to their locations. **A** links to the definition in Appendix A (Glossary); numbered links jump to the chapters where the term is discussed.

*This index was generated by scanning the text, so the chapter locators reflect where each term actually appears — not a hand-maintained list that could drift out of date.*


---


### #

- **4+1 Architectural View Model** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide)
- **5 Whys** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [5](#chapter-5--starter-templates)

### A

- **Acceptance Criteria** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [6](#chapter-6--lifecycle-models)
- **Access Control Documentation** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [7](#chapter-7--stack-recipes)
- **ADR** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [5](#chapter-5--starter-templates), [8](#chapter-8--best-practices--anti-patterns)
- **Agile** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [6](#chapter-6--lifecycle-models), [8](#chapter-8--best-practices--anti-patterns)
- **Anti-Pattern** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [8](#chapter-8--best-practices--anti-patterns)
- **API Reference Documentation** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [5](#chapter-5--starter-templates), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes), [8](#chapter-8--best-practices--anti-patterns)
- **API Specification** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [5](#chapter-5--starter-templates), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes), [8](#chapter-8--best-practices--anti-patterns)
- **arc42** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide)
- **Architectural Runway** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models)
- **Audit Dry-Run** — [A](#appendix-a--glossary-of-terms), [4](#chapter-4--ownership--cadence-matrix), [7](#chapter-7--stack-recipes)
- **Audit Trail** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes), [8](#chapter-8--best-practices--anti-patterns)

### B

- **BCP** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [7](#chapter-7--stack-recipes)
- **Blameless Postmortem** — [A](#appendix-a--glossary-of-terms), [8](#chapter-8--best-practices--anti-patterns)
- **BRD** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [6](#chapter-6--lifecycle-models)
- **Bug Report** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix)
- **Bus Factor** — [A](#appendix-a--glossary-of-terms), [8](#chapter-8--best-practices--anti-patterns)

### C

- **C4 Model** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [5](#chapter-5--starter-templates), [7](#chapter-7--stack-recipes)
- **CAB** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [7](#chapter-7--stack-recipes)
- **Capacity Plan** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [7](#chapter-7--stack-recipes)
- **Change Request** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [6](#chapter-6--lifecycle-models), [8](#chapter-8--best-practices--anti-patterns)
- **CHANGELOG** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes), [8](#chapter-8--best-practices--anti-patterns)
- **CI/CD** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models), [8](#chapter-8--best-practices--anti-patterns)
- **CODE_OF_CONDUCT** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes)
- **Coding Standards** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [6](#chapter-6--lifecycle-models)
- **Compliance Matrix** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide)
- **CONTRIBUTING** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [5](#chapter-5--starter-templates), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes)

### D

- **Data Dictionary** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes), [8](#chapter-8--best-practices--anti-patterns)
- **Data Drift** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models)
- **Data Governance Documentation** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix)
- **Data Lineage** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [7](#chapter-7--stack-recipes)
- **Datasheet for Datasets** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models)
- **Decision Log** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [7](#chapter-7--stack-recipes)
- **Defect Report** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide)
- **Definition of Done** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [6](#chapter-6--lifecycle-models), [8](#chapter-8--best-practices--anti-patterns)
- **Definition of Ready** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models)
- **Deprecation Notice** — [A](#appendix-a--glossary-of-terms), [3](#chapter-3--lifecycle-phase-guide)
- **Design Doc** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [5](#chapter-5--starter-templates), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes), [8](#chapter-8--best-practices--anti-patterns)
- **DevOps** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [6](#chapter-6--lifecycle-models)
- **DFD** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide)
- **Diagrams-as-Code** — [A](#appendix-a--glossary-of-terms), [8](#chapter-8--best-practices--anti-patterns)
- **Diátaxis** — [A](#appendix-a--glossary-of-terms), [8](#chapter-8--best-practices--anti-patterns)
- **Doc Rot** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models), [8](#chapter-8--best-practices--anti-patterns)
- **Docs-as-Code** — [A](#appendix-a--glossary-of-terms), [7](#chapter-7--stack-recipes), [8](#chapter-8--best-practices--anti-patterns)
- **Docstring** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide)
- **Documentation Theater** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models), [8](#chapter-8--best-practices--anti-patterns)
- **DoD** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [6](#chapter-6--lifecycle-models)
- **DoR** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models)
- **DPIA** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix)
- **DR Plan** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [7](#chapter-7--stack-recipes)

### E

- **EOL (End-of-Life) Announcement** — [A](#appendix-a--glossary-of-terms), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix)
- **Epic** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide)
- **ERD** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix)
- **Exit Artifact** — [A](#appendix-a--glossary-of-terms), [3](#chapter-3--lifecycle-phase-guide)
- **Experiment Log** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes)
- **Explanation** — [A](#appendix-a--glossary-of-terms), [8](#chapter-8--best-practices--anti-patterns)

### F

- **FAQ** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain)
- **FRD / FRS** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes)
- **Frozen Record** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes), [8](#chapter-8--best-practices--anti-patterns)

### H

- **HLD** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [7](#chapter-7--stack-recipes)
- **How-To Guide** — [A](#appendix-a--glossary-of-terms), [8](#chapter-8--best-practices--anti-patterns)
- **Hybrid Model** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models)

### I

- **IaC** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models)
- **ICD** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [7](#chapter-7--stack-recipes)
- **Incident Management Loop** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models)
- **Incident Report** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [6](#chapter-6--lifecycle-models)
- **Index** — [A](#appendix-a--glossary-of-terms), [8](#chapter-8--best-practices--anti-patterns)
- **IQ/OQ/PQ** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [5](#chapter-5--starter-templates), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes), [8](#chapter-8--best-practices--anti-patterns)

### K

- **Kanban** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models)
- **KB Article** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix)

### L

- **LICENSE** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes)
- **Living Document** — [A](#appendix-a--glossary-of-terms), [7](#chapter-7--stack-recipes), [8](#chapter-8--best-practices--anti-patterns)
- **LLD** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [7](#chapter-7--stack-recipes)

### M

- **Meeting Minutes** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide)
- **Mega-Doc** — [A](#appendix-a--glossary-of-terms), [8](#chapter-8--best-practices--anti-patterns)
- **Metric Definition** — [A](#appendix-a--glossary-of-terms), [7](#chapter-7--stack-recipes)
- **Migration Guide** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [7](#chapter-7--stack-recipes)
- **Model Card** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes)
- **Model Lineage** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models)
- **Monitoring Plan** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models)
- **MRD** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix)

### N

- **NFR** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [5](#chapter-5--starter-templates)

### O

- **On-Call Guide** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [6](#chapter-6--lifecycle-models)
- **Onboarding Document** — [A](#appendix-a--glossary-of-terms)
- **One-Pager** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [7](#chapter-7--stack-recipes)
- **Open-Source Lifecycle** — [A](#appendix-a--glossary-of-terms)
- **OpenAPI** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [7](#chapter-7--stack-recipes), [8](#chapter-8--best-practices--anti-patterns)

### P

- **PASTA** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models)
- **PI Planning** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models)
- **Pipeline-as-Code** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models)
- **Playbook** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [6](#chapter-6--lifecycle-models)
- **Postmortem** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [5](#chapter-5--starter-templates), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes), [8](#chapter-8--best-practices--anti-patterns)
- **PRD** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [5](#chapter-5--starter-templates), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes), [8](#chapter-8--best-practices--anti-patterns)
- **Premature Process** — [A](#appendix-a--glossary-of-terms), [8](#chapter-8--best-practices--anti-patterns)
- **Project Charter** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [5](#chapter-5--starter-templates)

### Q

- **Quick Start Guide** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain)

### R

- **RACI Matrix** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [5](#chapter-5--starter-templates), [7](#chapter-7--stack-recipes)
- **RCA** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [5](#chapter-5--starter-templates)
- **README** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes), [8](#chapter-8--best-practices--anti-patterns)
- **Reference** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [7](#chapter-7--stack-recipes), [8](#chapter-8--best-practices--anti-patterns)
- **Release Notes** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [5](#chapter-5--starter-templates), [8](#chapter-8--best-practices--anti-patterns)
- **Retrospective** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [6](#chapter-6--lifecycle-models)
- **RFC** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [5](#chapter-5--starter-templates)
- **RFP / RFI / RFQ** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [5](#chapter-5--starter-templates), [6](#chapter-6--lifecycle-models), [8](#chapter-8--best-practices--anti-patterns)
- **Risk Register** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [7](#chapter-7--stack-recipes), [8](#chapter-8--best-practices--anti-patterns)
- **RLS** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix)
- **Roadmap** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [7](#chapter-7--stack-recipes)
- **RPO** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide)
- **RTM** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes)
- **RTO** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide)
- **Runbook** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [5](#chapter-5--starter-templates), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes), [8](#chapter-8--best-practices--anti-patterns)

### S

- **SAD** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes)
- **SAFe** — [A](#appendix-a--glossary-of-terms), [3](#chapter-3--lifecycle-phase-guide), [6](#chapter-6--lifecycle-models)
- **SBOM** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes)
- **Scaled Agile** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models)
- **Scrum** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models)
- **SDLC** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [6](#chapter-6--lifecycle-models)
- **SECURITY.md** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes)
- **Sequence Diagram** — [A](#appendix-a--glossary-of-terms), [3](#chapter-3--lifecycle-phase-guide), [5](#chapter-5--starter-templates), [8](#chapter-8--best-practices--anti-patterns)
- **Shift-Left** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models)
- **Single Source of Truth** — [A](#appendix-a--glossary-of-terms), [4](#chapter-4--ownership--cadence-matrix), [8](#chapter-8--best-practices--anti-patterns)
- **SLA** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix)
- **SLI** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix)
- **SLO** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [5](#chapter-5--starter-templates)
- **SOP** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix)
- **SOW** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide)
- **SRS** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes)
- **SSDLC** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes)
- **Staleness Test** — [A](#appendix-a--glossary-of-terms), [4](#chapter-4--ownership--cadence-matrix), [8](#chapter-8--best-practices--anti-patterns)
- **Status Report** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes), [8](#chapter-8--best-practices--anti-patterns)
- **Stranger Test** — [A](#appendix-a--glossary-of-terms), [4](#chapter-4--ownership--cadence-matrix), [6](#chapter-6--lifecycle-models), [8](#chapter-8--best-practices--anti-patterns)
- **STRIDE** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [6](#chapter-6--lifecycle-models)
- **Style Guide** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix)

### T

- **TDD** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [5](#chapter-5--starter-templates)
- **Test Case** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [6](#chapter-6--lifecycle-models)
- **Test Plan** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes)
- **Test Strategy** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix)
- **Threat Model** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes), [8](#chapter-8--best-practices--anti-patterns)
- **Time-to-Onboard** — [A](#appendix-a--glossary-of-terms), [8](#chapter-8--best-practices--anti-patterns)
- **Tool Sprawl** — [A](#appendix-a--glossary-of-terms), [7](#chapter-7--stack-recipes), [8](#chapter-8--best-practices--anti-patterns)
- **Tribal Knowledge** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [6](#chapter-6--lifecycle-models), [8](#chapter-8--best-practices--anti-patterns)
- **Tutorial** — [A](#appendix-a--glossary-of-terms), [8](#chapter-8--best-practices--anti-patterns)

### U

- **UAT (User Acceptance Testing) Plan** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide)
- **Use Case Document** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [5](#chapter-5--starter-templates)
- **User Guide** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [6](#chapter-6--lifecycle-models), [7](#chapter-7--stack-recipes)
- **User Story** — [A](#appendix-a--glossary-of-terms)
- **UX Copy** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain)

### V

- **Validation Documentation** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [7](#chapter-7--stack-recipes)
- **Vendor Risk Assessment** — [A](#appendix-a--glossary-of-terms), [3](#chapter-3--lifecycle-phase-guide), [4](#chapter-4--ownership--cadence-matrix), [7](#chapter-7--stack-recipes)

### W

- **Water-Scrum-Fall** — [A](#appendix-a--glossary-of-terms), [6](#chapter-6--lifecycle-models)
- **Waterfall** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [6](#chapter-6--lifecycle-models)
- **WBS** — [A](#appendix-a--glossary-of-terms), [2](#chapter-2--glossary-by-domain), [3](#chapter-3--lifecycle-phase-guide), [7](#chapter-7--stack-recipes)
- **Write-Only Doc** — [A](#appendix-a--glossary-of-terms), [8](#chapter-8--best-practices--anti-patterns)
