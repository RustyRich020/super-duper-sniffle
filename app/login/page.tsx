import { MicrosoftSignInButton } from "@/components/auth/MicrosoftSignInButton";

export const metadata = { title: "Secure sign in — QQ-Studios" };

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { error?: string; callbackUrl?: string };
}) {
  const denied = Boolean(searchParams?.error);
  const requestedCallback = searchParams?.callbackUrl;
  const callbackUrl =
    requestedCallback?.startsWith("/") && !requestedCallback.startsWith("//")
      ? requestedCallback
      : "/";
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "#111214", color: "#f4f4f2" }}>
      <section style={{ width: "min(430px, 100%)", border: "1px solid #4a4335", borderRadius: 16, padding: 32, background: "#191a1d" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/qq-logo.png" alt="QQ Studios" style={{ width: 74, height: "auto", marginBottom: 24 }} />
        <p style={{ color: "#d4b46d", letterSpacing: ".16em", textTransform: "uppercase", fontSize: 12 }}>Protected workspace</p>
        <h1 style={{ margin: "10px 0 12px", fontFamily: "Spectral, serif", fontSize: 34 }}>Sign in with your QQ Studios account</h1>
        <p style={{ color: "#b9b9b4", lineHeight: 1.6 }}>Access is limited to approved users in the QQStudios Microsoft tenant.</p>
        {denied && <p role="alert" style={{ color: "#efb0a9" }}>This account is not approved for workspace access.</p>}
        <MicrosoftSignInButton callbackUrl={callbackUrl} />
        <p style={{ marginTop: 18, color: "#858681", fontSize: 12 }}>No public registration is available.</p>
      </section>
    </main>
  );
}
