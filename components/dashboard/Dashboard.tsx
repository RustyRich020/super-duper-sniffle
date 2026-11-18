"use client";

import Link from "next/link";
import { domains as DOMAINS, allDefs } from "@/lib/forms-model";
import { DASHBOARD_CSS } from "./dashboard-css";

export default function Dashboard() {
  const defs = allDefs();
  const domainCounts = DOMAINS.map((name, i) => ({
    name,
    count: defs.filter((d) => d.d === i).length,
  }));

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: DASHBOARD_CSS }} />
      <div className="dash">
        <h1 className="dash-title">Dashboard</h1>
        <p className="dash-sub">Your workspace at a glance</p>

        <div className="dash-section-label">Quick Access</div>
        <div className="dash-quick">
          {domainCounts.map((d) => (
            <Link key={d.name} href="/#/gallery" className="dash-qcard">
              <h3>{d.name}</h3>
              <p>Document templates for {d.name.toLowerCase()}</p>
              <div className="qc-count">{d.count} forms</div>
            </Link>
          ))}
          <Link href="/notebook" className="dash-qcard">
            <h3>Reference Book</h3>
            <p>Eight chapters of documentation guidance</p>
            <div className="qc-count">8 chapters</div>
          </Link>
          <Link href="/#/planner" className="dash-qcard">
            <h3>Project Planner</h3>
            <p>PMBOK dashboard with KPIs and risk tracking</p>
            <div className="qc-count">Live data</div>
          </Link>
        </div>

        <div className="dash-section-label">Recent Activity</div>
        <div className="dash-recent">
          <div className="dash-recent-head">Your forms</div>
          <div className="dash-empty">
            Cloud activity is disabled while the persistence layer is moved behind the authenticated server API.{" "}
            <Link href="/#/gallery">Browse the local templates</Link>.
          </div>
        </div>
      </div>
    </>
  );
}
