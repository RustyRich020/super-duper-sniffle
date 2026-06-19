"use client";

import { useEffect, useRef } from "react";
import { DOMAINS, FORMS, type RawForm, type RawSection } from "@/lib/forms-data";
import { FORMS_RICH } from "@/lib/forms-rich";

// Complete prototype <style> copied VERBATIM from "Forms Workbook.dc.html".
const CSS = `
  :root{
    --ink:#222226; --muted:#6A6A6F; --faint:#A4A4A0;
    --page:#FBFBF9; --paper:#E7E7E3; --soft:#F1F1EE; --softer:#F7F7F4;
    --rule:#E3E3DE; --line:#D4D4CF; --wline:#DAD9D2;
    --accent:#B5862A; --accent2:#E6C658; --accentsoft:#E8D6A2;
  }
  *{ box-sizing:border-box; }
  html,body{ margin:0; padding:0; }
  body{ background:var(--paper); color:var(--ink); font-family:'IBM Plex Sans',system-ui,sans-serif; -webkit-font-smoothing:antialiased; }
  @page{ size:A4; margin:0; }
  @media screen{ body{ padding:30px 0 60px; } .sheet{ margin:0 auto 20px; box-shadow:0 8px 30px rgba(45,33,12,.16); } }
  @media print{ body{ background:none; padding:0; } .sheet{ box-shadow:none !important; margin:0 !important; } }

  #loading{ position:fixed; inset:0; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:14px;
    background:var(--paper); z-index:50; color:var(--muted); font-family:'IBM Plex Mono'; font-size:11px; letter-spacing:.18em; text-transform:uppercase; }
  #loading .dot{ width:34px; height:34px; border-radius:50%; border:2px solid var(--line); border-top-color:var(--accent); animation:spin .9s linear infinite; }
  @keyframes spin{ to{ transform:rotate(360deg); } }

  .sheet{ position:relative; width:210mm; height:297mm; background:var(--page); overflow:hidden; break-after:page; page-break-after:always; }
  .sheet:last-child{ break-after:auto; page-break-after:auto; }
  .hdr{ position:absolute; left:18mm; right:18mm; top:9.5mm; display:flex; align-items:flex-end; justify-content:space-between;
    border-bottom:1px solid var(--rule); padding-bottom:2.4mm; }
  .hdr .l{ font-family:'IBM Plex Mono'; font-size:7pt; letter-spacing:.14em; text-transform:uppercase; color:var(--faint); }
  .hdr .r{ font-family:'Spectral'; font-style:italic; font-size:9pt; color:var(--muted); }
  .ftr{ position:absolute; left:18mm; right:18mm; bottom:9mm; display:flex; align-items:center; justify-content:space-between;
    border-top:1px solid var(--rule); padding-top:2.2mm; }
  .ftr .l{ font-family:'IBM Plex Mono'; font-size:6.8pt; letter-spacing:.06em; color:var(--faint); }
  .ftr .pg{ font-family:'IBM Plex Mono'; font-size:8.5pt; color:var(--accent); }

  /* ---- Cover ---- */
  .sheet.cover{ background:#1E1E21; color:#ECECE6; }
  .cover-inner{ position:absolute; inset:0; display:flex; flex-direction:column; padding:24mm 23mm 22mm; }
  .cover-inner::before{ content:""; position:absolute; inset:11mm; border:1px solid rgba(230,198,88,.20); pointer-events:none; }
  .cover-top{ display:flex; align-items:flex-start; justify-content:space-between; position:relative; z-index:1; }
  .brand-logo{ height:62px; width:auto; filter:brightness(0) invert(1); opacity:.95; }
  .cover-edition{ font-family:'IBM Plex Mono'; font-size:9.5px; letter-spacing:.26em; text-transform:uppercase; color:var(--accent2); text-align:right; line-height:1.8; }
  .cover-mid{ margin-top:auto; position:relative; z-index:1; }
  .cover-kicker{ font-family:'IBM Plex Mono'; font-size:11px; letter-spacing:.36em; text-transform:uppercase; color:var(--accent2); margin-bottom:20px; }
  .cover-title{ font-family:'Spectral'; font-weight:500; font-size:60px; line-height:1.02; letter-spacing:-.5px; margin:0; color:#FAF4E8; max-width:15ch; }
  .cover-title em{ font-style:italic; color:var(--accentsoft); }
  .cover-rule{ width:70mm; height:2px; background:var(--accent2); margin:26px 0 22px; }
  .cover-sub{ font-family:'Spectral'; font-size:15.5px; line-height:1.55; color:#CFCFC8; max-width:60ch; margin:0; }
  .cover-foot{ margin-top:34px; display:flex; gap:30px; flex-wrap:wrap; font-family:'IBM Plex Mono'; font-size:9.5px; letter-spacing:.18em; text-transform:uppercase; color:#AEAEA6; }
  .cover-foot b{ color:var(--accent2); font-weight:400; }
  .cover-link{ display:inline-flex; align-items:center; gap:7px; margin-top:22px; font-family:'IBM Plex Mono';
    font-size:10px; letter-spacing:.12em; text-transform:uppercase; color:var(--accent2); text-decoration:none;
    border-bottom:1px solid rgba(230,198,88,.45); padding-bottom:3px; }

  /* ---- Contents ---- */
  .toc{ position:absolute; left:18mm; right:18mm; top:17mm; }
  .toc-head{ display:flex; align-items:baseline; justify-content:space-between; border-bottom:2px solid var(--ink); padding-bottom:10px; margin-bottom:2px; }
  .toc-head h2{ font-family:'Spectral'; font-weight:600; font-size:28px; margin:0; letter-spacing:-.4px; }
  .toc-head .meta{ font-family:'IBM Plex Mono'; font-size:9px; letter-spacing:.2em; text-transform:uppercase; color:var(--faint); }
  .toc-group{ font-family:'IBM Plex Mono'; font-size:9px; letter-spacing:.2em; text-transform:uppercase; color:var(--accent); margin:13px 0 1px; }
  .toc-row{ display:flex; align-items:baseline; gap:10px; padding:5.4px 2px; border-bottom:1px solid var(--rule);
    text-decoration:none; color:inherit; cursor:pointer; }
  .toc-row:hover .toc-title{ color:var(--accent); }
  .toc-row:hover .toc-code{ color:var(--accent); }
  .toc-code{ font-family:'IBM Plex Mono'; font-size:9.5px; color:var(--muted); width:20ch; flex:none; }
  .toc-title{ font-family:'Spectral'; font-size:13px; color:var(--ink); flex:1; min-width:0; }
  .toc-pg{ font-family:'IBM Plex Mono'; font-size:10px; color:var(--muted); flex:none; margin-left:auto; }

  /* ---- Form page ---- */
  .fmain{ position:absolute; left:18mm; right:18mm; top:16mm; bottom:15mm; display:flex; flex-direction:column; }
  .fkicker{ display:flex; align-items:center; gap:9px; font-family:'IBM Plex Mono'; font-size:8.5px; letter-spacing:.18em; text-transform:uppercase; color:var(--accent); }
  .fkicker .flogo{ height:17px; width:auto; opacity:.5; }
  .fkicker .dom{ color:var(--faint); }
  .ftitle{ font-family:'Spectral'; font-weight:600; font-size:27px; line-height:1.08; letter-spacing:-.4px; margin:7px 0 4px; color:var(--ink); }
  .fpurpose{ font-family:'Spectral'; font-style:italic; font-size:12.5px; line-height:1.4; color:var(--muted); margin:0; }
  .fmeta{ display:flex; gap:7mm; margin:6mm 0 5mm; }
  .ffield{ flex:1; min-width:0; }
  .ffield .fl{ font-family:'IBM Plex Mono'; font-size:7.5px; letter-spacing:.1em; text-transform:uppercase; color:var(--faint); display:block; margin-bottom:6mm; }
  .ffield .fb{ border-bottom:1px solid var(--line); }
  .fbody{ flex:1; display:flex; flex-direction:column; gap:4mm; min-height:0; }
  .fsection{ display:flex; flex-direction:column; min-height:0; }
  .sl{ font-family:'IBM Plex Sans'; font-weight:600; font-size:10px; color:var(--ink); }
  .sl b{ font-weight:600; color:var(--accent); }
  .sh{ font-family:'Spectral'; font-style:italic; font-size:8.6px; color:var(--muted); margin-top:1px; }
  .sx{ font-family:'IBM Plex Mono'; font-size:7.5px; color:var(--faint); margin-top:1.5px; line-height:1.35; }
  .sx b{ color:var(--accent); font-weight:500; font-style:normal; }
  .wbox{ flex:1; min-height:10mm; margin-top:2mm; border:1px solid var(--line); border-radius:2px;
    background-image:repeating-linear-gradient(to bottom, transparent 0, transparent calc(7mm - 1px), var(--wline) calc(7mm - 1px), var(--wline) 7mm);
    background-position:0 3mm; }
  .dbox{ flex:1; min-height:16mm; margin-top:2mm; border:1px solid var(--line); border-radius:2px;
    background-image:radial-gradient(var(--rule) 0.6px, transparent 0.6px); background-size:5mm 5mm; background-position:1mm 1mm; }
  .cbox{ flex:1; min-height:12mm; margin-top:2mm; display:flex; flex-direction:column; }
  .crow{ display:flex; border-bottom:1px solid var(--line); }
  .crow.chead{ border-bottom:1.5px solid var(--ink); }
  .crow .cc{ flex:1; min-width:0; padding:1.6mm 2mm; border-right:1px solid var(--rule); font-family:'IBM Plex Sans'; font-size:8px;
    letter-spacing:.04em; text-transform:uppercase; color:var(--muted); }
  .crow.chead .cc{ color:var(--ink); font-weight:600; }
  .crow .cc:last-child{ border-right:none; }
  .cbody{ flex:1; min-height:0; display:flex; }
  .cbody .ccol{ flex:1; border-right:1px solid var(--rule);
    background-image:repeating-linear-gradient(to bottom, transparent 0, transparent calc(7mm - 1px), var(--wline) calc(7mm - 1px), var(--wline) 7mm); }
  .cbody .ccol:last-child{ border-right:none; }
  .checks{ flex:1; min-height:0; margin-top:2mm; display:flex; flex-direction:column; justify-content:center; gap:2.4mm; }
  .chk{ display:flex; align-items:center; gap:8px; font-family:'IBM Plex Sans'; font-size:10px; color:var(--ink); }
  .chk .cbx{ width:4mm; height:4mm; border:1.4px solid var(--muted); border-radius:1.5px; flex:none; }
  .chk.blank{ color:var(--faint); }
  .chk.blank .ln{ flex:1; border-bottom:1px solid var(--line); height:4mm; }

  /* ---- On-theme cross-links bar (port addition) ---- */
  .wb-nav{ max-width:210mm; margin:0 auto 20px; display:flex; gap:18px; align-items:center; justify-content:flex-end;
    font-family:'IBM Plex Mono'; font-size:10px; letter-spacing:.12em; text-transform:uppercase; }
  .wb-nav a{ color:var(--accent); text-decoration:none; border-bottom:1px solid rgba(181,134,42,.4); padding-bottom:2px; }
  .wb-nav a:hover{ color:var(--ink); }
  @media print{ .wb-nav{ display:none !important; } }
`;

