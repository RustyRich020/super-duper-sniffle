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
