import Link from "next/link";

const CSS = `
  :root{
    --ink:#222226; --muted:#6A6A6F; --faint:#9C9C98;
    --page:#FBFBF9; --paper:#ECECE8; --soft:#F2F2EF; --softer:#F7F7F4;
    --rule:#E3E3DE; --line:#D4D4CF; --field:#FFFFFF;
    --accent:#B5862A; --accent2:#E6C658; --accentsoft:#F0E4BC; --accentbg:#FAF4E2; --sidebar:#1E1E21;
    --green:#5FA463; --amber:#C9962B; --red:#C2603F;
  }
  *{ box-sizing:border-box; }
  html,body{ margin:0; padding:0; }
  body{ background:var(--paper); color:var(--ink); font-family:'IBM Plex Sans',system-ui,sans-serif; -webkit-font-smoothing:antialiased; }
  .doc{ max-width:1200px; margin:0 auto; padding:46px 40px 90px; }

  /* cover */
  .cov{ background:var(--sidebar); color:#ECECE6; border-radius:18px; padding:40px 44px; position:relative; overflow:hidden; margin-bottom:30px; }
  .cov::before{ content:""; position:absolute; inset:14px; border:1px solid rgba(230,198,88,.18); border-radius:10px; pointer-events:none; }
  .cov .brand{ display:flex; align-items:center; gap:12px; position:relative; z-index:1; }
  .cov .brand img{ height:38px; filter:brightness(0) invert(1); opacity:.95; }
  .cov .brand span{ font-family:'IBM Plex Mono'; font-size:11px; letter-spacing:.28em; text-transform:uppercase; color:#D9D9D0; }
  .cov h1{ font-family:'Spectral'; font-weight:500; font-size:42px; line-height:1.05; letter-spacing:-.6px; margin:26px 0 0; max-width:20ch; position:relative; z-index:1; }
  .cov h1 em{ font-style:italic; color:var(--accentsoft); }
  .cov p{ font-family:'Spectral'; font-size:15px; line-height:1.55; color:#CFCFC8; max-width:64ch; margin:16px 0 0; position:relative; z-index:1; }
  .cov .kick{ font-family:'IBM Plex Mono'; font-size:10.5px; letter-spacing:.32em; text-transform:uppercase; color:var(--accent2); margin-top:24px; position:relative; z-index:1; }

  section{ margin-bottom:42px; }
  .sec-num{ font-family:'IBM Plex Mono'; font-size:11px; letter-spacing:.2em; text-transform:uppercase; color:var(--accent); }
  .sec-h{ font-family:'Spectral'; font-weight:600; font-size:27px; letter-spacing:-.4px; margin:5px 0 4px; border-bottom:2px solid var(--ink); padding-bottom:12px; }
  .sec-sub{ font-family:'Spectral'; font-style:italic; font-size:14px; color:var(--muted); margin:10px 0 20px; max-width:74ch; }

  /* personas */
  .pgrid{ display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
  .pcard{ border:1px solid var(--rule); border-radius:13px; background:var(--page); padding:16px 16px 14px; position:relative; overflow:hidden; }
  .pcard::before{ content:""; position:absolute; left:0; top:0; height:3px; width:100%; background:linear-gradient(90deg,var(--accent),var(--accent2)); }
  .pcard .pi{ width:34px; height:34px; border-radius:9px; background:var(--ink); color:var(--accent2); font-family:'Spectral'; font-weight:600; font-size:14px; display:flex; align-items:center; justify-content:center; letter-spacing:.5px; }
  .pcard h3{ font-family:'Spectral'; font-weight:600; font-size:16px; margin:11px 0 2px; }
  .pcard .lives{ font-family:'IBM Plex Mono'; font-size:9px; letter-spacing:.06em; text-transform:uppercase; color:var(--accent); }
  .pcard .docs{ font-size:11.5px; line-height:1.5; color:var(--ink); margin:9px 0 7px; }
  .pcard .need{ font-size:11.5px; line-height:1.45; color:var(--muted); font-style:italic; border-top:1px solid var(--rule); padding-top:8px; }

  /* swimlane + raci shared grid bits */
  .grid-card{ border:1px solid var(--rule); border-radius:12px; overflow:hidden; background:var(--page); }
  .lane{ display:grid; grid-template-columns:140px repeat(5,1fr); }
  .lane > div{ padding:9px 11px; border-right:1px solid var(--rule); border-bottom:1px solid var(--rule); min-height:54px; }
  .lane > div:nth-child(6n){ border-right:none; }
  .lane .lh{ background:var(--ink); color:var(--page); font-family:'IBM Plex Mono'; font-size:9px; letter-spacing:.08em; text-transform:uppercase; display:flex; align-items:center; min-height:38px; }
  .lane .rl{ background:var(--softer); font-family:'Spectral'; font-weight:600; font-size:12.5px; display:flex; align-items:center; }
  .lane .ph{ display:flex; flex-wrap:wrap; align-content:flex-start; }
  .chip{ display:inline-block; font-family:'IBM Plex Sans'; font-size:10px; background:var(--accentbg); border:1px solid var(--accentsoft); color:var(--ink); border-radius:5px; padding:2px 6px; margin:2px 3px 1px 0; line-height:1.35; }
  .chip.ghost{ background:none; border:1px dashed var(--line); color:var(--faint); }
  .emp{ color:var(--faint); font-family:'IBM Plex Mono'; font-size:13px; align-self:center; }

  /* blueprint */
  .bp{ display:grid; grid-template-columns:124px repeat(6,1fr); }
  .bp > div{ padding:10px 11px; border-right:1px solid var(--rule); border-bottom:1px solid var(--rule); }
  .bp > div:nth-child(7n){ border-right:none; }
  .bp .stage{ background:var(--ink); color:var(--page); font-family:'Spectral'; font-weight:600; font-size:12.5px; }
  .bp .stage .n{ font-family:'IBM Plex Mono'; font-size:8.5px; color:var(--accent2); display:block; margin-bottom:2px; }
  .bp .laneL{ background:var(--softer); font-family:'IBM Plex Mono'; font-size:8.5px; letter-spacing:.06em; text-transform:uppercase; color:var(--muted); display:flex; align-items:center; }
  .bp .c{ font-size:11px; line-height:1.4; color:var(--ink); }
  .bp .c.back{ color:var(--muted); font-family:'IBM Plex Mono'; font-size:9.5px; }
  .bp .c.data{ font-family:'IBM Plex Mono'; font-size:9.5px; color:var(--accent); }

  /* lifecycle ring */
  .ring-wrap{ display:grid; grid-template-columns:400px 1fr; gap:28px; align-items:center; }
  .ring{ position:relative; width:380px; height:380px; margin:0 auto; }
  .ring .o-circle{ position:absolute; inset:30px; border:2px dashed var(--line); border-radius:50%; }
  .ring .i-circle{ position:absolute; left:50%; top:50%; width:170px; height:170px; transform:translate(-50%,-50%); border:1.5px solid var(--accentsoft); border-radius:50%; background:var(--accentbg); }
  .ring .ctr{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); text-align:center; width:150px; z-index:3; }
  .ring .ctr .t{ font-family:'IBM Plex Mono'; font-size:8.5px; letter-spacing:.12em; text-transform:uppercase; color:var(--accent); }
  .ring .ctr .b{ font-family:'Spectral'; font-weight:600; font-size:13px; margin-top:2px; line-height:1.2; }
  .node{ position:absolute; transform:translate(-50%,-50%); z-index:2; }
  .pnode{ background:var(--ink); color:var(--page); border-radius:9px; padding:6px 9px; text-align:center; min-width:78px; }
  .pnode .s{ font-family:'IBM Plex Mono'; font-size:8px; color:var(--accent2); }
  .pnode .l{ font-family:'Spectral'; font-weight:600; font-size:11px; line-height:1.1; margin-top:1px; }
  .inode{ font-family:'IBM Plex Mono'; font-size:9px; color:var(--ink); background:var(--page); border:1px solid var(--accentsoft); border-radius:6px; padding:3px 6px; white-space:nowrap; }
  .ring-legend p{ font-size:13px; line-height:1.6; color:var(--ink); margin:0 0 12px; }
  .ring-legend .lg{ display:flex; align-items:center; gap:9px; margin-bottom:8px; font-size:12px; color:var(--muted); }
  .ring-legend .sw{ width:16px; height:16px; border-radius:5px; flex:none; }
  .ring-legend b{ color:var(--ink); font-weight:600; }

  /* RACI */
  .raci{ display:grid; grid-template-columns:248px repeat(7,1fr); }
  .raci > div{ padding:8px 9px; border-right:1px solid var(--rule); border-bottom:1px solid var(--rule); display:flex; align-items:center; }
  .raci > div:nth-child(8n){ border-right:none; }
  .raci .hh{ background:var(--ink); color:var(--page); font-family:'IBM Plex Mono'; font-size:9px; letter-spacing:.04em; text-transform:uppercase; justify-content:center; min-height:40px; text-align:center; }
  .raci .hh.first{ justify-content:flex-start; }
  .raci .act{ background:var(--softer); font-size:12px; font-weight:500; }
  .raci .cell{ justify-content:center; }
  .rb{ font-family:'IBM Plex Mono'; font-size:10.5px; font-weight:500; border-radius:5px; padding:3px 7px; letter-spacing:.04em; }
  .rb.A{ background:var(--accent); color:#fff; }
  .rb.R{ background:var(--ink); color:var(--page); }
  .rb.C{ background:var(--soft); color:var(--ink); border:1px solid var(--line); }
  .rb.I{ background:none; color:var(--faint); border:1px solid var(--line); }
  .raci-legend{ display:flex; gap:18px; flex-wrap:wrap; margin-top:14px; font-size:12px; color:var(--muted); }
  .raci-legend span b{ color:var(--ink); }

  /* home link */
  .home-link{ display:inline-block; font-family:'IBM Plex Mono'; font-size:10.5px; letter-spacing:.18em; text-transform:uppercase; color:var(--accent); text-decoration:none; margin-bottom:18px; }
  .home-link:hover{ color:var(--ink); }

  @media (max-width:900px){ .pgrid{ grid-template-columns:repeat(2,1fr); } .ring-wrap{ grid-template-columns:1fr; } }
  @media print{
    body{ background:none; }
    .doc{ max-width:none; padding:0; }
    section{ break-inside:avoid; page-break-inside:avoid; }
    .cov{ break-after:avoid; }
  }
`;

