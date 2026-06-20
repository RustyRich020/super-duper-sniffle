export const DASHBOARD_CSS = `
  :root{
    --ink:#222226; --muted:#6A6A6F; --faint:#9C9C98;
    --page:#FBFBF9; --paper:#ECECE8; --soft:#F2F2EF; --softer:#F7F7F4;
    --rule:#E3E3DE; --line:#D4D4CF; --field:#FFFFFF;
    --accent:#B5862A; --accent2:#E6C658; --accentsoft:#F0E4BC; --accentbg:#FAF4E2;
    --sidebar:#1E1E21;
  }
  .dash{ max-width:1080px; margin:0 auto; padding:40px 36px 80px; }
  .dash-title{ font-family:'Spectral',serif; font-weight:600; font-size:34px;
    letter-spacing:-.5px; margin:0 0 6px; color:var(--ink); }
  .dash-sub{ font-family:'Spectral',serif; font-style:italic; font-size:15px;
    color:var(--muted); margin:0 0 32px; }
  .dash-section-label{ font-family:'IBM Plex Mono',monospace; font-size:10px;
    letter-spacing:.18em; text-transform:uppercase; color:var(--accent);
    margin:0 0 14px; }
  .dash-quick{ display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
    gap:14px; margin-bottom:40px; }
  .dash-qcard{ border:1px solid var(--rule); border-radius:13px; background:var(--page);
    padding:18px 18px 16px; text-decoration:none; color:inherit;
    transition:border-color .15s, box-shadow .15s, transform .15s; }
  .dash-qcard:hover{ border-color:var(--accent); box-shadow:0 8px 20px rgba(40,30,12,.08);
    transform:translateY(-2px); }
  .dash-qcard h3{ font-family:'Spectral',serif; font-weight:600; font-size:17px;
    margin:0 0 6px; color:var(--ink); }
  .dash-qcard p{ font-size:12px; line-height:1.45; color:var(--muted); margin:0; }
  .dash-qcard .qc-count{ font-family:'IBM Plex Mono',monospace; font-size:9px;
    letter-spacing:.06em; text-transform:uppercase; color:var(--faint); margin-top:10px; }
  .dash-recent{ border:1px solid var(--rule); border-radius:14px; background:var(--page);
    overflow:hidden; }
  .dash-recent-head{ padding:18px 20px; border-bottom:1px solid var(--rule);
    font-family:'Spectral',serif; font-weight:600; font-size:17px; }
  .dash-recent-row{ display:flex; align-items:center; gap:14px; padding:14px 20px;
    border-bottom:1px solid var(--rule); }
  .dash-recent-row:last-child{ border-bottom:none; }
  .dash-recent-row:hover{ background:var(--softer); }
  .drr-title{ font-family:'Spectral',serif; font-weight:600; font-size:14px;
    color:var(--ink); flex:1; min-width:0; }
  .drr-form{ font-family:'IBM Plex Mono',monospace; font-size:9px; letter-spacing:.06em;
    text-transform:uppercase; color:var(--accent); background:var(--accentbg);
    border:1px solid var(--accentsoft); border-radius:5px; padding:3px 7px; flex:none; }
  .drr-time{ font-family:'IBM Plex Mono',monospace; font-size:10px; color:var(--faint);
    flex:none; white-space:nowrap; }
  .dash-empty{ text-align:center; padding:48px 24px; color:var(--muted); font-size:14px; }
  .dash-empty a{ color:var(--accent); text-decoration:none; border-bottom:1px solid var(--accentsoft); }
  @media (max-width:700px){
    .dash{ padding:28px 20px 60px; }
    .dash-quick{ grid-template-columns:1fr 1fr; }
  }
`;