// --- Helpers ported from the prototype's DCLogic Component ---
function esc(s: unknown): string {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function snake(s: string): string {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/__+/g, "_");
}

type IndexedForm = RawForm & { idx: number };
type Group = { domain: string; items: IndexedForm[] };

// Imperative builder mirroring the prototype's build()/addForm()/addToc()/addCover().
class Builder {
  root: HTMLElement;
  page = 0;
  tocLimit = 0;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  makeSheet(cls?: string): HTMLDivElement {
    const s = document.createElement("div");
    s.className = "sheet" + (cls ? " " + cls : "");
    this.root.appendChild(s);
    this.page++;
    return s;
  }

  addFtr(sheet: HTMLElement) {
    const f = document.createElement("div");
    f.className = "ftr";
    f.innerHTML =
      '<span class="l">QQ-Studios — Forms Workbook</span><span class="pg">' + this.page + "</span>";
    sheet.appendChild(f);
  }

  addHdr(sheet: HTMLElement, right: string) {
    const h = document.createElement("div");
    h.className = "hdr";
    h.innerHTML = '<span class="l">Forms Workbook</span><span class="r">' + esc(right) + "</span>";
    sheet.appendChild(h);
  }

  metaRow(meta: string[]): string {
    return (
      '<div class="fmeta">' +
      meta
        .map(
          (m) =>
            '<div class="ffield"><span class="fl">' + esc(m) + '</span><div class="fb"></div></div>'
        )
        .join("") +
      "</div>"
    );
  }

