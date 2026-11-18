import Link from "next/link";

const requests = [
  ["QQ-1042", "Workspace access for new contributor", "Access", "In progress"],
  ["QQ-1039", "Power BI report refresh", "Reporting", "Waiting"],
  ["QQ-1036", "Client portal document issue", "Client support", "Resolved"],
];

export default function ServiceHubPage() {
  return <>
    <div className="sh-eyebrow">Operations · Service delivery</div>
    <h1 className="sh-title">How can we help?</h1>
    <p className="sh-lede">One place for support requests, incidents, knowledge, and service ownership—built around the way QQ Studios delivers work.</p>
    <div className="sh-actions"><Link className="sh-button primary" href="/service-hub/requests/new">Start a request</Link><Link className="sh-button" href="/service-hub/knowledge">Search knowledge</Link></div>
    <section className="sh-grid">
      <article className="sh-card gold"><h2>Open requests</h2><div className="sh-metric">08</div><div className="sh-metric-label">2 awaiting your response</div></article>
      <article className="sh-card"><h2>Active incidents</h2><div className="sh-metric">01</div><div className="sh-metric-label">No critical service impact</div></article>
      <article className="sh-card"><h2>Knowledge health</h2><div className="sh-metric">94%</div><div className="sh-metric-label">Articles reviewed on schedule</div></article>
    </section>
    <section className="sh-section"><div className="sh-section-head"><h2>Recent requests</h2><Link className="sh-button" href="/service-hub/requests/QQ-1042">View queue</Link></div><table className="sh-table"><thead><tr><th>Request</th><th>Summary</th><th>Service</th><th>Status</th></tr></thead><tbody>{requests.map(r=><tr key={r[0]}><td><Link href={`/service-hub/requests/${r[0]}`} style={{color:"#e7c66e"}}>{r[0]}</Link></td><td>{r[1]}</td><td>{r[2]}</td><td><span className={`sh-chip ${r[3]==="Resolved"?"green":""}`}>{r[3]}</span></td></tr>)}</tbody></table></section>
  </>;
}
