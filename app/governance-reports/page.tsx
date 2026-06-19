// Theragen Governance Reports — paginated A4 governance packet (cover,
// Executive Summary, five reports) ported from the fixed-sheet prototype.
// The whole packet is built imperatively by the GovernancePacket client
// component on mount; see components/governance/.
import GovernancePacket from "../../components/governance/GovernancePacket";

export const metadata = {
  title: "Governance & Status Reports — QQ-Studios",
};

export default function GovernanceReportsPage() {
  return <GovernancePacket />;
}
