"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getClient, loadSavedCreds } from "@/lib/supabase";
import { domains as DOMAINS, allDefs } from "@/lib/forms-model";
import { DASHBOARD_CSS } from "./dashboard-css";

interface RecentItem {
  id: string;
  title: string;
  form_id: string;
  updated_at: string;
}

export default function Dashboard() {
  const [recent, setRecent] = useState<RecentItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadRecent = async () => {
      const creds = loadSavedCreds();
      if (!creds) { setLoaded(true); return; }
      try {
        const client = getClient(creds.url, creds.key);
        const { data: { user } } = await client.auth.getUser();
        if (!user) { setLoaded(true); return; }
        const { data } = await client
          .from("submissions")
          .select("id, title, form_id, updated_at")
          .eq("user_id", user.id)
          .order("updated_at", { ascending: false })
          .limit(10);
        if (data) setRecent(data as RecentItem[]);
      } catch { /* ignore */ }
      setLoaded(true);
    };
    loadRecent();
  }, []);

  const defs = allDefs();
  const domainCounts = DOMAINS.map((name, i) => ({
    name,
    count: defs.filter((d) => d.d === i).length,
  }));

  const timeAgo = (iso: string) => {
    const d = Date.now() - new Date(iso).getTime();
    if (d < 60000) return "just now";
    if (d < 3600000) return Math.floor(d / 60000) + "m ago";
    if (d < 86400000) return Math.floor(d / 3600000) + "h ago";
    return Math.floor(d / 86400000) + "d ago";
  };

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
          {!loaded ? (
            <div className="dash-empty">Loading...</div>
          ) : recent.length === 0 ? (
            <div className="dash-empty">
              No forms yet.{" "}
              <Link href="/#/gallery">Browse the gallery</Link> to get started.
            </div>
          ) : (
            recent.map((item) => (
              <Link key={item.id} href={`/#/${item.form_id}`} className="dash-recent-row">
                <span className="drr-form">{item.form_id}</span>
                <span className="drr-title">{item.title || "Untitled"}</span>
                <span className="drr-time">{timeAgo(item.updated_at)}</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}
