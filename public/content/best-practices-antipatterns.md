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
