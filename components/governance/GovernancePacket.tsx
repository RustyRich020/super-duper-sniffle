"use client";
// Theragen Governance Reports — pragmatic port of the fixed-sheet prototype
// ("Theragen Governance Reports.dc.html"). The prototype's imperative
// fixed-sheet rendering (a DCLogic Component building an A4 packet into a
// container) is preserved verbatim in spirit: on mount we build the whole
// packet into a container ref using the prototype's logic. No Paged.js, no
// support.js. Inline sample data for all five reports is reproduced verbatim.
import { useEffect, useRef } from "react";
import { GOVERNANCE_CSS } from "./styles";
import { loadLive, type LiveData, type ProjectRow } from "./loadLive";

type Cols = { h: string; w?: string }[];
type Cell = string | null;

// All rendering state lives in this builder object, mirroring the prototype's
// `this`. It writes directly into the provided root element.
class PacketBuilder {
  root: HTMLElement;
  toolsHost: HTMLElement;
  allLive: LiveData = {};
  live: LiveData = {};
  projMap: Record<string, ProjectRow> = {};
  user: { email?: string } | null = null;
  scope: string | null = null;
  solo: string | null = null;
  page = 0;
  sheets: HTMLElement[] = [];
  pageOf: Record<string, number> = {};
  curRep = "front";

  constructor(root: HTMLElement, toolsHost: HTMLElement) {
    this.root = root;
    this.toolsHost = toolsHost;
  }

  // ---- scope ----
  applyScope() {
    const a = this.allLive || {};
    if (!this.scope) {
      this.live = a;
      return;
    }
    const f = (arr?: Record<string, unknown>[]) =>
      (arr || []).filter((r) => String(r.project_id) === String(this.scope));
    this.live = Object.assign({}, a, {
      status: a.status && f(a.status),
      risks: a.risks && f(a.risks),
      cr: a.cr && f(a.cr),
      cdoc: a.cdoc && f(a.cdoc),
      bpg: a.bpg && f(a.bpg),
    });
  }
  scopeName(): string {
    const p = this.scope && this.projMap && this.projMap[this.scope];
    return p ? p.name || p.code || "" : "";
  }
  soloRep(rep: string | null) {
    this.solo = !rep || rep === "all" ? null : rep;
    if (this.root)
      [...this.root.children].forEach((s) => {
        (s as HTMLElement).style.display =
          !this.solo || (s as HTMLElement).dataset.rep === this.solo ? "" : "none";
      });
    const r = document.getElementById("t-rep") as HTMLSelectElement | null;
    if (r) r.value = this.solo || "all";
  }

  mountControls() {
    const ex = document.getElementById("tools");
    if (ex) ex.remove();
    const t = document.createElement("div");
    t.id = "tools";
    const ids = new Set<string>();
    (["status", "risks", "cr", "cdoc", "bpg"] as const).forEach((k) =>
      ((this.allLive && (this.allLive[k] as Record<string, unknown>[])) || []).forEach((r) => {
        if (r.project_id) ids.add(String(r.project_id));
      }),
    );
    let html = "";
    if (ids.size) {
      const opts = ['<option value="">All projects</option>'].concat(
        [...ids].map((id) => {
          const p = this.projMap && this.projMap[id];
          const nm = (p && (p.name || p.code)) || id;
          return (
            '<option value="' +
            this.esc(id) +
            '"' +
            (String(this.scope) === id ? " selected" : "") +
            ">" +
            this.esc(nm) +
            "</option>"
          );
        }),
      );
      html += '<span class="lab">Scope</span><select id="t-scope">' + opts.join("") + "</select>";
    }
    html +=
      '<span class="lab">Export</span><select id="t-rep"><option value="all">Full packet</option><option value="status">01 · Status</option><option value="cdr">02 · Documents</option><option value="cr">03 · Change control</option><option value="baseline">04 · Baselines</option><option value="dossier">05 · Dossier</option></select>';
    html += '<button id="t-pdf">⤓ Save PDF</button>';
    t.innerHTML = html;
    this.toolsHost.appendChild(t);
    const sc = document.getElementById("t-scope") as HTMLSelectElement | null;
    if (sc)
      sc.onchange = () => {
        this.scope = sc.value || null;
        this.applyScope();
        this.build();
        this.mountControls();
      };
    const rep = document.getElementById("t-rep") as HTMLSelectElement | null;
    if (rep) {
      rep.value = this.solo || "all";
      rep.onchange = () => this.soloRep(rep.value);
    }
    const pdf = document.getElementById("t-pdf");
    if (pdf) pdf.onclick = () => window.print();
  }

