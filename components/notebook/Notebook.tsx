"use client";

import { useEffect, useRef } from "react";
import { marked } from "marked";
import { NOTEBOOK_CSS } from "./styles";
import { CHAPTERS, type Chapter } from "./chapters";

const LOGO = "/assets/qq-logo.png";

/**
 * Faithful port of the prototype's DCLogic paginator. The original ran an
 * imperative build() against the live DOM (#paged-root) on mount. We keep that
 * approach exactly, running it once against a container ref — it must run
 * client-side because it measures getBoundingClientRect().
 */
class Paginator {
  root: HTMLElement;
  page = 0;
  limit = 0;
  cur: HTMLElement | null = null;
  tocRefs: Record<string, HTMLElement> = {};

  constructor(root: HTMLElement) {
    this.root = root;
  }

  stripLead(md: string): string {
    const lines = md.split(/\r?\n/);
    let i = 0;
    while (i < lines.length && lines[i].trim() === "") i++;
    if (i < lines.length && /^#\s+/.test(lines[i])) {
      lines.splice(i, 1);
      while (i < lines.length && (lines[i].trim() === "" || lines[i].trim() === "---")) lines.splice(i, 1);
    }
    return lines.join("\n");
  }

  esc(s: string): string {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // ---- sheet factory ----
  makeSheet(cls?: string): HTMLElement {
    const s = document.createElement("div");
    s.className = "sheet" + (cls ? " " + cls : "");
    this.root.appendChild(s);
    this.page++;
    return s;
  }

  addHdrFtr(sheet: HTMLElement, chapterTitle: string | null) {
    if (chapterTitle != null) {
      const h = document.createElement("div");
      h.className = "hdr";
      h.innerHTML =
        '<span class="l">Documentation Reference Book</span><span class="r">' +
        this.esc(chapterTitle) +
        "</span>";
      sheet.appendChild(h);
    }
    const f = document.createElement("div");
    f.className = "ftr";
    f.innerHTML =
      '<span class="l">QQ-Studios — Development Documentation</span><span class="pg">' +
      this.page +
      "</span>";
    sheet.appendChild(f);
  }

  newContent(sheet: HTMLElement, extra?: string): HTMLElement {
    const c = document.createElement("div");
    c.className = "content" + (extra ? " " + extra : "");
    sheet.appendChild(c);
    return c;
  }

  newBodyPage(c: Chapter): HTMLElement {
    const sheet = this.makeSheet();
    this.addHdrFtr(sheet, c.title);
    this.cur = this.newContent(sheet, "chapter-body");
    return this.cur;
  }

  fits(content: HTMLElement): boolean {
    return content.getBoundingClientRect().height <= this.limit;
  }

  place(b: HTMLElement, c: Chapter) {
    let content = this.cur as HTMLElement;
    content.appendChild(b);
    if (!this.fits(content) && content.children.length > 1) {
      content.removeChild(b);
      content = this.newBodyPage(c);
      content.appendChild(b);
    }
    if (!this.fits(content)) {
      content.removeChild(b);
      this.splitBlock(b, c);
    }
  }

  freshOrNew(c: Chapter): HTMLElement {
    return this.cur && this.cur.children.length === 0 ? this.cur : this.newBodyPage(c);
  }

  splitBlock(b: HTMLElement, c: Chapter) {
    const tag = b.tagName;
    if (tag === "TABLE") return this.splitTable(b as HTMLTableElement, c);
    if (tag === "PRE") return this.splitPre(b, c);
    if (tag === "UL" || tag === "OL") return this.splitList(b, c);
    const content = this.freshOrNew(c);
    content.appendChild(b);
    this.cur = content;
  }

  splitTable(table: HTMLTableElement, c: Chapter) {
    const thead = table.querySelector("thead");
    const rows = ([] as Element[]).slice.call(table.querySelectorAll("tbody > tr"));
    let content = this.freshOrNew(c);
    const mk = () => {
      const t = table.cloneNode(false) as HTMLTableElement;
      if (thead) t.appendChild(thead.cloneNode(true));
      const tb = document.createElement("tbody");
      t.appendChild(tb);
      content.appendChild(t);
      return tb;
    };
    let tb = mk();
    for (const r of rows) {
      tb.appendChild(r);
      if (!this.fits(content) && tb.children.length > 1) {
        tb.removeChild(r);
        content = this.newBodyPage(c);
        tb = mk();
        tb.appendChild(r);
      }
    }
    this.cur = content;
  }

  splitPre(pre: HTMLElement, c: Chapter) {
    const lines = (pre.textContent || "").split("\n");
    let content = this.freshOrNew(c);
    const mk = () => {
      const p = document.createElement("pre");
      content.appendChild(p);
      return p;
    };
    let p = mk();
    for (const ln of lines) {
      const prev = p.textContent || "";
      p.textContent = prev + (prev ? "\n" : "") + ln;
      if (!this.fits(content) && prev !== "") {
        p.textContent = prev;
        content = this.newBodyPage(c);
        p = mk();
        p.textContent = ln;
      }
    }
    this.cur = content;
  }

  splitList(list: HTMLElement, c: Chapter) {
    const items = ([] as Element[]).slice.call(list.children);
    let content = this.freshOrNew(c);
    const mk = () => {
      const l = list.cloneNode(false) as HTMLElement;
      content.appendChild(l);
      return l;
    };
    let l = mk();
    for (const li of items) {
      l.appendChild(li);
      if (!this.fits(content) && l.children.length > 1) {
        l.removeChild(li);
        content = this.newBodyPage(c);
        l = mk();
        l.appendChild(li);
      }
    }
    this.cur = content;
  }

  addCover() {
    const s = this.makeSheet("cover");
    s.innerHTML =
      '<div class="cover-inner">' +
      '<div class="cover-top">' +
      '<img class="brand-logo" src="' +
      LOGO +
      '" alt="QQ Studios">' +
      '<div class="cover-edition">Field Guide<br>First Edition<br>2026</div>' +
      "</div>" +
      '<div class="cover-mid">' +
      '<div class="cover-kicker">Development Documentation</div>' +
      '<h1 class="cover-title">The Documentation <em>Reference</em> Book</h1>' +
      '<div class="cover-rule"></div>' +
      '<p class="cover-sub">A complete field guide to software development documentation — every major document type, organized by domain and by lifecycle phase, with delivery-model playbooks, prescriptive stacks, ready-to-use templates, and the practices that keep it all from rotting.</p>' +
      '<div class="cover-foot">' +
      "<span><b>8</b> Chapters</span><span><b>~70</b> Document Types</span>" +
      "<span><b>2</b> Appendices</span><span><b>A–Z</b> Glossary &amp; Index</span>" +
      "</div>" +
      '<a class="cover-link" href="/workbook">Companion → The Forms Workbook ↗</a>' +
      "</div>" +
      "</div>";
  }

  addToc(CH: Chapter[]) {
    const sheet = this.makeSheet();
    this.addHdrFtr(sheet, "Contents");
    const content = this.newContent(sheet, "toc");
    let rows = '<div class="toc-head"><h2>Contents</h2><span class="meta">QQ-Studios · 2026</span></div>';
    let lastKind = "";
    for (const c of CH) {
      if (c.kind !== lastKind) {
        rows += '<div class="toc-group">' + (c.kind === "Appendix" ? "Appendices" : "Chapters") + "</div>";
        lastKind = c.kind;
      }
      rows +=
        '<a class="toc-row" href="#' +
        c.id +
        '">' +
        '<span class="toc-num">' +
        c.num +
        "</span>" +
        '<span class="toc-body"><span class="toc-title">' +
        this.esc(c.title) +
        "</span>" +
        '<span class="toc-desc">' +
        this.esc(c.desc) +
        "</span></span>" +
        '<span class="toc-pg" data-id="' +
        c.id +
        '"></span>' +
        "</a>";
    }
    content.innerHTML = rows;
    content.querySelectorAll(".toc-pg").forEach((s) => {
      this.tocRefs[s.getAttribute("data-id") as string] = s as HTMLElement;
    });
  }

  addDivider(c: Chapter): number {
    const sheet = this.makeSheet();
    sheet.id = c.id;
    this.addHdrFtr(sheet, null);
    const content = this.newContent(sheet, "divider");
    content.innerHTML =
      '<img class="dlogo" src="' +
      LOGO +
      '" alt="QQ Studios">' +
      '<div class="kicker">' +
      c.kind +
      " " +
      c.num +
      "</div>" +
      '<div class="dnum">' +
      c.num +
      "</div>" +
      '<h1 class="dtitle">' +
      this.esc(c.title) +
      "</h1>" +
      '<div class="drule"></div>' +
      '<p class="ddesc">' +
      this.esc(c.desc) +
      "</p>";
    return this.page;
  }

  async build() {
    this.root.innerHTML = "";
    this.page = 0;
    this.limit = 0;
    this.tocRefs = {};

    const CH = CHAPTERS;

    this.addCover();
    const pm = (this.root.firstElementChild as HTMLElement).getBoundingClientRect().height / 297;
    this.limit = Math.round(264 * pm) - 8;
    this.addToc(CH);

    const startMap: Record<string, number> = {};
    for (const c of CH) {
      let body = c.md;
      if (!body) {
        try {
          body = await (await fetch(c.file as string)).text();
        } catch (e) {
          body = "*Could not load " + c.file + "*";
        }
      }
      body = this.stripLead(body);
      const tmp = document.createElement("div");
      tmp.innerHTML = marked.parse(body, { gfm: true }) as string;

      startMap[c.id] = this.addDivider(c);
      this.newBodyPage(c);
      const blocks = ([] as Element[]).slice.call(tmp.children);
      for (const b of blocks) this.place(b as HTMLElement, c);
    }

    for (const id in this.tocRefs) {
      this.tocRefs[id].textContent = String(startMap[id] || "");
    }
  }
}

export default function Notebook() {
  const rootRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    const root = rootRef.current;
    if (!root) return;

    const run = async () => {
      try {
        // marked is bundled; just wait for fonts so measurements are accurate.
        try {
          await (document as Document).fonts.ready;
        } catch (e) {}
        const p = new Paginator(root);
        await p.build();
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        root.innerHTML =
          '<div style="padding:40px;font-family:monospace;color:#A8482A">Build error: ' + msg + "</div>";
      } finally {
        const ld = document.getElementById("loading");
        if (ld) ld.remove();
      }
    };
    run();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: NOTEBOOK_CSS }} />
      <nav className="nb-nav">
        <a href="/">← Home</a>
        <a href="/workbook">Forms Workbook ↗</a>
      </nav>
      <div id="loading">
        <div className="dot" />
        <span>Binding the notebook…</span>
      </div>
      <div id="paged-root" ref={rootRef} />
    </>
  );
}