  sectionHTML(sec: RawSection, fid: string): string {
    const w = sec.w || 1;
    let label = '<div class="sl">' + esc(sec.l) + "</div>";
    if (sec.h) label += '<div class="sh">' + esc(sec.h) + "</div>";
    const rich =
      (FORMS_RICH && fid && FORMS_RICH[fid] && FORMS_RICH[fid][sec.l]) || null;
    if (rich && rich.ex) label += '<div class="sx"><b>e.g.</b> ' + esc(rich.ex) + "</div>";
    let inner = "";
    if (sec.t === "draw") {
      inner = '<div class="dbox"></div>';
    } else if (sec.t === "cols") {
      const head =
        '<div class="crow chead">' +
        (sec.c || []).map((c) => '<div class="cc">' + esc(c) + "</div>").join("") +
        "</div>";
      const cols = (sec.c || []).map(() => '<div class="ccol"></div>').join("");
      inner = '<div class="cbox">' + head + '<div class="cbody">' + cols + "</div></div>";
    } else if (sec.t === "check") {
      let rows = (sec.items || [])
        .map((it) => '<div class="chk"><span class="cbx"></span>' + esc(it) + "</div>")
        .join("");
      rows += '<div class="chk blank"><span class="cbx"></span><span class="ln"></span></div>';
      inner = '<div class="checks">' + rows + "</div>";
    } else {
      inner = '<div class="wbox"></div>';
    }
    return '<div class="fsection" style="flex:' + w + '">' + label + inner + "</div>";
  }

