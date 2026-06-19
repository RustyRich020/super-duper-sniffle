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
