// Bespoke Example + "Why it matters" content for the generated forms,
// keyed by form id (snake of code) → exact section label → { ex, why }.
// The 4 anchor forms (PRD, ADR, Postmortem, Onboarding) carry their own rich content.
(function () {
const R = {
  // ---------- 1. Product & Requirements ----------
  brd: {
    "Business objective & why now": { ex: "Cut manual invoice-processing cost 40% before FY close, while headcount is frozen.", why: "Anchoring to a business objective stops the project drifting into features finance never asked for." },
    "Stakeholders & needs": { ex: "Finance needs audit trails; AP clerks need faster entry; the CFO needs the close two days sooner.", why: "Listing each stakeholder's need surfaces conflicts before they become change requests." },
    "Expected outcomes & benefits": { ex: "≈ $300k/yr saved, a 2-day faster close, fewer late-payment penalties.", why: "Quantified benefits are what the steering committee actually approves budget against." },
    "Constraints & assumptions": { ex: "Must stay on the existing ERP; assumes the vendor API rate limits hold.", why: "Unstated assumptions are the most common root cause of a project missing its date." },
    "Success criteria": { ex: "The monthly close completes by business day 3 for two consecutive months.", why: "Without an agreed finish line, 'done' becomes a matter of opinion." }
  },
  mrd: {
    "Market opportunity": { ex: "SMB e-invoicing is a $2.1B market growing 14%/yr as e-invoice mandates spread.", why: "Sizing the opportunity separates a real market from a personal hunch." },
    "Target customers & segments": { ex: "Primary: 10–200-seat finance teams in the EU facing the 2026 mandate.", why: "A named segment focuses every later trade-off; 'everyone' is not a segment." },
    "Competitive landscape": { ex: "Incumbent A is enterprise-only and slow; B is cheap but lacks compliance.", why: "Knowing where rivals are weak is where your wedge into the market lives." },
    "Market-driven needs": { ex: "Buyers demand guaranteed regulatory compliance over breadth of features.", why: "Needs the market actually pays for should outrank features you find interesting." },
    "Go / no-go rationale": { ex: "Go: regulatory tailwind + weak incumbents + existing distribution.", why: "Writing the rationale down lets you revisit the call honestly when conditions change." }
  },
  frd_frs: {
    "Scope & context": { ex: "Covers the invoice-capture module only; billing and payments are separate specs.", why: "A bounded scope is what makes the rest of the spec finishable and reviewable." },
    "Functional requirements": { ex: "The system shall reject any invoice missing a tax ID and surface the reason.", why: "'Shall' statements are individually testable — exactly what QA builds cases from." },
    "Inputs & outputs": { ex: "Input: a PDF/UBL invoice. Output: a validated record plus an error report.", why: "Pinning down I/O early prevents two teams building incompatible interfaces." },
    "Business rules": { ex: "Invoices over €10k require a second approver before posting.", why: "Capturing rules as data, not lore, keeps logic consistent across releases." },
    "Dependencies": { ex: "Depends on the tax-validation service and the ERP posting API.", why: "Naming dependencies turns hidden blockers into scheduled, ownable work." }
  },
  srs: {
    "Purpose & scope": { ex: "Specifies the e-invoicing platform for EU compliance; excludes US sales tax.", why: "A precise scope statement is the contract reviewers and auditors hold you to." },
    "Functional requirements": { ex: "FR-12: the system shall store every invoice immutably for 10 years.", why: "Numbered functional requirements are what a traceability matrix maps tests to." },
    "Non-functional requirements": { ex: "99.9% uptime; p95 validation under 2s; WCAG 2.1 AA.", why: "Quality attributes written as numbers are the only way to test 'good enough.'" },
    "External interfaces": { ex: "ERP REST API, the government e-invoice gateway, SSO via SAML.", why: "Documenting interfaces up front lets integration start before the UI is done." },
    "Approvals": { ex: "Lead Engineer · QA Lead · Compliance — signed at baseline.", why: "In regulated work, the signed approval row is the evidence an auditor asks for." }
  },
  nfr: {
    "Performance & latency targets": { ex: "p95 page load < 1.5s; invoice validation < 2s at 50 req/s.", why: "Performance only counts when it's a number you can measure and fail against." },
    "Availability & reliability": { ex: "99.9% monthly uptime; graceful degradation if the tax service is down.", why: "Stating the target sets the architecture — you can't add reliability cheaply later." },
    "Scalability": { ex: "Handle 10× invoice volume at quarter-end without re-architecture.", why: "Designing for the known peak avoids the rewrite that peak would otherwise force." },
    "Security & compliance": { ex: "Encrypt at rest and in transit; meet GDPR and SOC 2 controls.", why: "Security stated as requirements gets it built in, rather than bolted on at the end." },
    "Accessibility": { ex: "WCAG 2.1 AA; full keyboard navigation; screen-reader labels.", why: "Naming the standard makes accessibility testable and non-optional." }
  },
  stories_epics: {
    "Epic / theme": { ex: "Epic: 'Frictionless invoice capture' — cut manual entry to near zero.", why: "An epic gives a set of stories a shared goal so they don't pull in different directions." },
    "Story": { ex: "As an AP clerk, I want to drag-drop a PDF so that I skip manual typing.", why: "The user-voice format keeps the story about an outcome, not an implementation." },
    "Acceptance criteria": { ex: "Given a valid PDF, when dropped, then a draft record appears in under 3s.", why: "Acceptance criteria are the line between 'I think it's done' and 'it's done.'" },
    "Estimate & priority": { ex: "5 points · P1 — high value, moderate effort.", why: "An estimate plus a priority is what lets the team sequence work honestly." },
    "Dependencies": { ex: "Needs the OCR service deployed; blocked until then.", why: "Surfacing dependencies on the story keeps sprint commitments realistic." }
  },
  ac_dod: {
    "Story / item": { ex: "Story 142 — drag-and-drop invoice upload.", why: "Naming the item keeps the criteria attached to the thing being judged." },
    "Acceptance criteria": { ex: "Given a 20MB PDF, when uploaded, then it's accepted with a progress bar.", why: "Given/When/Then is unambiguous, so QA and the author can't disagree on 'done.'" },
    "Definition of Done": { why: "A shared checklist stops 'done' from quietly meaning 'works on my machine.'" },
    "Notes": { ex: "Edge case: corrupt PDFs should fail with a clear, human-readable message.", why: "A place for caveats keeps them out of code comments nobody reads." }
  },
  use_case: {
    "Actor & goal": { ex: "Actor: an AP clerk. Goal: capture an invoice into the ledger.", why: "Naming the actor and their goal frames every step that follows." },
    "Preconditions": { ex: "The clerk is authenticated and the vendor already exists in the system.", why: "Stated preconditions stop the flow from assuming a state that isn't guaranteed." },
    "Main flow": { ex: "1) Upload PDF  2) System extracts fields  3) Clerk confirms  4) Record posts.", why: "A numbered happy path is the spine the alternate flows branch off of." },
    "Alternate & exception flows": { ex: "2a) Extraction fails → the clerk enters the fields manually.", why: "Most real-world bugs live in the exception flows people skip documenting." },
    "Postconditions": { ex: "A posted, immutable invoice record exists with an audit entry.", why: "Defining the end state is how you know the use case actually completed." }
  },
  vision: {
    "Vision statement": { ex: "Make compliant invoicing invisible — it just happens, correctly, everywhere.", why: "A north star aligns a hundred small decisions no roadmap could enumerate." },
    "Target users & problem": { ex: "Finance teams drowning in manual, error-prone, mandate-driven invoicing.", why: "A vision tethered to a real user problem resists becoming a slogan." },
    "Strategic pillars": { ex: "1) Compliance by default  2) Zero manual entry  3) Open integrations.", why: "Pillars are the few bets everything else must ladder up to." },
    "1–3 year outcomes": { ex: "Year 1: EU mandate. Year 2: five markets. Year 3: platform APIs.", why: "Time-phased outcomes turn an aspiration into something you can be held to." },
    "What we won’t do": { ex: "Not building general accounting; not chasing enterprise RFPs yet.", why: "Naming the non-goals protects focus louder than the goals do." }
  },
  roadmap: {
    "Now": { ex: "Shipping EU e-invoice validation and drag-drop capture.", why: "'Now' should be a short, committed list — anything longer isn't really now." },
    "Next": { ex: "Multi-entity support and the approvals workflow.", why: "'Next' signals direction without pretending to a precision you don't have." },
    "Later": { ex: "Marketplace integrations and an open public API.", why: "'Later' parks good ideas honestly instead of over-promising dates." },
    "Themes & bets": { ex: "Bet: compliance is the wedge, not breadth of features.", why: "Stating the bet lets you judge the roadmap when the bet is proven or wrong." },
    "Dependencies & risks": { ex: "Hinges on the government gateway API stabilizing in Q2.", why: "A roadmap that ignores its dependencies is a wish list with dates." }
  },
  one_pager: {
    "Problem": { ex: "Clerks rekey 300 invoices a day; 12% carry costly errors.", why: "A sharp problem statement is what earns the reader's next thirty seconds." },
    "Proposal": { ex: "Add drag-drop capture with auto-extraction and validation.", why: "The proposal must be concrete enough to picture, brief enough to skim." },
    "Impact": { ex: "≈ $300k/yr saved and a 2-day faster close.", why: "Quantified impact is what turns a good idea into a funded one." },
    "The ask": { ex: "Two engineers for one quarter, plus design support.", why: "A clear ask makes it easy for a sponsor to say yes — or to counter." },
    "Open questions": { ex: "Build OCR in-house or buy? Block or warn on partial failures?", why: "Listing the unknowns invites the input you actually need to decide." }
  },
  rfp_rfi_rfq: {
    "Background & need": { ex: "We need an e-invoice validation engine for the 2026 EU mandate.", why: "Context tells vendors what problem to solve, not just which box to tick." },
    "Scope of work / questions": { ex: "Validate UBL, integrate with our ERP, support 10 EU countries.", why: "A precise scope is what makes vendor responses comparable side by side." },
    "Requirements & evaluation criteria": { ex: "Weighted: compliance 40%, integration 30%, price 20%, support 10%.", why: "Publishing the scoring up front keeps selection defensible and fair." },
    "Submission instructions & timeline": { ex: "PDF proposal by Mar 15; demos the week of Mar 22; decision Apr 1.", why: "Clear logistics cut the back-and-forth that delays procurement." },
    "Budget / pricing": { ex: "Per-invoice and flat-tier pricing, with a 3-year total cost of ownership.", why: "Asking for pricing in one format is the only way to compare apples to apples." }
  },

  // ---------- 2. Architecture & Design ----------
  rfc: {
    "Problem & motivation": { ex: "Our monolith's deploys take 40 minutes and block every team.", why: "Stating the motivation lets reviewers judge the proposal against the real pain, not its elegance." },
    "Proposal": { ex: "Split the deploy pipeline per service, with independent release trains.", why: "A concrete proposal is what reviewers can actually poke holes in before you build it." },
    "Alternatives": { ex: "Considered: feature flags only; a full microservices rewrite.", why: "Showing the roads not taken is what stops the same debate reopening in three months." },
    "Impact & migration": { ex: "A two-week migration; teams cut over one service at a time.", why: "Naming the migration cost is what turns 'good idea' into schedulable work." },
    "Unresolved questions": { ex: "How do we handle shared DB migrations across trains?", why: "Flagging the open questions invites the expertise that de-risks the decision." }
  },
  design_doc: {
    "Summary": { ex: "Add an async OCR pipeline that turns uploaded invoices into draft records.", why: "A one-paragraph summary lets a busy reviewer decide whether to read on." },
    "Background & requirements": { ex: "Must handle 5k invoices/day, < 3s perceived latency, retries on failure.", why: "Restating requirements keeps the design honest about what it actually has to satisfy." },
    "Proposed design": { ex: "Upload → queue → OCR worker → validation → draft record (S3 + SQS + Lambda).", why: "The proposed design is the doc's core — everything else exists to justify it." },
    "Alternatives considered": { ex: "Synchronous OCR (too slow); a third-party API (cost at volume).", why: "Documented alternatives are what prove the choice was reasoned, not defaulted." },
    "Cross-cutting concerns": { ex: "PII encrypted; a poison-message queue; p95 under 3s.", why: "Security, performance and failure modes are where designs quietly fall apart if unaddressed." },
    "Rollout plan": { ex: "Shadow mode → 5% → 100%, with a kill switch.", why: "A staged rollout is how a design survives contact with real traffic." }
  },
  hld: {
    "System context": { ex: "The invoicing service sits between the web app, the ERP, and the gov gateway.", why: "The context boundary tells everyone what's in the system and what it merely talks to." },
    "Major components & services": { ex: "Capture API, OCR worker, validation engine, posting adapter.", why: "Naming the major parts is what lets teams divide the work without overlap." },
    "Integrations & data flow": { ex: "Web → Capture API → queue → OCR → validation → ERP posting.", why: "Tracing the data flow surfaces the interfaces that will need contracts." },
    "Key decisions": { ex: "Event-driven over request/response; Postgres over a document store.", why: "Recording key decisions here points readers to the ADRs behind them." },
    "Risks": { ex: "Gateway downtime; OCR accuracy on scanned invoices.", why: "Listing risks early is how they become mitigations instead of incidents." }
  },
  lld: {
    "Module / component": { ex: "The validation engine within the invoicing service.", why: "Scoping to one component keeps low-level detail from sprawling unreadably." },
    "Classes & data structures": { ex: "InvoiceValidator, RuleSet, ValidationResult{ errors[], warnings[] }.", why: "Concrete types are what let two engineers build against each other without guessing." },
    "Algorithms / logic": { ex: "Run rules in priority order; short-circuit on the first hard failure.", why: "Spelling out the logic is where edge-case bugs get caught on paper, not in prod." },
    "Schema & interfaces": { ex: "validate(invoice) → ValidationResult; a rules table keyed by country.", why: "Pinned interfaces are the seams that make the component testable and replaceable." },
    "Error handling": { ex: "Transient errors retry 3×; hard failures route to a review queue.", why: "Defining error paths up front stops them from becoming silent data loss." }
  },
  sad: {
    "Logical view": { ex: "Domain modules: Capture, Validation, Posting, Audit.", why: "The logical view shows what the system is, independent of how it's deployed." },
    "Process view": { ex: "Async workers consume a queue; one validation process per region.", why: "The process view is where concurrency and performance behaviour become legible." },
    "Deployment view": { ex: "ECS services across two AZs; RDS Multi-AZ; SQS.", why: "The deployment view is what ops and SRE plan capacity and failover from." },
    "Data view": { ex: "Invoices, rules, audit log; 10-year immutable retention.", why: "The data view is where retention, ownership, and compliance get pinned down." },
    "Architectural decisions": { ex: "Event-driven, multi-region, immutable audit store — see ADR-3/7/9.", why: "Linking the decisions keeps the formal doc anchored to the reasoning behind it." }
  },
  c4: {
    "Level 1 — System context": { ex: "The invoicing system, its users (AP clerks), and external systems (ERP, gateway).", why: "The context diagram orients newcomers before any internal detail overwhelms them." },
    "Level 2 — Containers": { ex: "Web app, Capture API, OCR worker, validation service, Postgres.", why: "Containers show the deployable units and how they communicate." },
    "Level 3 — Components": { ex: "Inside validation: RuleLoader, Validator, ResultBuilder.", why: "The component level is detailed enough to guide code, abstract enough to stay current." },
    "Notes & legend": { ex: "Solid = sync call, dashed = async event; colours by team.", why: "A legend is what keeps a diagram from meaning different things to different readers." }
  },
  erd: {
    "Entities & attributes": { ex: "Invoice(id, vendor_id, total, status); Vendor(id, name, tax_id).", why: "Listing entities and attributes is the vocabulary the schema and the team share." },
    "Diagram": { ex: "Vendor 1—∞ Invoice; Invoice 1—∞ LineItem.", why: "The relationship lines are where cardinality bugs get caught before migration." },
    "Keys & constraints": { ex: "PK invoice.id; FK vendor_id; unique(vendor_id, invoice_no).", why: "Keys and constraints enforce integrity the application can't be trusted to." }
  },
  dfd: {
    "External entities, processes & stores": { ex: "Entity: AP clerk. Process: validate. Store: invoice DB.", why: "Naming the pieces first is what makes the flow diagram unambiguous." },
    "Diagram": { ex: "Clerk → [Capture] → invoice store → [Validate] → ERP.", why: "Seeing data move surfaces where it's transformed, stored, and could leak." },
    "Notes": { ex: "All flows crossing the trust boundary are encrypted.", why: "Notes capture the constraints a box-and-arrow diagram can't show on its own." }
  },
  sequence: {
    "Participants & scenario": { ex: "Participants: Web, API, Queue, OCR. Scenario: invoice upload.", why: "Naming participants and the scenario bounds the diagram to one clear story." },
    "Diagram — messages over time": { ex: "Web→API: upload; API→Queue: enqueue; OCR→API: result.", why: "Ordering messages over time is how race conditions and missing acks become visible." },
    "Notes & edge cases": { ex: "If OCR times out, the API returns 202 and polls.", why: "The edge cases noted here are exactly the ones integration testing must cover." }
  },
  api_spec: {
    "Endpoints": { ex: "POST /invoices — create; GET /invoices/{id} — fetch.", why: "An endpoint list is the contract front-end and back-end build against in parallel." },
    "Request & payload": { ex: "POST body: { vendorId, file } as multipart; max 20MB.", why: "Specifying payloads precisely is what prevents 'works on my machine' integration bugs." },
    "Responses & status codes": { ex: "201 with { id, status }; 422 on a validation error.", why: "Agreed status codes let clients handle outcomes without scraping message text." },
    "Errors & auth": { ex: "Bearer JWT; 401 unauth, 403 forbidden; error{ code, message }.", why: "A consistent error and auth contract is what makes the API safe to automate against." }
  },
  icd: {
    "Interface overview": { ex: "Defines the invoicing↔ERP posting interface.", why: "The overview states which two systems this contract binds, and nothing else." },
    "Data formats & fields": { ex: "amount — decimal(12,2) in minor units; currency — ISO 4217.", why: "Field-level formats are where integration mismatches are prevented or born." },
    "Protocol & timing": { ex: "HTTPS POST, idempotency key, 5s timeout, hourly batch.", why: "Protocol and timing are what keep two independently-built systems in step." },
    "Error handling & versioning": { ex: "v1 in the path; 409 on duplicate; 6-month deprecation.", why: "Versioning rules are how the interface evolves without breaking the other side." }
  },
  threat_model: {
    "Assets & trust boundaries": { ex: "Assets: invoice PII, the audit log. Boundary: the public API edge.", why: "Naming assets and boundaries focuses the analysis on what's worth protecting." },
    "Threats": { ex: "Spoofed vendor — STRIDE: Spoofing — likelihood: medium.", why: "Enumerating threats by category keeps the review from missing whole classes of attack." },
    "Mitigations": { ex: "mTLS between services; signed webhooks; rate limiting.", why: "Pairing each threat with a mitigation is what turns analysis into actual hardening." },
    "Residual risk": { ex: "Insider misuse accepted, with audit logging and review.", why: "Recording residual risk is the honest record of what you chose to live with." }
  },
  data_dictionary: {
    "Fields": { ex: "invoice_total — numeric(12,2) — gross amount incl. tax.", why: "An authoritative field definition stops two teams meaning different things by 'total.'" },
    "Valid values & constraints": { ex: "status ∈ { draft, validated, posted, rejected }.", why: "Listing valid values is what makes data quality checkable instead of assumed." },
    "Source, lineage & sensitivity": { ex: "Sourced from capture; PII; retained 10 years.", why: "Lineage and sensitivity are what governance and audits ask for by name." }
  },

  // ---------- 3. Engineering & Code ----------
  readme: {
    "What is this": { ex: "invoice-svc — validates and posts e-invoices to the ERP.", why: "One plain sentence up top stops a newcomer from reverse-engineering the purpose." },
    "Install": { ex: "git clone … && pnpm install && cp .env.example .env", why: "Copy-paste install steps are the difference between a 5-minute and a 5-hour first run." },
    "Usage / run": { ex: "pnpm dev starts the API on :3000; pnpm test runs the suite.", why: "Showing how to run and test it makes the repo usable, not just readable." },
    "Configuration": { ex: "DATABASE_URL, GATEWAY_KEY, OCR_ENDPOINT — see .env.example.", why: "Documenting config prevents the 'works locally, breaks in CI' afternoon." },
    "Contributing & license": { ex: "See CONTRIBUTING.md; licensed MIT.", why: "Pointing to contribution rules and the license sets expectations before the first PR." }
  },
  contributing: {
    "Getting started": { ex: "Fork, clone, pnpm install, run pnpm test for a green baseline.", why: "A working baseline lets a contributor tell their change from a pre-existing break." },
    "Branching strategy": { ex: "Trunk-based; short-lived feat/* branches off main.", why: "Stating the branching model prevents the merge chaos of everyone inventing their own." },
    "PR & review process": { ex: "1 approval, green CI, squash-merge; PRs under ~400 lines.", why: "Explicit review rules keep quality consistent as the contributor pool grows." },
    "Coding standards": { ex: "Prettier + ESLint enforced; conventional commits.", why: "Pointing to the standard ends the bikeshedding about style in code review." },
    "Code of conduct": { ex: "Adapted from the Contributor Covenant; report to conduct@…", why: "A stated code of conduct is what makes the project safe for newcomers to join." }
  },
  changelog: {
    "Added": { ex: "Drag-and-drop invoice upload; bulk re-import.", why: "Listing additions lets users discover capability without reading the diff." },
    "Changed": { ex: "Validation now runs async; default timeout raised to 5s.", why: "Documenting changes is how integrators learn what shifted under them." },
    "Fixed": { ex: "Fixed duplicate-posting on retry (#412).", why: "A fix log tells users whether the bug that bit them is actually gone." },
    "Deprecated / removed": { ex: "Deprecated /v0/validate; removed XLSX import.", why: "Announcing removals early spares integrators a surprise breakage." },
    "Breaking changes": { ex: "Auth header renamed X-Api-Key → Authorization.", why: "Calling out breaking changes loudly is the single kindest thing a changelog does." }
  },
  style_guide: {
    "Naming conventions": { ex: "camelCase vars, PascalCase types, SCREAMING_SNAKE consts.", why: "Agreed naming lets anyone read unfamiliar code at a glance." },
    "Formatting": { ex: "2-space indent, 100-col lines, trailing commas — via Prettier.", why: "Delegating formatting to a tool ends the diffs that are pure whitespace noise." },
    "Patterns to use": { ex: "Result types over thrown errors in the domain layer.", why: "Naming the blessed patterns is how a codebase stays coherent across many authors." },
    "Anti-patterns to avoid": { ex: "No business logic in controllers; no 'any'.", why: "An explicit don't-do list catches the recurring review comment once, for everyone." },
    "Tooling & linters": { ex: "ESLint, Prettier, tsc --strict in CI.", why: "Listing the tooling makes the standard enforced rather than aspirational." }
  },
  api_reference: {
    "Endpoint & method": { ex: "POST /v1/invoices — create an invoice.", why: "Leading with the exact endpoint is what a developer scans for first." },
    "Parameters": { ex: "vendorId — string — required; file — binary — required.", why: "A parameter table is the contract that prevents trial-and-error against the API." },
    "Responses & errors": { ex: "201 { id }; 422 { code, message } on validation failure.", why: "Documenting every response lets clients handle the unhappy path on purpose." },
    "Example": { ex: "curl -F file=@inv.pdf -F vendorId=42 …/v1/invoices", why: "A copy-paste example is the fastest path from reading the docs to a working call." }
  },
  docstrings: {
    "Function / class & purpose": { ex: "validateInvoice(inv): checks an invoice against country rules.", why: "A one-line purpose at the definition makes the symbol self-explaining at the call site." },
    "Parameters": { ex: "inv — Invoice — the parsed invoice to validate.", why: "Documenting params inline is what your IDE surfaces to the next caller automatically." },
    "Returns & throws": { ex: "Returns ValidationResult; throws on a malformed invoice.", why: "Stating returns and throws lets callers handle outcomes without reading the body." },
    "Example / gotchas": { ex: "Note: mutates inv.status; not safe to call concurrently.", why: "Capturing gotchas at the source is where they actually get read — unlike a wiki." }
  },
  integration_guide: {
    "Prerequisites": { ex: "An API key, Node 18+, and a sandbox tenant.", why: "Listing prerequisites first stops a developer hitting a wall on step 3." },
    "Authentication setup": { ex: "Create a key in the dashboard; send Authorization: Bearer.", why: "Auth is where most integrations stall, so it earns its own clear section." },
    "Quickstart": { ex: "Install the SDK, init with your key, post your first invoice in ~5 lines.", why: "A fast first success convinces a developer the integration is worth finishing." },
    "Code samples": { ex: "Runnable snippets in JS, Python, and curl.", why: "Working samples in the reader's language are what they'll copy instead of writing from scratch." },
    "Troubleshooting": { ex: "401 → check the key; 422 → check required fields.", why: "A troubleshooting list deflects the most common support tickets before they're filed." }
  },
  release_notes: {
    "Highlights": { ex: "Async validation cuts upload latency by 60%.", why: "Leading with highlights is what a busy user reads before deciding to upgrade." },
    "New features": { ex: "Bulk import, webhook events, multi-currency.", why: "A feature list is how customers discover value they're already paying for." },
    "Fixes": { ex: "Resolved duplicate-posting and timezone drift.", why: "Naming fixes tells users whether their specific pain was addressed." },
    "Breaking changes": { ex: "The v0 validate endpoint is removed.", why: "Surfacing breakage in user-facing notes prevents an upgrade from becoming an outage." },
    "Upgrade steps": { ex: "Bump to 2.0, rename the auth header, redeploy.", why: "Concrete upgrade steps turn a scary version bump into a checklist." }
  },
  migration_guide: {
    "Overview": { ex: "Moving from the v1 sync API to the v2 async pipeline.", why: "An overview frames the size of the move so teams can budget for it." },
    "Breaking changes": { ex: "Responses are now 202 + webhook, not a synchronous 201.", why: "Front-loading breaking changes lets readers assess effort before starting." },
    "Deprecated features": { ex: "Inline validation errors → fetched from the events API.", why: "Listing deprecations is how teams plan the work instead of discovering it mid-cutover." },
    "Step-by-step migration": { ex: "1) Add a webhook  2) Switch the client  3) Backfill  4) Remove v1.", why: "An ordered, reversible sequence is what makes a risky migration survivable." },
    "Rollback": { ex: "Re-point the client to /v1; v1 stays live for 90 days.", why: "A documented rollback is the safety net that lets a team start the migration at all." }
  },

  // ---------- 4. Operations, SRE & Support ----------
  runbook: {
    "When to use": { ex: "Alert: 'invoice queue depth > 5k for 10 min.'", why: "A precise trigger is what lets a half-asleep on-call know this is the right runbook." },
    "Prerequisites": { ex: "AWS console access; kubectl context set to prod.", why: "Listing prerequisites avoids discovering a missing permission mid-incident." },
    "Steps": { ex: "1) Check OCR worker health  2) Scale workers to 6  3) Confirm drain.", why: "Numbered, literal steps are what make a procedure runnable under stress at 3am." },
    "Verification": { ex: "Queue depth < 500 within 10 min; no 5xx in logs.", why: "A verification step is how you know you fixed it, not just changed something." },
    "Rollback & escalation": { ex: "Revert scaling; page the platform lead if depth keeps rising.", why: "A defined exit is what stops a stuck responder improvising at the worst moment." }
  },
  playbook: {
    "Situation class": { ex: "Elevated error rate on the invoicing API.", why: "Naming the class of situation tells the responder whether this playbook applies at all." },
    "Diagnosis branches": { ex: "DB slow? → check the pool. Upstream 5xx? → check the gateway.", why: "Branching diagnosis is what turns a vague 'investigate' into a decision tree." },
    "Decision criteria": { ex: "If the error budget is < 10% remaining, freeze deploys.", why: "Pre-agreed criteria remove judgment calls from the heat of the moment." },
    "Actions per branch": { ex: "Gateway down → switch to retry-with-backoff mode.", why: "Mapping each branch to an action is what makes the playbook actually actionable." },
    "Escalation": { ex: "No resolution in 30 min → page the SRE lead.", why: "A clear escalation point prevents a lone responder owning an outage too long." }
  },
  sop: {
    "Purpose & scope": { ex: "Monthly close of the invoicing ledger; excludes payroll.", why: "A bounded purpose is what keeps an SOP auditable and finishable." },
    "Responsibilities": { ex: "The AP clerk executes; the finance lead approves.", why: "Naming roles is how an SOP assigns accountability instead of assuming it." },
    "Procedure steps": { ex: "1) Lock the period  2) Reconcile  3) Generate report  4) Sign off.", why: "Literal, ordered steps make the process repeatable by anyone, not just the author." },
    "Records & evidence": { ex: "Archive the signed reconciliation and approval emails.", why: "In regulated work, the retained evidence is the whole point of the SOP." },
    "Review & approval": { ex: "Process owner · Compliance — reviewed annually.", why: "A signed review row is what proves the procedure is current, not abandoned." }
  },
  incident_report: {
    "Summary": { ex: "Invoice posting halted for 40 min after a gateway change.", why: "A one-line summary orients everyone joining the incident channel late." },
    "Impact": { ex: "~1,200 invoices delayed; no data loss.", why: "Quantified impact is what sets the severity and the urgency of the response." },
    "Timeline": { ex: "09:02 alert fired; 09:10 cause found; 09:42 resolved.", why: "A timestamped timeline is the raw material the postmortem is built from." },
    "Actions taken & current status": { ex: "Rolled back the gateway config; monitoring; status green.", why: "Recording actions and status in real time keeps responders from duplicating work." }
  },
  on_call_guide: {
    "Rotation & schedule": { ex: "Weekly rotation, Mon 10:00 handoff, two engineers deep.", why: "A clear schedule is what makes coverage a guarantee, not a hope." },
    "Severity definitions": { ex: "Sev1 = customer-facing outage; Sev3 = degraded, no impact.", why: "Shared severity definitions align response speed across the whole team." },
    "Escalation paths": { ex: "Primary → secondary (15 min) → eng manager (30 min).", why: "An escalation ladder ensures no page goes unanswered into the void." },
    "Tooling & access": { ex: "PagerDuty, the runbook index, prod kubectl, the status page.", why: "Listing the tools up front spares the on-call a scavenger hunt mid-incident." },
    "Handoff checklist": { why: "A handoff checklist is what stops context — and open incidents — from falling through the cracks." }
  },
  dr_plan: {
    "Scope & objectives": { ex: "Restore invoicing within RTO 4h, RPO 15 min.", why: "Stated RTO/RPO targets are what every recovery decision is measured against." },
    "Backup procedures": { ex: "Hourly RDS snapshots; cross-region replication.", why: "Documenting backups is meaningless unless the restore path is documented with them." },
    "Failover steps": { ex: "1) Promote the replica  2) Repoint DNS  3) Verify posting.", why: "A rehearsed, written failover is the difference between 4 hours and 4 days down." },
    "Contact tree & test schedule": { ex: "On-call → SRE lead → CTO; DR drill quarterly.", why: "An untested DR plan is fiction; the test schedule is what keeps it real." }
  },
  bcp: {
    "Critical functions": { ex: "Invoice validation and ledger posting must stay up.", why: "Naming the critical functions is what prioritises scarce effort during a crisis." },
    "Disruption scenarios": { ex: "Region outage, key-vendor failure, office loss.", why: "Planning against named scenarios beats freezing when one actually happens." },
    "Continuity strategy": { ex: "Failover to a second region; a manual posting fallback.", why: "A continuity strategy is what keeps the business running while systems recover." },
    "Roles, contacts & objectives": { ex: "Crisis lead, comms owner, recovery targets per function.", why: "Assigning roles in advance prevents a leadership vacuum mid-disruption." }
  },
  sla_slo_sli: {
    "SLA — contractual promise": { ex: "99.9% monthly uptime, or service credits apply.", why: "The SLA is the external promise money is attached to — it sets the stakes." },
    "SLO — internal objective": { ex: "99.95% uptime — stricter than the SLA, on purpose.", why: "An internal SLO tighter than the SLA is the buffer that keeps you out of breach." },
    "SLI — measured indicator": { ex: "Successful requests ÷ total, measured at the load balancer.", why: "The SLI is the actual number; without it the SLO is just a wish." },
    "Error budget & policy": { ex: "0.05%/mo budget; freeze features if it's exhausted.", why: "An error budget turns reliability from an argument into a shared rule." },
    "Reporting": { ex: "A weekly SLO dashboard reviewed in the ops sync.", why: "Regular reporting is what keeps reliability honest between incidents." }
  },
  capacity_plan: {
    "Current usage": { ex: "Peak 3k invoices/hr, 60% CPU, 40% of DB connections.", why: "A baseline of today's usage is what every forecast is measured against." },
    "Growth forecast": { ex: "2× volume by year-end as the EU mandate lands.", why: "A forecast is what converts 'we might run out' into a budgeted plan." },
    "Resource needs": { ex: "Workers: 4 → 8; DB: db.r6g.large → xlarge.", why: "Translating growth into specific resources is what makes the plan procurable." },
    "Risks": { ex: "Quarter-end spikes could exceed the gateway rate limit.", why: "Naming capacity risks early is how you avoid the outage they'd otherwise cause." }
  },
  change_calendar: {
    "Scheduled windows": { ex: "Mar 12, 22:00–23:00 UTC — DB upgrade.", why: "A shared window calendar is what stops two teams colliding in production." },
    "Freeze periods": { ex: "No deploys Dec 20–Jan 2 (peak invoicing).", why: "Publishing freeze periods protects the business's busiest, riskiest moments." },
    "Change procedure & notifications": { ex: "CAB-approved; notify #ops 24h ahead.", why: "A documented procedure is what keeps 'routine' changes from becoming incidents." }
  },
  kb_article: {
    "Problem / question": { ex: "'Why was my invoice rejected with error E12?'", why: "Leading with the user's actual question is what makes the article findable in search." },
    "Environment": { ex: "Applies to API v2, EU tenants.", why: "Scoping to an environment stops a fix being applied where it doesn't belong." },
    "Solution / steps": { ex: "1) Check the tax ID  2) Re-validate  3) Resubmit.", why: "Numbered steps are what let a user self-serve instead of opening a ticket." },
    "Workaround & related articles": { ex: "Temporary: submit via CSV; see 'E12 causes.'", why: "A workaround plus links resolves the case when the real fix isn't ready." }
  },

  // ---------- 5. Project & Process ----------
  project_charter: {
    "Objectives": { ex: "Ship EU e-invoicing compliance before the 2026 mandate.", why: "A charter's objectives are the mandate everything in the project traces back to." },
    "Scope (in / out)": { ex: "In: validation + posting. Out: payments, US tax.", why: "Drawing the scope line at the start prevents the slow creep that sinks projects." },
    "Stakeholders": { ex: "Sponsor: CFO. Users: the AP team. Partner: the ERP vendor.", why: "Listing stakeholders early is how you find the approver you'd otherwise miss." },
    "Budget & timeline": { ex: "$400k, two quarters, go-live by Q3.", why: "A budget and date on the charter are what make it an authorisation, not a wish." },
    "Success criteria": { ex: "100% of EU invoices auto-validated by go-live.", why: "Charter-level success criteria are the bar the project is ultimately judged against." }
  },
  sow: {
    "Deliverables": { ex: "A validation engine, ERP integration, and an admin UI.", why: "Deliverables are the concrete things the contract is actually paying for." },
    "Timeline & milestones": { ex: "M1 design (wk 4); M2 integration (wk 10).", why: "Milestone dates are what payment and acceptance hang off in a contract." },
    "Acceptance criteria": { ex: "Passes 100 conformance invoices with zero false posts.", why: "Acceptance criteria are what end the 'is it done?' dispute between buyer and vendor." },
    "Pricing & terms": { ex: "$120k fixed, 30/40/30 on milestones, net-30.", why: "Pricing and payment terms are the half of an SOW that ends up in court if vague." }
  },
  wbs: {
    "Phases / deliverables": { ex: "Discovery, Build, Integrate, Certify, Launch.", why: "Breaking scope into phases is what makes a big project estimable at all." },
    "Work packages": { ex: "1.2 Validation engine — Backend — 3 wks.", why: "Work packages are the smallest ownable units a schedule can actually track." },
    "Dependencies & estimates": { ex: "Integration depends on the gateway sandbox (wk 6).", why: "Capturing dependencies and estimates is what makes the critical path visible." }
  },
  raci: {
    "Roles": { ex: "PM, Tech Lead, QA, Compliance, Sponsor.", why: "Naming the roles first is what the matrix columns then map responsibility onto." },
    "Matrix": { ex: "Deploy to prod — Tech Lead: A, SRE: R, PM: I.", why: "One Accountable per row is the rule that stops decisions from having no owner." }
  },
  risk_register: {
    "Risks": { ex: "Gateway API delay — likely × high — mitigate: early sandbox — owner: TL.", why: "A living register with an owner per risk turns worry into managed work." }
  },
  change_request: {
    "Change description": { ex: "Add a second approver step for invoices over €10k.", why: "A precise change description is what the board actually votes yes or no on." },
    "Reason / business case": { ex: "A €40k mispost last quarter; auditors flagged the gap.", why: "The business case is what separates a justified change from a pet preference." },
    "Impact analysis": { ex: "+2 days dev; touches the posting flow; low risk.", why: "Impact analysis is how the board weighs the change against its cost and blast radius." },
    "Rollback plan": { ex: "Feature-flag the step; toggle off to revert instantly.", why: "A rollback plan is the condition under which a risky change is safe to approve." },
    "CAB approval": { ex: "Change Board — approved — Mar 8.", why: "The recorded CAB decision is the audit trail for who authorised the change." }
  },
  status_report: {
    "Summary & RAG status": { ex: "Amber — integration slipped a week, recoverable.", why: "A RAG headline is what a sponsor reads in five seconds to know if they must act." },
    "Progress this period": { ex: "Validation engine done; integration 60%.", why: "Concrete progress is what keeps a status report from being reassuring noise." },
    "Risks & issues": { ex: "The gateway sandbox is unstable, blocking testing.", why: "Surfacing risks in the report is how you get help before they become slips." },
    "Decisions needed & next period": { ex: "Need a call on a scope cut; next: finish integration.", why: "Naming the decisions needed is what turns a report into a request for action." }
  },
  retrospective: {
    "What went well": { ex: "The shadow-mode rollout caught two bugs pre-launch.", why: "Naming what worked is how a team deliberately repeats its successes." },
    "What didn’t": { ex: "Late gateway access compressed testing to days.", why: "Honest naming of what failed is the only input a real improvement starts from." },
    "Action items": { ex: "Secure sandbox access in week 1 — PM — next sprint.", why: "A retro without owned action items is therapy; with them it's improvement." }
  },
  decision_log: {
    "Agenda": { ex: "Approve the data-retention period for invoices.", why: "A stated agenda is what keeps a meeting — and its minutes — on the point." },
    "Discussion": { ex: "Legal wants 10 yrs; eng worries about storage cost.", why: "Capturing the discussion is what lets absentees understand a decision's reasoning." },
    "Decisions": { ex: "Decided: 10-year immutable retention.", why: "Recording the decision itself is what stops the same question being re-litigated." },
    "Action items": { ex: "Implement the retention policy — Backend — Apr 1.", why: "Tying actions to owners is what turns a decision into something that ships." }
  },

  // ---------- 6. Quality & Testing ----------
  test_strategy: {
    "Quality objectives": { ex: "Zero P0 escapes; < 0.1% invoice-posting error rate.", why: "Quality objectives are the few outcomes every testing choice should serve." },
    "Test levels & types": { ex: "Unit, integration, contract, E2E, plus conformance tests.", why: "Naming the levels is what prevents whole categories of bugs going untested." },
    "Environments": { ex: "Ephemeral PR envs; a shared staging mirroring prod.", why: "Defining environments is what stops 'works in staging' surprises in production." },
    "Automation philosophy": { ex: "Automate the pyramid; manual only for exploratory UAT.", why: "A stated automation stance is what keeps the suite fast instead of flaky." },
    "Tooling": { ex: "Vitest, Playwright, k6 for load, Pact for contracts.", why: "Listing the tooling makes the strategy concrete and onboardable." }
  },
  test_plan: {
    "Scope (in / out)": { ex: "In: validation + posting flows. Out: the admin UI.", why: "A scoped test plan is what makes coverage a decision instead of an accident." },
    "Approach": { ex: "Risk-based: deepest testing on the posting path.", why: "Stating the approach is how limited test time gets spent where risk is highest." },
    "Entry / exit criteria": { ex: "Enter: code-complete + green CI. Exit: 0 open P0/P1.", why: "Entry/exit criteria are the gates that keep 'tested enough' objective." },
    "Schedule & resources": { ex: "Two QA for one sprint; UAT in week 3.", why: "A schedule with named resources is what makes the test plan actually executable." },
    "Risk areas": { ex: "Cross-border tax rules; high-volume concurrency.", why: "Calling out risk areas focuses scrutiny on where defects would hurt most." }
  },
  test_cases: {
    "Test cases": { ex: "TC-01 — submit a valid EU invoice — expect 201 + draft.", why: "An ID'd, step-by-step case is what makes a test repeatable by anyone." },
    "Preconditions & test data": { ex: "A seeded vendor and a sample UBL invoice file.", why: "Stating preconditions and data is what makes a test result trustworthy and reproducible." }
  },
  rtm: {
    "Traceability": { ex: "REQ-12 → design §4 → TC-07 → passed.", why: "A traceability row is the proof every requirement is actually tested — what auditors check." }
  },
  uat_plan: {
    "Scope & objectives": { ex: "Confirm AP clerks can process a real invoice end-to-end.", why: "UAT objectives keep business users testing outcomes, not poking at features." },
    "Participants": { ex: "Three AP clerks, one finance lead, the PM.", why: "Naming real users is what makes acceptance representative, not theoretical." },
    "Test scenarios": { ex: "Process a normal invoice, a rejection, and a correction.", why: "Concrete scenarios are what turn 'try it out' into evidence of readiness." },
    "Sign-off": { ex: "Finance Lead — accepted — Mar 20.", why: "A signed acceptance row is the gate that authorises go-live." }
  },
  bug_report: {
    "Summary": { ex: "Duplicate posting when retrying a timed-out invoice.", why: "A sharp summary is what lets triage prioritise without reading the whole report." },
    "Steps to reproduce": { ex: "1) Submit invoice  2) Force a 5s timeout  3) Retry.", why: "Reliable repro steps are the single most valuable part of a bug report." },
    "Expected vs actual": { ex: "Expected: one record. Actual: two posted.", why: "Stating expected vs actual is what turns 'it's broken' into a fixable spec." },
    "Priority & notes": { ex: "P1 — financial impact; started after the 2.0 deploy.", why: "Priority plus context is what helps engineering sequence the fix correctly." }
  },
  iq_oq_pq: {
    "Installation Qualification (IQ)": { ex: "Verified the correct versions, config, and access are installed.", why: "IQ is the documented proof the system was built as specified — step one of validation." },
    "Operational Qualification (OQ)": { ex: "Tested each function across its full operating range.", why: "OQ is the evidence the system does what the spec says under expected conditions." },
    "Performance Qualification (PQ)": { ex: "Ran real invoice volumes for a week without deviation.", why: "PQ is the proof it performs in real use — what a regulator ultimately wants to see." },
    "Approval": { ex: "QA · Validation Lead · QA Manager — signed.", why: "The signed approval is the legally meaningful record that validation is complete." }
  },

  // ---------- 7. Security, Compliance & Governance ----------
  security_policy: {
    "Acceptable use": { ex: "Company devices for work; no shared credentials.", why: "Acceptable-use rules are what make later enforcement fair and defensible." },
    "Access control": { ex: "Least privilege; MFA everywhere; quarterly access reviews.", why: "An access-control baseline is the single highest-leverage security control to state." },
    "Data handling": { ex: "Encrypt PII at rest/in transit; no prod data on laptops.", why: "Data-handling rules are what keep a breach from becoming a regulatory event." },
    "Incident response": { ex: "Report suspected incidents to security@ within 1 hour.", why: "A stated response path is what turns panic into a coordinated reaction." },
    "Enforcement & review": { ex: "Violations to HR; policy reviewed annually.", why: "Enforcement and a review date are what keep a policy from becoming shelfware." }
  },
  data_governance: {
    "Ownership & stewardship": { ex: "Finance owns invoice data; a named steward per domain.", why: "Assigning ownership is what makes data quality somebody's actual job." },
    "Classification": { ex: "Public, Internal, Confidential, Restricted (PII).", why: "A classification scheme is what every handling and access rule keys off." },
    "Quality standards": { ex: "Tax IDs validated on entry; < 0.1% null rate.", why: "Stating quality standards is what makes 'good data' measurable and enforceable." },
    "Retention": { ex: "Invoices retained 10 years, then purged.", why: "A retention rule is what keeps you compliant without hoarding liability." },
    "Lineage": { ex: "Capture → validation → ledger → warehouse.", why: "Documented lineage is what lets you trust — and audit — a downstream number." }
  },
  access_control: {
    "Roles & definitions": { ex: "Clerk (create), Approver (post), Auditor (read-only).", why: "Defining roles is what lets access be granted by job, not by one-off favours." },
    "Group mappings": { ex: "AD 'finance-ap' → Clerk; 'finance-mgr' → Approver.", why: "Mapping groups to roles is what makes access scale and stay auditable." },
    "Row-level security rules": { ex: "Users see only their own entity's invoices.", why: "RLS rules are where 'who can see what' becomes enforced data, not policy prose." },
    "Approval process & review cadence": { ex: "Manager approves; access recertified quarterly.", why: "An approval and review cadence is what stops access from quietly accumulating." }
  },
  audit_trail: {
    "Controls in scope": { ex: "SOC 2: access, change management, encryption.", why: "Naming the controls in scope is what bounds the evidence you must produce." },
    "Evidence": { ex: "Access review — Q1 export — in /audit/2026.", why: "An evidence index is what an auditor asks for first; pre-building it saves the scramble." },
    "Access reviews & change logs": { ex: "Quarterly access certs; immutable deploy logs.", why: "Reviews and change logs are the two evidence types auditors check most often." },
    "Gaps": { ex: "No formal vendor review for the OCR provider yet.", why: "Honestly logging gaps is what lets you remediate before the auditor finds them." }
  },
  dpia: {
    "Processing activity": { ex: "OCR extraction of invoice data, including names.", why: "Naming the processing activity is what scopes the whole privacy assessment." },
    "Data & subjects": { ex: "Vendor contacts' names and emails; EU data subjects.", why: "Identifying the data and subjects is what determines which laws even apply." },
    "Necessity & proportionality": { ex: "Names needed for matching; no extra fields stored.", why: "Proving necessity is the core GDPR test a DPIA exists to document." },
    "Privacy risks": { ex: "Re-identification; OCR misattributing a name.", why: "Enumerating privacy risks is what mitigations and sign-off then respond to." },
    "Mitigations": { ex: "Minimise fields; encrypt; 10-year cap then purge.", why: "Recorded mitigations are the evidence the residual risk was actually reduced." }
  },
  compliance_matrix: {
    "Control mapping": { ex: "GDPR Art.32 → encryption-at-rest → KMS config → met.", why: "A requirement-to-evidence row is what makes compliance demonstrable, not claimed." }
  },
  vendor_risk: {
    "Vendor overview": { ex: "OCR-as-a-service; processes invoice images.", why: "A vendor overview frames how much risk the relationship can even carry." },
    "Security posture": { ex: "SOC 2 Type II; pen-tested; encrypts in transit.", why: "Assessing security posture is what tells you if their risk becomes your incident." },
    "Compliance & certifications": { ex: "ISO 27001; GDPR DPA signed.", why: "Certifications and a DPA are the paper that makes a vendor usable in regulated work." },
    "Data access & risk": { ex: "Sees invoice images (PII); no ledger access.", why: "Scoping a vendor's data access is what bounds your exposure if they're breached." },
    "Decision": { ex: "Approved with annual review and a signed DPA.", why: "A recorded decision with conditions is the accountable end of due diligence." }
  },

  // ---------- 8. End-User & Training ----------
  user_guide: {
    "Overview": { ex: "What the invoicing app does and who it's for.", why: "An overview lets a reader confirm they're in the right manual before investing time." },
    "Getting started": { ex: "Log in, connect your ERP, import your first invoice.", why: "A getting-started path is what turns a new user into a productive one fastest." },
    "Features & tasks": { ex: "Organised by job: capture, validate, approve, post.", why: "Task-organised docs match how users actually search — by what they're trying to do." },
    "Troubleshooting & reference": { ex: "Common errors, a field glossary, keyboard shortcuts.", why: "A reference section is what keeps power users in the product instead of in support." }
  },
  quick_start: {
    "Prerequisites": { ex: "An account and your ERP API key.", why: "Listing prerequisites first is what prevents a stall two steps in." },
    "Steps to first success": { ex: "1) Connect ERP  2) Drop a PDF  3) See a validated draft.", why: "The shortest path to a first win earns a user's confidence to continue." },
    "Verify it works": { ex: "A draft invoice appears with a green 'validated' badge.", why: "A concrete success signal is how a user knows they did it right." },
    "Next steps": { ex: "Set up approvals; invite your AP team.", why: "Pointing to the next step carries momentum from setup into real use." }
  },
  faq: {
    "Questions & answers": { ex: "'Which invoice formats?' → 'PDF and UBL today.'", why: "Curated Q&A deflects the highest-volume questions before they reach support." }
  },
  training: {
    "Learning objectives": { ex: "By the end, a clerk can process and correct an invoice.", why: "Stated objectives are what make training measurable instead of just content." },
    "Modules / outline": { ex: "1) Capture  2) Validation  3) Corrections  4) Reporting.", why: "A module outline is what gives learners a map and a sense of progress." },
    "Exercises": { ex: "Process three sample invoices, including one rejection.", why: "Hands-on exercises are what move knowledge from slides into actual skill." },
    "Assessment & resources": { ex: "A 10-question quiz; links to the user guide.", why: "Assessment plus resources confirms learning stuck and where to go next." }
  },
  ux_copy: {
    "Copy": { ex: "Empty state → 'No invoices yet — drop a PDF to start.'", why: "Writing microcopy as a spec is what keeps voice consistent across every screen." },
    "Voice & tone": { ex: "Plain, calm, never blame the user; active voice.", why: "A stated voice is what makes ten writers sound like one product." }
  }
};
window.FORMS_RICH = Object.assign(window.FORMS_RICH || {}, R);
})();
