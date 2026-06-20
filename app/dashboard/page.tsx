import type { Metadata } from "next";
import Dashboard from "@/components/dashboard/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard — QQ-Studios",
};

export default function DashboardPage() {
  return <Dashboard />;
}
