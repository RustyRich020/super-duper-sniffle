import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Governance & Status Reports — QQ-Studios",
};

export default function GovernanceReportsPage() {
  return (
    <main style={{ minHeight: "calc(100vh - 56px)", padding: "64px 7vw", background: "#111214", color: "#f2f2ef" }}>
      <section style={{ maxWidth: 760, borderTop: "1px solid #b99853", paddingTop: 28 }}>
        <p style={{ color: "#d4b46d", letterSpacing: ".16em", textTransform: "uppercase", fontSize: 12 }}>Governance workspace</p>
        <h1 style={{ margin: "10px 0 16px", fontFamily: "Spectral, serif", fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 1.02 }}>
          Secured report access
        </h1>
        <p style={{ maxWidth: 650, color: "#b9b9b4", fontSize: 18, lineHeight: 1.65 }}>
          Governance reports are temporarily unavailable while their data source is moved behind the authenticated server API. No reference or client data is included in this page bundle.
        </p>
        <p style={{ marginTop: 26, color: "#8f908a", fontSize: 13 }}>
          Access will return after tenant authorization, row-level controls, and signed-out regression tests pass.
        </p>
      </section>
    </main>
  );
}
