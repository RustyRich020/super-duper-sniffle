import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Reports — QQ-Studios",
};

const PowerBIEmbed = dynamic(() => import("@/components/PowerBIEmbed"), {
  ssr: false,
});

export default function ReportsPage() {
  return (
    <div className="reports-wrap">
      <h1 className="reports-title">Reports</h1>
      <p className="reports-sub">Interactive Power BI governance and planner dashboards</p>
      <PowerBIEmbed />
    </div>
  );
}
