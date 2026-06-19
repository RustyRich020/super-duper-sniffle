// Verbatim port of the prototype's <style> block from
// "Documentation Reference Notebook.dc.html". Injected via
// <style dangerouslySetInnerHTML> to preserve exact fidelity.
export const NOTEBOOK_CSS = `
  :root{
    --ink:#222226; --muted:#6A6A6F; --faint:#A4A4A0;
    --page:#FBFBF9; --paper:#E7E7E3; --soft:#F1F1EE; --softer:#F7F7F4;
    --rule:#E3E3DE; --line:#D4D4CF;
    /* monochrome neutrals + a muted-canary accent */
    --accent:#B5862A; --accent2:#E6C658; --accentsoft:#E8D6A2;
  }
  *{ box-sizing:border-box; }
  html,body{ margin:0; padding:0; }
  body{ background:var(--paper); color:var(--ink);
    font-family:'IBM Plex Sans',system-ui,sans-serif; -webkit-font-smoothing:antialiased; }

  @page{ size:A4; margin:0; }

  @media screen{
    body{ padding:30px 0 60px; }
    .sheet{ margin:0 auto 20px; box-shadow:0 8px 30px rgba(45,33,12,.16); }
  }
  @media print{
    body{ background:none; padding:0; }
    .sheet{ box-shadow:none !important; margin:0 !important; }
  }

  #loading{ position:fixed; inset:0; display:flex; align-items:center; justify-content:center;
    flex-direction:column; gap:14px; background:var(--paper); z-index:50; color:var(--muted);
    font-family:'IBM Plex Mono'; font-size:11px; letter-spacing:.18em; text-transform:uppercase; }
  #loading .dot{ width:34px; height:34px; border-radius:50%; border:2px solid var(--line);
    border-top-color:var(--accent); animation:spin .9s linear infinite; }
  @keyframes spin{ to{ transform:rotate(360deg); } }

  /* ---------- Sheet ---------- */
  .sheet{ position:relative; width:210mm; height:297mm; background:var(--page);
    overflow:hidden; break-after:page; page-break-after:always; }
  .sheet:last-child{ break-after:auto; page-break-after:auto; }
  .content{ position:absolute; left:18mm; right:18mm; top:17mm; }
  .hdr{ position:absolute; left:18mm; right:18mm; top:9.5mm; display:flex; align-items:flex-end;
    justify-content:space-between; border-bottom:1px solid var(--rule); padding-bottom:2.4mm; }
  .hdr .l{ font-family:'IBM Plex Mono'; font-size:7pt; letter-spacing:.14em; text-transform:uppercase; color:var(--faint); }
  .hdr .r{ font-family:'Spectral'; font-style:italic; font-size:9pt; color:var(--muted); }
  .ftr{ position:absolute; left:18mm; right:18mm; bottom:9mm; display:flex; align-items:center;
    justify-content:space-between; border-top:1px solid var(--rule); padding-top:2.2mm; }
  .ftr .l{ font-family:'IBM Plex Mono'; font-size:6.8pt; letter-spacing:.06em; color:var(--faint); }
  .ftr .pg{ font-family:'IBM Plex Mono'; font-size:8.5pt; color:var(--accent); }

  /* ---------- Cover ---------- */
  .sheet.cover{ background:#1E1E21; color:#ECECE6; }
  .cover-inner{ position:absolute; inset:0; display:flex; flex-direction:column; padding:24mm 23mm 22mm; }
  .cover-inner::before{ content:""; position:absolute; inset:11mm; border:1px solid rgba(230,198,88,.20); pointer-events:none; }
  .cover-top{ display:flex; align-items:flex-start; justify-content:space-between; position:relative; z-index:1; }
  .brand-logo{ height:62px; width:auto; filter:brightness(0) invert(1); opacity:.95; }
  .cover-edition{ font-family:'IBM Plex Mono'; font-size:9.5px; letter-spacing:.26em; text-transform:uppercase;
    color:var(--accent2); text-align:right; line-height:1.8; }
  .cover-edition{ font-family:'IBM Plex Mono'; font-size:9.5px; letter-spacing:.26em; text-transform:uppercase;
    color:var(--accent2); text-align:right; line-height:1.8; }
  .cover-mid{ margin-top:auto; position:relative; z-index:1; }
  .cover-kicker{ font-family:'IBM Plex Mono'; font-size:11px; letter-spacing:.36em; text-transform:uppercase;
    color:var(--accent2); margin-bottom:20px; }
  .cover-title{ font-family:'Spectral'; font-weight:500; font-size:62px; line-height:1.02; letter-spacing:-.5px;
    margin:0; color:#FAF4E8; max-width:15ch; }
  .cover-title em{ font-style:italic; color:var(--accentsoft); }
  .cover-rule{ width:70mm; height:2px; background:var(--accent2); margin:26px 0 22px; }
  .cover-sub{ font-family:'Spectral'; font-size:15.5px; line-height:1.55; color:#CFCFC8; max-width:62ch; margin:0; }
  .cover-foot{ margin-top:34px; display:flex; gap:30px; flex-wrap:wrap;
    font-family:'IBM Plex Mono'; font-size:9.5px; letter-spacing:.18em; text-transform:uppercase; color:#AEAEA6; }
  .cover-foot b{ color:var(--accent2); font-weight:400; }
  .cover-link{ display:inline-flex; align-items:center; gap:7px; margin-top:22px; font-family:'IBM Plex Mono';
    font-size:10px; letter-spacing:.12em; text-transform:uppercase; color:var(--accent2); text-decoration:none;
    border-bottom:1px solid rgba(230,198,88,.45); padding-bottom:3px; }

  /* ---------- Contents ---------- */
  .content.toc{ }
  .toc-head{ display:flex; align-items:baseline; justify-content:space-between;
    border-bottom:2px solid var(--ink); padding-bottom:10px; margin-bottom:4px; }
  .toc-head h2{ font-family:'Spectral'; font-weight:600; font-size:30px; margin:0; letter-spacing:-.4px; }
  .toc-head .meta{ font-family:'IBM Plex Mono'; font-size:9px; letter-spacing:.2em; text-transform:uppercase; color:var(--faint); }
  .toc-group{ font-family:'IBM Plex Mono'; font-size:9px; letter-spacing:.22em; text-transform:uppercase;
    color:var(--faint); margin:20px 0 2px; }
  .toc-row{ display:flex; align-items:baseline; gap:14px; padding:9.5px 2px; border-bottom:1px solid var(--rule);
    text-decoration:none; color:inherit; cursor:pointer; }
  .toc-row:hover .toc-title{ color:var(--accent); }
  .toc-row:hover .toc-num{ text-decoration:underline; }
  .toc-num{ font-family:'IBM Plex Mono'; font-size:11px; color:var(--accent); width:3.2ch; flex:none; }
  .toc-body{ flex:1; min-width:0; }
  .toc-title{ font-family:'Spectral'; font-weight:500; font-size:16px; color:var(--ink); }
  .toc-desc{ font-size:10px; color:var(--muted); margin-top:2px; line-height:1.4; }
  .toc-pg{ font-family:'IBM Plex Mono'; font-size:11px; color:var(--muted); flex:none; margin-left:auto; }

  /* ---------- Chapter dividers ---------- */
  .content.divider{ display:flex; flex-direction:column; justify-content:center; height:264mm; }
  .divider .dlogo{ height:30px; width:auto; align-self:flex-start; flex:none; opacity:.42; margin-bottom:26px; }
  .divider .kicker{ font-family:'IBM Plex Mono'; font-size:11px; letter-spacing:.32em; text-transform:uppercase;
    color:var(--accent); margin-bottom:8px; }
  .divider .dnum{ font-family:'Spectral'; font-weight:300; font-size:150px; line-height:.82; color:var(--accent); letter-spacing:-2px; }
  .divider .dtitle{ font-family:'Spectral'; font-weight:600; font-size:42px; line-height:1.04; letter-spacing:-.6px;
    margin:14px 0 0; max-width:16ch; color:var(--ink); }
  .divider .drule{ width:54mm; height:2px; background:var(--accent); margin:22px 0; }
  .divider .ddesc{ font-family:'Spectral'; font-size:15px; line-height:1.55; color:var(--muted); max-width:54ch; margin:0; }

  /* ---------- Body typography ---------- */
  .chapter-body{ font-size:10pt; line-height:1.55; color:var(--ink); }
  .chapter-body > :first-child{ margin-top:0 !important; }
  .chapter-body h1{ font-family:'Spectral'; font-weight:600; font-size:23pt; line-height:1.1; margin:0 0 .5em; letter-spacing:-.4px; }
  .chapter-body h2{ font-family:'Spectral'; font-weight:600; font-size:16pt; line-height:1.18; margin:1.4em 0 .42em;
    letter-spacing:-.2px; color:var(--ink); border-bottom:1px solid var(--line); padding-bottom:.2em; }
  .chapter-body h3{ font-family:'Spectral'; font-weight:600; font-size:13pt; margin:1.1em 0 .28em; color:var(--ink); }
  .chapter-body h4{ font-family:'IBM Plex Sans'; font-weight:600; font-size:10pt; letter-spacing:.01em; margin:1em 0 .25em; color:var(--accent); }
  .chapter-body p{ margin:.52em 0; }
  .chapter-body strong{ font-weight:600; color:var(--ink); }
  .chapter-body em{ font-style:italic; }
  .chapter-body a{ color:var(--accent); text-decoration:none; border-bottom:1px solid var(--accentsoft); }
  .chapter-body ul, .chapter-body ol{ margin:.5em 0 .65em 1.25em; padding:0; }
  .chapter-body li{ margin:.2em 0; padding-left:.15em; }
  .chapter-body li::marker{ color:var(--accent); }
  .chapter-body blockquote{ margin:.8em 0; padding:.5em 1em; border-left:3px solid var(--accent);
    background:var(--soft); color:var(--muted); font-style:italic; }
  .chapter-body hr{ border:none; border-top:1px solid var(--rule); margin:1.3em 0; }
  .chapter-body table{ border-collapse:collapse; width:100%; font-size:8.6pt; line-height:1.38; margin:.8em 0; }
  .chapter-body th{ background:var(--ink); color:var(--softer); font-weight:600; text-align:left;
    padding:.5em .62em; font-size:8pt; letter-spacing:.02em; vertical-align:top; }
  .chapter-body td{ border-bottom:1px solid var(--rule); padding:.42em .62em; vertical-align:top; }
  .chapter-body tbody tr:nth-child(even) td{ background:var(--softer); }
  .chapter-body code{ font-family:'IBM Plex Mono'; font-size:8.5pt; background:var(--soft);
    padding:.08em .34em; border-radius:3px; color:var(--accent); }
  .chapter-body pre{ background:#2A251D; color:#EFE7D6; padding:.95em 1.15em; border-radius:7px;
    overflow:hidden; font-size:7.6pt; line-height:1.5; margin:.85em 0; white-space:pre; }
  .chapter-body pre code{ background:none; color:inherit; padding:0; font-size:inherit; }

  /* ---------- Nav (Next.js cross-links, on-theme) ---------- */
  .nb-nav{ position:fixed; top:14px; right:16px; z-index:60; display:flex; gap:10px;
    font-family:'IBM Plex Mono'; font-size:9.5px; letter-spacing:.12em; text-transform:uppercase; }
  .nb-nav a{ color:var(--muted); text-decoration:none; background:var(--page);
    border:1px solid var(--line); border-radius:4px; padding:5px 10px; box-shadow:0 2px 8px rgba(45,33,12,.10); }
  .nb-nav a:hover{ color:var(--accent); border-color:var(--accent); }
  @media print{ .nb-nav{ display:none !important; } }
`;
