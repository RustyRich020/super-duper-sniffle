import Link from "next/link";
import type { ReactNode } from "react";
import "./service-hub.css";

const links = [
  ["/service-hub", "Overview"],
  ["/service-hub/catalog", "Service catalog"],
  ["/service-hub/requests/new", "New request"],
  ["/service-hub/requests/QQ-1042", "My requests"],
  ["/service-hub/incidents", "Incidents"],
  ["/service-hub/knowledge", "Knowledge base"],
  ["/service-hub/admin", "Administration"],
];

export default function ServiceHubLayout({ children }: { children: ReactNode }) {
  return (
    <div className="sh-app">
      <aside className="sh-side" aria-label="Service Hub navigation">
        <div className="sh-side-kicker">QQ Studios</div>
        <div className="sh-side-title">Service Hub</div>
        <nav>
          {links.map(([href, label]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </nav>
        <div className="sh-side-foot">
          <span className="sh-status-dot" /> Systems operational
        </div>
      </aside>
      <main className="sh-main">{children}</main>
    </div>
  );
}