  esc(s: unknown): string {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // ---- field helpers (verbatim from prototype) ----
  pick(row: Record<string, unknown>, re: RegExp): string {
    for (const k in row) {
      const v = row[k];
      if (re.test(k) && v != null && v !== "") return v as string;
    }
    return "";
  }
  proj(row: Record<string, unknown> | null): ProjectRow | null {
    const id = row && (row.project_id as string);
    return (id && this.projMap && this.projMap[id]) || null;
  }
  fdate(v: unknown): string {
    return v ? String(v).slice(0, 10) : "";
  }
  ragKind(t: unknown): [string, string] {
    const s = String(t || "").toLowerCase();
    if (/red|off|at risk/.test(s)) return ["r", "Red — Off Track"];
    if (/amber|yellow|watch|caution/.test(s)) return ["y", "Yellow — Caution"];
    if (/green|on track/.test(s)) return ["g", "Green — On Track"];
    return ["y", t ? String(t) : "Status not set"];
  }
  liScore(L: unknown, I: unknown): number {
    const n = (v: unknown) => {
      const x = parseFloat(v as string);
      if (!isNaN(x)) return Math.max(1, Math.min(5, Math.round(x)));
      const s = String(v || "").toLowerCase();
      if (/crit|very high/.test(s)) return 5;
      if (/high/.test(s)) return 4;
      if (/med/.test(s)) return 3;
      if (/low/.test(s)) return 2;
      return 0;
    };
    const a = n(L),
      b = n(I);
    return a && b ? a * b : 0;
  }

  chip(text: unknown): string {
    if (text == null || text === "") return '<span class="mono">—</span>';
    const s = String(text).toLowerCase();
    let k = "ink";
    if (/(completed|verified|approved|baselined|on track|green|closed)/.test(s)) k = "green";
    else if (/(yellow|amber|hold|held|monitoring|mitigating|superseded|on major|open|pending|in progress)/.test(s))
      k = "amber";
    else if (/(off track|cancelled|overdue|at risk|\bred\b|rejected|breach)/.test(s)) k = "red";
    else if (/(planning|initiating|executing|reference|cross-lifecycle|baseline|substantive)/.test(s)) k = "blue";
    return '<span class="chip ' + k + '">' + this.esc(text) + "</span>";
  }
  kv(k: string, v: string): string {
    return '<div class="kv"><div class="k">' + this.esc(k) + '</div><div class="v">' + v + "</div></div>";
  }
  kvgrid(cols: number, items: string): string {
    return '<div class="kvgrid" style="grid-template-columns:repeat(' + cols + ',1fr)">' + items + "</div>";
  }
  tbl(cols: Cols, rows: Cell[][]): string {
    const colg =
      "<colgroup>" + cols.map((c) => "<col" + (c.w ? ' style="width:' + c.w + '"' : "") + ">").join("") + "</colgroup>";
    const head = "<thead><tr>" + cols.map((c) => "<th>" + this.esc(c.h) + "</th>").join("") + "</tr></thead>";
    const body =
      "<tbody>" +
      rows
        .map(
          (r) =>
            "<tr>" +
            r.map((cell) => "<td>" + (cell == null || cell === "" ? '<span class="mono">—</span>' : cell) + "</td>").join("") +
            "</tr>",
        )
        .join("") +
      "</tbody>";
    return '<table class="dt">' + colg + head + body + "</table>";
  }
  band(kick: string, title: string, sub: string, src?: string): string {
    const badge = src
      ? '<span class="srcb ' + src + '">' + (src === "live" ? "● Live data" : "○ Reference") + "</span>"
      : "";
    return (
      '<div class="band"><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:14px"><div class="kick">' +
      this.esc(kick) +
      "</div>" +
      badge +
      "</div>" +
      '<h2 class="title">' +
      this.esc(title) +
      "</h2>" +
      (sub ? '<div class="sub">' + this.esc(sub) + "</div>" : "") +
      "</div>"
    );
  }

  // ---- sheet scaffolding ----
  makeSheet(opts: { id?: string; cover?: boolean; running?: string } = {}): HTMLElement {
    if (opts.id) this.curRep = opts.id;
    const s = document.createElement("div");
    s.className = "sheet" + (opts.cover ? " cover" : "");
    s.dataset.rep = opts.cover ? "cover" : this.curRep || "front";
    this.root.appendChild(s);
    this.page++;
    if (opts.id) this.pageOf[opts.id] = this.page;
    if (opts.cover) return s;
    const hdr = document.createElement("div");
    hdr.className = "hdr";
    hdr.innerHTML =
      '<span class="l">QQ-Studios — Governance Reports</span><span class="r">' + this.esc(opts.running || "") + "</span>";
    s.appendChild(hdr);
    const ftr = document.createElement("div");
    ftr.className = "ftr";
    ftr.innerHTML =
      '<span class="l">Confidential — Internal · QQ-Studios · Governance &amp; Status Reports</span><span class="pg"></span>';
    s.appendChild(ftr);
    const main = document.createElement("div");
    main.className = "fmain";
    s.appendChild(main);
    this.sheets.push(s);
    return main;
  }

  build() {
    this.root.innerHTML = "";
    this.page = 0;
    this.sheets = [];
    this.pageOf = {};
    this.curRep = "front";

    const has = (k: keyof LiveData) => this.live && this.live[k] && (this.live[k] as unknown[]).length;
    const sc = !!this.scope;
    this.addCover();
    this.addToc();
    this.addSummary();
    if (has("status") || sc) this.addStatusLive();
    else {
      this.addStatusA();
      this.addStatusB();
    }
    if (has("cdoc") || sc) this.addCdrLive();
    else this.addCdr();
    if (has("cr") || sc) this.addCrLive();
    else this.addCr();
    if (has("bpg") || sc) this.addBaselineLive();
    else this.addBaseline();
    if (has("cdoc") || sc) this.addDossierLive();
    else this.addDossier();

    const n = this.page;
    this.root.querySelectorAll<HTMLElement>("[data-pg]").forEach((el) => {
      el.textContent = String(this.pageOf[el.dataset.pg as string] || "");
    });
    this.sheets.forEach((s) => {
      const idx = [...this.root.children].indexOf(s) + 1;
      const pg = s.querySelector(".ftr .pg");
      if (pg) pg.textContent = idx + " / " + n;
    });
    if (this.solo) this.soloRep(this.solo);
  }

  addCover() {
    const s = this.makeSheet({ cover: true });
    const items = [
      ["Project Status Report", "leadership one-pager · APNE & The Rounds"],
      ["Controlled Document Register", "org-wide controlled-document portfolio"],
      ["Governance Change-Control Register", "change requests & impact assessments"],
      ["Baseline & Phase-Gate Register", "immutable baselines & gate log"],
      ["Controlled Document Dossier", "per-document audit packet"],
    ];
    s.innerHTML =
      '<div class="cv-inner">' +
      '<div class="cv-top"><img class="cv-logo" src="/assets/qq-logo.png" alt="QQ Studios">' +
      '<div class="cv-ed">Paginated Records<br>Governance Pack<br>2026</div></div>' +
      '<div class="cv-mid">' +
      '<div class="cv-kicker">Governance & Document Control</div>' +
      '<h1 class="cv-title">Governance &amp; <em>Status</em> Reports</h1>' +
      '<div class="cv-rule"></div>' +
      '<p class="cv-sub">Print- and archive-ready records of project status, the controlled-document portfolio, change control, baselines, and per-document dossiers — one paginated source of truth, generated on a cadence.</p>' +
      '<ul class="cv-list">' +
      items
        .map(
          (it, i) =>
            '<li><span class="n">' +
            (i + 1).toString().padStart(2, "0") +
            '</span><span><b>' +
            this.esc(it[0]) +
            "</b> — " +
            this.esc(it[1]) +
            "</span></li>",
        )
        .join("") +
      "</ul>" +
      "</div>" +
      '<div class="cv-foot"><span>Confidential — Internal</span><span>' +
      (this.user
        ? "● Live · " + this.esc(this.user.email || "signed in")
        : "○ Sample — sign in via the Forms app for live") +
      "</span></div>" +
      "</div>";
  }

  addToc() {
    const main = this.makeSheet({ running: "Contents" });
    const rows = [
      ["summary", "00", "Executive Summary", "Portfolio-wide posture & record index"],
      ["status", "01", "Project Status Report", "Leadership one-pager — health, RAID, key areas, next steps"],
      ["cdr", "02", "Controlled Document Register", "Org-wide controlled-document portfolio"],
      ["cr", "03", "Governance Change-Control Register", "Change requests (CHG-NNN) & department impact"],
      ["baseline", "04", "Baseline & Phase-Gate Register", "Immutable baselines & phase-gate transitions"],
      ["dossier", "05", "Controlled Document Dossier", "THG-IT-SOP-001 — Nightly Data Sync Runbook"],
    ];
    main.innerHTML =
      '<div class="toc-head"><div><div style="font-family:\'IBM Plex Mono\';font-size:9px;letter-spacing:.26em;text-transform:uppercase;color:var(--accent);margin-bottom:6px">Governance &amp; Document Control · 2026</div><h2 style="margin:0">Contents</h2></div><span class="meta">Executive Summary · 5 Records · 2026-06</span></div>' +
      rows
        .map(
          (r) =>
            '<div class="toc-row" data-go="' +
            r[0] +
            '"><span class="toc-n">' +
            r[1] +
            '</span><span class="toc-b"><span class="toc-title">' +
            this.esc(r[2]) +
            '</span><span class="toc-desc">' +
            this.esc(r[3]) +
            '</span></span><span class="toc-pg" data-pg="' +
            r[0] +
            '"></span></div>',
        )
        .join("");
    main.querySelectorAll<HTMLElement>(".toc-row").forEach((row) => {
      row.addEventListener("click", () => {
        const t = document.getElementById("rep-" + row.dataset.go);
        if (t) t.scrollIntoView({ block: "start" });
      });
    });
  }

  sumTile(k: string, v: string, sub: string): string {
    return (
      '<div style="border:1px solid var(--line);border-left:4px solid var(--accent);border-radius:3px;padding:9px 13px">' +
      '<div style="font-family:\'IBM Plex Mono\';font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:var(--faint)">' +
      this.esc(k) +
      "</div>" +
      '<div style="font-family:\'Spectral\';font-weight:600;font-size:20px;margin-top:3px;line-height:1.1">' +
      this.esc(v) +
      "</div>" +
      '<div style="font-size:9px;color:var(--muted);margin-top:3px">' +
      this.esc(sub) +
      "</div></div>"
    );
  }

  addSummary() {
    const main = this.makeSheet({ running: "Executive Summary", id: "summary" });
    const L = this.live || {};
    const liveCount = (["status", "cdoc", "cr", "bpg"] as const).filter((k) => L[k]).length;
    const sids = new Set<string>();
    (["status", "risks", "cr", "cdoc", "bpg"] as const).forEach((k) =>
      ((this.allLive && (this.allLive[k] as Record<string, unknown>[])) || []).forEach((r) => {
        if (r.project_id) sids.add(String(r.project_id));
      }),
    );
    let slicer = "";
    if (sids.size) {
      const chips = ['<span class="sl' + (!this.scope ? " on" : "") + '" data-scope="">All projects</span>'].concat(
        [...sids].map((id) => {
          const p = this.projMap && this.projMap[id];
          const nm = (p && (p.name || p.code)) || id;
          return (
            '<span class="sl' +
            (String(this.scope) === id ? " on" : "") +
            '" data-scope="' +
            this.esc(id) +
            '">' +
            this.esc(nm) +
            "</span>"
          );
        }),
      );
      slicer = '<div class="slicer"><span class="sl-l">Scope</span>' + chips.join("") + "</div>";
    }
    let bC = 0,
      gC = 0;
    if (L.bpg)
      L.bpg.forEach((r) => {
        bC += ((L.bpgBase && L.bpgBase[r.id as string]) || []).length;
        gC += ((L.bpgGate && L.bpgGate[r.id as string]) || []).length;
      });
    const crN = L.cr ? L.cr.length : 1;
    const recs: [string, string, string, string, string, boolean][] = [
      [
        "01",
        "status",
        "Project Status Report",
        L.status ? (L.risks || []).length + " risks logged" : "4 risks · avg 7.8 / 25",
        L.status ? this.ragKind(this.pick(L.status[0], /rag|status/))[1] : "Yellow — Caution",
        !!L.status,
      ],
      ["02", "cdr", "Controlled Document Register", (L.cdoc ? L.cdoc.length : 6) + " controlled documents", "Baseline portfolio", !!L.cdoc],
      ["03", "cr", "Governance Change-Control Register", crN + " change request" + (crN === 1 ? "" : "s"), "CHG-NNN tracked", !!L.cr],
      ["04", "baseline", "Baseline & Phase-Gate Register", (L.bpg ? bC : 3) + " baselines · " + (L.bpg ? gC : 2) + " gates", "Immutable snapshots", !!L.bpg],
      [
        "05",
        "dossier",
        "Controlled Document Dossier",
        L.cdoc ? this.pick(L.cdoc[0], /doc_id/) || "—" : "THG-IT-SOP-001",
        "Per-document audit packet",
        !!L.cdoc,
      ],
    ];
    const tiles =
      '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-top:13px">' +
      this.sumTile("Records in Packet", "5", "five governance records") +
      this.sumTile("Data Source", liveCount + " / 4 live", liveCount ? "from your submissions" : "curated reference sample") +
      this.sumTile("Generated", "2026-06", "confidential — internal") +
      "</div>";
    const idx =
      '<h4 class="sh">Record Index</h4>' +
      '<table class="dt"><colgroup><col style="width:6%"><col style="width:33%"><col style="width:12%"><col style="width:27%"><col style="width:16%"><col style="width:6%"></colgroup>' +
      "<thead><tr><th>#</th><th>Record</th><th>Source</th><th>Key Figures</th><th>Posture</th><th>Pg</th></tr></thead><tbody>" +
      recs
        .map(
          (r) =>
            '<tr class="sumrow" data-go="' +
            r[1] +
            '" style="cursor:pointer">' +
            '<td><span class="mono" style="color:var(--accent);font-size:9pt">' +
            r[0] +
            "</span></td>" +
            "<td><b>" +
            this.esc(r[2]) +
            "</b></td>" +
            "<td>" +
            (r[5] ? '<span class="srcb live">● Live</span>' : '<span class="srcb sample">○ Reference</span>') +
            "</td>" +
            "<td>" +
            this.esc(r[3]) +
            "</td>" +
            "<td>" +
            this.chip(r[4]) +
            "</td>" +
            '<td><span class="toc-pg" data-pg="' +
            r[1] +
            '"></span></td></tr>',
        )
        .join("") +
      "</tbody></table>";
    const note =
      '<div class="note">This packet renders <b>live</b> from your Forms submissions wherever available and falls back to a curated <b>reference sample</b> per record. Both share one identical layout — a record reads the same whether live or sample.</div>';
    main.innerHTML =
      '<span id="rep-summary"></span>' +
      this.band("Front Matter · Executive Summary", "Executive Summary", "Portfolio-wide posture & record index", liveCount ? "live" : "sample") +
      slicer +
      tiles +
      idx +
      note;
    main.querySelectorAll<HTMLElement>(".sumrow").forEach((row) =>
      row.addEventListener("click", () => {
        const t = document.getElementById("rep-" + row.dataset.go);
        if (t) t.scrollIntoView({ block: "start" });
      }),
    );
    main.querySelectorAll<HTMLElement>(".slicer .sl").forEach((el) =>
      el.addEventListener("click", () => {
        this.scope = el.dataset.scope || null;
        this.applyScope();
        this.build();
        this.mountControls();
      }),
    );
  }

  // ===== SAMPLE renderers (inline data verbatim) =====
  addStatusA() {
    const main = this.makeSheet({ running: "Project Status Report", id: "status" });
    const header = this.kvgrid(
      4,
      this.kv("Project Manager", "<b>Richard Allen</b>") +
        this.kv("Target Completion", "7/31/2026") +
        this.kv("Current Phase", this.chip("Planning")) +
        this.kv("Date of Report", "6/12/2026"),
    );
    const statusRow =
      '<div class="twocol" style="margin-top:13px">' +
      '<div class="mainstat"><span class="dot amber" style="width:14px;height:14px"></span><div><div class="lab">Main Status</div><div class="val">Yellow — Caution</div></div></div>' +
      '<div class="pblock" style="border:1px solid var(--line);border-radius:3px;padding:9px 14px">' +
      '<div class="pl">Average Risk Score</div><div><span class="gscore">7.8 <small>/ 25 · MODERATE ▼</small></span></div>' +
      '<div class="gauge-track"><div class="gauge-mark" style="left:31.2%"></div></div>' +
      '<div class="gauge-scale"><span>0</span><span>6</span><span>12</span><span>20</span><span>25</span></div></div></div>';
    const prose =
      '<div class="twocol" style="margin-top:13px">' +
      '<div class="pblock"><div class="pl">Project Description</div><p>Prescribers, sales reps, and clinical staff had no real-time, unified view of ActaStim patient outcomes or adverse trends, making timely clinical follow-up and territory management difficult.</p></div>' +
      '<div class="pblock"><div class="pl">Business Value</div><p>A production clinical insights portal delivering real-time patient dashboards, AI-driven insights, email/HubSpot alerting, and row-level security to 9,200+ patients across 435+ users.</p></div></div>';
    const hcData = [
      ["Scope", "green", "Green"],
      ["Schedule", "green", "Green"],
      ["Cost", "green", "Green"],
      ["Quality", "amber", "Yellow"],
      ["Risk", "amber", "Yellow"],
      ["Stakeholders", "green", "Green"],
      ["Compliance", "amber", "Yellow"],
      ["Procurement", "green", "Green"],
      ["Communications", "green", "Green"],
    ];
    const cvar: Record<string, string> = { green: "var(--green)", amber: "#9A6B1F", red: "var(--red)" };
    const health =
      '<h4 class="sh">Health Check</h4><div class="hc">' +
      hcData
        .map(
          (h) =>
            '<div class="hci"><span class="dot ' +
            h[1] +
            '"></span><span class="hn">' +
            h[0] +
            '</span><span class="hcv" style="color:' +
            cvar[h[1]] +
            '">' +
            h[2] +
            "</span></div>",
        )
        .join("") +
      "</div>";
    const raidRows = [
      [
        "Risk",
        "The Board view renders the full patient set (9,200+) with no pagination or virtualization, risking performance degradation on slower client devices as the patient base grows.",
        "Richard Allen",
        "2026-06-30",
        "9",
        "Medium",
        "Open",
      ],
      [
        "Risk",
        "The AUTO_MATCH_USER procedure can assign access automatically; combined with soft-deleted (IS_ACTIVE) users this risks exposing PHI to unintended users without admin review.",
        "Richard Allen",
        "",
        "8",
        "Medium",
        "Monitoring",
      ],
      [
        "Risk",
        "No automated alert fires when the Snowflake MANIFEST_CACHE exceeds 24h staleness; clinical users could act on stale patient data unaware.",
        "Richard Allen",
        "2026-07-25",
        "8",
        "Medium",
        "Open",
      ],
      [
        "Risk",
        "Prescriber name-to-email mapping is a TODO in server.js; Phase 1 email alerts may not route to the correct prescriber until the mapping / RLS preferences table is populated.",
        "Richard Allen",
        "",
        "6",
        "Medium",
        "Mitigating",
      ],
    ];
    const raid =
      '<h4 class="sh">RAID Log — Risks, Assumptions, Issues, Dependencies</h4>' +
      this.tbl(
        [
          { h: "Type", w: "8%" },
          { h: "Updates / Key Issues / Risks / Decisions / Dependencies", w: "45%" },
          { h: "Owner", w: "13%" },
          { h: "Target", w: "11%" },
          { h: "Score", w: "7%" },
          { h: "Severity", w: "9%" },
          { h: "Status", w: "7%" },
        ],
        raidRows.map((r) => [
          this.chip(r[0]),
          this.esc(r[1]),
          this.esc(r[2]),
          '<span class="mono">' + (r[3] || "—") + "</span>",
          '<span class="num">' + r[4] + "</span>",
          this.chip(r[5]),
          this.chip(r[6]),
        ]),
      );
    main.innerHTML =
      '<span id="rep-status"></span>' +
      this.band("Report 01 · Project Status", "Project Status Report", "APNE & The Rounds — Clinical · Patient Insights Portal", "sample") +
      header +
      statusRow +
      prose +
      health +
      raid;
  }

  addStatusB() {
    const main = this.makeSheet({ running: "Project Status Report" });
    const kpa =
      '<h4 class="sh">Key Project Areas</h4>' +
      this.tbl(
        [
          { h: "Area", w: "26%" },
          { h: "Start Date", w: "17%" },
          { h: "Target Implementation", w: "21%" },
          { h: "% Complete", w: "16%" },
          { h: "Current Status", w: "20%" },
        ],
        [
          ["<b>Platform</b>", '<span class="mono">2026-03-22</span>', '<span class="mono">2026-04-17</span>', "100.0%", this.chip("Completed")],
          ["<b>Stabilization</b>", '<span class="mono">2026-06-15</span>', '<span class="mono">2026-07-25</span>', "12.0%", this.chip("On Track")],
        ],
      );
    const acc = this.tbl(
      [
        { h: "Accomplishment", w: "62%" },
        { h: "Owner", w: "22%" },
        { h: "Date", w: "16%" },
      ],
      [
        ["Board pagination / virtualization for 9,200 patients", "Project Manager", '<span class="mono">2026-06-30</span>'],
        ["Automated test coverage established", "Project Manager", '<span class="mono">2026-07-15</span>'],
        ["Data-freshness alerting for MANIFEST_CACHE", "Project Manager", '<span class="mono">2026-07-25</span>'],
      ],
    );
    const next = this.tbl(
      [
        { h: "Next Step", w: "62%" },
        { h: "Owner", w: "22%" },
        { h: "Target", w: "16%" },
      ],
      [
        ["Board pagination / virtualization for 9,200 patients", "Richard Allen", '<span class="mono">2026-06-30</span>'],
        ["Establish automated test coverage", "Richard Allen", '<span class="mono">2026-07-15</span>'],
        ["MANIFEST_CACHE freshness alerting", "Richard Allen", '<span class="mono">2026-07-25</span>'],
      ],
    );
    const legend =
      '<div class="legend"><b>Key:</b> G — Green &nbsp; Y — Yellow &nbsp; R — Off Track &nbsp; C — Completed &nbsp; NS — Not Started &nbsp; H — Hold &nbsp; CN — Cancelled &nbsp;<b>·</b>&nbsp; <b>Phase:</b> Initiating · Planning · Executing · Monitoring · Closing</div>';
    main.innerHTML =
      this.band("Report 01 · Project Status (continued)", "Project Status Report", "Key project areas · accomplishments · next steps", "sample") +
      kpa +
      '<div class="twocol" style="margin-top:4px"><div><h4 class="sh">Accomplishments</h4>' +
      acc +
      '</div><div><h4 class="sh">Next Steps</h4>' +
      next +
      "</div></div>" +
      legend;
  }

  addCdr() {
    const main = this.makeSheet({ running: "Controlled Document Register", id: "cdr" });
    const rows = [
      ["THG-IT-REF-001", "Theragen Project Planner — Data Dictionary", "Reference Document", "IT / Data / Security", "Reference", "BASELINE", "0.1", "Richard Allen", "Annual"],
      ["THG-IT-REF-002", "Theragen Project Planner BI — README", "Reference Document", "IT / Data / Security", "Reference", "BASELINE", "0.1", "Richard Allen", "Annual"],
      ["THG-IT-SOP-001", "Nightly Data Sync Runbook", "Standard Operating Procedure", "IT / Data / Security", "Cross-Lifecycle", "BASELINE", "0.1", "Richard Allen", "Annual"],
      ["THG-OPS-CHR-001", "APNE Project Charter", "Project Charter", "Operations / PMO", "Initiating", "BASELINE", "0.1", "Richard Allen", "On Major Revision"],
      ["THG-OPS-REF-001", "Theragen Project Planner — Business Glossary", "Reference Document", "Operations / PMO", "Reference", "BASELINE", "0.1", "Richard Allen", "Annual"],
      ["THG-OPS-SOP-001", "Change & Configuration Management Process (SOP)", "Standard Operating Procedure", "Operations / PMO", "Cross-Lifecycle", "BASELINE", "0.1", "Richard Allen", "Annual"],
    ];
    const body = this.tbl(
      [
        { h: "Doc ID", w: "13%" },
        { h: "Title", w: "23%" },
        { h: "Type", w: "13%" },
        { h: "Department", w: "13%" },
        { h: "Phase", w: "11%" },
        { h: "Status", w: "9%" },
        { h: "Ver", w: "5%" },
        { h: "Owner", w: "8%" },
        { h: "Review", w: "7%" },
      ],
      rows.map((r) => [
        '<span class="mono" style="color:var(--ink)">' + r[0] + "</span>",
        "<b>" + this.esc(r[1]) + "</b>",
        this.esc(r[2]),
        this.esc(r[3]),
        this.chip(r[4]),
        this.chip(r[5]),
        r[6],
        this.esc(r[7]),
        this.esc(r[8]),
      ]),
    );
    main.innerHTML =
      '<span id="rep-cdr"></span>' +
      this.band("Register 02 · Controlled Documents", "Controlled Document Register", "All org-wide controlled documents", "sample") +
      body +
      '<div class="note">Status BASELINE indicates an approved, version-controlled record. Review cadence governs the next mandatory revision; “On Major Revision” documents re-baseline on the next substantive change.</div>';
  }

  addCr() {
    const main = this.makeSheet({ running: "Governance Change-Control Register", id: "cr" });
    const cr =
      '<h4 class="sh">Governance Change Requests</h4>' +
      this.tbl(
        [
          { h: "CR Code", w: "9%" },
          { h: "Document", w: "13%" },
          { h: "Document Title", w: "20%" },
          { h: "Class", w: "13%" },
          { h: "Requested By", w: "12%" },
          { h: "Requested", w: "10%" },
          { h: "Decision", w: "11%" },
          { h: "Status", w: "12%" },
        ],
        [
          [
            "<b>CHG-001</b>",
            '<span class="mono" style="color:var(--ink)">THG-IT-SOP-001</span>',
            "Nightly Data Sync Runbook",
            this.chip("B — Substantive"),
            "Richard Allen",
            '<span class="mono">2026-06-14</span>',
            this.chip("Approved"),
            this.chip("Verified"),
          ],
        ],
      );
    const impact =
      '<h4 class="sh">Department Impact Assessments</h4>' +
      this.tbl(
        [
          { h: "CR Code", w: "9%" },
          { h: "Document", w: "13%" },
          { h: "Department", w: "17%" },
          { h: "Impact Summary", w: "26%" },
          { h: "Compliance Impact", w: "24%" },
          { h: "Submitted", w: "11%" },
        ],
        [
          ["<b>CHG-001</b>", '<span class="mono" style="color:var(--ink)">THG-IT-SOP-001</span>', "IT / Data / Security", "Update the workflow form.", "", '<span class="mono">2026-06-14</span>'],
          ["<b>CHG-001</b>", '<span class="mono" style="color:var(--ink)">THG-IT-SOP-001</span>', "Regulatory / Quality", "Re-train QA on the revised gate.", "ISO 13485 clause 4.2.4 document control.", '<span class="mono">2026-06-14</span>'],
        ],
      );
    main.innerHTML =
      '<span id="rep-cr"></span>' +
      this.band("Register 03 · Change Control", "Governance Change-Control Register", "All controlled-document change requests (CHG-NNN)", "sample") +
      cr +
      impact;
  }

  addBaseline() {
    const main = this.makeSheet({ running: "Baseline & Phase-Gate Register", id: "baseline" });
    const bl =
      '<h4 class="sh">Project Baselines (Immutable Snapshots)</h4>' +
      this.tbl(
        [
          { h: "Type", w: "12%" },
          { h: "Version", w: "9%" },
          { h: "Status", w: "13%" },
          { h: "Change Summary", w: "30%" },
          { h: "Baselined By", w: "15%" },
          { h: "Baselined", w: "13%" },
          { h: "Activities", w: "8%" },
        ],
        [
          ["<b>Budget</b>", "1.0", this.chip("Baselined"), "", "Richard Allen", '<span class="mono">2026-06-13</span>', "0"],
          ["<b>Schedule</b>", "1.0", this.chip("Superseded"), "", "Richard Allen", '<span class="mono">2026-06-13</span>', "8"],
          ["<b>Schedule</b>", "2.0", this.chip("Baselined"), "re-baseline after CR", "Richard Allen", '<span class="mono">2026-06-13</span>', "8"],
        ],
      );
    const pg =
      '<h4 class="sh">Phase-Gate Transitions</h4>' +
      this.tbl(
        [
          { h: "From Phase", w: "17%" },
          { h: "To Phase", w: "17%" },
          { h: "Gate Decision", w: "17%" },
          { h: "Approved By", w: "20%" },
          { h: "Decided", w: "14%" },
          { h: "Gate Notes", w: "15%" },
        ],
        [
          [this.chip("Initiating"), this.chip("Planning"), this.chip("Approved"), "Richard Allen", "", ""],
          [this.chip("Planning"), this.chip("Planning"), this.chip("Held"), "Richard Allen", "", ""],
        ],
      );
    main.innerHTML =
      '<span id="rep-baseline"></span>' +
      this.band("Register 04 · Baselines", "Baseline & Phase-Gate Register", "Project THG-IT-005 · immutable baselines & gate log", "sample") +
      bl +
      pg;
  }

  addDossier() {
    const main = this.makeSheet({ running: "Controlled Document Dossier", id: "dossier" });
    const meta = this.kvgrid(
      4,
      this.kv("Doc ID", '<span class="mono" style="color:var(--ink);font-size:11pt">THG-IT-SOP-001</span>') +
        this.kv("Status", this.chip("Baseline")) +
        this.kv("Version", "0.1") +
        this.kv("Classification", "Confidential — Internal") +
        this.kv("Document Type", "Standard Operating Procedure") +
        this.kv("Department", "IT / Data / Security") +
        this.kv("Lifecycle Phase", this.chip("Cross-Lifecycle")) +
        this.kv("Owner", "<b>Richard Allen</b>") +
        this.kv("Approver", '<span class="mono">—</span>') +
        this.kv("Review Cycle", "Annual") +
        this.kv("Next Review Due", '<span class="mono">—</span>') +
        this.kv("Title", "<b>Nightly Data Sync Runbook</b>"),
    );
    const raci = '<h4 class="sh">RACI — Responsibility Assignment</h4><div class="empty">No RACI assignments recorded for this document.</div>';
    const vh =
      '<h4 class="sh">Version History</h4>' +
      this.tbl(
        [
          { h: "Version", w: "9%" },
          { h: "Status", w: "12%" },
          { h: "Change Summary", w: "32%" },
          { h: "Class", w: "15%" },
          { h: "Author", w: "15%" },
          { h: "Effective", w: "9%" },
          { h: "Linked CR", w: "8%" },
        ],
        [["2.0", this.chip("Baseline"), "Revised change-control gate per CHG-001.", this.chip("B — Substantive"), "Richard Allen", "", "<b>CHG-001</b>"]],
      );
    const att =
      '<h4 class="sh">Approval Attestations (non–21 CFR Part 11 · server-computed traceability)</h4>' +
      '<div class="empty">No approval attestations recorded.</div>' +
      '<div class="note">Attestations are labelled non–21 CFR Part 11; they record server-computed traceability and must never be represented as Part 11 electronic signatures.</div>';
    const crs =
      '<h4 class="sh">Governance Change Requests Against This Document</h4>' +
      this.tbl(
        [
          { h: "CR Code", w: "10%" },
          { h: "Class", w: "15%" },
          { h: "Description", w: "37%" },
          { h: "Decision", w: "11%" },
          { h: "Status", w: "11%" },
          { h: "Decided By", w: "10%" },
          { h: "Decided", w: "6%" },
        ],
        [
          [
            "<b>CHG-001</b>",
            this.chip("B — Substantive"),
            "Tighten the change-control review gate in SOP-003 section 5.",
            this.chip("Approved"),
            this.chip("Verified"),
            "Richard Allen",
            '<span class="mono">2026-06-14</span>',
          ],
        ],
      );
    main.innerHTML =
      '<span id="rep-dossier"></span>' +
      this.band("Dossier 05 · Controlled Document", "Controlled Document Dossier", "THG-IT-SOP-001 · Nightly Data Sync Runbook", "sample") +
      meta +
      raci +
      vh +
      att +
      crs;
  }

  // ===== LIVE renderers =====
  sortPos(arr?: Record<string, unknown>[]): Record<string, unknown>[] {
    return (arr || []).slice().sort((a, b) => ((a.position as number) || 0) - ((b.position as number) || 0));
  }

  addStatusLive() {
    const main = this.makeSheet({ running: "Project Status Report", id: "status" });
    const rows = this.live.status || [];
    if (!rows.length) {
      main.innerHTML =
        '<span id="rep-status"></span>' +
        this.band("Report 01 · Project Status", "Project Status Report", this.scopeName() || "No status submission in scope", "live") +
        '<div class="empty">No Status Report submission' +
        (this.scope ? " for this project" : "") +
        " yet — add one in the Forms app to populate this record.</div>";
      return;
    }
    const row = rows[0];
    const p = this.proj(row);
    const pm = this.pick(row, /owner/) || (p && p.pm) || "";
    const date = this.fdate(this.pick(row, /date/));
    const phase = (p && p.phase) || this.pick(row, /phase/) || "";
    const rag = this.pick(row, /rag/) || this.pick(row, /status/);
    const rk = this.ragKind(rag);
    const projName = (p && (p.name || p.code)) || (row.title as string) || "Status Report";
    const summary = this.pick(row, /summary|rag_status/) || this.pick(row, /description/);
    const progress = this.pick(row, /progress/);
    const decisions = this.pick(row, /decision/);
    const header = this.kvgrid(
      4,
      this.kv("Project Manager", pm ? "<b>" + this.esc(pm) + "</b>" : '<span class="mono">—</span>') +
        this.kv("Project / Submission", this.esc(projName)) +
        this.kv("Current Phase", phase ? this.chip(phase) : '<span class="mono">—</span>') +
        this.kv("Date of Report", date ? '<span class="mono">' + date + "</span>" : '<span class="mono">—</span>'),
    );
    const dotc = rk[0] === "g" ? "green" : rk[0] === "r" ? "red" : "amber";
    const statusRow =
      '<div class="mainstat ' +
      rk[0] +
      '" style="margin-top:13px"><span class="dot ' +
      dotc +
      '" style="width:14px;height:14px"></span><div><div class="lab">Main Status</div><div class="val">' +
      this.esc(rk[1]) +
      "</div></div></div>";
    let prose =
      '<div class="twocol" style="margin-top:13px">' +
      '<div class="pblock"><div class="pl">Summary &amp; Status</div><p>' +
      (summary ? this.esc(summary) : '<span style="color:var(--faint)">Not recorded in this submission.</span>') +
      "</p></div>" +
      '<div class="pblock"><div class="pl">Progress</div><p>' +
      (progress ? this.esc(progress) : '<span style="color:var(--faint)">Not recorded.</span>') +
      "</p></div></div>";
    if (decisions) prose += '<div class="pblock" style="margin-top:12px"><div class="pl">Decisions</div><p>' + this.esc(decisions) + "</p></div>";
    let raid;
    const risks = this.live.risks || [];
    if (risks.length) {
      const rr = risks.slice(0, 12).map((r) => {
        const desc = this.pick(r, /risk|descr|threat|issue/);
        const own = this.pick(r, /owner/);
        const L = this.pick(r, /likeli|probab/),
          I = this.pick(r, /impact|sever/);
        const sc = this.liScore(L, I);
        return [
          this.chip("Risk"),
          this.esc(desc || "Risk"),
          this.esc(own || ""),
          '<span class="mono">' + (this.fdate(this.pick(r, /date|due|target/)) || "—") + "</span>",
          '<span class="num">' + (sc || "—") + "</span>",
          this.chip(sc >= 16 ? "High" : sc >= 9 ? "Medium" : "Low"),
          this.chip(this.pick(r, /status/) || "Open"),
        ];
      });
      raid =
        '<h4 class="sh">RAID Log — from Risk Register submissions</h4>' +
        this.tbl(
          [
            { h: "Type", w: "8%" },
            { h: "Risk / Issue", w: "45%" },
            { h: "Owner", w: "13%" },
            { h: "Target", w: "11%" },
            { h: "Score", w: "7%" },
            { h: "Severity", w: "9%" },
            { h: "Status", w: "7%" },
          ],
          rr,
        );
    } else {
      raid = '<h4 class="sh">RAID Log</h4><div class="empty">No Risk Register submissions on your account yet — add one in the Forms app to populate this log.</div>';
    }
    const note =
      '<div class="note">Live from your <b>Status Report</b> submission' +
      (rows.length > 1 ? " (latest of " + rows.length + ")" : "") +
      "; the RAID log is drawn from your <b>Risk Register</b> submissions. Tag both to a project to scope them together.</div>";
    main.innerHTML =
      '<span id="rep-status"></span>' +
      this.band("Report 01 · Project Status", "Project Status Report", projName, "live") +
      header +
      statusRow +
      prose +
      raid +
      note;
  }

  addCrLive() {
    const main = this.makeSheet({ running: "Governance Change-Control Register", id: "cr" });
    const rows = this.live.cr || [];
    if (!rows.length) {
      main.innerHTML =
        '<span id="rep-cr"></span>' +
        this.band("Register 03 · Change Control", "Governance Change-Control Register", this.scopeName() || "No change requests in scope", "live") +
        '<div class="empty">No Change Request submission' +
        (this.scope ? " for this project" : "") +
        " on record yet.</div>";
      return;
    }
    const body = rows.map((r) => {
      const p = this.proj(r);
      const code = this.pick(r, /^cr$|cr_|chg|number/) || (r.title as string) || "CR";
      const desc = this.pick(r, /change_desc|description|change/);
      const reqBy = this.pick(r, /requester|owner|author/);
      const reqOn = this.fdate(this.pick(r, /date|requested/));
      const status = this.pick(r, /status/);
      const impact = this.pick(r, /impact/);
      return [
        "<b>" + this.esc(code) + "</b>",
        this.esc(desc || "—"),
        this.esc((p && (p.name || p.code)) || "—"),
        this.esc(reqBy || "—"),
        '<span class="mono">' + (reqOn || "—") + "</span>",
        this.chip(status || "Open"),
        this.esc(impact || "—"),
      ];
    });
    const cr =
      '<h4 class="sh">Governance Change Requests — from your submissions</h4>' +
      this.tbl(
        [
          { h: "CR", w: "10%" },
          { h: "Change Description", w: "30%" },
          { h: "Project", w: "14%" },
          { h: "Requested By", w: "13%" },
          { h: "Requested", w: "10%" },
          { h: "Status", w: "10%" },
          { h: "Impact Analysis", w: "13%" },
        ],
        body,
      );
    const note =
      '<div class="note">Live from your <b>Change Request</b> submissions. Class, decision, and per-department impact assessments render here once captured in the source form.</div>';
    main.innerHTML =
      '<span id="rep-cr"></span>' +
      this.band("Register 03 · Change Control", "Governance Change-Control Register", rows.length + " change request" + (rows.length === 1 ? "" : "s") + " on record", "live") +
      cr +
      note;
  }

  addCdrLive() {
    const main = this.makeSheet({ running: "Controlled Document Register", id: "cdr" });
    const rows = this.live.cdoc || [];
    if (!rows.length) {
      main.innerHTML =
        '<span id="rep-cdr"></span>' +
        this.band("Register 02 · Controlled Documents", "Controlled Document Register", this.scopeName() || "No controlled documents in scope", "live") +
        '<div class="empty">No controlled documents' +
        (this.scope ? " for this project" : "") +
        " on file yet.</div>";
      return;
    }
    const body = rows.map((r) => [
      "<b>" + this.esc(this.pick(r, /doc_id/) || (r.title as string) || "—") + "</b>",
      this.esc(this.pick(r, /document_title/) || (r.title as string) || "—"),
      this.esc(this.pick(r, /document_type/) || "—"),
      this.esc(this.pick(r, /department/) || "—"),
      this.pick(r, /lifecycle_phase|phase/) ? this.chip(this.pick(r, /lifecycle_phase|phase/)) : '<span class="mono">—</span>',
      this.chip(this.pick(r, /status/) || "—"),
      '<span class="mono">' + (this.pick(r, /version/) || "—") + "</span>",
      this.esc(this.pick(r, /owner/) || "—"),
      this.esc(this.pick(r, /review_cycle/) || "—"),
    ]);
    const tb = this.tbl(
      [
        { h: "Doc ID", w: "13%" },
        { h: "Title", w: "22%" },
        { h: "Type", w: "12%" },
        { h: "Department", w: "13%" },
        { h: "Phase", w: "11%" },
        { h: "Status", w: "9%" },
        { h: "Ver", w: "5%" },
        { h: "Owner", w: "9%" },
        { h: "Review", w: "6%" },
      ],
      body,
    );
    const note =
      '<div class="note">Live from your <b>Controlled Document</b> records (' +
      rows.length +
      " on file). Status BASELINE indicates an approved, version-controlled record; review cadence governs the next mandatory revision.</div>";
    main.innerHTML =
      '<span id="rep-cdr"></span>' +
      this.band("Register 02 · Controlled Documents", "Controlled Document Register", "All org-wide controlled documents", "live") +
      tb +
      note;
  }

  addBaselineLive() {
    const main = this.makeSheet({ running: "Baseline & Phase-Gate Register", id: "baseline" });
    const recs = this.live.bpg || [];
    const baseRows: Cell[][] = [],
      gateRows: Cell[][] = [];
    recs.forEach((rec) => {
      this.sortPos(this.live.bpgBase && this.live.bpgBase[rec.id as string]).forEach((b) =>
        baseRows.push([
          this.chip(this.pick(b, /type/) || "—"),
          '<span class="mono">' + (this.pick(b, /version/) || "—") + "</span>",
          this.chip(this.pick(b, /status/) || "—"),
          this.esc(this.pick(b, /change_summary|summary/) || "—"),
          this.esc(this.pick(b, /baselined_by|by/) || "—"),
          '<span class="mono">' + (this.fdate(this.pick(b, /date/)) || "—") + "</span>",
          this.esc(this.pick(b, /budget/) || "—"),
          '<span class="mono">' + (this.pick(b, /activit/) || "—") + "</span>",
        ]),
      );
      this.sortPos(this.live.bpgGate && this.live.bpgGate[rec.id as string]).forEach((g) =>
        gateRows.push([
          this.esc(this.pick(g, /from/) || "—"),
          this.esc(this.pick(g, /to_phase|^to/) || "—"),
          this.chip(this.pick(g, /decision/) || "—"),
          this.esc(this.pick(g, /approved_by|by/) || "—"),
          '<span class="mono">' + (this.fdate(this.pick(g, /date/)) || "—") + "</span>",
          this.esc(this.pick(g, /notes/) || "—"),
        ]),
      );
    });
    const projLabel =
      recs.length === 1 ? this.pick(recs[0], /project_code/) || this.pick(recs[0], /project_name/) || "" : recs.length + " projects";
    let h =
      '<span id="rep-baseline"></span>' +
      this.band("Register 04 · Baselines", "Baseline & Phase-Gate Register", (projLabel ? projLabel + " · " : "") + "immutable baselines & gate log", "live");
    h +=
      '<h4 class="sh">Baselines</h4>' +
      (baseRows.length
        ? this.tbl(
            [
              { h: "Type", w: "11%" },
              { h: "Ver", w: "7%" },
              { h: "Status", w: "12%" },
              { h: "Change Summary", w: "28%" },
              { h: "Baselined By", w: "14%" },
              { h: "Date", w: "10%" },
              { h: "Budget", w: "9%" },
              { h: "Acts", w: "8%" },
            ],
            baseRows,
          )
        : '<div class="empty">No baselines recorded.</div>');
    h +=
      '<h4 class="sh">Phase-Gate Transitions</h4>' +
      (gateRows.length
        ? this.tbl(
            [
              { h: "From Phase", w: "15%" },
              { h: "To Phase", w: "15%" },
              { h: "Gate Decision", w: "14%" },
              { h: "Approved By", w: "16%" },
              { h: "Date", w: "12%" },
              { h: "Notes", w: "28%" },
            ],
            gateRows,
          )
        : '<div class="empty">No phase-gate transitions recorded.</div>');
    h +=
      '<div class="note">Live from your <b>Baseline &amp; Phase-Gate</b> records. Baselines are immutable — a re-baseline supersedes the prior version rather than editing it.</div>';
    main.innerHTML = h;
  }

  addDossierLive() {
    const main = this.makeSheet({ running: "Controlled Document Dossier", id: "dossier" });
    const rec = (this.live.cdoc || [])[0];
    if (!rec) {
      main.innerHTML =
        '<span id="rep-dossier"></span>' +
        this.band("Dossier 05 · Controlled Document", "Controlled Document Dossier", this.scopeName() || "No controlled document in scope", "live") +
        '<div class="empty">No controlled document' +
        (this.scope ? " for this project" : "") +
        " to build a dossier from.</div>";
      return;
    }
    const docId = this.pick(rec, /doc_id/) || "—";
    const title = this.pick(rec, /document_title/) || (rec.title as string) || "Controlled Document";
    const meta = this.kvgrid(
      4,
      this.kv("Doc ID", "<b>" + this.esc(docId) + "</b>") +
        this.kv("Status", this.chip(this.pick(rec, /status/) || "—")) +
        this.kv("Version", '<span class="mono">' + (this.pick(rec, /version/) || "—") + "</span>") +
        this.kv("Classification", this.esc(this.pick(rec, /classification/) || "—")) +
        this.kv("Document Type", this.esc(this.pick(rec, /document_type/) || "—")) +
        this.kv("Department", this.esc(this.pick(rec, /department/) || "—")) +
        this.kv("Lifecycle Phase", this.pick(rec, /lifecycle_phase|phase/) ? this.chip(this.pick(rec, /lifecycle_phase|phase/)) : '<span class="mono">—</span>') +
        this.kv("Owner", "<b>" + this.esc(this.pick(rec, /owner/) || "—") + "</b>") +
        this.kv("Approver", this.esc(this.pick(rec, /approver/) || "—")) +
        this.kv("Review Cycle", this.esc(this.pick(rec, /review_cycle/) || "—")) +
        this.kv("Next Review", '<span class="mono">' + (this.fdate(this.pick(rec, /next_review/)) || "—") + "</span>") +
        this.kv("Title", this.esc(title)),
    );
    const raci = this.sortPos(this.live.cdocRaci && this.live.cdocRaci[rec.id as string]).slice(0, 12);
    const raciH =
      '<h4 class="sh">RACI — Responsibility Assignment</h4>' +
      (raci.length
        ? this.tbl(
            [
              { h: "Role", w: "22%" },
              { h: "Name", w: "24%" },
              { h: "Responsibility", w: "18%" },
              { h: "Notes", w: "36%" },
            ],
            raci.map((x) => [
              this.esc(this.pick(x, /role/) || "—"),
              this.esc(this.pick(x, /name/) || "—"),
              this.chip(this.pick(x, /responsib/) || "—"),
              this.esc(this.pick(x, /notes/) || "—"),
            ]),
          )
        : '<div class="empty">No RACI assignments recorded for this document.</div>');
    const vers = this.sortPos(this.live.cdocVers && this.live.cdocVers[rec.id as string]).slice(0, 14);
    const verH =
      '<h4 class="sh">Version History</h4>' +
      (vers.length
        ? this.tbl(
            [
              { h: "Version", w: "9%" },
              { h: "Status", w: "12%" },
              { h: "Change Summary", w: "34%" },
              { h: "Class", w: "14%" },
              { h: "Author", w: "13%" },
              { h: "Effective", w: "10%" },
              { h: "CR", w: "8%" },
            ],
            vers.map((x) => [
              '<span class="mono">' + (this.pick(x, /version/) || "—") + "</span>",
              this.chip(this.pick(x, /status/) || "—"),
              this.esc(this.pick(x, /change_summary|summary/) || "—"),
              this.chip(this.pick(x, /class/) || "—"),
              this.esc(this.pick(x, /author/) || "—"),
              '<span class="mono">' + (this.fdate(this.pick(x, /effective/)) || "—") + "</span>",
              '<span class="mono">' + (this.pick(x, /linked_cr|cr/) || "—") + "</span>",
            ]),
          )
        : '<div class="empty">No version history recorded.</div>');
    const att = this.sortPos(this.live.cdocAtt && this.live.cdocAtt[rec.id as string]).slice(0, 10);
    const attH =
      '<h4 class="sh">Approval Attestations (non–21 CFR Part 11)</h4>' +
      (att.length
        ? this.tbl(
            [
              { h: "Name", w: "28%" },
              { h: "Role", w: "28%" },
              { h: "Attestation Kind", w: "26%" },
              { h: "Date", w: "18%" },
            ],
            att.map((x) => [
              this.esc(this.pick(x, /name/) || "—"),
              this.esc(this.pick(x, /role/) || "—"),
              this.chip(this.pick(x, /kind|attest/) || "Attestation (non-§11)"),
              '<span class="mono">' + (this.fdate(this.pick(x, /date/)) || "—") + "</span>",
            ]),
          )
        : '<div class="empty">No approval attestations recorded for this document.</div>');
    const crs = (this.live.cr || [])
      .filter((c) => {
        for (const k in c) {
          if (typeof c[k] === "string" && docId !== "—" && (c[k] as string).indexOf(docId) >= 0) return true;
        }
        return false;
      })
      .slice(0, 8);
    const crH =
      '<h4 class="sh">Governance Change Requests Against This Document</h4>' +
      (crs.length
        ? this.tbl(
            [
              { h: "CR", w: "12%" },
              { h: "Description", w: "42%" },
              { h: "Requested By", w: "16%" },
              { h: "Status", w: "15%" },
              { h: "Date", w: "15%" },
            ],
            crs.map((c) => [
              "<b>" + this.esc(this.pick(c, /^cr$|cr_|chg|number/) || (c.title as string) || "CR") + "</b>",
              this.esc(this.pick(c, /change_desc|description|change/) || "—"),
              this.esc(this.pick(c, /requester|owner|author/) || "—"),
              this.chip(this.pick(c, /status/) || "—"),
              '<span class="mono">' + (this.fdate(this.pick(c, /date/)) || "—") + "</span>",
            ]),
          )
        : '<div class="empty">No governance change requests reference this document.</div>');
    const note =
      '<div class="note">Live from your <b>Controlled Document</b> record' +
      ((this.live.cdoc || []).length > 1 ? " (first of " + (this.live.cdoc || []).length + ")" : "") +
      "; attestations are labelled non–21 CFR Part 11.</div>";
    main.innerHTML =
      '<span id="rep-dossier"></span>' +
      this.band("Dossier 05 · Controlled Document", "Controlled Document Dossier", docId + " · " + title, "live") +
      meta +
      raciH +
      verH +
      attH +
      crH +
      note;
  }
}

export default function GovernancePacket() {
  const rootRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const root = rootRef.current;
    const toolsHost = toolsRef.current;
    if (!root || !toolsHost) return;

    let cancelled = false;
    (async () => {
      try {
        if (typeof document !== "undefined" && document.fonts && document.fonts.ready) await document.fonts.ready;
      } catch {
        /* ignore */
      }
      let res;
      try {
        res = await loadLive();
      } catch {
        res = { data: {}, projMap: {}, user: null };
      }
      if (cancelled) return;
      const b = new PacketBuilder(root, toolsHost);
      b.allLive = res.data || {};
      b.projMap = res.projMap || {};
      b.user = res.user || null;
      b.scope = null;
      b.solo = null;
      b.applyScope();
      try {
        b.build();
      } catch (e) {
        root.innerHTML =
          '<div style="padding:40px;font-family:monospace;color:#B0492E">Build error: ' +
          (e instanceof Error ? e.message : String(e)) +
          "</div>";
      }
      const ld = document.getElementById("gov-loading");
      if (ld) ld.remove();
      b.mountControls();
    })();

    return () => {
      cancelled = true;
      const ex = document.getElementById("tools");
      if (ex) ex.remove();
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GOVERNANCE_CSS }} />
      <div id="gov-loading">
        <div className="sp" />
        <span>Compiling the governance packet…</span>
      </div>
      <a id="homelink" href="/">
        ← Home
      </a>
      <div id="paged-root" ref={rootRef} />
      <div ref={toolsRef} />
    </>
  );
}
