// Verbatim copy of the prototype's <style> block ("Interactive Forms.dc.html").
// Injected globally via <style dangerouslySetInnerHTML> so the ported global
// selectors / class names match the prototype exactly. Do not "tidy" this.
export const FORMS_CSS = `
  :root{
    --ink:#222226; --muted:#6A6A6F; --faint:#9C9C98;
    --page:#FBFBF9; --paper:#ECECE8; --soft:#F2F2EF; --softer:#F7F7F4;
    --rule:#E3E3DE; --line:#D4D4CF; --field:#FFFFFF;
    --accent:#B5862A; --accent2:#E6C658; --accentsoft:#F0E4BC; --accentbg:#FAF4E2;
    --sidebar:#1E1E21;
  }
  *{ box-sizing:border-box; }
  html,body{ margin:0; padding:0; height:100%; }
  body{ background:var(--paper); color:var(--ink); font-family:'IBM Plex Sans',system-ui,sans-serif; -webkit-font-smoothing:antialiased; }
  a{ color:inherit; }

  .app{ display:grid; grid-template-columns:312px 1fr; min-height:100vh; }

  /* ---- Sidebar / index ---- */
  .side{ background:var(--sidebar); color:#E7E7E1; position:sticky; top:0; align-self:start; height:100vh; overflow-y:auto; padding:24px 0 40px; }
  .side-brand{ display:flex; align-items:center; gap:11px; padding:4px 24px 20px; }
  .side-brand img{ height:34px; filter:brightness(0) invert(1); opacity:.95; }
  .side-brand .bt{ font-family:'IBM Plex Mono'; font-size:10px; letter-spacing:.26em; text-transform:uppercase; color:#CFCFC6; }
  .side-h{ font-family:'IBM Plex Mono'; font-size:9px; letter-spacing:.22em; text-transform:uppercase; color:#7E7E84; padding:18px 24px 6px; }
  .side a.item{ display:flex; gap:10px; align-items:baseline; padding:8px 24px; text-decoration:none; color:#CACAC4; border-left:2px solid transparent; }
  .side a.item:hover{ background:rgba(255,255,255,.04); color:#fff; }
  .side a.item.active{ border-left-color:var(--accent2); background:rgba(230,198,88,.08); color:#fff; }
  .side a.item .ic{ font-family:'IBM Plex Mono'; font-size:10px; color:var(--accent2); width:5.6ch; flex:none; }
  .side a.item .tt{ font-family:'Spectral'; font-size:13.5px; line-height:1.25; }
  .side a.item.disabled{ color:#5C5C61; pointer-events:none; }
  .side-note{ margin:16px 24px 0; padding:12px 14px; background:rgba(255,255,255,.04); border-radius:8px;
    font-size:11px; line-height:1.5; color:#9A9A9F; }
  .side-note b{ color:var(--accent2); font-weight:500; }

  /* ---- Main ---- */
  .main{ min-width:0; }
  .topbar{ position:sticky; top:56px; z-index:20; background:rgba(251,251,249,.92); backdrop-filter:blur(8px);
    border-bottom:1px solid var(--rule); display:flex; align-items:center; justify-content:space-between; padding:13px 36px; }
  .topbar .crumbs{ font-family:'IBM Plex Mono'; font-size:11px; letter-spacing:.04em; color:var(--muted); }
  .topbar .crumbs b{ color:var(--ink); font-weight:500; }
  .acts{ display:flex; align-items:center; gap:8px; }
  .btn{ font-family:'IBM Plex Sans'; font-size:12px; font-weight:500; padding:7px 13px; border-radius:7px;
    border:1px solid var(--line); background:var(--field); color:var(--ink); cursor:pointer; display:inline-flex; align-items:center; gap:6px; }
  .btn:hover{ border-color:var(--accent); color:var(--accent); }
  .btn.primary{ background:var(--ink); color:var(--page); border-color:var(--ink); }
  .btn.primary:hover{ background:var(--accent); border-color:var(--accent); color:#fff; }
  .saved{ font-family:'IBM Plex Mono'; font-size:11px; color:var(--faint); display:flex; align-items:center; gap:6px; }
  .saved .dotg{ width:7px; height:7px; border-radius:50%; background:#5FA463; }

  .wrap{ max-width:880px; margin:0 auto; padding:40px 36px 90px; }
  .fhead{ border-bottom:2px solid var(--ink); padding-bottom:20px; margin-bottom:8px; }
  .fkick{ display:flex; align-items:center; gap:10px; font-family:'IBM Plex Mono'; font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--accent); }
  .fkick .dom{ color:var(--faint); }
  .ftitle{ font-family:'Spectral'; font-weight:600; font-size:38px; line-height:1.05; letter-spacing:-.6px; margin:12px 0 8px; }
  .fpurpose{ font-family:'Spectral'; font-style:italic; font-size:16px; line-height:1.5; color:var(--muted); margin:0; max-width:60ch; }

  .meta{ display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin:26px 0 34px; }
  .meta .mf{ display:flex; flex-direction:column; gap:5px; }
  .meta label{ font-family:'IBM Plex Mono'; font-size:9.5px; letter-spacing:.1em; text-transform:uppercase; color:var(--faint); }
  .meta input, .meta select{ font-family:'IBM Plex Sans'; font-size:13px; color:var(--ink); background:var(--field);
    border:1px solid var(--line); border-radius:6px; padding:8px 10px; width:100%; }
  .meta input:focus, .meta select:focus, .sec textarea:focus, .sec input:focus{ outline:none; border-color:var(--accent); box-shadow:0 0 0 3px var(--accentbg); }

  .sec{ border:1px solid var(--rule); border-radius:12px; background:var(--page); padding:20px 22px; margin-bottom:18px; }
  .sec-top{ display:flex; align-items:baseline; justify-content:space-between; gap:14px; }
  .sec-label{ font-family:'IBM Plex Sans'; font-weight:600; font-size:15px; color:var(--ink); }
  .sec-req{ font-family:'IBM Plex Mono'; font-size:9px; letter-spacing:.1em; text-transform:uppercase; color:var(--accent); }
  .sec-guide{ font-size:12.5px; line-height:1.5; color:var(--muted); margin:7px 0 0; }
  .sec-meta{ display:flex; flex-wrap:wrap; gap:18px; margin:10px 0 14px; }
  .sec-eg, .sec-why{ font-size:11.5px; line-height:1.45; flex:1; min-width:220px; }
  .sec-eg{ color:var(--ink); }
  .sec-eg .k, .sec-why .k{ font-family:'IBM Plex Mono'; font-size:8.5px; letter-spacing:.12em; text-transform:uppercase; display:block; margin-bottom:2px; }
  .sec-eg .k{ color:var(--accent); } .sec-why .k{ color:var(--faint); }
  .sec-eg em{ font-style:italic; color:var(--muted); }
  .sec-why{ color:var(--muted); border-left:2px solid var(--accentsoft); padding-left:12px; }

  .sec textarea{ width:100%; font-family:'IBM Plex Sans'; font-size:13.5px; line-height:1.6; color:var(--ink);
    background:var(--field); border:1px solid var(--line); border-radius:8px; padding:11px 13px; resize:none; overflow:hidden; min-height:64px; }
  .sec > input.line{ width:100%; font-family:'IBM Plex Sans'; font-size:13.5px; color:var(--ink); background:var(--field);
    border:1px solid var(--line); border-radius:8px; padding:10px 13px; }

  table.grid{ width:100%; border-collapse:collapse; margin-top:4px; }
  table.grid th{ text-align:left; font-family:'IBM Plex Mono'; font-size:9.5px; letter-spacing:.06em; text-transform:uppercase;
    color:var(--muted); padding:6px 8px; border-bottom:1.5px solid var(--ink); }
  table.grid td{ padding:0; border-bottom:1px solid var(--rule); border-right:1px solid var(--rule); }
  table.grid td:last-child{ border-right:none; }
  table.grid input{ width:100%; border:none; background:transparent; font-family:'IBM Plex Sans'; font-size:13px; color:var(--ink); padding:9px 8px; }
  table.grid input:focus{ outline:none; background:var(--accentbg); }
  .addrow{ margin-top:10px; font-size:12px; font-weight:500; color:var(--accent); background:none; border:1px dashed var(--line);
    border-radius:7px; padding:7px 12px; cursor:pointer; }
  .addrow:hover{ border-color:var(--accent); }

  .checks{ display:flex; flex-direction:column; gap:10px; margin-top:4px; }
  .chk{ display:flex; align-items:center; gap:11px; font-size:13.5px; color:var(--ink); cursor:pointer; }
  .chk input{ width:18px; height:18px; accent-color:var(--accent); }

  /* ---- Modal ---- */
  .modal{ position:fixed; inset:0; background:rgba(30,28,24,.5); display:none; align-items:center; justify-content:center; z-index:50; padding:30px; }
  .modal.open{ display:flex; }
  .sheetm{ background:var(--page); border-radius:14px; width:min(880px,100%); max-height:88vh; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 30px 80px rgba(0,0,0,.3); }
  .sheetm header{ display:flex; align-items:center; justify-content:space-between; padding:18px 22px; border-bottom:1px solid var(--rule); }
  .sheetm header h3{ font-family:'Spectral'; font-weight:600; font-size:20px; margin:0; }
  .tabs{ display:flex; gap:6px; padding:12px 22px 0; }
  .tab{ font-family:'IBM Plex Mono'; font-size:11px; letter-spacing:.06em; text-transform:uppercase; padding:8px 13px; border-radius:7px 7px 0 0;
    border:1px solid transparent; border-bottom:none; cursor:pointer; color:var(--muted); }
  .tab.active{ color:var(--ink); background:var(--softer); border-color:var(--rule); }
  .codewrap{ margin:0 22px; flex:1; overflow:auto; border:1px solid var(--rule); border-radius:0 8px 8px 8px; }
  .codewrap pre{ margin:0; padding:16px 18px; font-family:'IBM Plex Mono'; font-size:11.5px; line-height:1.6; color:var(--ink); white-space:pre; background:var(--softer); }
  .modal-foot{ display:flex; justify-content:space-between; align-items:center; gap:10px; padding:16px 22px; }
  .modal-foot .hint{ font-size:11.5px; color:var(--muted); max-width:48ch; line-height:1.45; }
  .iconbtn{ background:none; border:none; cursor:pointer; color:var(--muted); font-size:20px; line-height:1; }

  @media (max-width:900px){
    .app{ grid-template-columns:1fr; }
    .side{ display:none; }
    .topbar{ padding:13px 20px; }
    .wrap{ padding:28px 20px 60px; }
    .meta{ grid-template-columns:1fr 1fr; }
    .kpi-row{ grid-template-columns:repeat(2,1fr); }
    .gal-grid{ grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); }
  }

  /* ---- Print ---- */
  @media print{
    @page{ margin:14mm; }
    .side, .topbar, .addrow, .modal, .side-note{ display:none !important; }
    .app{ display:block; }
    .wrap{ max-width:none; padding:0; }
    .sec{ break-inside:avoid; border-color:var(--line); }
    .sec textarea, .meta input, .sec input.line, table.grid input{ border-color:var(--line); }
    .fpurpose, .ftitle{ }
  }
  /* ---- Scaled nav + backend (added) ---- */
  .side-search{ margin:2px 18px 8px; }
  .side-search input{ width:100%; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.09); color:#EAEAE4;
    border-radius:8px; padding:9px 11px; font-family:'IBM Plex Sans'; font-size:12.5px; }
  .side-search input::placeholder{ color:#7E7E84; }
  .side-search input:focus{ outline:none; border-color:var(--accent2); }
  .side-ghead{ display:flex; align-items:center; justify-content:space-between; gap:8px; cursor:pointer; padding:11px 18px 7px; user-select:none; }
  .side-ghead .gname{ font-family:'IBM Plex Mono'; font-weight:500; font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--accent2); }
  .side-ghead:hover .gname{ color:#F2DE8E; }
  .side-ghead .gmeta{ display:flex; align-items:center; gap:9px; }
  .side-ghead .gcount{ font-family:'IBM Plex Mono'; font-size:9px; color:#67676D; }
  .side-ghead .chev{ color:#67676D; font-size:9px; transition:transform .15s; }
  .side-group.collapsed .chev{ transform:rotate(-90deg); }
  .side-group.collapsed .side-gbody{ display:none; }
  .cloud{ display:flex; align-items:center; gap:6px; font-family:'IBM Plex Mono'; font-size:11px; color:var(--muted); margin-right:4px; }
  .cloud .cd{ width:7px; height:7px; border-radius:50%; background:var(--accent); }
  .cloud.on .cd{ background:#5FA463; }
  .cfield{ display:flex; flex-direction:column; gap:5px; margin:0 0 12px; }
  .cfield label{ font-family:'IBM Plex Mono'; font-size:9.5px; letter-spacing:.1em; text-transform:uppercase; color:var(--faint); }
  .cfield input{ font-family:'IBM Plex Sans'; font-size:13px; border:1px solid var(--line); border-radius:6px; padding:9px 11px; }
  .cfield input:focus{ outline:none; border-color:var(--accent); box-shadow:0 0 0 3px var(--accentbg); }
  .instbar{ display:flex; align-items:center; gap:10px; flex-wrap:wrap; background:var(--softer); border:1px solid var(--rule);
    border-radius:10px; padding:10px 12px; margin-bottom:22px; }
  .instbar .ib-l{ font-family:'IBM Plex Mono'; font-size:9.5px; letter-spacing:.1em; text-transform:uppercase; color:var(--faint); }
  .instbar select{ font-family:'IBM Plex Sans'; font-size:13px; border:1px solid var(--line); border-radius:6px; padding:7px 9px; background:var(--field); max-width:240px; }
  .instbar input{ flex:1; min-width:160px; font-family:'IBM Plex Sans'; font-size:13px; border:1px solid var(--line); border-radius:6px; padding:7px 10px; background:var(--field); }
  .instbar input:focus, .instbar select:focus{ outline:none; border-color:var(--accent); box-shadow:0 0 0 3px var(--accentbg); }
  .instbar .btn{ padding:6px 11px; }
  .instbar.local{ display:block; font-size:12.5px; color:var(--muted); }
  .instbar.local a{ color:var(--accent); text-decoration:none; border-bottom:1px solid var(--accentsoft); cursor:pointer; }
  @media print{ .instbar, #amodal{ display:none !important; } }

  /* ---- Guidance toggle + Gallery view ---- */
  #form.lean .sec-guide, #form.lean .sec-meta{ display:none; }
  #form.lean .sec{ padding:14px 18px; margin-bottom:12px; }
  #form.gallery-mode{ max-width:1180px; }
  .gal-head{ border-bottom:2px solid var(--ink); padding-bottom:18px; margin-bottom:8px; }
  .gal-head h1{ font-family:'Spectral'; font-weight:600; font-size:34px; letter-spacing:-.5px; margin:0 0 6px; }
  .gal-head p{ font-family:'Spectral'; font-style:italic; font-size:15px; color:var(--muted); margin:0; max-width:60ch; }
  .gal-dom{ display:flex; align-items:baseline; gap:10px; margin:30px 0 2px; }
  .gal-dom .gd-name{ font-family:'IBM Plex Mono'; font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--accent); }
  .gal-dom .gd-count{ font-family:'IBM Plex Mono'; font-size:10px; color:var(--faint); }
  .gal-grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(232px,1fr)); gap:15px; margin:12px 0 8px; }
  .gcard{ position:relative; border:1px solid var(--rule); border-radius:14px; background:var(--page); padding:17px 17px 14px; text-decoration:none; color:inherit;
    display:flex; flex-direction:column; gap:9px; min-height:168px; overflow:hidden; transition:border-color .18s, box-shadow .18s, transform .18s; }
  .gcard::before{ content:""; position:absolute; left:0; top:0; height:3px; width:100%; background:linear-gradient(90deg,var(--accent),var(--accent2)); opacity:0; transition:opacity .18s; }
  .gcard:hover{ border-color:var(--accent); box-shadow:0 10px 24px rgba(40,30,12,.09); transform:translateY(-2px); }
  .gcard:hover::before{ opacity:1; }
  .gc-code{ align-self:flex-start; font-family:'IBM Plex Mono'; font-size:9px; letter-spacing:.08em; text-transform:uppercase; color:var(--accent);
    background:var(--accentbg); border:1px solid var(--accentsoft); border-radius:5px; padding:3px 7px; }
  .gc-title{ font-family:'Spectral'; font-weight:600; font-size:18px; line-height:1.16; letter-spacing:-.2px; color:var(--ink); }
  .gc-purpose{ font-size:11.5px; line-height:1.46; color:var(--muted); flex:1; }
  .gc-foot{ display:flex; align-items:center; justify-content:space-between; font-family:'IBM Plex Mono'; font-size:9px; letter-spacing:.06em;
    text-transform:uppercase; color:var(--faint); border-top:1px solid var(--rule); padding-top:11px; }
  .gc-foot .arr{ color:var(--accent); opacity:0; transform:translateX(-4px); transition:opacity .18s, transform .18s; font-size:13px; }
  .gcard:hover .gc-foot .arr{ opacity:1; transform:translateX(0); }

  /* ---- Landing ---- */
  .landing{ position:fixed; top:56px; left:0; right:0; bottom:0; z-index:100;
    display:flex; align-items:center; justify-content:center;
    background:rgba(236,236,232,.92); backdrop-filter:blur(16px); }
  .landing.hidden{ display:none; }
  .lnd-card{ width:100%; max-width:400px; background:var(--page); border:1px solid var(--rule);
    border-radius:16px; box-shadow:0 24px 64px rgba(40,30,12,.14); padding:36px 32px 28px; }
  .lnd-card-brand{ display:flex; align-items:center; gap:12px; margin-bottom:24px; }
  .lnd-card-brand img{ height:36px; }
  .lnd-card-brand span{ font-family:'IBM Plex Mono'; font-size:10px; letter-spacing:.28em;
    text-transform:uppercase; color:var(--muted); }
  .lnd-card h2{ font-family:'Spectral'; font-weight:600; font-size:26px; letter-spacing:-.4px;
    margin:0 0 6px; color:var(--ink); }
  .lnd-card .lnd-subtitle{ font-size:13px; line-height:1.5; color:var(--muted); margin:0 0 24px; }
  .lnd-tabs{ display:flex; gap:4px; background:var(--soft); border:1px solid var(--rule);
    border-radius:10px; padding:4px; margin-bottom:20px; }
  .lnd-tab{ flex:1; font-family:'IBM Plex Sans'; font-weight:500; font-size:13px; padding:9px;
    border:none; background:none; border-radius:7px; color:var(--muted); cursor:pointer; }
  .lnd-tab.active{ background:var(--field); color:var(--ink); box-shadow:0 1px 3px rgba(0,0,0,.06); }
  .lnd-fl{ font-family:'IBM Plex Mono'; font-size:9.5px; letter-spacing:.1em;
    text-transform:uppercase; color:var(--faint); display:block; margin:0 0 6px; }
  #lnd-auth input{ width:100%; font-family:'IBM Plex Sans'; font-size:14px;
    border:1px solid var(--line); border-radius:8px; padding:11px 13px; margin-bottom:14px;
    background:var(--field); color:var(--ink); }
  #lnd-auth input:focus{ outline:none; border-color:var(--accent);
    box-shadow:0 0 0 3px var(--accentbg); }
  .lnd-msg{ font-size:12px; line-height:1.45; color:var(--muted); min-height:16px; margin:0 0 10px; }
  .lnd-primary{ width:100%; font-family:'IBM Plex Sans'; font-weight:600; font-size:14px;
    padding:12px; border-radius:8px; border:1px solid var(--ink); background:var(--ink);
    color:var(--page); cursor:pointer; transition:background .15s, border-color .15s; }
  .lnd-primary:hover{ background:var(--accent); border-color:var(--accent); color:#fff; }
  .lnd-ghost{ width:100%; font-family:'IBM Plex Sans'; font-size:13px; padding:10px;
    border-radius:8px; border:none; background:none; color:var(--muted); cursor:pointer; }
  .lnd-ghost:hover{ color:var(--accent); }
  .lnd-signed-txt{ font-size:14px; line-height:1.5; color:var(--ink); margin:0 0 16px; }
  .lnd-signed-txt b{ color:var(--accent); }
  .lnd-note{ font-size:11px; line-height:1.5; color:var(--faint); margin:18px 0 0;
    text-align:center; }
  .lnd-cloud{ display:block; margin-top:4px; font-family:'IBM Plex Mono'; font-size:10px; }
  .lnd-sep{ display:flex; align-items:center; gap:12px; margin:16px 0; color:var(--faint);
    font-family:'IBM Plex Mono'; font-size:10px; letter-spacing:.1em; text-transform:uppercase; }
  .lnd-sep::before, .lnd-sep::after{ content:""; flex:1; height:1px; background:var(--rule); }
  .lnd-microsoft{ width:100%; font-family:'IBM Plex Sans'; font-weight:500; font-size:13.5px;
    padding:11px; border-radius:8px; border:1px solid var(--line); background:var(--field);
    color:var(--ink); cursor:pointer; display:flex; align-items:center; justify-content:center;
    gap:8px; margin-top:12px; transition:border-color .15s, color .15s; }
  .lnd-microsoft:hover{ border-color:var(--accent); color:var(--accent); }
  .lnd-microsoft svg{ width:16px; height:16px; flex:none; }
  @media (max-width:500px){ .lnd-card{ margin:0 16px; padding:28px 24px 22px; } }

  /* ---- Planner / PMBOK dashboard ---- */
  #form.planner-mode{ max-width:1200px; }
  .dash-head{ border-bottom:2px solid var(--ink); padding-bottom:18px; margin-bottom:22px; display:flex; justify-content:space-between; align-items:flex-end; gap:16px; flex-wrap:wrap; }
  .dash-head h1{ font-family:'Spectral'; font-weight:600; font-size:33px; letter-spacing:-.5px; margin:0 0 5px; }
  .dash-head p{ font-family:'Spectral'; font-style:italic; font-size:14px; color:var(--muted); margin:0; max-width:60ch; }
  .dash-head .asof{ font-family:'IBM Plex Mono'; font-size:10px; letter-spacing:.08em; text-transform:uppercase; color:var(--faint); white-space:nowrap; }
  .planner-sub{ display:flex; gap:6px; flex-wrap:wrap; margin-bottom:20px; }
  .psub{ font-family:'IBM Plex Mono'; font-size:10px; letter-spacing:.04em; text-transform:uppercase; padding:6px 11px; border-radius:7px; border:1px solid var(--line); color:var(--muted); background:var(--field); }
  .psub.active{ background:var(--ink); color:var(--page); border-color:var(--ink); }
  .kpi-row{ display:grid; grid-template-columns:repeat(6,1fr); gap:13px; margin-bottom:20px; }
  .kpi{ border:1px solid var(--rule); border-radius:12px; background:var(--page); padding:14px 15px; }
  .kpi .kl{ font-family:'IBM Plex Mono'; font-size:8.5px; letter-spacing:.08em; text-transform:uppercase; color:var(--faint); }
  .kpi .kv{ font-family:'Spectral'; font-weight:600; font-size:26px; line-height:1.1; margin-top:6px; letter-spacing:-.5px; }
  .kpi .kd{ font-family:'IBM Plex Mono'; font-size:9px; margin-top:5px; color:var(--muted); }
  .kpi .kd.down{ color:#C2603F; } .kpi .kd.up{ color:#4C8A50; }
  .dash-grid{ display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-bottom:18px; }
  .dash-card{ border:1px solid var(--rule); border-radius:14px; background:var(--page); padding:18px 20px; }
  .dash-card.full{ grid-column:1 / -1; }
  .dc-h{ display:flex; align-items:baseline; justify-content:space-between; gap:12px; margin-bottom:14px; }
  .dc-h h3{ font-family:'Spectral'; font-weight:600; font-size:17px; margin:0; }
  .dc-h .more{ font-family:'IBM Plex Mono'; font-size:9px; letter-spacing:.06em; text-transform:uppercase; color:var(--faint); }
  .rag{ display:inline-flex; align-items:center; gap:6px; font-family:'IBM Plex Mono'; font-size:10px; letter-spacing:.03em; text-transform:uppercase; white-space:nowrap; }
  .rag .d{ width:8px; height:8px; border-radius:50%; flex:none; }
  .rag.green .d{ background:#5FA463; } .rag.amber .d{ background:#C9962B; } .rag.red .d{ background:#C2603F; }
  .rag.green{ color:#4C8A50; } .rag.amber{ color:#A67C1E; } .rag.red{ color:#B0512E; }
  table.ptab{ width:100%; border-collapse:collapse; }
  table.ptab th{ text-align:left; font-family:'IBM Plex Mono'; font-size:8.5px; letter-spacing:.05em; text-transform:uppercase; color:var(--muted); padding:7px 8px; border-bottom:1.5px solid var(--ink); }
  table.ptab td{ padding:9px 8px; border-bottom:1px solid var(--rule); font-size:12.5px; vertical-align:middle; }
  table.ptab tr:last-child td{ border-bottom:none; }
  table.ptab .pname{ font-family:'Spectral'; font-weight:600; font-size:13.5px; line-height:1.1; }
  table.ptab .pcode{ font-family:'IBM Plex Mono'; font-size:9px; color:var(--accent); margin-top:2px; }
  .pbar{ height:6px; border-radius:3px; background:var(--soft); overflow:hidden; }
  .pbar i{ display:block; height:100%; background:var(--accent); border-radius:3px; }
  .ka-grid{ display:grid; grid-template-columns:1fr 1fr; gap:0 20px; }
  .ka{ display:flex; align-items:center; justify-content:space-between; padding:7.5px 0; border-bottom:1px solid var(--rule); }
  .ka .kan{ font-size:12.5px; }
  .tl-row{ display:flex; gap:12px; align-items:flex-start; padding:9px 0; border-bottom:1px solid var(--rule); }
  .tl-row:last-child{ border-bottom:none; }
  .tl-date{ font-family:'IBM Plex Mono'; font-size:10px; color:var(--muted); width:46px; flex:none; padding-top:1px; }
  .tl-body{ flex:1; min-width:0; } .tl-name{ font-size:12.5px; font-weight:500; } .tl-meta{ font-family:'IBM Plex Mono'; font-size:9px; color:var(--faint); margin-top:2px; }
  .risk-row{ display:flex; align-items:center; gap:12px; padding:9px 0; border-bottom:1px solid var(--rule); }
  .risk-row:last-child{ border-bottom:none; }
  .risk-score{ font-family:'IBM Plex Mono'; font-weight:500; font-size:12px; width:30px; height:30px; border-radius:7px; display:flex; align-items:center; justify-content:center; flex:none; color:#fff; }
  .risk-body{ flex:1; min-width:0; } .risk-name{ font-size:12.5px; line-height:1.25; } .risk-meta{ font-family:'IBM Plex Mono'; font-size:9px; color:var(--faint); margin-top:2px; }
  .cc-stats{ display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
  .cc-stat{ text-align:center; padding:11px 6px; border:1px solid var(--rule); border-radius:10px; }
  .cc-stat .n{ font-family:'Spectral'; font-weight:600; font-size:23px; } .cc-stat .l{ font-family:'IBM Plex Mono'; font-size:8px; letter-spacing:.06em; text-transform:uppercase; color:var(--faint); margin-top:3px; }
  .budget-row{ display:flex; align-items:center; gap:12px; padding:8px 0; }
  .budget-row .bn{ font-size:12px; width:80px; flex:none; } .budget-row .bbar{ flex:1; height:8px; border-radius:4px; background:var(--soft); overflow:hidden; } .budget-row .bbar i{ display:block; height:100%; border-radius:4px; } .budget-row .bv{ font-family:'IBM Plex Mono'; font-size:10px; color:var(--muted); width:108px; text-align:right; flex:none; }
  .team-row{ display:flex; align-items:center; justify-content:space-between; gap:10px; padding:8px 0; border-bottom:1px solid var(--rule); font-size:12.5px; }
  .team-row:last-child{ border-bottom:none; }
  @media (max-width:1040px){ .kpi-row{ grid-template-columns:repeat(3,1fr); } .dash-grid{ grid-template-columns:1fr; } }
  a.psub{ text-decoration:none; cursor:pointer; }
  a.psub:hover{ border-color:var(--accent); color:var(--accent); }
  a.psub.active{ background:var(--ink); color:var(--page); border-color:var(--ink); }
  a.psub.active:hover{ color:var(--page); }
  .psub.disabled{ opacity:.45; }
  .dsrc{ font-family:'IBM Plex Mono'; font-size:9.5px; letter-spacing:.03em; color:var(--faint); }
  .dsrc.live{ color:#4C8A50; }
  .plnr-proj{ font-family:'IBM Plex Sans'; font-size:12px; border:1px solid var(--line); border-radius:7px; padding:6px 9px; background:var(--field); color:var(--ink); margin-top:7px; max-width:210px; }
  .plnr-proj:focus{ outline:none; border-color:var(--accent); box-shadow:0 0 0 3px var(--accentbg); }
  .np-card .np-grid{ display:grid; grid-template-columns:1.5fr .7fr 1.1fr .8fr 1fr 1.1fr .9fr auto; gap:10px; align-items:center; }
  .np-grid input, .np-grid select{ font-family:'IBM Plex Sans'; font-size:12.5px; border:1px solid var(--line); border-radius:7px; padding:8px 9px; background:var(--field); color:var(--ink); width:100%; }
  .np-grid input:focus, .np-grid select:focus{ outline:none; border-color:var(--accent); box-shadow:0 0 0 3px var(--accentbg); }
  .np-grid .btn{ white-space:nowrap; }
  .matrix{ display:grid; grid-template-columns:auto repeat(5,1fr); gap:4px; }
  .matrix .mh, .matrix .axis{ font-family:'IBM Plex Mono'; font-size:8.5px; color:var(--faint); display:flex; align-items:center; justify-content:center; }
  .matrix .mc{ aspect-ratio:1.7/1; border-radius:5px; display:flex; align-items:center; justify-content:center; font-family:'IBM Plex Mono'; font-size:12px; font-weight:500; }
  .catbar{ display:flex; align-items:center; gap:10px; padding:6px 0; }
  .catbar .cn{ font-size:12px; width:104px; flex:none; } .catbar .cb{ flex:1; height:8px; background:var(--soft); border-radius:4px; overflow:hidden; } .catbar .cb i{ display:block; height:100%; background:var(--accent); border-radius:4px; } .catbar .cv{ font-family:'IBM Plex Mono'; font-size:10px; color:var(--muted); width:24px; text-align:right; flex:none; }
  .stat-pill{ display:inline-flex; align-items:center; gap:7px; border:1px solid var(--rule); border-radius:9px; padding:7px 11px; font-family:'IBM Plex Mono'; font-size:12px; color:var(--muted); }
  .proj-status{ display:flex; align-items:center; gap:16px; padding:13px 0; border-bottom:1px solid var(--rule); }
  .proj-status:last-child{ border-bottom:none; }
  .proj-status .ps-bar{ width:120px; flex:none; }
  @media print{ .np-card{ display:none; } }
  @media (max-width:1040px){ .np-card .np-grid{ grid-template-columns:1fr 1fr; } }
`;
