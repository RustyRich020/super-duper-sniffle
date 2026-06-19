// Prototype <style> copied VERBATIM from
// "Theragen Governance Reports.dc.html" (the QQ-Studios theme). Injected via
// <style dangerouslySetInnerHTML> so the route ships its complete CSS itself.
// Fonts are loaded globally in app/layout.tsx — the font <link> from the
// prototype helmet is intentionally omitted here.
export const GOVERNANCE_CSS = `
  :root{
    --ink:#222226; --muted:#6A6A6F; --faint:#9C9C98;
    --page:#FBFBF9; --paper:#E7E7E3; --soft:#F1F1EE; --softer:#F7F7F4;
    --rule:#E3E3DE; --line:#D4D4CF;
    --accent:#B5862A; --accent2:#E6C658; --accentsoft:#E8D6A2;
    --green:#4E7C59; --amber:#C2902F; --red:#B0492E; --blue:#3F6F86;
  }
  *{ box-sizing:border-box; }
  html,body{ margin:0; padding:0; }
  body{ background:var(--paper); color:var(--ink); font-family:'IBM Plex Sans',system-ui,sans-serif; -webkit-font-smoothing:antialiased; }
  @page{ size:A4; margin:0; }
  @media screen{ body{ padding:30px 0 60px; } .sheet{ margin:0 auto 20px; box-shadow:0 8px 30px rgba(45,33,12,.16); } }
  @media print{ body{ background:none; padding:0; } .sheet{ box-shadow:none !important; margin:0 !important; } }
  #pdfbtn{ position:fixed; right:22px; bottom:22px; z-index:60; font-family:'IBM Plex Sans'; font-weight:600; font-size:13px;
    padding:11px 18px; border-radius:9px; border:1px solid var(--ink); background:var(--ink); color:var(--page); cursor:pointer; box-shadow:0 8px 24px rgba(0,0,0,.2); }
  #pdfbtn:hover{ background:var(--accent); border-color:var(--accent); }
  @media print{ #pdfbtn{ display:none !important; } }

  #tools{ position:fixed; right:22px; bottom:22px; z-index:60; display:flex; gap:9px; align-items:center;
    background:#1E1E21; color:var(--page); padding:8px 11px; border-radius:12px; box-shadow:0 10px 28px rgba(0,0,0,.28); }
  #tools .lab{ font-family:'IBM Plex Mono'; font-size:8px; letter-spacing:.14em; text-transform:uppercase; color:var(--accent2); }
  #tools select{ font-family:'IBM Plex Sans'; font-size:12px; padding:6px 9px; border-radius:7px; border:1px solid #44444B; background:#2A2A2F; color:var(--page); cursor:pointer; }
  #tools select:hover{ border-color:var(--accent2); }
  #tools button{ font-family:'IBM Plex Sans'; font-weight:600; font-size:12px; padding:7px 14px; border-radius:7px; border:1px solid var(--accent); background:var(--accent); color:#1E1E21; cursor:pointer; }
  #tools button:hover{ background:var(--accent2); border-color:var(--accent2); }
  @media print{ #tools{ display:none !important; } }

  .slicer{ display:flex; flex-wrap:wrap; align-items:center; gap:6px; margin:12px 0 2px; }
  .slicer .sl-l{ font-family:'IBM Plex Mono'; font-size:8px; letter-spacing:.14em; text-transform:uppercase; color:var(--faint); margin-right:4px; }
  .slicer .sl{ font-family:'IBM Plex Sans'; font-weight:500; font-size:9.5px; padding:4px 11px; border-radius:20px; border:1px solid var(--line); background:var(--softer); color:var(--muted); cursor:pointer; white-space:nowrap; }
  .slicer .sl:hover{ border-color:var(--accent); color:var(--accent); }
  .slicer .sl.on{ background:var(--ink); border-color:var(--ink); color:var(--page); }
  @media print{ .slicer .sl{ cursor:default; } }

  #gov-loading{ position:fixed; inset:0; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:14px;
    background:var(--paper); z-index:50; color:var(--muted); font-family:'IBM Plex Mono'; font-size:11px; letter-spacing:.18em; text-transform:uppercase; }
  #gov-loading .sp{ width:34px; height:34px; border-radius:50%; border:2px solid var(--line); border-top-color:var(--accent); animation:spin .9s linear infinite; }
  @keyframes spin{ to{ transform:rotate(360deg); } }

  .sheet{ position:relative; width:210mm; height:297mm; background:var(--page); overflow:hidden; break-after:page; page-break-after:always; }
  .sheet:last-child{ break-after:auto; page-break-after:auto; }
  .hdr{ position:absolute; left:16mm; right:16mm; top:10mm; display:flex; align-items:flex-end; justify-content:space-between; border-bottom:1px solid var(--rule); padding-bottom:2.4mm; }
  .hdr .l{ font-family:'IBM Plex Mono'; font-size:7pt; letter-spacing:.1em; text-transform:uppercase; color:var(--faint); white-space:nowrap; }
  .hdr .r{ font-family:'Spectral'; font-style:italic; font-size:9pt; color:var(--muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; padding-left:8mm; }
  .ftr{ position:absolute; left:16mm; right:16mm; bottom:9mm; display:flex; align-items:center; justify-content:space-between; border-top:1px solid var(--rule); padding-top:2.2mm; }
  .ftr .l{ font-family:'IBM Plex Mono'; font-size:6.8pt; letter-spacing:.05em; color:var(--faint); }
  .ftr .pg{ font-family:'IBM Plex Mono'; font-size:8.5pt; color:var(--accent); }
  .fmain{ position:absolute; left:16mm; right:16mm; top:17mm; bottom:13.5mm; overflow:hidden; }

  /* ---- Cover ---- */
  .sheet.cover{ background:#1E1E21; color:#ECECE6; }
  .cv-inner{ position:absolute; inset:0; display:flex; flex-direction:column; padding:24mm 22mm 20mm; }
  .cv-inner::before{ content:""; position:absolute; inset:11mm; border:1px solid rgba(230,198,88,.20); pointer-events:none; }
  .cv-top{ display:flex; align-items:flex-start; justify-content:space-between; position:relative; z-index:1; }
  .cv-logo{ height:52px; filter:brightness(0) invert(1); opacity:.96; }
  .cv-ed{ font-family:'IBM Plex Mono'; font-size:9.5px; letter-spacing:.24em; text-transform:uppercase; color:var(--accent2); text-align:right; line-height:1.85; }
  .cv-mid{ margin-top:auto; position:relative; z-index:1; }
  .cv-kicker{ font-family:'IBM Plex Mono'; font-size:11px; letter-spacing:.34em; text-transform:uppercase; color:var(--accent2); margin-bottom:18px; }
  .cv-title{ font-family:'Spectral'; font-weight:500; font-size:54px; line-height:1.04; letter-spacing:-.5px; margin:0; color:#FAF4E8; max-width:16ch; }
  .cv-title em{ font-style:italic; color:var(--accentsoft); }
  .cv-rule{ width:64mm; height:2px; background:var(--accent); margin:24px 0 20px; }
  .cv-sub{ font-family:'Spectral'; font-size:15px; line-height:1.55; color:#CFCFC8; max-width:62ch; margin:0; }
  .cv-list{ margin:26px 0 0; padding:0; list-style:none; display:flex; flex-direction:column; gap:8px; }
  .cv-list li{ display:flex; gap:12px; align-items:baseline; font-size:12.5px; color:#C7C7BF; }
  .cv-list li .n{ font-family:'IBM Plex Mono'; font-size:10px; color:var(--accent2); width:2.4ch; flex:none; }
  .cv-list li b{ color:#EDE7D6; font-weight:500; }
  .cv-foot{ margin-top:26px; display:flex; align-items:center; justify-content:space-between; position:relative; z-index:1;
    font-family:'IBM Plex Mono'; font-size:9px; letter-spacing:.14em; text-transform:uppercase; color:#7E7E84; }

  /* ---- Contents ---- */
  .toc-head{ display:flex; align-items:baseline; justify-content:space-between; border-bottom:2px solid var(--ink); padding-bottom:9px; margin-bottom:4px; }
  .toc-head h2{ font-family:'Spectral'; font-weight:600; font-size:27px; margin:0; letter-spacing:-.4px; }
  .toc-head .meta{ font-family:'IBM Plex Mono'; font-size:9px; letter-spacing:.18em; text-transform:uppercase; color:var(--faint); }
  .toc-row{ display:flex; align-items:baseline; gap:14px; text-decoration:none; color:var(--ink); padding:12px 2px; border-bottom:1px solid var(--rule); cursor:pointer; }
  .toc-row:hover .toc-title{ color:var(--accent); }
  .toc-n{ font-family:'IBM Plex Mono'; font-size:11px; color:var(--accent); width:3ch; flex:none; }
  .toc-b{ flex:1; min-width:0; }
  .toc-title{ font-family:'Spectral'; font-weight:500; font-size:16px; }
  .toc-desc{ font-size:10.5px; color:var(--muted); margin-top:2px; }
  .toc-pg{ font-family:'IBM Plex Mono'; font-size:11px; color:var(--muted); margin-left:auto; flex:none; }

  /* ---- Section band ---- */
  .band{ border-top:2px solid var(--ink); border-bottom:1px solid var(--rule); padding:0 0 11px; margin-bottom:13px; }
  .band .kick{ font-family:'IBM Plex Mono'; font-size:9px; letter-spacing:.26em; text-transform:uppercase; color:var(--accent); margin-top:1px; }
  .band .title{ font-family:'Spectral'; font-weight:600; font-size:24px; line-height:1.1; letter-spacing:-.3px; margin:5px 0 0; color:var(--ink); }
  .band .sub{ font-family:'Spectral'; font-style:italic; font-size:12px; color:var(--muted); margin:4px 0 0; }

  h4.sh{ font-family:'IBM Plex Sans'; font-weight:600; font-size:10px; letter-spacing:.04em; text-transform:uppercase; color:var(--accent);
    margin:13px 0 5px; padding-bottom:3px; border-bottom:1px solid var(--line); }

  .kvgrid{ display:grid; gap:0; border:1px solid var(--line); border-radius:3px; overflow:hidden; margin-bottom:4px; }
  .kv{ padding:7px 10px; border-right:1px solid var(--rule); border-bottom:1px solid var(--rule); }
  .kv .k{ font-family:'IBM Plex Mono'; font-size:7.3px; letter-spacing:.1em; text-transform:uppercase; color:var(--faint); }
  .kv .v{ font-family:'Spectral'; font-size:12.5px; color:var(--ink); margin-top:3px; line-height:1.25; }

  .twocol{ display:grid; grid-template-columns:1fr 1fr; gap:15px; }
  .pblock .pl{ font-family:'IBM Plex Mono'; font-size:8px; letter-spacing:.1em; text-transform:uppercase; color:var(--accent); margin-bottom:5px; }
  .pblock p{ margin:0; font-size:11px; line-height:1.52; color:var(--ink); }

  .mainstat{ display:flex; align-items:center; gap:12px; border:1px solid var(--line); border-left:4px solid var(--amber); border-radius:3px; padding:10px 14px; }
  .mainstat .lab{ font-family:'IBM Plex Mono'; font-size:8.5px; letter-spacing:.16em; text-transform:uppercase; color:var(--faint); }
  .mainstat .val{ font-family:'Spectral'; font-weight:600; font-size:17px; }

  .gauge-track{ position:relative; height:9px; border-radius:5px; background:linear-gradient(90deg,#5C8C5E 0%,#C2902F 50%,#B0492E 100%); margin:9px 0 5px; opacity:.85; }
  .gauge-mark{ position:absolute; top:-4px; width:3px; height:17px; background:var(--ink); border-radius:2px; transform:translateX(-50%); }
  .gauge-scale{ display:flex; justify-content:space-between; font-family:'IBM Plex Mono'; font-size:8px; color:var(--faint); }
  .gscore{ font-family:'Spectral'; font-weight:600; font-size:19px; }
  .gscore small{ font-family:'IBM Plex Sans'; font-weight:400; font-size:10.5px; color:var(--muted); }

  .hc{ display:grid; grid-template-columns:repeat(3,1fr); gap:6px; }
  .hc .hci{ display:flex; align-items:center; gap:8px; border:1px solid var(--rule); border-radius:3px; padding:6px 9px; background:var(--softer); }
  .hc .hci .hn{ font-size:10.5px; color:var(--ink); flex:1; }
  .hc .hci .hcv{ font-family:'IBM Plex Mono'; font-size:8.5px; }

  .dot{ width:9px; height:9px; border-radius:50%; flex:none; display:inline-block; }
  .dot.green{ background:var(--green); } .dot.amber{ background:var(--amber); } .dot.red{ background:var(--red); } .dot.blue{ background:var(--blue); } .dot.ink{ background:var(--muted); }
  .chip{ display:inline-flex; align-items:center; gap:5px; font-family:'IBM Plex Sans'; font-weight:500; font-size:8.3px; letter-spacing:.03em;
    padding:2px 7px; border-radius:20px; border:1px solid; white-space:nowrap; }
  .chip.green{ color:var(--green); border-color:#BFD3C2; background:#EEF4EF; }
  .chip.amber{ color:#9A6B1F; border-color:var(--accentsoft); background:#FAF3E2; }
  .chip.red{ color:var(--red); border-color:#E3C3B9; background:#F7ECE8; }
  .chip.blue{ color:var(--blue); border-color:#C3D4DC; background:#ECF1F4; }
  .chip.ink{ color:var(--muted); border-color:var(--line); background:var(--soft); }
  .num{ font-family:'IBM Plex Mono'; font-size:9px; font-weight:500; color:var(--ink); background:var(--soft); border:1px solid var(--line); border-radius:4px; padding:1px 6px; }
  .mono{ font-family:'IBM Plex Mono'; font-size:8pt; color:var(--muted); }

  table.dt{ width:100%; border-collapse:collapse; margin:2px 0 4px; table-layout:fixed; }
  table.dt th{ background:var(--ink); color:var(--softer); font-family:'IBM Plex Sans'; font-weight:600; text-align:left;
    font-size:7.4pt; letter-spacing:.02em; padding:5px 7px; vertical-align:bottom; }
  table.dt td{ border-bottom:1px solid var(--rule); padding:5px 7px; font-size:8.2pt; line-height:1.38; vertical-align:top; color:var(--ink); word-wrap:break-word; overflow-wrap:break-word; }
  table.dt tbody tr:nth-child(even) td{ background:var(--softer); }
  table.dt td b{ font-weight:600; }
  .empty{ font-family:'Spectral'; font-style:italic; font-size:11px; color:var(--muted); padding:9px 12px; background:var(--softer); border:1px dashed var(--line); border-radius:3px; }

  .legend{ margin-top:13px; border-top:1px solid var(--line); padding-top:8px; display:flex; flex-wrap:wrap; gap:5px 14px;
    font-family:'IBM Plex Mono'; font-size:8px; letter-spacing:.04em; color:var(--muted); }
  .legend b{ color:var(--ink); font-weight:500; }
  .note{ margin-top:9px; font-size:9px; line-height:1.5; color:var(--muted); font-style:italic; }
  .srcb{ font-family:'IBM Plex Mono'; font-size:7.5px; letter-spacing:.08em; text-transform:uppercase; padding:2px 8px; border-radius:20px; border:1px solid; flex:none; white-space:nowrap; }
  .srcb.live{ color:var(--green); border-color:#BFD3C2; background:#EEF4EF; }
  .srcb.sample{ color:var(--muted); border-color:var(--line); background:var(--soft); }

  /* home link — small on-theme back link (screen only) */
  #homelink{ position:fixed; left:22px; bottom:22px; z-index:60; font-family:'IBM Plex Mono'; font-size:10px; letter-spacing:.14em;
    text-transform:uppercase; text-decoration:none; color:var(--muted); background:var(--softer); border:1px solid var(--line);
    padding:8px 14px; border-radius:9px; box-shadow:0 4px 14px rgba(0,0,0,.08); }
  #homelink:hover{ color:var(--accent); border-color:var(--accent); }
  @media print{ #homelink{ display:none !important; } }
`;
