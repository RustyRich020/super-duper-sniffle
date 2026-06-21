export const NAV_CSS = `
  .qq-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    height: 56px; display: flex; align-items: center;
    padding: 0 28px;
    background: rgba(30, 30, 33, 0.97);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(230, 198, 88, 0.12);
  }
  .qq-nav-brand {
    display: flex; align-items: center; gap: 10px;
    text-decoration: none; color: #E7E7E1;
    flex: none;
  }
  .qq-nav-brand img {
    height: 26px; filter: brightness(0) invert(1); opacity: 0.92;
  }
  .qq-nav-brand span {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px; letter-spacing: 0.28em;
    text-transform: uppercase; color: #CFCFC6;
  }
  .qq-nav-links {
    display: flex; align-items: center; gap: 4px;
    list-style: none; margin: 0 0 0 16px; padding: 0;
    overflow-x: auto; overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    flex: 1; min-width: 0;
  }
  .qq-nav-links::-webkit-scrollbar { display: none; }
  .qq-nav-links li { flex: none; }
  .qq-nav-links a {
    font-family: 'IBM Plex Sans', system-ui, sans-serif;
    font-size: 12.5px; font-weight: 500;
    color: #9A9A9F; text-decoration: none;
    padding: 7px 14px; border-radius: 7px;
    transition: color 0.15s, background 0.15s;
    white-space: nowrap;
  }
  .qq-nav-links a:hover {
    color: #E7E7E1; background: rgba(255, 255, 255, 0.06);
  }
  .qq-nav-links a.active {
    color: #FAF4E8; background: rgba(230, 198, 88, 0.1);
  }
  .qq-nav-end {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9.5px; letter-spacing: 0.12em;
    text-transform: uppercase; color: #67676D;
    flex: none; margin-left: 16px;
  }
  @media (max-width: 900px) {
    .qq-nav-end { display: none; }
  }
  @media (max-width: 700px) {
    .qq-nav { padding: 0 12px; }
    .qq-nav-links { margin-left: 8px; }
    .qq-nav-links a { font-size: 11.5px; padding: 6px 11px; }
    .qq-nav-brand span { display: none; }
  }
  @media print { .qq-nav { display: none !important; } }
`;
