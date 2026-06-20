"use client";

// Pragmatic port of "Interactive Forms.dc.html" — the QQ-Studios Forms
// workspace. The static shell (sidebar/main/topbar + modals + landing) is
// rendered as JSX with the same ids/classes/markup as the prototype's <x-dc>
// body; all behavior is attached in a run-once useEffect that drives the same
// imperative innerHTML rendering and document.getElementById wiring the
// prototype used. Model logic (defs, schema) comes from lib/forms-model;
// Supabase comes from lib/supabase; planner sample data from lib/planner-sample.

import { useEffect, useRef } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  allDefs,
  allCatalog,
  domains as DOMAINS,
  snake,
  colsFor,
  tname,
  sqlDDL as sqlDDLfor,
  jsonSchema as jsonSchemaFor,
  supaSQL,
  type FormDef,
  type Section,
} from "@/lib/forms-model";
import {
  getClient,
  loadSavedCreds,
  saveCreds,
  clearCreds,
  ENV_SUPABASE,
} from "@/lib/supabase";
import { getSampleData, type PlannerData, type PlannerRisk } from "@/lib/planner-sample";
import { FORMS_CSS } from "./forms-css";

interface Rec {
  meta: Record<string, string>;
  sections: Record<string, unknown>;
}
interface Sub {
  id: string;
  user_id: string;
  form_id: string;
  title: string;
  project_id: string | null;
  data: Rec;
  updated_at: string;
  _draft?: boolean;
}
interface ProjectRow {
  id: string;
  code?: string;
  name?: string;
}

// Minimal supabase user shape we rely on.
interface SUser {
  id: string;
  email?: string;
}

class FormsLogic {
  KEY = "qq_forms_db_v1";
  db: Record<string, Rec> = {};
  defs: FormDef[] = [];
  domains: string[] = [];
  collapsed = new Set<number>();
  client: SupabaseClient | null = null;
  supa: { url: string; key: string } | null = null;
  user: SUser | null = null;
  byForm: Record<string, Sub[]> = {};
  active: Record<string, string | null> = {};
  loaded: Record<string, boolean> = {};
  _projects: ProjectRow[] = [];
  lean = false;
  _init = false;
  _activeDef: FormDef | null = null;
  _tab = "sql";
  _st: ReturnType<typeof setTimeout> | null = null;
  _authSub = false;
  _applyLean: (() => void) | null = null;
  _previewTimer: ReturnType<typeof setInterval> | null = null;
  _planner: PlannerData | null = null;
  _plannerKey = "";
  _plannerArea = "";
  _projFilter = "";
  _allProjects: PlannerData["projects"] = [];
  _noProjCol = false;

  // ---- model helpers (delegate to shared module) ----
  allDefs() { return allDefs(); }
  allCatalog() { return allCatalog(); }
  snake(s: string) { return snake(s); }
  colsFor(def: FormDef) { return colsFor(def); }
  tname(def: FormDef) { return tname(def); }
  supaSQL() { return supaSQL(); }
  sqlDDL() { return sqlDDLfor(this.defs); }
  jsonSchema() { return jsonSchemaFor(this.defs); }

  esc(s: unknown) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  async componentDidMount() {
    if (this._init) return;
    this._init = true;
    this.db = this.load();
    this.defs = this.allDefs();
    this.domains = DOMAINS;
    this.collapsed = new Set(this.domains.map((_, i) => i));
    const ad = (this.defs.find((d) => d.id === this.currentId()) || this.defs[0]).d;
    this.collapsed.delete(ad);
    this.renderIndex();
    this.wireChrome();
    this.initViews();
    this.initLanding();
    const ss = document.getElementById("supa-sql");
    if (ss) ss.textContent = this.supaSQL();
    this.initBackend();
    this._hashHandler = () => this.route();
    window.addEventListener("hashchange", this._hashHandler);
    this.route();
  }
  _hashHandler: (() => void) | null = null;
  destroy() {
    if (this._hashHandler) window.removeEventListener("hashchange", this._hashHandler);
    if (this._previewTimer) clearInterval(this._previewTimer);
  }

