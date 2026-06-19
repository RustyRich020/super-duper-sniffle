// Chapter list and the inline Chapter 1 markdown, ported verbatim from the
// prototype's build(). Files now resolve to /content/<name>.md (prototype
// fetched uploads/<name>.md).

export const CH1 = [
  '## How This Book Is Organized', '',
  'A complete field guide to software development documentation — every major document type, organized multiple ways, with lifecycle models, prescriptive stacks for different kinds of organization, ready-to-use templates, and the practices that keep it all from rotting.', '',
  '| Chapter | Contents | Use it when |', '|---|---|---|',
  '| 2 · Glossary by Domain | ~70 document types grouped by discipline, plus a disambiguation cheat sheet | You need to look up *what a document is* |',
  '| 3 · Lifecycle-Phase Guide | The documents arranged chronologically across 8 phases and 3 parallel tracks | You need to know *when a document is created* |',
  '| 4 · Ownership & Cadence Matrix | One table — owner, audience, trigger, cadence, home — plus health heuristics | You are assigning owners or auditing doc health |',
  '| 5 · Starter Templates | Copy-paste skeletons for the 8 highest-value documents | You need to write one *right now* |',
  '| 6 · Lifecycle Models | How documentation bends across Waterfall, Scrum, Kanban, SSDLC, Data/ML and more | You are working within a delivery model |',
  '| 7 · Stack Recipes | Prescriptive doc stacks for startup, scaling, enterprise, regulated, OSS and data teams | You are deciding what to actually adopt |',
  '| 8 · Best Practices & Anti-Patterns | Writing, maintenance and review practices, plus a named anti-pattern catalog | You want docs that earn their keep |', '',
  '## Three Concepts That Organize Everything', '',
  '**1. Documents answer different questions.** Every type exists to answer one dominant question — *why* (business case, BRD), *what* (PRD, stories), *how* (design doc, LLD), *how do I operate it* (runbook), *what happened* (incident report, postmortem), *who decided and why* (ADR, decision log). When two documents seem redundant, check whether they answer different questions — usually they do.', '',
  '**2. Frozen records vs. living documents.** Some documents are *records* of a moment — ADRs, RFCs, postmortems, change requests, audit trails. They are never edited after the fact; new reality gets a new record that supersedes the old. Others are *living* — READMEs, runbooks, API specs, risk registers — where staleness is a defect and editing is the job. Most documentation dysfunction traces to confusing these two modes. In regulated environments this distinction becomes legally load-bearing.', '',
  '**3. Heaviness should match risk and rhythm.** A two-person startup needs READMEs, a few ADRs, and runbooks. A regulated platform additionally needs SOPs, audit evidence, validation records, and traceability — because regulators ask for them by name. A fast-iterating product documents differently than a fixed-scope waterfall build. The formats here range from one paragraph (ADR) to hundreds of pages (SRS); adopt the lightest format that manages the actual risk at the actual pace of the work.', '',
  '## The Universal Minimum', '',
  'Under every recipe, model, and methodology, three things are non-negotiable:', '',
  '    README      what is this and how do I run it',
  '    ADRs        a record of why we decided what we decided',
  '    Runbooks    how to operate it when it matters', '',
  'Everything else in this book is added in response to a specific, felt problem — never adopted because a framework said so. The goal is never "complete documentation." The goal is documentation a reader trusts, finds, and acts on correctly. Every doc that does not meet that bar is overhead wearing the costume of diligence.',
].join('\n');

export type Chapter = {
  id: string;
  kind: 'Chapter' | 'Appendix';
  num: string;
  title: string;
  desc: string;
  md?: string;
  file?: string;
};

export const CHAPTERS: Chapter[] = [
  { id: 'ch-1', kind: 'Chapter', num: '01', title: 'Introduction', md: CH1,
    desc: 'How the book is organized — and the three ideas underneath every recipe, model, and template that follows.' },
  { id: 'ch-2', kind: 'Chapter', num: '02', title: 'Glossary by Domain', file: '/content/development-documentation-glossary.md',
    desc: 'About seventy document types grouped by discipline, each with what it is and when to reach for it — plus a disambiguation cheat sheet.' },
  { id: 'ch-3', kind: 'Chapter', num: '03', title: 'Lifecycle-Phase Guide', file: '/content/lifecycle-phase-guide.md',
    desc: 'The same documents arranged chronologically across eight phases and three parallel tracks, with the exit artifact that ends each phase.' },
  { id: 'ch-4', kind: 'Chapter', num: '04', title: 'Ownership & Cadence Matrix', file: '/content/ownership-cadence-matrix.md',
    desc: 'One operational table — owner, audience, trigger, update cadence, home — followed by heuristics for auditing documentation health.' },
  { id: 'ch-5', kind: 'Chapter', num: '05', title: 'Starter Templates', file: '/content/starter-templates.md',
    desc: 'Copy-paste skeletons for the eight highest-leverage documents, with inline guidance you delete as you fill them in.' },
  { id: 'ch-6', kind: 'Chapter', num: '06', title: 'Lifecycle Models', file: '/content/lifecycle-models.md',
    desc: 'How documentation bends across ten delivery models — from Waterfall to the incident loop to open source — and how to pick one.' },
  { id: 'ch-7', kind: 'Chapter', num: '07', title: 'Stack Recipes', file: '/content/stack-recipes.md',
    desc: 'Prescriptive documentation stacks for six kinds of team, from the early-stage startup to the regulated platform.' },
  { id: 'ch-8', kind: 'Chapter', num: '08', title: 'Best Practices & Anti-Patterns', file: '/content/best-practices-antipatterns.md',
    desc: 'Writing, maintenance, and review practices that keep docs alive — plus a catalog of the named ways documentation goes wrong.' },
  { id: 'ap-a', kind: 'Appendix', num: 'A', title: 'Glossary of Terms', file: '/content/glossary-of-terms.md',
    desc: 'A flat A–Z reference: every document type, methodology, acronym, and concept in the book, defined in a sentence or two.' },
  { id: 'ap-b', kind: 'Appendix', num: 'B', title: 'Index', file: '/content/index.md',
    desc: 'An alphabetical map of terms to where they appear across the chapters and the glossary.' },
];
