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