  currentId() {
    const m = (location.hash || "").match(/#\/(.+)/);
    return m ? decodeURIComponent(m[1]) : this.defs[0] && this.defs[0].id;
  }

  // ---------- persistence ----------
  load(): Record<string, Rec> {
    try {
      return JSON.parse(localStorage.getItem(this.KEY) || "null") || {};
    } catch {
      return {};
    }
  }
  save() {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(this.db));
      this.flashSaved();
    } catch {
      /* ignore */
    }
  }
  flashSaved() {
    const s = document.getElementById("saved");
    if (!s) return;
    s.style.opacity = "0.4";
    if (this._st) clearTimeout(this._st);
    this._st = setTimeout(() => {
      s.style.opacity = "1";
    }, 180);
  }

  // ---------- routing ----------
  route() {
    const h = location.hash || "";
    const m = h.match(/#\/(.+)/);
    const id = m ? decodeURIComponent(m[1]) : "";
    if (id === "" || id === "welcome") {
      this.showLanding();
      return;
    }
    this.hideLanding();
    const v = document.getElementById("form");
    if (v) {
      v.classList.remove("gallery-mode");
      v.classList.remove("planner-mode");
    }
    if (id === "gallery") {
      this._activeDef = null;
      document.querySelectorAll(".side a.item").forEach((a) => a.classList.remove("active"));
      if (v) v.classList.add("gallery-mode");
      this.renderGallery();
      return;
    }
    if (id === "planner" || id.indexOf("planner/") === 0) {
      this._activeDef = null;
      document.querySelectorAll(".side a.item").forEach((a) => a.classList.remove("active"));
      if (v) v.classList.add("planner-mode");
      this.renderPlanner(id.indexOf("/") >= 0 ? id.split("/")[1] : "");
      return;
    }
    const def = this.defs.find((d) => d.id === id) || this.defs[0];
    this._activeDef = def;
    this.renderForm(def);
    document.querySelectorAll(".side a.item").forEach((a) =>
      a.classList.toggle("active", (a as HTMLElement).dataset.id === def.id),
    );
    const grp = document.querySelector('.side-group[data-g="' + def.d + '"]');
    if (grp) {
      grp.classList.remove("collapsed");
      if (this.collapsed) this.collapsed.delete(def.d);
    }
    if (this.user)
      this.ensureLoaded(def.id).then(() => {
        if (this._activeDef === def) this.renderForm(def);
      });
  }

  // ---------- index ----------
  renderIndex() {
    const wrap = document.getElementById("index");
    if (!wrap) return;
    const built = new Set(this.defs.map((d) => d.id));
    const ALL = this.allCatalog();
    const active = this.currentId();
    let html = "";
    this.domains.forEach((dom, di) => {
      const items = ALL.filter((x) => x.d === di);
      if (!items.length) return;
      const nb = items.filter((x) => built.has(x.id)).length;
      const collapsed = this.collapsed.has(di) ? " collapsed" : "";
      html +=
        '<div class="side-group' + collapsed + '" data-g="' + di + '">' +
        '<div class="side-ghead" data-toggle="' + di + '"><span class="gname">' + this.esc(dom) + "</span>" +
        '<span class="gmeta"><span class="gcount">' + nb + "/" + items.length + '</span><span class="chev">▾</span></span></div>' +
        '<div class="side-gbody">' +
        items
          .map((it) => {
            const on = built.has(it.id);
            return (
              '<a class="item' + (on ? "" : " disabled") + (it.id === active ? " active" : "") + '" data-id="' + it.id +
              '" title="' + this.esc(it.code) + '" data-search="' + this.esc((it.code + " " + it.title).toLowerCase()) + '" href="' + (on ? "#/" + it.id : "javascript:void 0") + '">' +
              '<span class="tt">' + this.esc(it.title) + "</span></a>"
            );
          })
          .join("") +
        "</div></div>";
    });
    wrap.innerHTML = html;
  }
  applySearch(q: string) {
    q = (q || "").trim().toLowerCase();
    document.querySelectorAll(".side-group").forEach((g) => {
      let any = false;
      g.querySelectorAll(".item").forEach((a) => {
        const el = a as HTMLElement;
        const hit = !q || (el.dataset.search || "").indexOf(q) >= 0;
        el.style.display = hit ? "" : "none";
        if (hit) any = true;
      });
      (g as HTMLElement).style.display = any ? "" : "none";
      if (q) g.classList.remove("collapsed");
    });
  }

  // ---------- views: guidance toggle + gallery ----------
  initViews() {
    const gb = document.getElementById("btn-gallery");
    if (gb) gb.onclick = () => { location.hash = "#/gallery"; };
    const pb = document.getElementById("btn-planner");
    if (pb) pb.onclick = () => { location.hash = "#/planner"; };
    const sb = document.querySelector(".side-brand") as HTMLElement | null;
    if (sb) { sb.style.cursor = "pointer"; sb.title = "Open the gallery"; sb.onclick = () => { location.hash = "#/gallery"; }; }
    this.lean = localStorage.getItem("qq_forms_lean") === "1";
    const apply = () => {
      const w = document.getElementById("form");
      if (w && !w.classList.contains("gallery-mode")) w.classList.toggle("lean", this.lean);
      const b = document.getElementById("btn-guide");
      if (b) { b.textContent = this.lean ? "Show guidance" : "Hide guidance"; b.classList.toggle("primary", this.lean); }
    };
    this._applyLean = apply;
    apply();
    const tb = document.getElementById("btn-guide");
    if (tb)
      tb.onclick = () => {
        this.lean = !this.lean;
        try { localStorage.setItem("qq_forms_lean", this.lean ? "1" : "0"); } catch { /* ignore */ }
        apply();
      };
  }
  renderGallery() {
    const cr = document.getElementById("crumbs");
    if (cr) cr.innerHTML = "<b>Gallery</b> &nbsp;/&nbsp; all " + this.defs.length + " forms";
    let h =
      '<div class="gal-head"><h1>Forms Gallery</h1><p>Every document type in the Glossary by Domain. Pick one to start filling it in — each is editable, auto-saving, and carries an example for every field.</p></div>';
    const ALL = this.allCatalog();
    this.domains.forEach((dom, di) => {
      const items = ALL.filter((x) => x.d === di);
      if (!items.length) return;
      h += '<div class="gal-dom"><span class="gd-name">' + this.esc(dom) + '</span><span class="gd-count">' + items.length + " forms</span></div>";
      h +=
        '<div class="gal-grid">' +
        items
          .map((it) => {
            const def = this.defs.find((d) => d.id === it.id);
            const purpose = def ? def.purpose : "";
            const nsec = def ? def.sections.length : 0;
            return (
              '<a class="gcard" href="#/' + it.id + '">' +
              '<span class="gc-code">' + this.esc(it.code) + "</span>" +
              '<span class="gc-title">' + this.esc(it.title) + "</span>" +
              '<span class="gc-purpose">' + this.esc(purpose) + "</span>" +
              '<span class="gc-foot"><span>' + nsec + " section" + (nsec === 1 ? "" : "s") + '</span><span class="arr">→</span></span></a>'
            );
          })
          .join("") +
        "</div>";
    });
    const v = document.getElementById("form");
    if (v) { v.innerHTML = h; v.scrollTop = 0; }
  }

  // ---------- planner (PMBOK dashboard) ----------
  pRag(r: string) { const w: Record<string, string> = { green: "On track", amber: "Watch", red: "At risk" }; return '<span class="rag ' + r + '"><span class="d"></span>' + (w[r] || "On track") + "</span>"; }
  pRiskColor(s: number) { return s >= 16 ? "#C2603F" : s >= 10 ? "#B98A22" : "#8A8A86"; }
  pKpi(l: string, v: string, d?: string, cls?: string) { return '<div class="kpi"><div class="kl">' + l + '</div><div class="kv">' + v + "</div>" + (d ? '<div class="kd ' + (cls || "") + '">' + d + "</div>" : "") + "</div>"; }
  pMean(a: number[]) { return a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0; }
  scaleNum(v: unknown) {
    if (v == null || v === "") return 3;
    const n = parseFloat(String(v));
    if (!isNaN(n)) return Math.max(1, Math.min(5, Math.round(n)));
    const s = String(v).toLowerCase();
    if (/crit|very high|vhigh/.test(s)) return 5;
    if (/high/.test(s)) return 4;
    if (/med|mod/.test(s)) return 3;
    if (/very low|negl/.test(s)) return 1;
    if (/low|minor/.test(s)) return 2;
    return 3;
  }

  getSampleData(): PlannerData { return getSampleData(); }

  async ensurePlannerData(force?: boolean, projId?: string): Promise<PlannerData> {
    projId = projId || "";
    if (this._planner && !force && this._plannerKey === projId) return this._planner;
    const data = this.getSampleData();
    if (this.user && this.client) {
      let live = false;
      try {
        const r = await this.client.from("projects").select("*").order("created_at");
        if (!r.error && r.data && r.data.length) {
          data.projects = r.data.map((p: Record<string, unknown>) => {
            const pct = +(p.pct as number) || 0, bac = +(p.bac as number) || 0, spent = +(p.spent as number) || 0;
            return { id: p.id as string, code: (p.code as string) || "—", name: (p.name as string) || "Untitled project", phase: (p.phase as string) || "—", pct, rag: (p.status as string) || "green", pm: (p.pm as string) || "—", bac, spent, cpi: spent > 0 ? ((pct / 100) * bac) / spent : 1, spi: 1.0, risks: 0, note: "" };
          });
          live = true;
        }
      } catch { /* ignore */ }
      try {
        const def = this.defs.find((d) => d.id === "risk_register");
        const sec = def && def.sections.find((s) => s.type === "table");
        if (def && sec) {
          const C = this.colsFor(def); const cm = C.child[sec.key]; const t = this.tname(def); const ct = t + "_" + this.snake(sec.key);
          let pq = this.client.from(t).select("id");
          if (projId) pq = pq.eq("project_id", projId);
          const pr = await pq;
          if (!pr.error && pr.data) {
            const ids = pr.data.map((x: { id: string }) => x.id);
            if (ids.length) {
              const r = await this.client.from(ct).select("*").in("parent_id", ids);
              if (!r.error && r.data) {
                const rk: PlannerRisk[] = r.data
                  .map((row: Record<string, unknown>) => {
                    const l = this.scaleNum(row[cm.likelihood]), i = this.scaleNum(row[cm.impact]);
                    const o = (row[cm.owner] as string) || "Unassigned";
                    return { n: (row[cm.risk] as string) || "Untitled risk", cat: "Risk", l, i, sc: l * i, owner: o, status: "Open", m: "Risk Register · " + o };
                  })
                  .sort((a, b) => (b.sc || 0) - (a.sc || 0));
                data.risks = rk; data.openRisks = rk.length; data.critical = rk.filter((x) => (x.sc || 0) >= 16).length; live = true;
              }
            } else if (projId) { data.risks = []; data.openRisks = 0; data.critical = 0; live = true; }
          }
        }
      } catch { /* ignore */ }
      try {
        const def = this.defs.find((d) => d.id === "change_request");
        if (def) {
          const C = this.colsFor(def); const t = this.tname(def); const sCol = C.meta["status"], cCol = C.meta["cr"], dCol = C.sec["change_description"];
          let q = this.client.from(t).select("*").order("updated_at", { ascending: false });
          if (projId) q = q.eq("project_id", projId);
          const r = await q;
          if (!r.error && r.data && (r.data.length || projId)) {
            let open = 0, pending = 0, approved = 0; const recent: { code: string; desc: string; status: string }[] = [];
            r.data.forEach((row: Record<string, unknown>) => {
              const s = String(row[sCol] || "").toLowerCase();
              if (/appro/.test(s)) approved++; else if (/pend|cab|review/.test(s)) pending++; else open++;
              if (recent.length < 3) recent.push({ code: (row[cCol] as string) || "CR", desc: String(row[dCol] || "(no description)").slice(0, 52), status: (row[sCol] as string) || "Open" });
            });
            data.change = { open, pending, approved, recent }; live = true;
          }
        }
      } catch { /* ignore */ }
      try {
        const def = this.defs.find((d) => d.id === "status_report");
        if (def) {
          const C = this.colsFor(def); const t = this.tname(def); const ragCol = C.meta["rag"];
          let q = this.client.from(t).select("*").order("updated_at", { ascending: false });
          if (projId) q = q.eq("project_id", projId);
          const r = await q;
          if (!r.error && r.data && (r.data.length || projId)) {
            let on = 0, watch = 0, risk = 0;
            r.data.forEach((row: Record<string, unknown>) => {
              const s = String(row[ragCol] || "").toLowerCase();
              if (/red|off|at risk/.test(s)) risk++; else if (/amber|yellow|watch/.test(s)) watch++; else on++;
            });
            data.status = { reports: r.data.length, onTrack: on, watch, atRisk: risk }; live = true;
          }
        }
      } catch { /* ignore */ }
      data.source = live ? "live" : "sample";
    }
    this._allProjects = data.projects.slice();
    if (projId) data.projects = data.projects.filter((p) => String(p.id || p.code) === String(projId));
    this._plannerKey = projId; this._planner = data; return data;
  }

  plannerHead(active: string, title: string, sub: string, data: PlannerData) {
    const areas: [string, string][] = [["Portfolio", ""], ["Status", "status"], ["Schedule", "schedule"], ["Cost", "cost"], ["Risk", "risk"], ["Change", "change"], ["People", "people"], ["Closure", "closing"]];
    const built: Record<string, number> = { "": 1, status: 1, schedule: 1, risk: 1, cost: 1, change: 1, people: 1, closing: 1 };
    const tabs = areas
      .map(([label, slug]) => {
        if (built[slug]) return '<a class="psub' + (slug === active ? " active" : "") + '" href="#/planner' + (slug ? "/" + slug : "") + '">' + label + "</a>";
        return '<span class="psub disabled" title="Coming soon">' + label + "</span>";
      })
      .join("");
    const banner =
      data.source === "live"
        ? '<span class="dsrc live">● Live — from your submissions</span>'
        : '<span class="dsrc">○ Sample data' + (this.user ? " — add a project to go live" : " — sign in to go live") + "</span>";
    const all = this._allProjects || data.projects || [];
    const filter = all.length
      ? '<select id="plnr-proj" class="plnr-proj"><option value="">All projects</option>' +
        all.map((p) => { const vv = p.id || p.code; return '<option value="' + vv + '"' + (String(vv) === String(this._projFilter || "") ? " selected" : "") + ">" + this.esc(p.name) + "</option>"; }).join("") +
        "</select>"
      : "";
    return (
      '<div class="dash-head"><div><h1>' + title + '</h1><p>' + sub + '</p></div><div style="text-align:right">' + banner + filter + '<div class="asof">As of 19 Jun 2026</div></div></div>' +
      '<div class="planner-sub">' + tabs + "</div>"
    );
  }

  wirePlannerControls() {
    const sel = document.getElementById("plnr-proj") as HTMLSelectElement | null;
    if (sel) sel.onchange = () => { this._projFilter = sel.value || ""; this.ensurePlannerData(true, this._projFilter).then(() => this.renderPlanner(this._plannerArea)); };
    const b = document.getElementById("np-add");
    if (b) b.onclick = () => this.addProject();
  }

  async renderPlanner(area: string) {
    area = area || "";
    this._plannerArea = area;
    const data = await this.ensurePlannerData(false, this._projFilter);
    if (area === "status") this.renderStatus(data);
    else if (area === "risk") this.renderRisk(data);
    else if (area === "schedule") this.renderSchedule(data);
    else if (area === "cost") this.renderCost(data);
    else if (area === "change") this.renderChange(data);
    else if (area === "people") this.renderPeople(data);
    else if (area === "closing") this.renderClosure(data);
    else this.renderPortfolio(data);
    this.wirePlannerControls();
  }

  renderPortfolio(data: PlannerData) {
    const cr = document.getElementById("crumbs"); if (cr) cr.innerHTML = "<b>Project Planner</b> &nbsp;/&nbsp; Portfolio Overview";
    const ps = data.projects, risks = data.risks, change = data.change;
    const avgPct = Math.round(this.pMean(ps.map((p) => p.pct)));
    const cpi = this.pMean(ps.map((p) => p.cpi)), spi = this.pMean(ps.map((p) => p.spi));
    const budget = ps.reduce((a, p) => a + p.bac, 0);
    let h =
      this.plannerHead("", "Project Portfolio", "A PMBOK-aligned portfolio dashboard — health, schedule, cost, and risk across active projects.", data) +
      '<div class="kpi-row">' +
      this.pKpi("Active Projects", String(ps.length)) +
      this.pKpi("Avg % Complete", avgPct + "%") +
      this.pKpi("Portfolio CPI", cpi.toFixed(2), cpi < 1 ? "▼ cost over-run" : "▲ on budget", cpi < 1 ? "down" : "up") +
      this.pKpi("Portfolio SPI", spi.toFixed(2), spi < 1 ? "▼ behind plan" : "▲ on schedule", spi < 1 ? "down" : "up") +
      this.pKpi("Open Risks", String(data.openRisks), data.critical + " critical", "down") +
      this.pKpi("Portfolio Budget", "$" + budget.toFixed(1) + "M") +
      "</div>";
    if (this.user) {
      h +=
        '<div class="dash-card full np-card"><div class="dc-h"><h3>Add a project</h3><span class="more">Saved privately to your account</span></div>' +
        '<div class="np-grid">' +
        '<input id="np-name" placeholder="Project name">' +
        '<input id="np-code" placeholder="Code">' +
        '<select id="np-phase"><option>Initiation</option><option>Planning</option><option selected>Execution</option><option>Monitoring</option><option>Closing</option></select>' +
        '<input id="np-pct" type="number" min="0" max="100" placeholder="% done">' +
        '<select id="np-status"><option value="green">On track</option><option value="amber">Watch</option><option value="red">At risk</option></select>' +
        '<input id="np-pm" placeholder="Project manager">' +
        '<input id="np-bac" type="number" step="0.1" placeholder="Budget $M">' +
        '<button class="btn primary" id="np-add">Add</button>' +
        "</div></div>";
    }
    h +=
      '<div class="dash-card full"><div class="dc-h"><h3>Active Projects</h3><span class="more">Phase · Progress · CPI / SPI · Budget · Risk</span></div>' +
      '<table class="ptab"><thead><tr><th>Project</th><th>Phase</th><th>Progress</th><th>Status</th><th>CPI</th><th>SPI</th><th>Budget</th><th>Risks</th><th>PM</th></tr></thead><tbody>' +
      (ps.length
        ? ps
            .map(
              (p) =>
                "<tr>" +
                '<td><div class="pname">' + this.esc(p.name) + '</div><div class="pcode">' + this.esc(p.code) + "</div></td>" +
                "<td>" + this.esc(p.phase) + "</td>" +
                '<td><div style="display:flex;align-items:center;gap:8px"><div class="pbar" style="width:84px"><i style="width:' + p.pct + '%"></i></div><span style="font-family:\'IBM Plex Mono\';font-size:10px;color:var(--muted)">' + p.pct + "%</span></div></td>" +
                "<td>" + this.pRag(p.rag) + "</td>" +
                '<td style="font-family:\'IBM Plex Mono\';font-size:12px;color:' + (p.cpi < 1 ? "#C2603F" : "#4C8A50") + '">' + p.cpi.toFixed(2) + "</td>" +
                '<td style="font-family:\'IBM Plex Mono\';font-size:12px;color:' + (p.spi < 1 ? "#C2603F" : "#4C8A50") + '">' + p.spi.toFixed(2) + "</td>" +
                '<td style="font-family:\'IBM Plex Mono\';font-size:11px">$' + p.bac.toFixed(1) + "M</td>" +
                "<td>" + p.risks + "</td><td>" + this.esc(p.pm) + "</td></tr>",
            )
            .join("")
        : '<tr><td colspan="9" style="color:var(--muted);padding:18px 8px">No projects yet — add one above to start your live portfolio.</td></tr>') +
      "</tbody></table></div>" +
      '<div class="dash-grid">' +
      '<div class="dash-card"><div class="dc-h"><h3>Knowledge-Area Health</h3><span class="more">PMBOK</span></div><div class="ka-grid">' +
      data.kas.map((k) => '<div class="ka"><span class="kan">' + k[0] + "</span>" + this.pRag(k[1]) + "</div>").join("") +
      "</div></div>" +
      '<div class="dash-card"><div class="dc-h"><h3>Upcoming Milestones</h3><span class="more">Next 30 days</span></div>' +
      data.milestones.map((mm) => '<div class="tl-row"><div class="tl-date">' + mm.d + '</div><div class="tl-body"><div class="tl-name">' + mm.n + '</div><div class="tl-meta">' + mm.p + "</div></div>" + (mm.s === "risk" ? this.pRag("amber") : this.pRag("green")) + "</div>").join("") +
      "</div>" +
      "</div>" +
      '<div class="dash-grid">' +
      '<div class="dash-card"><div class="dc-h"><h3>Top Open Risks</h3><span class="more">Risk Register · Score = L × I</span></div>' +
      (risks.length
        ? risks.slice(0, 5).map((r) => '<div class="risk-row"><div class="risk-score" style="background:' + this.pRiskColor(r.sc || 0) + '">' + r.sc + '</div><div class="risk-body"><div class="risk-name">' + this.esc(r.n) + '</div><div class="risk-meta">' + this.esc(r.m) + "</div></div></div>").join("")
        : '<div style="color:var(--muted);font-size:12.5px;padding:8px 0">No open risks logged.</div>') +
      "</div>" +
      '<div class="dash-card"><div class="dc-h"><h3>Change Control</h3><span class="more">Change Requests</span></div>' +
      '<div class="cc-stats"><div class="cc-stat"><div class="n">' + change.open + '</div><div class="l">Open</div></div><div class="cc-stat"><div class="n">' + change.pending + '</div><div class="l">Pending CAB</div></div><div class="cc-stat"><div class="n">' + change.approved + '</div><div class="l">Approved</div></div></div>' +
      '<div style="font-family:\'IBM Plex Mono\';font-size:9px;color:var(--faint);text-transform:uppercase;letter-spacing:.08em;margin:15px 0 2px">Recent</div>' +
      (change.recent.length
        ? change.recent.map((c) => { const s = (c.status || "").toLowerCase(); const rg = /appro/.test(s) ? "green" : /rej|decl/.test(s) ? "red" : "amber"; return '<div class="team-row"><span>' + this.esc(c.code) + " · " + this.esc(c.desc) + '</span><span class="rag ' + rg + '"><span class="d"></span>' + this.esc(c.status) + "</span></div>"; }).join("")
        : '<div style="color:var(--muted);font-size:12.5px;padding:6px 0">No change requests yet.</div>') +
      "</div>" +
      "</div>" +
      '<div class="dash-grid">' +
      '<div class="dash-card"><div class="dc-h"><h3>Cost vs Budget</h3><span class="more">Spent / BAC</span></div>' +
      (ps.length ? ps.map((p) => { const r = p.bac > 0 ? p.spent / p.bac : 0; const over = r > p.pct / 100 + 0.08; return '<div class="budget-row"><span class="bn">' + this.esc(p.name.split(" ")[0]) + '</span><div class="bbar"><i style="width:' + Math.round(r * 100) + "%;background:" + (over ? "#C2603F" : "var(--accent)") + '"></i></div><span class="bv">$' + p.spent.toFixed(2) + "M / $" + p.bac.toFixed(1) + "M</span></div>"; }).join("") : '<div style="color:var(--muted);font-size:12.5px;padding:8px 0">—</div>') +
      "</div>" +
      '<div class="dash-card"><div class="dc-h"><h3>Team & Resourcing</h3><span class="more">30.0 FTE</span></div>' +
      data.team.map((t) => '<div class="team-row"><span>' + t[0] + '</span><span style="font-family:\'IBM Plex Mono\';font-size:11px;color:var(--muted)">' + t[1].toFixed(1) + " FTE</span></div>").join("") +
      "</div>" +
      "</div>";
    const v = document.getElementById("form"); if (v) { v.innerHTML = h; v.scrollTop = 0; }
    const b = document.getElementById("np-add"); if (b) b.onclick = () => this.addProject();
  }

  async addProject() {
    if (!this.client || !this.user) return;
    const g = (id: string) => document.getElementById(id) as HTMLInputElement | HTMLSelectElement;
    const name = ((g("np-name") as HTMLInputElement).value || "").trim();
    if (!name) { (g("np-name") as HTMLInputElement).focus(); return; }
    const row = {
      user_id: this.user.id, name,
      code: ((g("np-code") as HTMLInputElement).value || "").toUpperCase() || "—",
      phase: (g("np-phase") as HTMLSelectElement).value,
      pct: parseInt((g("np-pct") as HTMLInputElement).value) || 0,
      status: (g("np-status") as HTMLSelectElement).value,
      pm: (g("np-pm") as HTMLInputElement).value || "—",
      bac: parseFloat((g("np-bac") as HTMLInputElement).value) || 0,
      spent: 0, updated_at: new Date().toISOString(),
    };
    const b = document.getElementById("np-add") as HTMLButtonElement | null;
    if (b) { b.textContent = "Adding…"; b.disabled = true; }
    const r = await this.client.from("projects").insert(row);
    if (r.error) {
      alert("Could not add project: " + r.error.message + '\n\nRun the latest Schema SQL (it now includes a "projects" table).');
      if (b) { b.textContent = "Add"; b.disabled = false; }
      return;
    }
    await this.ensurePlannerData(true); await this.loadProjects(); this.renderPlanner("");
  }

  renderStatus(data: PlannerData) {
    const cr = document.getElementById("crumbs"); if (cr) cr.innerHTML = "<b>Project Planner</b> &nbsp;/&nbsp; Project Status Report";
    const ps = data.projects, st = data.status;
    const avgPct = Math.round(this.pMean(ps.map((p) => p.pct)));
    const onTimePct = ps.length ? Math.round((ps.filter((p) => p.spi >= 1).length / ps.length) * 100) : 0;
    const byRag = { green: ps.filter((p) => p.rag === "green").length, amber: ps.filter((p) => p.rag === "amber").length, red: ps.filter((p) => p.rag === "red").length };
    const h =
      this.plannerHead("status", "Project Status Report", "Period health roll-up — RAG status, progress, accomplishments, and next steps.", data) +
      '<div class="kpi-row">' +
      this.pKpi("Reports Filed", String(st.reports)) +
      this.pKpi("On Track", String(st.onTrack), "green", "up") +
      this.pKpi("Watch", String(st.watch), "amber") +
      this.pKpi("At Risk", String(st.atRisk), "red", "down") +
      this.pKpi("Avg % Complete", avgPct + "%") +
      this.pKpi("On-Time", onTimePct + "%") +
      "</div>" +
      '<div class="dash-card full"><div class="dc-h"><h3>Status by Project</h3><span class="more">RAG · phase · progress</span></div>' +
      ps
        .map(
          (p) =>
            '<div class="proj-status">' +
            '<div style="flex:1;min-width:0"><div class="pname" style="font-size:14px">' + this.esc(p.name) + '</div><div style="font-size:12px;color:var(--muted);margin-top:2px">' + this.esc(p.note || p.phase + " phase") + "</div></div>" +
            '<div class="ps-bar"><div class="pbar"><i style="width:' + p.pct + '%"></i></div><div style="font-family:\'IBM Plex Mono\';font-size:9px;color:var(--muted);margin-top:4px">' + p.pct + "% · " + this.esc(p.phase) + "</div></div>" +
            '<div style="width:92px;flex:none;text-align:right">' + this.pRag(p.rag) + "</div>" +
            "</div>",
        )
        .join("") +
      "</div>" +
      '<div class="dash-grid">' +
      '<div class="dash-card"><div class="dc-h"><h3>Recent Accomplishments</h3><span class="more">This period</span></div>' +
      data.accomplishments.map((a) => '<div class="team-row"><span>' + a + '</span><span class="rag green"><span class="d"></span>Done</span></div>').join("") +
      "</div>" +
      '<div class="dash-card"><div class="dc-h"><h3>Upcoming Next Steps</h3><span class="more">Next period</span></div>' +
      data.nextSteps.map((a) => '<div class="team-row"><span>' + a + "</span></div>").join("") +
      '<div style="margin-top:12px;display:flex;gap:10px"><div class="stat-pill">' + this.pRag("green") + " " + byRag.green + '</div><div class="stat-pill">' + this.pRag("amber") + " " + byRag.amber + '</div><div class="stat-pill">' + this.pRag("red") + " " + byRag.red + "</div></div>" +
      "</div>" +
      "</div>";
    const v = document.getElementById("form"); if (v) { v.innerHTML = h; v.scrollTop = 0; }
  }

  renderRisk(data: PlannerData) {
    const cr = document.getElementById("crumbs"); if (cr) cr.innerHTML = "<b>Project Planner</b> &nbsp;/&nbsp; Risk Management";
    const rk = data.risks;
    const avg = rk.length ? this.pMean(rk.map((r) => r.sc || 0)).toFixed(1) : "0";
    const high = rk.filter((r) => (r.sc || 0) >= 10).length;
    const cov = rk.length ? Math.round((rk.filter((r) => /mitig/i.test(r.status)).length / rk.length) * 100) : 0;
    const exposure = rk.reduce((a, r) => a + (r.sc || 0), 0);
    const cell: Record<string, number> = {};
    rk.forEach((r) => { const k = r.i + "-" + r.l; cell[k] = (cell[k] || 0) + 1; });
    let matrix = '<div class="matrix"><div></div>' + [1, 2, 3, 4, 5].map((l) => '<div class="mh">L' + l + "</div>").join("");
    for (let i = 5; i >= 1; i--) {
      matrix += '<div class="axis">I' + i + "</div>";
      for (let l = 1; l <= 5; l++) { const c = cell[i + "-" + l] || 0; const sc = i * l; matrix += '<div class="mc" style="background:' + (c ? this.pRiskColor(sc) : "var(--soft)") + ";color:" + (c ? "#fff" : "var(--faint)") + '">' + (c || "") + "</div>"; }
    }
    matrix += "</div>";
    const cats: Record<string, number> = {};
    rk.forEach((r) => { cats[r.cat] = (cats[r.cat] || 0) + 1; });
    const maxc = Math.max(1, ...Object.values(cats));
    const h =
      this.plannerHead("risk", "Risk Management", "The portfolio risk register — exposure, probability-impact matrix, and mitigation status.", data) +
      '<div class="kpi-row">' +
      this.pKpi("Open Risks", String(rk.length)) +
      this.pKpi("Critical", String(rk.filter((r) => (r.sc || 0) >= 16).length), "≥ 16", "down") +
      this.pKpi("High", String(high), "≥ 10") +
      this.pKpi("Avg Score", avg) +
      this.pKpi("Mitigating", cov + "%") +
      this.pKpi("Total Exposure", String(exposure)) +
      "</div>" +
      '<div class="dash-grid">' +
      '<div class="dash-card"><div class="dc-h"><h3>Probability · Impact Matrix</h3><span class="more">Impact ↕ / Likelihood →</span></div>' + matrix + "</div>" +
      '<div class="dash-card"><div class="dc-h"><h3>Risk by Category</h3><span class="more">Open risks</span></div>' +
      Object.keys(cats).map((c) => '<div class="catbar"><span class="cn">' + c + '</span><div class="cb"><i style="width:' + Math.round((cats[c] / maxc) * 100) + '%"></i></div><span class="cv">' + cats[c] + "</span></div>").join("") +
      "</div>" +
      "</div>" +
      '<div class="dash-card full"><div class="dc-h"><h3>Risk Register</h3><span class="more">' + rk.length + " open</span></div>" +
      '<table class="ptab"><thead><tr><th>Risk</th><th>Category</th><th>L</th><th>I</th><th>Score</th><th>Owner</th><th>Status</th></tr></thead><tbody>' +
      (rk.length
        ? rk.map((r) => '<tr><td style="max-width:320px"><div class="pname" style="font-size:12.5px;font-weight:500">' + this.esc(r.n) + "</div></td><td>" + this.esc(r.cat) + '</td><td style="font-family:\'IBM Plex Mono\'">' + r.l + '</td><td style="font-family:\'IBM Plex Mono\'">' + r.i + '</td><td><span class="risk-score" style="background:' + this.pRiskColor(r.sc || 0) + ';width:26px;height:24px;border-radius:6px;display:inline-flex;font-size:11px">' + r.sc + "</span></td><td>" + this.esc(r.owner) + "</td><td>" + this.esc(r.status) + "</td></tr>").join("")
        : '<tr><td colspan="7" style="color:var(--muted);padding:18px 8px">No risks logged. Fill in a Risk Register form to populate this.</td></tr>') +
      "</tbody></table></div>";
    const v = document.getElementById("form"); if (v) { v.innerHTML = h; v.scrollTop = 0; }
  }

  renderSchedule(data: PlannerData) {
    const cr = document.getElementById("crumbs"); if (cr) cr.innerHTML = "<b>Project Planner</b> &nbsp;/&nbsp; Schedule & Milestones";
    const ps = data.projects, ms = data.milestones;
    const atRisk = ms.filter((m) => m.s === "risk").length;
    const onTime = ms.length ? Math.round((ms.filter((m) => m.slip <= 0).length / ms.length) * 100) : 0;
    const avgSlip = ms.length ? this.pMean(ms.map((m) => m.slip)).toFixed(1) : "0";
    const spi = this.pMean(ps.map((p) => p.spi));
    const h =
      this.plannerHead("schedule", "Schedule & Milestones", "Timeline health — milestone slip, schedule variance, and where each project sits in its lifecycle.", data) +
      '<div class="kpi-row">' +
      this.pKpi("Milestones", String(ms.length)) +
      this.pKpi("At Risk", String(atRisk), atRisk ? "slipping" : "on plan", atRisk ? "down" : "up") +
      this.pKpi("On-Time", onTime + "%") +
      this.pKpi("Avg Slip", avgSlip + "d", +avgSlip > 0 ? "behind" : "on plan", +avgSlip > 0 ? "down" : "up") +
      this.pKpi("Portfolio SPI", spi.toFixed(2), spi < 1 ? "▼ behind" : "▲ ahead", spi < 1 ? "down" : "up") +
      this.pKpi("Active", String(ps.length)) +
      "</div>" +
      '<div class="dash-card full"><div class="dc-h"><h3>Lifecycle Position</h3><span class="more">% complete across the phase track</span></div>' +
      ps.map((p) => '<div class="budget-row"><span class="bn" style="width:160px">' + this.esc(p.name) + '</span><div class="bbar" style="height:10px"><i style="width:' + p.pct + "%;background:" + (p.rag === "red" ? "#C2603F" : p.rag === "amber" ? "#C9962B" : "var(--accent)") + '"></i></div><span class="bv" style="width:120px">' + this.esc(p.phase) + " · " + p.pct + "%</span></div>").join("") +
      "</div>" +
      '<div class="dash-card full"><div class="dc-h"><h3>Milestone Schedule</h3><span class="more">Baseline vs forecast</span></div>' +
      '<table class="ptab"><thead><tr><th>Milestone</th><th>Project</th><th>Baseline</th><th>Forecast</th><th>Slip</th><th>Status</th></tr></thead><tbody>' +
      ms.map((m) => '<tr><td><div class="pname" style="font-size:13px;font-weight:500">' + m.n + "</div></td><td>" + m.p + '</td><td style="font-family:\'IBM Plex Mono\';font-size:11px">' + (m.baseline || "—") + '</td><td style="font-family:\'IBM Plex Mono\';font-size:11px">' + (m.forecast || m.d) + '</td><td style="font-family:\'IBM Plex Mono\';font-size:11px;color:' + (m.slip > 0 ? "#C2603F" : "#4C8A50") + '">' + (m.slip > 0 ? "+" + m.slip + "d" : "on time") + "</td><td>" + (m.s === "risk" ? this.pRag("amber") : this.pRag("green")) + "</td></tr>").join("") +
      "</tbody></table></div>";
    const v = document.getElementById("form"); if (v) { v.innerHTML = h; v.scrollTop = 0; }
  }

  renderCost(data: PlannerData) {
    const cr = document.getElementById("crumbs"); if (cr) cr.innerHTML = "<b>Project Planner</b> &nbsp;/&nbsp; Cost & Budget";
    const ps = data.projects;
    const BAC = ps.reduce((a, p) => a + p.bac, 0), EV = ps.reduce((a, p) => a + (p.pct / 100) * p.bac, 0), AC = ps.reduce((a, p) => a + p.spent, 0);
    const CPI = AC > 0 ? EV / AC : 1, EAC = CPI > 0 ? BAC / CPI : BAC, VAC = BAC - EAC;
    const cats = data.costCategories, maxc = Math.max(1, ...cats.map((c) => c[1]));
    const h =
      this.plannerHead("cost", "Cost & Budget", "Earned-value performance — BAC, EV / AC, CPI, and forecast at completion across the portfolio.", data) +
      '<div class="kpi-row">' +
      this.pKpi("BAC", "$" + BAC.toFixed(1) + "M") + this.pKpi("Earned Value", "$" + EV.toFixed(2) + "M") + this.pKpi("Actual Cost", "$" + AC.toFixed(2) + "M") +
      this.pKpi("CPI", CPI.toFixed(2), CPI < 1 ? "▼ over budget" : "▲ under budget", CPI < 1 ? "down" : "up") +
      this.pKpi("EAC", "$" + EAC.toFixed(1) + "M") + this.pKpi("VAC", "$" + VAC.toFixed(2) + "M", VAC < 0 ? "over" : "under", VAC < 0 ? "down" : "up") +
      "</div>" +
      '<div class="dash-grid">' +
      '<div class="dash-card"><div class="dc-h"><h3>Cost by Category</h3><span class="more">Actuals</span></div>' +
      cats.map((c) => '<div class="catbar"><span class="cn">' + c[0] + '</span><div class="cb"><i style="width:' + Math.round((c[1] / maxc) * 100) + '%"></i></div><span class="cv">$' + c[1].toFixed(1) + "M</span></div>").join("") +
      "</div>" +
      '<div class="dash-card"><div class="dc-h"><h3>Budget Burn</h3><span class="more">Spent / BAC</span></div>' +
      ps.map((p) => { const r = p.bac > 0 ? p.spent / p.bac : 0; const over = r > p.pct / 100 + 0.08; return '<div class="budget-row"><span class="bn">' + this.esc(p.name.split(" ")[0]) + '</span><div class="bbar"><i style="width:' + Math.round(r * 100) + "%;background:" + (over ? "#C2603F" : "var(--accent)") + '"></i></div><span class="bv">$' + p.spent.toFixed(2) + "M / $" + p.bac.toFixed(1) + "M</span></div>"; }).join("") +
      "</div>" +
      "</div>" +
      '<div class="dash-card full"><div class="dc-h"><h3>Earned Value by Project</h3><span class="more">EVM</span></div>' +
      '<table class="ptab"><thead><tr><th>Project</th><th>BAC</th><th>Actual (AC)</th><th>Earned (EV)</th><th>CPI</th><th>EAC</th><th>VAC</th></tr></thead><tbody>' +
      ps.map((p) => { const ev = (p.pct / 100) * p.bac, cpi = p.spent > 0 ? ev / p.spent : 1, eac = cpi > 0 ? p.bac / cpi : p.bac, vac = p.bac - eac; return '<tr><td><div class="pname" style="font-size:13px;font-weight:500">' + this.esc(p.name) + '</div></td><td style="font-family:\'IBM Plex Mono\';font-size:11px">$' + p.bac.toFixed(1) + 'M</td><td style="font-family:\'IBM Plex Mono\';font-size:11px">$' + p.spent.toFixed(2) + 'M</td><td style="font-family:\'IBM Plex Mono\';font-size:11px">$' + ev.toFixed(2) + 'M</td><td style="font-family:\'IBM Plex Mono\';font-size:11px;color:' + (cpi < 1 ? "#C2603F" : "#4C8A50") + '">' + cpi.toFixed(2) + '</td><td style="font-family:\'IBM Plex Mono\';font-size:11px">$' + eac.toFixed(2) + 'M</td><td style="font-family:\'IBM Plex Mono\';font-size:11px;color:' + (vac < 0 ? "#C2603F" : "#4C8A50") + '">$' + vac.toFixed(2) + "M</td></tr>"; }).join("") +
      "</tbody></table></div>";
    const v = document.getElementById("form"); if (v) { v.innerHTML = h; v.scrollTop = 0; }
  }

  renderChange(data: PlannerData) {
    const cr = document.getElementById("crumbs"); if (cr) cr.innerHTML = "<b>Project Planner</b> &nbsp;/&nbsp; Change Control";
    const ch = data.change, log = data.changeLog;
    const rej = log.filter((c) => /rej|decl/i.test(c.status)).length;
    const apprRate = ch.approved + rej > 0 ? Math.round((ch.approved / (ch.approved + rej)) * 100) : 0;
    const types: Record<string, number> = {};
    log.forEach((c) => { types[c.type] = (types[c.type] || 0) + 1; });
    const maxt = Math.max(1, ...Object.values(types));
    const chip = (s: string) => { const x = (s || "").toLowerCase(); const rg = /appro/.test(x) ? "green" : /rej|decl/.test(x) ? "red" : "amber"; return '<span class="rag ' + rg + '"><span class="d"></span>' + s + "</span>"; };
    const h =
      this.plannerHead("change", "Change Control", "The change pipeline — requests by status and type, with cost and schedule impact.", data) +
      '<div class="kpi-row">' +
      this.pKpi("Open", String(ch.open)) + this.pKpi("Pending CAB", String(ch.pending)) + this.pKpi("Approved", String(ch.approved), "green", "up") +
      this.pKpi("Approval Rate", apprRate + "%") + this.pKpi("Avg Cycle", "6d") + this.pKpi("Total Logged", String(log.length)) +
      "</div>" +
      '<div class="dash-grid">' +
      '<div class="dash-card"><div class="dc-h"><h3>By Status</h3><span class="more">Pipeline</span></div>' +
      '<div class="cc-stats"><div class="cc-stat"><div class="n">' + ch.open + '</div><div class="l">Open</div></div><div class="cc-stat"><div class="n">' + ch.pending + '</div><div class="l">Pending</div></div><div class="cc-stat"><div class="n">' + ch.approved + '</div><div class="l">Approved</div></div></div></div>' +
      '<div class="dash-card"><div class="dc-h"><h3>By Type</h3><span class="more">Change class</span></div>' +
      Object.keys(types).map((t) => '<div class="catbar"><span class="cn">' + t + '</span><div class="cb"><i style="width:' + Math.round((types[t] / maxt) * 100) + '%"></i></div><span class="cv">' + types[t] + "</span></div>").join("") +
      "</div>" +
      "</div>" +
      '<div class="dash-card full"><div class="dc-h"><h3>Change Log</h3><span class="more">Cost · schedule impact</span></div>' +
      '<table class="ptab"><thead><tr><th>CR</th><th>Description</th><th>Type</th><th>Cost</th><th>Schedule</th><th>Status</th></tr></thead><tbody>' +
      log.map((c) => '<tr><td style="font-family:\'IBM Plex Mono\';font-size:11px;color:var(--accent)">' + this.esc(c.code) + "</td><td>" + this.esc(c.title) + "</td><td>" + this.esc(c.type) + '</td><td style="font-family:\'IBM Plex Mono\';font-size:11px">' + this.esc(c.cost) + '</td><td style="font-family:\'IBM Plex Mono\';font-size:11px">' + this.esc(c.sched) + "</td><td>" + chip(c.status) + "</td></tr>").join("") +
      "</tbody></table></div>";
    const v = document.getElementById("form"); if (v) { v.innerHTML = h; v.scrollTop = 0; }
  }

  renderPeople(data: PlannerData) {
    const cr = document.getElementById("crumbs"); if (cr) cr.innerHTML = "<b>Project Planner</b> &nbsp;/&nbsp; Stakeholders & Team";
    const sh = data.stakeholders, team = data.team;
    const fte = team.reduce((a, t) => a + t[1], 0), key = sh.filter((s) => s.influence === "High").length;
    const engaged = Math.round((sh.filter((s) => s.eng === "green").length / sh.length) * 100), maxf = Math.max(...team.map((t) => t[1]));
    const engW: Record<string, string> = { green: "Engaged", amber: "Neutral", red: "Resistant" };
    const echip = (e: string) => '<span class="rag ' + e + '"><span class="d"></span>' + engW[e] + "</span>";
    const quad = (inf: string, hi: boolean) => sh.filter((s) => s.influence === inf && (hi ? s.interest === "High" : s.interest !== "High"));
    const qcard = (title: string, inf: string, hi: boolean) => '<div style="border:1px solid var(--rule);border-radius:10px;padding:12px"><div style="font-family:\'IBM Plex Mono\';font-size:8.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);margin-bottom:7px">' + title + "</div>" + (quad(inf, hi).map((s) => '<div style="font-size:11.5px;padding:2px 0">' + s.name + "</div>").join("") || '<div style="font-size:11px;color:var(--faint)">—</div>') + "</div>";
    const h =
      this.plannerHead("people", "Stakeholders & Team", "Power-interest mapping, engagement health, and resourcing across departments.", data) +
      '<div class="kpi-row">' +
      this.pKpi("Stakeholders", String(sh.length)) + this.pKpi("Key Players", String(key), "high influence") + this.pKpi("Team FTE", fte.toFixed(1)) +
      this.pKpi("Departments", String(team.length)) + this.pKpi("Engaged", engaged + "%") + this.pKpi("At Risk", String(sh.filter((s) => s.eng === "red").length), "relationships", "down") +
      "</div>" +
      '<div class="dash-grid">' +
      '<div class="dash-card"><div class="dc-h"><h3>Power · Interest Grid</h3><span class="more">Influence ↕ / Interest →</span></div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">' + qcard("Keep Satisfied", "High", false) + qcard("Manage Closely", "High", true) + qcard("Monitor", "Low", false) + qcard("Keep Informed", "Low", true) + "</div></div>" +
      '<div class="dash-card"><div class="dc-h"><h3>Team by Department</h3><span class="more">' + fte.toFixed(1) + " FTE</span></div>" +
      team.map((t) => '<div class="catbar"><span class="cn">' + t[0] + '</span><div class="cb"><i style="width:' + Math.round((t[1] / maxf) * 100) + '%"></i></div><span class="cv">' + t[1].toFixed(1) + "</span></div>").join("") +
      "</div>" +
      "</div>" +
      '<div class="dash-card full"><div class="dc-h"><h3>Stakeholder Register</h3><span class="more">' + sh.length + " stakeholders</span></div>" +
      '<table class="ptab"><thead><tr><th>Stakeholder</th><th>Role</th><th>Influence</th><th>Interest</th><th>Engagement</th></tr></thead><tbody>' +
      sh.map((s) => '<tr><td><div class="pname" style="font-size:13px;font-weight:500">' + s.name + "</div></td><td>" + s.role + "</td><td>" + s.influence + "</td><td>" + s.interest + "</td><td>" + echip(s.eng) + "</td></tr>").join("") +
      "</tbody></table></div>";
    const v = document.getElementById("form"); if (v) { v.innerHTML = h; v.scrollTop = 0; }
  }

  renderClosure(data: PlannerData) {
    const cr = document.getElementById("crumbs"); if (cr) cr.innerHTML = "<b>Project Planner</b> &nbsp;/&nbsp; Lessons & Closure";
    const items = data.closureItems, lessons = data.lessons;
    const done = items.filter((i) => i.done).length, pct = Math.round((done / items.length) * 100);
    const adopted = lessons.filter((l) => /adopt/i.test(l.status)).length, open = lessons.filter((l) => /open/i.test(l.status)).length;
    const cats: Record<string, number> = {};
    lessons.forEach((l) => (cats[l.cat] = (cats[l.cat] || 0) + 1));
    const h =
      this.plannerHead("closing", "Lessons & Closure", "Closeout readiness and the lessons-learned register feeding the next project.", data) +
      '<div class="kpi-row">' +
      this.pKpi("Closure Complete", pct + "%") + this.pKpi("Checklist", done + "/" + items.length) + this.pKpi("Lessons", String(lessons.length)) +
      this.pKpi("Adopted", String(adopted), "green", "up") + this.pKpi("Open Lessons", String(open)) + this.pKpi("Signed-off Reports", "12") +
      "</div>" +
      '<div class="dash-grid">' +
      '<div class="dash-card"><div class="dc-h"><h3>Closure Checklist</h3><span class="more">' + done + " of " + items.length + "</span></div>" +
      '<div style="margin-bottom:12px"><div class="pbar" style="height:8px"><i style="width:' + pct + '%"></i></div></div>' +
      items.map((i) => '<div class="team-row"><span>' + i.item + '</span><span class="rag ' + (i.done ? "green" : "amber") + '"><span class="d"></span>' + (i.done ? "Done" : "Open") + "</span></div>").join("") +
      "</div>" +
      '<div class="dash-card"><div class="dc-h"><h3>Lessons by Status</h3><span class="more">Knowledge transfer</span></div>' +
      '<div class="cc-stats"><div class="cc-stat"><div class="n">' + adopted + '</div><div class="l">Adopted</div></div><div class="cc-stat"><div class="n">' + open + '</div><div class="l">Open</div></div><div class="cc-stat"><div class="n">' + lessons.length + '</div><div class="l">Total</div></div></div>' +
      '<div style="font-family:\'IBM Plex Mono\';font-size:9px;color:var(--faint);text-transform:uppercase;letter-spacing:.08em;margin:15px 0 2px">By area</div>' +
      Object.keys(cats).map((c) => '<div class="team-row"><span>' + c + '</span><span style="font-family:\'IBM Plex Mono\';font-size:11px;color:var(--muted)">' + cats[c] + "</span></div>").join("") +
      "</div>" +
      "</div>" +
      '<div class="dash-card full"><div class="dc-h"><h3>Lessons Learned</h3><span class="more">' + lessons.length + " captured</span></div>" +
      '<table class="ptab"><thead><tr><th>Lesson</th><th>Area</th><th>Recommendation</th><th>Status</th></tr></thead><tbody>' +
      lessons.map((l) => '<tr><td style="max-width:260px"><div style="font-size:12.5px">' + l.lesson + "</div></td><td>" + l.cat + '</td><td style="max-width:240px;font-size:12px;color:var(--muted)">' + l.rec + '</td><td><span class="rag ' + (/adopt/i.test(l.status) ? "green" : "amber") + '"><span class="d"></span>' + l.status + "</span></td></tr>").join("") +
      "</tbody></table></div>";
    const v = document.getElementById("form"); if (v) { v.innerHTML = h; v.scrollTop = 0; }
  }

  // ---------- landing ----------
  initLanding() {
    this._lmode = "in";
    const setMode = (mode: string) => {
      this._lmode = mode;
      document.querySelectorAll(".lnd-tab").forEach((t) => t.classList.toggle("active", (t as HTMLElement).dataset.lt === mode));
      const pw = document.getElementById("l-pw"); if (pw) pw.setAttribute("autocomplete", mode === "up" ? "new-password" : "current-password");
      const sb = document.getElementById("l-submit"); if (sb) sb.textContent = mode === "up" ? "Create account" : "Sign in";
      this.landingMsg("");
    };
    document.querySelectorAll(".lnd-tab").forEach((t) => ((t as HTMLElement).onclick = () => setMode((t as HTMLElement).dataset.lt || "in")));
    const sub = document.getElementById("l-submit"); if (sub) sub.onclick = () => this.landingAuth(this._lmode);
    const mag = document.getElementById("l-magic"); if (mag) mag.onclick = () => this.landingAuth("magic");
    const br = document.getElementById("l-browse"); if (br) br.onclick = () => { location.hash = "#/gallery"; };
    const co = document.getElementById("l-continue"); if (co) co.onclick = () => { location.hash = "#/gallery"; };
    const so = document.getElementById("l-signout"); if (so) so.onclick = () => this.signOut();
    ["l-email", "l-pw"].forEach((id) => { const el = document.getElementById(id); if (el) (el as HTMLElement).onkeydown = (e: KeyboardEvent) => { if (e.key === "Enter") this.landingAuth(this._lmode); }; });
    this.startPreviewRotation();
  }
  _lmode = "in";
  startPreviewRotation() {
    if (this._previewTimer) return;
    const el = document.getElementById("lnd-preview"); if (!el) return;
    const P = [
      { code: "PRD", title: "Product Requirements", secs: [ { l: "Problem statement & evidence", eg: "CSV imports fail ~12% of the time.", lines: ["", "short"] }, { l: "Goals & success metrics", lines: [""] } ] },
      { code: "Runbook", title: "Runbook", secs: [ { l: "When to use", eg: "Alert: invoice queue depth > 5k for 10 min.", lines: ["", "short"] }, { l: "Steps", lines: [""] } ] },
      { code: "Postmortem", title: "Postmortem / RCA", secs: [ { l: "Summary & impact", eg: "Posting halted 40 min after a gateway change.", lines: ["", "short"] }, { l: "Root cause", lines: [""] } ] },
    ];
    const render = (n: number) => {
      const p = P[n];
      el.innerHTML =
        '<div class="lp-kick">Form · ' + this.esc(p.code) + '</div><div class="lp-title">' + this.esc(p.title) + "</div>" +
        p.secs.map((s) => '<div class="lp-sec"><div class="lp-sl">' + this.esc(s.l) + "</div>" + ((s as { eg?: string }).eg ? '<div class="lp-eg"><b>e.g.</b> ' + this.esc((s as { eg?: string }).eg) + "</div>" : "") + s.lines.map((c) => '<div class="lp-line' + (c ? " " + c : "") + '"></div>').join("") + "</div>").join("");
    };
    let i = 0;
    render(0);
    el.style.opacity = "1";
    this._previewTimer = setInterval(() => {
      el.style.opacity = "0";
      setTimeout(() => { i = (i + 1) % P.length; render(i); el.style.opacity = "1"; }, 560);
    }, 4200);
  }
  landingMsg(t: string, err?: number) { const m = document.getElementById("l-msg"); if (m) { m.textContent = t || ""; m.style.color = err ? "#9A6B1F" : "var(--muted)"; } }
  async landingAuth(mode: string) {
    if (!this.client) { this.landingMsg("Connecting to the database — try again in a moment.", 1); return; }
    const email = ((document.getElementById("l-email") as HTMLInputElement).value || "").trim();
    const pw = (document.getElementById("l-pw") as HTMLInputElement).value || "";
    if (!email) { this.landingMsg("Enter your email.", 1); return; }
    if (mode !== "magic" && !pw) { this.landingMsg("Enter a password.", 1); return; }
    try {
      if (mode === "magic") { const { error } = await this.client.auth.signInWithOtp({ email }); if (error) throw error; this.landingMsg("Check your email for a sign-in link."); return; }
      if (mode === "up") { const { error } = await this.client.auth.signUp({ email, password: pw }); if (error) throw error; this.landingMsg("Account created — signing you in…"); return; }
      const { error } = await this.client.auth.signInWithPassword({ email, password: pw }); if (error) throw error;
      this.landingMsg("Signed in — taking you in…");
    } catch (e) { this.landingMsg((e as Error).message || String(e), 1); }
  }
  showLanding() {
    const l = document.getElementById("landing"); if (l) l.classList.remove("hidden");
    const signed = !!this.user;
    const auth = document.getElementById("lnd-auth"); const sg = document.getElementById("lnd-signed");
    const tabs = document.querySelector(".lnd-tabs") as HTMLElement | null;
    if (auth) (auth as HTMLElement).style.display = signed ? "none" : "";
    if (sg) (sg as HTMLElement).style.display = signed ? "" : "none";
    if (tabs) tabs.style.display = signed ? "none" : "";
    if (signed) { const who = document.getElementById("l-who"); if (who) who.textContent = (this.user && this.user.email) || "your account"; }
    const lc = document.getElementById("l-cloud"); if (lc) lc.textContent = this.client ? "● Database connected" : "○ No database connected";
  }
  hideLanding() { const l = document.getElementById("landing"); if (l) l.classList.add("hidden"); }

  // ---------- form rendering ----------
  renderForm(def: FormDef) {
    const cr = document.getElementById("crumbs"); if (cr) cr.innerHTML = this.esc(this.domains[def.d]) + " &nbsp;/&nbsp; <b>" + this.esc(def.title) + "</b>";
    const rec = this.recFor(def);
    const v = document.getElementById("form");
    if (!v) return;
    let h =
      this.instbarHTML(def) +
      '<div class="fhead"><div class="fkick"><span>Form · ' + this.esc(def.code) + '</span><span class="dom">' + this.esc(this.domains[def.d]) + "</span></div>" +
      '<h1 class="ftitle">' + this.esc(def.title) + '</h1><p class="fpurpose">' + this.esc(def.purpose) + "</p></div>";
    h +=
      '<div class="meta">' +
      def.meta
        .map((mf) => {
          const val = rec.meta[mf.key] || "";
          let inp;
          if (mf.type === "select") {
            inp = '<select data-meta="' + mf.key + '">' + ["", ...(mf.options || [])].map((o) => "<option" + (o === val ? " selected" : "") + ">" + this.esc(o) + "</option>").join("") + "</select>";
          } else {
            inp = '<input data-meta="' + mf.key + '" value="' + this.esc(val) + '" placeholder="' + this.esc(mf.placeholder || "") + '">';
          }
          return '<div class="mf"><label>' + this.esc(mf.label) + "</label>" + inp + "</div>";
        })
        .join("") +
      "</div>";
    for (const s of def.sections) h += this.sectionHTML(s, rec);
    v.innerHTML = h;
    v.scrollTop = 0;
    if (this._applyLean) this._applyLean();
    this.wireForm(def);
    v.querySelectorAll("textarea").forEach((t) => this.grow(t as HTMLTextAreaElement));
  }

  sectionHTML(s: Section, rec: Rec) {
    const sv = rec.sections[s.key];
    let control = "";
    if (s.type === "table") {
      const rows: Record<string, string>[] = Array.isArray(sv) && sv.length ? (sv as Record<string, string>[]) : [{}, {}, {}];
      const head = "<tr>" + (s.columns || []).map((c) => "<th>" + this.esc(c.label) + "</th>").join("") + "</tr>";
      const body = rows
        .map((row, ri) => "<tr>" + (s.columns || []).map((c) => '<td><input data-sec="' + s.key + '" data-row="' + ri + '" data-col="' + c.key + '" value="' + this.esc(row[c.key] || "") + '"></td>').join("") + "</tr>")
        .join("");
      control = '<table class="grid" data-table="' + s.key + '"><thead>' + head + "</thead><tbody>" + body + "</tbody></table>" + '<button class="addrow" data-add="' + s.key + '">+ Add row</button>';
    } else if (s.type === "check") {
      const cv = (sv as Record<string, boolean>) || {};
      control = '<div class="checks">' + (s.items || []).map((it) => '<label class="chk"><input type="checkbox" data-sec="' + s.key + '" data-item="' + it.key + '"' + (cv[it.key] ? " checked" : "") + ">" + this.esc(it.label) + "</label>").join("") + "</div>";
    } else if (s.type === "text") {
      control = '<input class="line" data-sec="' + s.key + '" value="' + this.esc((sv as string) || "") + '" placeholder="' + this.esc(s.placeholder || "") + '">';
    } else {
      control = '<textarea data-sec="' + s.key + '" placeholder="' + this.esc(s.placeholder || "") + '">' + this.esc((sv as string) || "") + "</textarea>";
    }
    let detail = '<div class="sec-meta">';
    if (s.example) detail += '<div class="sec-eg"><span class="k">Example</span><em>' + this.esc(s.example) + "</em></div>";
    if (s.why) detail += '<div class="sec-why"><span class="k">Why it matters</span>' + this.esc(s.why) + "</div>";
    detail += "</div>";
    return (
      '<div class="sec" data-section="' + s.key + '" data-kind="' + s.type + '">' +
      '<div class="sec-top"><span class="sec-label">' + this.esc(s.label) + '</span><span class="sec-req">' + (s.required ? "Required" : "Optional") + "</span></div>" +
      (s.guidance ? '<p class="sec-guide">' + this.esc(s.guidance) + "</p>" : "") +
      (s.example || s.why ? detail : "") +
      control +
      "</div>"
    );
  }

  grow(t: HTMLTextAreaElement) { t.style.height = "auto"; t.style.height = t.scrollHeight + 2 + "px"; }

  wireForm(def: FormDef) {
    const v = document.getElementById("form");
    if (!v) return;
    const persist = () => { this.persist(def); };
    v.oninput = (e: Event) => {
      const tgt = e.target as HTMLElement;
      if (tgt.tagName === "TEXTAREA") this.grow(tgt as HTMLTextAreaElement);
      if (tgt.id === "inst-title") { const sel = document.getElementById("inst-select") as HTMLSelectElement | null; const o = sel && sel.selectedOptions[0]; if (o) o.textContent = (tgt as HTMLInputElement).value || "Untitled submission"; }
      persist();
    };
    v.onchange = (e: Event) => {
      const tgt = e.target as HTMLElement;
      if (tgt.id === "inst-select") { this.selectInstance(def, (tgt as HTMLSelectElement).value); return; }
      if (tgt.id === "inst-project") { const s = this.currentSub(def.id); s.project_id = (tgt as HTMLSelectElement).value || null; persist(); return; }
      persist();
    };
    v.onclick = (e: Event) => {
      const tgt = e.target as HTMLElement;
      if (tgt.id === "inst-signin") { this.openAuth(); return; }
      if (tgt.id === "inst-new") { this.newInstance(def); return; }
      if (tgt.id === "inst-del") { this.deleteInstance(def); return; }
      const add = tgt.closest("[data-add]") as HTMLElement | null;
      if (add) {
        const key = add.dataset.add as string;
        const tbody = v.querySelector('table[data-table="' + key + '"] tbody');
        const sec = def.sections.find((s) => s.key === key);
        if (!tbody || !sec) return;
        const ri = tbody.children.length;
        const tr = document.createElement("tr");
        tr.innerHTML = (sec.columns || []).map((c) => '<td><input data-sec="' + key + '" data-row="' + ri + '" data-col="' + c.key + '" value=""></td>').join("");
        tbody.appendChild(tr);
        persist();
      }
    };
  }

  persist(def: FormDef) {
    const v = document.getElementById("form");
    if (!v) return;
    const rec: Rec = { meta: {}, sections: {} };
    v.querySelectorAll("[data-meta]").forEach((el) => { rec.meta[(el as HTMLElement).dataset.meta as string] = (el as HTMLInputElement).value; });
    for (const s of def.sections) {
      if (s.type === "table") {
        const rows: Record<string, Record<string, string>> = {};
        v.querySelectorAll('[data-sec="' + s.key + '"][data-row]').forEach((el) => {
          const r = (el as HTMLElement).dataset.row as string;
          (rows[r] = rows[r] || {})[(el as HTMLElement).dataset.col as string] = (el as HTMLInputElement).value;
        });
        rec.sections[s.key] = Object.keys(rows).map((k) => rows[k]).filter((o) => Object.values(o).some((x) => x && x.trim()));
      } else if (s.type === "check") {
        const o: Record<string, boolean> = {};
        v.querySelectorAll('[data-sec="' + s.key + '"][data-item]').forEach((el) => { o[(el as HTMLElement).dataset.item as string] = (el as HTMLInputElement).checked; });
        rec.sections[s.key] = o;
      } else {
        const el = v.querySelector('[data-sec="' + s.key + '"]') as HTMLInputElement | null;
        rec.sections[s.key] = el ? el.value : "";
      }
    }
    if (this.user) {
      const s = this.currentSub(def.id);
      s.data = rec;
      const ti = document.getElementById("inst-title") as HTMLInputElement | null;
      if (ti) s.title = ti.value;
      s.updated_at = new Date().toISOString();
      s._draft = false;
      this.flashSaved();
      this.saveRelational(def, s.data, s);
    } else {
      this.db[def.id] = rec;
      this.save();
      this.upsertRemote(def.id);
    }
  }

  // ---------- chrome / io ----------
  wireChrome() {
    const print = document.getElementById("btn-print"); if (print) print.onclick = () => window.print();
    const exp = document.getElementById("btn-export"); if (exp) exp.onclick = () => this.download("forms-data.json", JSON.stringify(this.db, null, 2), "application/json");
    const imp = document.getElementById("btn-import"); if (imp) imp.onclick = () => (document.getElementById("file-import") as HTMLInputElement).click();
    const fi = document.getElementById("file-import") as HTMLInputElement | null;
    if (fi)
      fi.onchange = (e: Event) => {
        const f = (e.target as HTMLInputElement).files?.[0]; if (!f) return;
        const r = new FileReader();
        r.onload = () => { try { this.db = JSON.parse(r.result as string); this.save(); this.route(); } catch { alert("Could not read that file."); } };
        r.readAsText(f);
      };
    const modal = document.getElementById("modal");
    const schema = document.getElementById("btn-schema"); if (schema) schema.onclick = () => this.openSchema();
    const mc = document.getElementById("modal-close"); if (mc && modal) mc.onclick = () => modal.classList.remove("open");
    if (modal) modal.onclick = (e: Event) => { if (e.target === modal) modal.classList.remove("open"); };
    document.querySelectorAll(".tab").forEach((t) => ((t as HTMLElement).onclick = () => {
      document.querySelectorAll(".tab").forEach((x) => x.classList.remove("active"));
      t.classList.add("active"); this._tab = (t as HTMLElement).dataset.tab as string; this.showCode();
    }));
    const copy = document.getElementById("btn-copy"); if (copy) copy.onclick = () => { const out = document.getElementById("code-out"); if (navigator.clipboard && out) navigator.clipboard.writeText(out.textContent || ""); };
    const dl = document.getElementById("btn-dl");
    if (dl) dl.onclick = () => { const sql = this._tab !== "json"; const out = document.getElementById("code-out"); this.download(sql ? "schema.sql" : "schema.json", (out && out.textContent) || "", "text/plain"); };
    const ns = document.getElementById("nav-search"); if (ns) ns.addEventListener("input", (e: Event) => this.applySearch((e.target as HTMLInputElement).value));
    const idx = document.getElementById("index");
    if (idx)
      idx.addEventListener("click", (e: Event) => {
        const h = (e.target as HTMLElement).closest("[data-toggle]") as HTMLElement | null;
        if (!h) return;
        const g = h.parentElement as HTMLElement; g.classList.toggle("collapsed"); const di = +(h.dataset.toggle as string);
        if (g.classList.contains("collapsed")) this.collapsed.add(di); else this.collapsed.delete(di);
      });
    const cm = document.getElementById("cmodal");
    const bc = document.getElementById("btn-connect");
    if (bc && cm) bc.onclick = () => { if (this.supa) { (document.getElementById("c-url") as HTMLInputElement).value = this.supa.url; (document.getElementById("c-key") as HTMLInputElement).value = this.supa.key; } cm.classList.add("open"); };
    const cclose = document.getElementById("c-close"); if (cclose && cm) cclose.onclick = () => cm.classList.remove("open");
    const cclose2 = document.getElementById("c-close2"); if (cclose2 && cm) cclose2.onclick = () => cm.classList.remove("open");
    if (cm) cm.onclick = (e: Event) => { if (e.target === cm) cm.classList.remove("open"); };
    const cconnect = document.getElementById("c-connect");
    if (cconnect) cconnect.onclick = () => { const u = (document.getElementById("c-url") as HTMLInputElement).value.trim(), k = (document.getElementById("c-key") as HTMLInputElement).value.trim(); if (u && k) this.connect(u, k, false); };
    const cdis = document.getElementById("c-disconnect"); if (cdis && cm) cdis.onclick = () => { this.disconnect(); cm.classList.remove("open"); };
    const ba = document.getElementById("btn-account");
    if (ba) ba.onclick = () => { if (this.user) { if (confirm("Sign out of " + ((this.user.email) || "this account") + "?")) this.signOut(); } else this.openAuth(); };
    const am = document.getElementById("amodal");
    const aclose = document.getElementById("a-close"); if (aclose && am) aclose.onclick = () => am.classList.remove("open");
    if (am) am.onclick = (e: Event) => { if (e.target === am) am.classList.remove("open"); };
    const asignin = document.getElementById("a-signin"); if (asignin) asignin.onclick = () => this.doAuth("in");
    const asignup = document.getElementById("a-signup"); if (asignup) asignup.onclick = () => this.doAuth("up");
    const amagic = document.getElementById("a-magic"); if (amagic) amagic.onclick = () => this.doAuth("magic");
  }

  // ---------- auth + multi-record ----------
  uuid() { return crypto.randomUUID ? crypto.randomUUID() : "id-" + Date.now() + "-" + Math.random().toString(16).slice(2); }
  async initAuth() {
    if (!this.client) return;
    try { const { data } = await this.client.auth.getSession(); this.user = data.session ? (data.session.user as SUser) : null; } catch { this.user = null; }
    if (!this._authSub) { this._authSub = true; this.client.auth.onAuthStateChange((_e, sess) => { this.user = sess ? (sess.user as SUser) : null; this.afterAuth(); }); }
    if (this.user) await this.loadInstances();
    if (this.user) await this.loadProjects();
    this.renderAccount();
  }
  async afterAuth() {
    this.renderAccount();
    if (this.user) await this.loadInstances(); else { this.byForm = {}; this.active = {}; this.db = {}; }
    if (this.user) await this.loadProjects();
    if (this.user) await this.loadRemote();
    const am = document.getElementById("amodal"); if (am && this.user) am.classList.remove("open");
    if (this.user) { const h = location.hash || ""; if (!/#\/.+/.test(h)) { location.hash = "#/gallery"; return; } }
    this.route();
  }
  renderAccount() {
    const b = document.getElementById("btn-account"); if (!b) return;
    b.textContent = this.user ? (this.user.email || "Account") : "Sign in";
    b.classList.toggle("primary", !this.user);
  }
  openAuth() { const a = document.getElementById("amodal"); if (a) { this.authMsg(""); a.classList.add("open"); } }
  authMsg(t: string, err?: number) { const m = document.getElementById("a-msg"); if (m) { m.textContent = t || ""; m.style.color = err ? "#9A6B1F" : "var(--muted)"; } }
  async doAuth(mode: string) {
    if (!this.client) { this.authMsg("Connect a database first (Connect DB).", 1); return; }
    const email = ((document.getElementById("a-email") as HTMLInputElement).value || "").trim();
    const pw = (document.getElementById("a-pw") as HTMLInputElement).value || "";
    if (!email) { this.authMsg("Enter your email.", 1); return; }
    try {
      if (mode === "magic") { const { error } = await this.client.auth.signInWithOtp({ email }); if (error) throw error; this.authMsg("Check your email for a sign-in link."); return; }
      if (mode === "up") { const { error } = await this.client.auth.signUp({ email, password: pw }); if (error) throw error; this.authMsg("Account created. If email confirmation is on, confirm via email, then sign in."); return; }
      const { error } = await this.client.auth.signInWithPassword({ email, password: pw }); if (error) throw error;
      this.authMsg("Signed in.");
    } catch (e) { this.authMsg((e as Error).message || String(e), 1); }
  }
  async signOut() { try { if (this.client) await this.client.auth.signOut(); } catch { /* ignore */ } this.user = null; this.afterAuth(); }

  async loadInstances() { this.byForm = {}; this.active = {}; this.loaded = {}; }
  async loadProjects() {
    this._projects = [];
    if (!this.client || !this.user) return;
    try { const r = await this.client.from("projects").select("id,code,name").order("created_at"); if (!r.error && r.data) this._projects = r.data as ProjectRow[]; } catch { /* ignore */ }
  }
  draftSub(formId: string): Sub { return { id: this.uuid(), user_id: (this.user as SUser).id, form_id: formId, title: "", project_id: null, data: { meta: {}, sections: {} }, updated_at: new Date().toISOString(), _draft: true }; }
  currentSub(formId: string): Sub {
    this.byForm = this.byForm || {}; this.active = this.active || {};
    const list = this.byForm[formId] || (this.byForm[formId] = []);
    let s = list.find((x) => x.id === this.active[formId]);
    if (!s) { s = list[0] || (list.unshift(this.draftSub(formId)), list[0]); this.active[formId] = s.id; }
    return s;
  }
  recFor(def: FormDef): Rec {
    if (this.user) { const s = this.currentSub(def.id); return s.data || (s.data = { meta: {}, sections: {} }); }
    return this.db[def.id] || (this.db[def.id] = { meta: {}, sections: {} });
  }
  instbarHTML(def: FormDef) {
    if (!this.user) {
      return '<div class="instbar local">Editing a local draft. <a id="inst-signin">Sign in</a> to save multiple named submissions per form to your account.</div>';
    }
    const list = this.byForm[def.id] || [];
    const cur = this.currentSub(def.id);
    const opts = list.map((s) => '<option value="' + s.id + '"' + (s.id === cur.id ? " selected" : "") + ">" + this.esc(s.title || "Untitled submission") + "</option>").join("");
    const projs = this._projects || [];
    const projOpts = '<option value="">— No project —</option>' + projs.map((p) => '<option value="' + p.id + '"' + (p.id === (cur.project_id || "") ? " selected" : "") + ">" + this.esc((p.code && p.code !== "—" ? p.code + " · " : "") + (p.name || "Untitled")) + "</option>").join("");
    return (
      '<div class="instbar"><span class="ib-l">Submission</span>' +
      '<select id="inst-select">' + opts + "</select>" +
      '<input id="inst-title" placeholder="Name this submission…" value="' + this.esc(cur.title || "") + '">' +
      '<span class="ib-l">Project</span>' +
      '<select id="inst-project" title="Roll this submission up to a project">' + projOpts + "</select>" +
      '<button class="btn" id="inst-new">+ New</button>' +
      '<button class="btn" id="inst-del">Delete</button></div>'
    );
  }
  newInstance(def: FormDef) { const s = this.draftSub(def.id); (this.byForm[def.id] = this.byForm[def.id] || []).unshift(s); this.active[def.id] = s.id; this.renderForm(def); }
  selectInstance(def: FormDef, id: string) { this.active[def.id] = id; this.renderForm(def); }
  async deleteInstance(def: FormDef) {
    const s = this.currentSub(def.id); const list = this.byForm[def.id] || [];
    if (!s._draft && this.client) { try { await this.client.from(this.tname(def)).delete().eq("id", s.id); } catch (e) { console.error(e); } }
    const i = list.findIndex((x) => x.id === s.id); if (i >= 0) list.splice(i, 1);
    this.active[def.id] = list[0] ? list[0].id : null;
    this.renderForm(def);
  }

  // ---------- Supabase backend ----------
  initBackend() {
    this.supa = loadSavedCreds();
    if (!this.supa && ENV_SUPABASE.url && ENV_SUPABASE.key) this.supa = { ...ENV_SUPABASE };
    if (this.supa && this.supa.url && this.supa.key) { this.setCloud("connecting"); this.connect(this.supa.url, this.supa.key, true); }
    else this.setCloud("local");
  }
  setCloud(state: string) {
    const c = document.getElementById("cloud"); if (!c) return;
    c.classList.toggle("on", state === "connected");
    const label = ({ local: "Local only", connecting: "Connecting…", connected: "Connected", error: "Connect failed" } as Record<string, string>)[state] || state;
    const cl = c.querySelector(".cl"); if (cl) cl.textContent = label;
  }
  async connect(url: string, key: string, silent?: boolean) {
    try {
      this.setCloud("connecting");
      this.client = getClient(url, key);
      this.supa = { url, key };
      saveCreds(this.supa);
      this.setCloud("connected");
      const cm = document.getElementById("cmodal"); if (cm) cm.classList.remove("open");
      await this.initAuth();
      await this.loadRemote();
      this.route();
    } catch (e) { console.error(e); this.client = null; this.setCloud("error"); if (!silent) alert("Could not connect: " + ((e as Error).message || e)); }
  }
  async loadRemote() {
    if (!this.client || !this.user) return;
    const { data, error } = await this.client.from("qq_forms").select("id,data");
    if (error) throw error;
    (data || []).forEach((r: { id?: string; data?: Rec }) => { if (r && r.id) this.db[r.id] = r.data as Rec; });
    try { localStorage.setItem(this.KEY, JSON.stringify(this.db)); } catch { /* ignore */ }
  }
  async upsertRemote(id: string) {
    if (!this.client || !this.user) return;
    try { await this.client.from("qq_forms").upsert({ id, data: this.db[id], updated_at: new Date().toISOString() }); } catch (e) { console.error("sync", e); }
  }
  disconnect() { this.client = null; this.supa = null; clearCreds(); this.setCloud("local"); }

  openSchema() { this._tab = this._tab || "sql"; this.showCode(); const m = document.getElementById("modal"); if (m) m.classList.add("open"); }
  showCode() { const out = this._tab === "json" ? this.jsonSchema() : this.sqlDDL(); const o = document.getElementById("code-out"); if (o) o.textContent = out; }

  // ---------- relational read/write ----------
  async ensureLoaded(formId: string) {
    if (!this.user || !this.client) return;
    this.loaded = this.loaded || {};
    if (this.loaded[formId]) return;
    const def = this.defs.find((d) => d.id === formId); if (!def) return;
    await this.loadRelational(def);
    this.loaded[formId] = true;
  }
  rowToSub(def: FormDef, row: Record<string, unknown>): Sub {
    const C = this.colsFor(def);
    const data: Rec = { meta: {}, sections: {} };
    def.meta.forEach((m) => { data.meta[m.key] = row[C.meta[m.key]] != null ? String(row[C.meta[m.key]]) : ""; });
    def.sections.forEach((s) => {
      if (s.type === "table") data.sections[s.key] = [];
      else if (s.type === "check") data.sections[s.key] = row[C.sec[s.key]] || {};
      else data.sections[s.key] = row[C.sec[s.key]] != null ? row[C.sec[s.key]] : "";
    });
    return { id: row.id as string, user_id: row.user_id as string, form_id: def.id, title: (row.title as string) || "", project_id: row.project_id != null ? (row.project_id as string) : null, updated_at: row.updated_at as string, data };
  }
  async loadRelational(def: FormDef) {
    if (!this.client) return;
    const t = this.tname(def); const C = this.colsFor(def);
    this.byForm = this.byForm || {};
    const res = await this.client.from(t).select("*");
    if (res.error) { console.error("load " + t, res.error.message); this.byForm[def.id] = this.byForm[def.id] || []; return; }
    const subs = (res.data || []).map((r: Record<string, unknown>) => this.rowToSub(def, r));
    const tableSecs = def.sections.filter((s) => s.type === "table");
    if (subs.length && tableSecs.length) {
      const ids = subs.map((s) => s.id);
      for (const s of tableSecs) {
        const ct = t + "_" + this.snake(s.key); const cm = C.child[s.key];
        const ch = await this.client.from(ct).select("*").in("parent_id", ids);
        if (ch.error) { console.error("load " + ct, ch.error.message); continue; }
        const by: Record<string, Record<string, unknown>[]> = {};
        (ch.data || []).forEach((r: Record<string, unknown>) => { (by[r.parent_id as string] = by[r.parent_id as string] || []).push(r); });
        subs.forEach((sub) => {
          sub.data.sections[s.key] = (by[sub.id] || [])
            .sort((a, b) => ((a.position as number) || 0) - ((b.position as number) || 0))
            .map((r) => { const o: Record<string, string> = {}; (s.columns || []).forEach((c) => { o[c.key] = r[cm[c.key]] != null ? String(r[cm[c.key]]) : ""; }); return o; });
        });
      }
    }
    subs.sort((a, b) => String(b.updated_at || "").localeCompare(String(a.updated_at || "")));
    this.byForm[def.id] = subs;
  }
  async saveRelational(def: FormDef, rec: Rec, sub: Sub) {
    if (!this.client || !this.user) return;
    const t = this.tname(def); const C = this.colsFor(def);
    const parent: Record<string, unknown> = { id: sub.id, user_id: this.user.id, title: sub.title || null, project_id: sub.project_id || null, updated_at: sub.updated_at };
    if (this._noProjCol) delete parent.project_id;
    def.meta.forEach((m) => { parent[C.meta[m.key]] = rec.meta[m.key] || null; });
    def.sections.filter((s) => s.type !== "table").forEach((s) => { parent[C.sec[s.key]] = s.type === "check" ? rec.sections[s.key] || {} : rec.sections[s.key] || null; });
    let up = await this.client.from(t).upsert(parent);
    if (up.error && /project_id/i.test(up.error.message) && "project_id" in parent) { this._noProjCol = true; delete parent.project_id; up = await this.client.from(t).upsert(parent); }
    if (up.error) { console.error("save " + t, up.error.message); return; }
    for (const s of def.sections.filter((x) => x.type === "table")) {
      const ct = t + "_" + this.snake(s.key); const cm = C.child[s.key];
      await this.client.from(ct).delete().eq("parent_id", sub.id);
      const rows = ((rec.sections[s.key] as Record<string, string>[]) || [])
        .filter((r) => Object.values(r).some((vv) => vv && String(vv).trim()))
        .map((r, i) => { const o: Record<string, unknown> = { parent_id: sub.id, position: i }; (s.columns || []).forEach((c) => { o[cm[c.key]] = r[c.key] || null; }); return o; });
      if (rows.length) { const ins = await this.client.from(ct).insert(rows); if (ins.error) console.error("child " + ct, ins.error.message); }
    }
  }

  download(name: string, text: string, mime: string) {
    const b = new Blob([text], { type: mime });
    const u = URL.createObjectURL(b);
    const a = document.createElement("a"); a.href = u; a.download = name; a.click();
    setTimeout(() => URL.revokeObjectURL(u), 1500);
  }
}

export default function FormsApp() {
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const logic = new FormsLogic();
    logic.componentDidMount();
    return () => logic.destroy();
  }, []);

  return (
    <div ref={ref}>
      <style dangerouslySetInnerHTML={{ __html: FORMS_CSS }} />
      <div className="app">
        <aside className="side">
          <div className="side-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/qq-logo.png" alt="QQ Studios" />
            <span className="bt">Forms</span>
          </div>
          <div className="side-search">
            <input id="nav-search" placeholder="Search forms…" autoComplete="off" />
          </div>
          <div id="index"></div>
          <div className="side-note">
            <b>All 77 forms live.</b> Every form is editable and saves automatically. Four — PRD, ADR, Postmortem &amp; Onboarding — carry the full <b>example</b> + <b>why-it-matters</b> guidance; the rest are being enriched the same way.
            <br />
            <br />
            <span style={{ fontSize: "10px", letterSpacing: ".04em" }}>
              Companion artifacts:{" "}
              <a href="/notebook">Notebook</a> ·{" "}
              <a href="/workbook">Workbook</a> ·{" "}
              <a href="/operating-model">Operating Model</a> ·{" "}
              <a href="/governance-reports">Governance Reports</a>
            </span>
          </div>
        </aside>
        <main className="main">
          <div className="topbar">
            <div className="crumbs" id="crumbs">Forms Workbook</div>
            <div className="acts">
              <button className="btn" id="btn-gallery">▦ Gallery</button>
              <button className="btn" id="btn-planner">▱ Planner</button>
              <button className="btn" id="btn-guide">Hide guidance</button>
              <span className="cloud" id="cloud"><span className="cd"></span><span className="cl">Local only</span></span>
              <span className="saved" id="saved"><span className="dotg"></span> Saved</span>
              <button className="btn" id="btn-connect">Connect DB</button>
              <button className="btn" id="btn-account">Sign in</button>
              <button className="btn" id="btn-export">Export data</button>
              <button className="btn" id="btn-import">Import</button>
              <button className="btn" id="btn-schema">Schema</button>
              <button className="btn primary" id="btn-print">Print</button>
            </div>
          </div>
          <div className="wrap" id="form"></div>
        </main>
      </div>
      <input type="file" id="file-import" accept="application/json" style={{ display: "none" }} />
      <div className="modal" id="modal">
        <div className="sheetm">
          <header><h3>Database structure</h3><button className="iconbtn" id="modal-close">×</button></header>
          <div className="tabs">
            <div className="tab active" data-tab="sql">SQL DDL</div>
            <div className="tab" data-tab="json">JSON Schema</div>
          </div>
          <div className="codewrap"><pre id="code-out"></pre></div>
          <div className="modal-foot">
            <span className="hint">Each form is a table; multi-row sections (e.g. Requirements, Timeline) become child tables. Hand this to your dev team or load it into Postgres / Supabase.</span>
            <div style={{ display: "flex", gap: "8px" }}><button className="btn" id="btn-copy">Copy</button><button className="btn primary" id="btn-dl">Download</button></div>
          </div>
        </div>
      </div>
      <div className="modal" id="cmodal">
        <div className="sheetm" style={{ width: "min(620px,100%)" }}>
          <header><h3>Connect a database</h3><button className="iconbtn" id="c-close">×</button></header>
          <div style={{ padding: "18px 22px", overflow: "auto" }}>
            <p style={{ fontSize: "12.5px", lineHeight: 1.55, color: "var(--muted)", margin: "0 0 14px" }}>Sync to your own Supabase project. First, run this once in the Supabase SQL editor, then paste your project URL and anon public key below.</p>
            <div className="codewrap" style={{ margin: "0 0 16px" }}><pre id="supa-sql"></pre></div>
            <div className="cfield"><label>Supabase URL</label><input id="c-url" placeholder="https://xxxx.supabase.co" autoComplete="off" /></div>
            <div className="cfield"><label>Anon public key</label><input id="c-key" placeholder="eyJhbGci…" autoComplete="off" /></div>
            <p style={{ fontSize: "11px", lineHeight: 1.5, color: "var(--faint)", margin: "4px 0 0" }}>Credentials are stored only in this browser. The anon key is safe to use client-side when row-level security is configured.</p>
          </div>
          <div className="modal-foot">
            <button className="btn" id="c-disconnect">Disconnect</button>
            <div style={{ display: "flex", gap: "8px" }}><button className="btn" id="c-close2">Cancel</button><button className="btn primary" id="c-connect">Connect &amp; sync</button></div>
          </div>
        </div>
      </div>
      <div className="modal" id="amodal">
        <div className="sheetm" style={{ width: "min(440px,100%)" }}>
          <header><h3>Account</h3><button className="iconbtn" id="a-close">×</button></header>
          <div style={{ padding: "18px 22px" }}>
            <p style={{ fontSize: "12.5px", lineHeight: 1.5, color: "var(--muted)", margin: "0 0 14px" }}>Sign in to keep your own submissions — as many named instances per form as you need. Requires a connected database.</p>
            <div className="cfield"><label>Email</label><input id="a-email" type="email" autoComplete="username" placeholder="you@company.com" /></div>
            <div className="cfield"><label>Password</label><input id="a-pw" type="password" autoComplete="current-password" placeholder="••••••••" /></div>
            <p id="a-msg" style={{ fontSize: "11.5px", lineHeight: 1.45, color: "var(--muted)", minHeight: "16px", margin: "2px 0 0" }}></p>
          </div>
          <div className="modal-foot">
            <button className="btn" id="a-magic">Email a magic link</button>
            <div style={{ display: "flex", gap: "8px" }}><button className="btn" id="a-signup">Create account</button><button className="btn primary" id="a-signin">Sign in</button></div>
          </div>
        </div>
      </div>
      <div id="landing" className="landing hidden">
        <div className="lnd-left">
          <div className="lnd-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/qq-logo.png" alt="QQ Studios" /><span>QQ-Studios</span>
          </div>
          <div className="lnd-hero">
            <div className="lnd-kicker">The Development Documentation System</div>
            <h1 className="lnd-title">Never start from a <em>blank page.</em></h1>
            <p className="lnd-sub">Seventy-seven proven templates &mdash; from PRDs and ADRs to runbooks, postmortems, and compliance matrices &mdash; organized across the eight disciplines of software documentation. Every field carries a real example and the reason it matters, so you never start from a blank page.</p>
            <ul className="lnd-feats">
              <li><b>77 document types</b>, organized across 8 disciplines</li>
              <li>Every field guided by a <b>concrete example</b> and why it matters</li>
              <li>Fill on screen &mdash; <b>auto-saved privately</b> to your account</li>
              <li>Companion to the printed <b>Reference Book</b> &amp; <b>Forms Workbook</b></li>
            </ul>
          </div>
          <div className="lnd-foot">QQ-Studios &middot; Forms Workspace &middot; 2026</div>
        </div>
        <div className="lnd-right">
          <div className="lnd-rstack">
            <div className="lnd-preview" id="lnd-preview" aria-hidden="true">
              <div className="lp-kick">Form · PRD</div>
              <div className="lp-title">Product Requirements</div>
              <div className="lp-sec"><div className="lp-sl">Problem statement &amp; evidence</div><div className="lp-eg"><b>e.g.</b> CSV imports fail ~12% of the time.</div><div className="lp-line"></div><div className="lp-line short"></div></div>
              <div className="lp-sec"><div className="lp-sl">Goals &amp; success metrics</div><div className="lp-line"></div></div>
            </div>
            <div className="lnd-card">
              <div className="lnd-tabs"><button className="lnd-tab active" data-lt="in">Sign in</button><button className="lnd-tab" data-lt="up">Create account</button></div>
              <div id="lnd-auth">
                <label className="lnd-fl">Email</label>
                <input id="l-email" type="email" autoComplete="username" placeholder="you@company.com" />
                <label className="lnd-fl">Password</label>
                <input id="l-pw" type="password" autoComplete="current-password" placeholder="••••••••" />
                <p id="l-msg" className="lnd-msg"></p>
                <button className="lnd-primary" id="l-submit">Sign in</button>
                <button className="lnd-ghost" id="l-magic">Email me a magic link instead</button>
              </div>
              <div id="lnd-signed" style={{ display: "none" }}>
                <p className="lnd-signed-txt">You&apos;re signed in as <b id="l-who"></b>.</p>
                <button className="lnd-primary" id="l-continue">Continue to your forms →</button>
                <button className="lnd-ghost" id="l-signout">Sign out</button>
              </div>
              <div className="lnd-sep"><span>or</span></div>
              <button className="lnd-browse" id="l-browse">Browse the form gallery →</button>
              <p className="lnd-note">Browse and fill forms without an account — sign in to save them. <span id="l-cloud" className="lnd-cloud"></span></p>
              <p className="lnd-note" style={{ marginTop: "10px" }}>
                <a href="/notebook">Notebook</a> · <a href="/workbook">Workbook</a> · <a href="/operating-model">Operating Model</a> · <a href="/governance-reports">Governance Reports</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