  addForm(f: IndexedForm): number {
    const sheet = this.makeSheet();
    sheet.id = "form-" + f.idx;
    this.addHdr(sheet, DOMAINS[f.d]);
    this.addFtr(sheet);
    const meta = f.meta && f.meta.length ? f.meta : ["Owner", "Author", "Status", "Date"];
    const fid = snake(f.code);
    const main = document.createElement("div");
    main.className = "fmain";
    main.innerHTML =
      '<div class="fkicker"><img class="flogo" src="/assets/qq-logo.png" alt=""><span>Form · ' +
      esc(f.code) +
      '</span><span class="dom">' +
      esc(DOMAINS[f.d]) +
      "</span></div>" +
      '<h1 class="ftitle">' +
      esc(f.title) +
      "</h1>" +
      '<p class="fpurpose">' +
      esc(f.purpose || "") +
      "</p>" +
      this.metaRow(meta) +
      '<div class="fbody">' +
      (f.s || []).map((sec) => this.sectionHTML(sec, fid)).join("") +
      "</div>";
    sheet.appendChild(main);
    return this.page;
  }

  addCover() {
    const s = this.makeSheet("cover");
    s.innerHTML =
      '<div class="cover-inner">' +
      '<div class="cover-top">' +
      '<img class="brand-logo" src="/assets/qq-logo.png" alt="QQ Studios">' +
      '<div class="cover-edition">Companion to the<br>Reference Book<br>2026</div>' +
      "</div>" +
      '<div class="cover-mid">' +
      '<div class="cover-kicker">Development Documentation</div>' +
      '<h1 class="cover-title">The <em>Forms</em> Workbook</h1>' +
      '<div class="cover-rule"></div>' +
      '<p class="cover-sub">A fillable template for every document type in the Glossary by Domain — print it, or fill it on screen. One ready-to-use form per page, organized across all eight disciplines.</p>' +
      '<div class="cover-foot">' +
      '<span><b>' +
      FORMS.length +
      "</b> Forms</span>" +
      "<span><b>8</b> Domains</span>" +
      "<span><b>1</b> Per Page</span>" +
      "<span><b>Print</b> &amp; Fill</span>" +
      "</div>" +
      '<a class="cover-link" href="/notebook">← Back to The Documentation Reference Book ↗</a>' +
      "</div>" +
      "</div>";
  }

