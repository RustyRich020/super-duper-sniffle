import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Governance & Status Reports — QQ-Studios",
};

const GovernancePacket = dynamic(
  () => import("@/components/governance/GovernancePacket"),
  { ssr: false }
);

export default function GovernanceReportsPage() {
  return <GovernancePacket />;
}
