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