  addToc(groups: Group[], refs: Record<number, HTMLElement>) {
    let sheet = this.makeSheet();
    this.addHdr(sheet, "Contents");
    this.addFtr(sheet);
    let toc = document.createElement("div");
    toc.className = "toc";
    sheet.appendChild(toc);
    if (!this.tocLimit) {
      const first = this.root.firstElementChild as HTMLElement;
      const pm = first.getBoundingClientRect().height / 297;
      this.tocLimit = Math.round(263 * pm);
    }
    const startNew = () => {
      sheet = this.makeSheet();
      this.addHdr(sheet, "Contents");
      this.addFtr(sheet);
      toc = document.createElement("div");
      toc.className = "toc";
      sheet.appendChild(toc);
    };
    const headHTML =
      '<div class="toc-head"><h2>Contents</h2><span class="meta">' +
      FORMS.length +
      " Forms · 8 Domains</span></div>";
    toc.innerHTML = headHTML;
    const overflow = () => toc.getBoundingClientRect().height > this.tocLimit;
    for (const g of groups) {
      const grp = document.createElement("div");
      grp.className = "toc-group";
      grp.textContent = g.domain;
      toc.appendChild(grp);
      if (overflow()) {
        toc.removeChild(grp);
        startNew();
        toc.appendChild(grp);
      }
      for (const f of g.items) {
        const row = document.createElement("a");
        row.className = "toc-row";
        row.href = "#form-" + f.idx;
        row.innerHTML =
          '<span class="toc-code">' +
          esc(f.code) +
          '</span><span class="toc-title">' +
          esc(f.title) +
          '</span><span class="toc-pg" data-code="' +
          f.idx +
          '"></span>';
        toc.appendChild(row);
        if (overflow()) {
          toc.removeChild(row);
          startNew();
          const grp2 = document.createElement("div");
          grp2.className = "toc-group";
          grp2.textContent = g.domain + " (cont.)";
          toc.appendChild(grp2);
          toc.appendChild(row);
        }
        const pgSpan = row.querySelector(".toc-pg");
        if (pgSpan) refs[f.idx] = pgSpan as HTMLElement;
      }
    }
  }

  build() {
    this.root.innerHTML = "";
    this.page = 0;

    const indexed: IndexedForm[] = FORMS.map((f, i) => Object.assign({ idx: i }, f));
    const groups: Group[] = DOMAINS.map((domain, di) => ({
      domain,
      items: indexed.filter((f) => f.d === di),
    }));

    this.addCover();
    const refs: Record<number, HTMLElement> = {};
    this.addToc(groups, refs);

    const pageOf: Record<number, number> = {};
    for (const g of groups) {
      for (const f of g.items) pageOf[f.idx] = this.addForm(f);
    }
    for (const idx in refs) refs[idx].textContent = String(pageOf[idx] || "");
  }
}

export default function Workbook() {
  const rootRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const built = useRef(false);

  useEffect(() => {
    if (built.current) return;
    built.current = true;
    const root = rootRef.current;
    if (!root) return;

    let cancelled = false;
    const run = () => {
      if (cancelled) return;
      try {
        new Builder(root).build();
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        root.innerHTML =
          '<div style="padding:40px;font-family:monospace;color:#B5862A">Build error: ' +
          msg +
          "</div>";
        // eslint-disable-next-line no-console
        console.error(e);
      }
      if (loadingRef.current) loadingRef.current.remove();
    };

    // Wait for fonts so the client-side page-fit measurements are accurate.
    const fontsReady = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (fontsReady && fontsReady.ready) {
      fontsReady.ready.then(run).catch(run);
    } else {
      run();
    }

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <nav className="wb-nav">
        <a href="/">← Home</a>
        <a href="/notebook">Reference Notebook ↗</a>
      </nav>
      <div id="loading" ref={loadingRef}>
        <div className="dot"></div>
        <span>Assembling the workbook…</span>
      </div>
      <div id="paged-root" ref={rootRef}></div>
    </>
  );
}
