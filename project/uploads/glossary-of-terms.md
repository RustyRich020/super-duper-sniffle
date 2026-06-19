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