export default function OperatingModelPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="doc">
        <Link href="/" className="home-link">← Back to home</Link>

        <div className="cov">
          <div className="brand"><img src="/assets/qq-logo.png" alt="QQ Studios" /><span>QQ-Studios</span></div>
          <h1>The Operating Model — <em>people, journeys &amp; lifecycle</em></h1>
          <p>How the Forms Workspace and the PMBOK Planner are used by real roles: who does what, the path an end user walks, the service behind it, the project–product lifecycle, and the RACI that holds it together.</p>
          <div className="kick">Personas · Journey · Service Blueprint · Lifecycle · RACI</div>
        </div>

        {/* 1. PERSONAS */}
        <section>
          <div className="sec-num">01</div>
          <h2 className="sec-h">The Personas</h2>
          <p className="sec-sub">Eight roles, each anchored to a surface — the Landing (front door), the Forms Workspace (the work), or the Planner (the roll-up).</p>
          <div className="pgrid">
            <div className="pcard"><div className="pi">SP</div><h3>Sponsor / Exec</h3><div className="lives">Lives in · Planner</div><div className="docs">Charter, Business Case</div><div className="need">"Is this on track, on budget, worth it?" — reads &amp; approves.</div></div>
            <div className="pcard"><div className="pi">PM</div><h3>Project Manager</h3><div className="lives">Lives in · Planner (all 8)</div><div className="docs">Charter, WBS, Schedule, Risk, Status, Change, RACI</div><div className="need">Orchestrates everything; the only role in every planner page.</div></div>
            <div className="pcard"><div className="pi">PD</div><h3>Product Manager</h3><div className="lives">Lives in · Forms · Requirements</div><div className="docs">PRD, Vision, Roadmap, One-Pager, Stories</div><div className="need">Turns intent into requirements the team can build.</div></div>
            <div className="pcard"><div className="pi">EN</div><h3>Engineer / Tech Lead</h3><div className="lives">Lives in · Forms · Architecture</div><div className="docs">ADR, Design Doc, README, API Spec, Runbook</div><div className="need">Records how &amp; why; keeps living docs alive.</div></div>
            <div className="pcard"><div className="pi">QA</div><h3>QA / Test Lead</h3><div className="lives">Lives in · Forms · Quality</div><div className="docs">Test Strategy, Test Cases, UAT, Bug Report</div><div className="need">Owns the "done" bar.</div></div>
            <div className="pcard"><div className="pi">OP</div><h3>SRE / Ops</h3><div className="lives">Lives in · Forms · Operations</div><div className="docs">Runbook, Incident, Postmortem, On-Call</div><div className="need">Operates it when it matters.</div></div>
            <div className="pcard"><div className="pi">CO</div><h3>Compliance / Auditor</h3><div className="lives">Lives in · Forms + Doc-Gov</div><div className="docs">SOP, Audit Trail, DPIA, Compliance Matrix</div><div className="need">Evidence, control mapping, signoffs.</div></div>
            <div className="pcard"><div className="pi">ST</div><h3>Stakeholder / User</h3><div className="lives">Lives in · Landing → one form</div><div className="docs">Intake, requirements input</div><div className="need">Contributes once, then watches the dashboards.</div></div>
          </div>
        </section>

        {/* 2. SWIMLANE */}
        <section>
          <div className="sec-num">02</div>
          <h2 className="sec-h">Persona × Lifecycle Swimlane</h2>
          <p className="sec-sub">What each role produces as a project moves through the five PMBOK phases. Each chip is a document type in the Workspace; the exit artifact of each phase is what unlocks the next.</p>
          <div className="grid-card">
            <div className="lane">
              <div className="lh"></div>
              <div className="lh">Initiation</div><div className="lh">Planning</div><div className="lh">Execution</div><div className="lh">Monitoring &amp; Control</div><div className="lh">Closing</div>

              <div className="rl">Project Manager</div>
              <div className="ph"><span className="chip">Charter</span><span className="chip">Stakeholder Register</span></div>
              <div className="ph"><span className="chip">WBS</span><span className="chip">Schedule</span><span className="chip">Risk Register</span><span className="chip">RACI</span><span className="chip">Cost Estimate</span></div>
              <div className="ph"><span className="chip">Change Log</span></div>
              <div className="ph"><span className="chip">Status Report</span></div>
              <div className="ph"><span className="chip">Lessons &amp; Closure</span></div>

              <div className="rl">Product</div>
              <div className="ph"><span className="chip">Vision</span><span className="chip">One-Pager</span></div>
              <div className="ph"><span className="chip">PRD</span><span className="chip">Roadmap</span></div>
              <div className="ph"><span className="chip">Stories</span><span className="chip">AC / DoD</span></div>
              <div className="ph"><span className="chip ghost">roadmap updates</span></div>
              <div className="ph"><span className="emp">·</span></div>

              <div className="rl">Engineering</div>
              <div className="ph"><span className="emp">·</span></div>
              <div className="ph"><span className="chip">Design Doc</span><span className="chip">HLD</span></div>
              <div className="ph"><span className="chip">ADR</span><span className="chip">LLD</span><span className="chip">README</span><span className="chip">API Spec</span></div>
              <div className="ph"><span className="chip">Runbook</span></div>
              <div className="ph"><span className="chip ghost">migration guide</span></div>

              <div className="rl">QA</div>
              <div className="ph"><span className="emp">·</span></div>
              <div className="ph"><span className="chip">Test Strategy</span><span className="chip">Test Plan</span></div>
              <div className="ph"><span className="chip">Test Cases</span></div>
              <div className="ph"><span className="chip">Bug Reports</span><span className="chip">UAT</span></div>
              <div className="ph"><span className="chip">RTM</span></div>

              <div className="rl">SRE / Ops</div>
              <div className="ph"><span className="emp">·</span></div>
              <div className="ph"><span className="chip ghost">SLO / SLA</span></div>
              <div className="ph"><span className="chip">Runbook</span><span className="chip">On-Call</span></div>
              <div className="ph"><span className="chip">Incident Report</span></div>
              <div className="ph"><span className="chip">Postmortem</span></div>

              <div className="rl">Compliance</div>
              <div className="ph"><span className="emp">·</span></div>
              <div className="ph"><span className="chip">Quality Plan</span><span className="chip">DPIA</span></div>
              <div className="ph"><span className="chip">SOPs</span><span className="chip">Access Control</span></div>
              <div className="ph"><span className="chip">Audit Trail</span></div>
              <div className="ph"><span className="chip">Compliance Matrix</span></div>

              <div className="rl">Sponsor</div>
              <div className="ph"><span className="chip">Approves Charter</span></div>
              <div className="ph"><span className="chip ghost">approves baseline</span></div>
              <div className="ph"><span className="emp">·</span></div>
              <div className="ph"><span className="chip">Reads Portfolio / Cost</span></div>
              <div className="ph"><span className="chip">Signs off</span></div>
            </div>
          </div>
        </section>

        {/* 3. SERVICE BLUEPRINT */}
        <section>
          <div className="sec-num">03</div>
          <h2 className="sec-h">Service Blueprint — the end-user loop</h2>
          <p className="sec-sub">One pass through the system, from front door to dashboard. Front-stage is what the user sees; back-stage is what Supabase and the app do; the data line is what persists and rolls up.</p>
          <div className="grid-card">
            <div className="bp">
              <div className="laneL"></div>
              <div className="stage"><span className="n">01</span>Discover</div>
              <div className="stage"><span className="n">02</span>Enter &amp; Find</div>
              <div className="stage"><span className="n">03</span>Fill</div>
              <div className="stage"><span className="n">04</span>Tag &amp; Save</div>
              <div className="stage"><span className="n">05</span>Roll-up</div>
              <div className="stage"><span className="n">06</span>Review &amp; Iterate</div>

              <div className="laneL">User action</div>
              <div className="c">Lands, reads the value prop</div>
              <div className="c">Signs in, browses the gallery</div>
              <div className="c">Completes a form with guided examples</div>
              <div className="c">Picks a project, edits autosave</div>
              <div className="c">Opens the Planner</div>
              <div className="c">Team reads health, decides, repeats</div>

              <div className="laneL">Front-stage</div>
              <div className="c">Landing page</div>
              <div className="c">Auth + Gallery</div>
              <div className="c">Interactive form</div>
              <div className="c">Submission &amp; Project picker</div>
              <div className="c">8 dashboard pages</div>
              <div className="c">Status / Change / Risk views</div>

              <div className="laneL">Back-stage</div>
              <div className="c back">Default DB connect</div>
              <div className="c back">Supabase Auth · session</div>
              <div className="c back">Per-keystroke upsert</div>
              <div className="c back">RLS · relational + child tables</div>
              <div className="c back">Aggregation queries</div>
              <div className="c back">Filter by project_id</div>

              <div className="laneL">Data</div>
              <div className="c data">—</div>
              <div className="c data">user_id</div>
              <div className="c data">submission row</div>
              <div className="c data">project_id FK</div>
              <div className="c data">KPI tiles</div>
              <div className="c data">CPI · SPI · risk · CR</div>
            </div>
          </div>
        </section>

        {/* 4. LIFECYCLE RING */}
        <section>
          <div className="sec-num">04</div>
          <h2 className="sec-h">The Two Clocks — lifecycle through iterations</h2>
          <p className="sec-sub">A project runs the PMBOK clock once (outer ring). The product runs an iterative loop many times inside Execution (inner ring) — each turn emitting frozen records and refreshing living documents.</p>
          <div className="ring-wrap">
            <div className="ring">
              <div className="o-circle"></div>
              <div className="i-circle"></div>
              <div className="ctr"><div className="t">Inner loop runs during</div><div className="b">Execution</div></div>
              {/* outer phase nodes */}
              <div className="node pnode" style={{ left: "190px", top: "32px" }}><div className="s">01</div><div className="l">Initiation</div></div>
              <div className="node pnode" style={{ left: "330px", top: "140px" }}><div className="s">02</div><div className="l">Planning</div></div>
              <div className="node pnode" style={{ left: "276px", top: "312px" }}><div className="s">03</div><div className="l">Execution</div></div>
              <div className="node pnode" style={{ left: "104px", top: "312px" }}><div className="s">04</div><div className="l">Monitoring</div></div>
              <div className="node pnode" style={{ left: "50px", top: "140px" }}><div className="s">05</div><div className="l">Closing</div></div>
              {/* inner iteration nodes */}
              <div className="node inode" style={{ left: "190px", top: "120px" }}>Vision</div>
              <div className="node inode" style={{ left: "250px", top: "155px" }}>PRD</div>
              <div className="node inode" style={{ left: "250px", top: "225px" }}>Build</div>
              <div className="node inode" style={{ left: "190px", top: "260px" }}>Ship</div>
              <div className="node inode" style={{ left: "130px", top: "225px" }}>Learn</div>
              <div className="node inode" style={{ left: "130px", top: "155px" }}>Stories</div>
            </div>
            <div className="ring-legend">
              <p><b>Outer ring — the project clock.</b> Five PMBOK phases, traversed once. Each phase ends on an <b>exit artifact</b>: Charter → Baseline → working software → cadence reports → Lessons &amp; Closure.</p>
              <p><b>Inner ring — the product clock.</b> Vision → PRD → Stories → Build → Ship → Learn, repeated every sprint inside Execution.</p>
              <div className="lg"><span className="sw" style={{ background: "var(--ink)" }}></span><b>Frozen records</b>&nbsp;— ADR, RFC, postmortem, CR. Never edited; superseded.</div>
              <div className="lg"><span className="sw" style={{ background: "var(--accentbg)", border: "1px solid var(--accentsoft)" }}></span><b>Living documents</b>&nbsp;— README, runbook, risk register. Staleness is a defect.</div>
              <div className="lg"><span className="sw" style={{ background: "var(--accent)" }}></span><b>The Planner is the diff</b>&nbsp;— CPI/SPI trend, risk burn-down, milestone slip, per iteration.</div>
            </div>
          </div>
        </section>

        {/* 5. RACI */}
        <section>
          <div className="sec-num">05</div>
          <h2 className="sec-h">RACI — who is accountable for what</h2>
          <p className="sec-sub">Responsible · Accountable · Consulted · Informed across the key decisions and artifacts. Exactly one role is Accountable per row.</p>
          <div className="grid-card">
            <div className="raci">
              <div className="hh first">Activity / Decision</div>
              <div className="hh" title="Sponsor / Exec">Spon</div>
              <div className="hh" title="Project Manager">PM</div>
              <div className="hh" title="Product">Prod</div>
              <div className="hh" title="Engineering / Tech Lead">Eng</div>
              <div className="hh" title="QA">QA</div>
              <div className="hh" title="SRE / Ops">Ops</div>
              <div className="hh" title="Compliance">Comp</div>

              <div className="act">Authorize project (Charter)</div>
              <div className="cell"><span className="rb A">A</span></div><div className="cell"><span className="rb R">R</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb C">C</span></div>

              <div className="act">Define requirements (PRD)</div>
              <div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb A">A</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb I">I</span></div>

              <div className="act">Architecture decision (ADR)</div>
              <div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb A">A</span></div><div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb C">C</span></div>

              <div className="act">Build &amp; implement</div>
              <div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb A">A</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb R">R</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb I">I</span></div>

              <div className="act">Test &amp; UAT sign-off</div>
              <div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb A">A</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb R">R</span></div><div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb C">C</span></div>

              <div className="act">Release / deploy</div>
              <div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb A">A</span></div><div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb R">R</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb R">R</span></div><div className="cell"><span className="rb I">I</span></div>

              <div className="act">Incident response</div>
              <div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb A">A</span></div><div className="cell"><span className="rb I">I</span></div>

              <div className="act">Postmortem / RCA</div>
              <div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb A">A</span></div><div className="cell"><span className="rb C">C</span></div>

              <div className="act">Change request (CAB)</div>
              <div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb A">A</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb C">C</span></div>

              <div className="act">Risk review</div>
              <div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb A">A</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb C">C</span></div>

              <div className="act">Status reporting</div>
              <div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb A">A</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb I">I</span></div>

              <div className="act">Audit evidence / compliance</div>
              <div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb I">I</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb A">A</span></div>

              <div className="act">Project closure &amp; lessons</div>
              <div className="cell"><span className="rb A">A</span></div><div className="cell"><span className="rb R">R</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb C">C</span></div><div className="cell"><span className="rb C">C</span></div>
            </div>
          </div>
          <div className="raci-legend">
            <span><span className="rb A" style={{ marginRight: "5px" }}>A</span><b>Accountable</b> — owns the outcome</span>
            <span><span className="rb R" style={{ marginRight: "5px" }}>R</span><b>Responsible</b> — does the work</span>
            <span><span className="rb C" style={{ marginRight: "5px" }}>C</span><b>Consulted</b> — two-way input</span>
            <span><span className="rb I" style={{ marginRight: "5px" }}>I</span><b>Informed</b> — kept in the loop</span>
          </div>
        </section>
      </div>
    </>
  );
}
