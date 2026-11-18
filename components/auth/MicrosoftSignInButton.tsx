"use client";

import { signIn } from "next-auth/react";

export function MicrosoftSignInButton({ callbackUrl }: { callbackUrl: string }) {
  return (
    <button
      type="button"
      onClick={() => signIn("azure-ad", { callbackUrl })}
      style={{
        display: "block",
        width: "100%",
        marginTop: 24,
        padding: "13px 18px",
        border: 0,
        borderRadius: 8,
        textAlign: "center",
        color: "#151515",
        background: "#d8b969",
        font: "inherit",
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      Continue with Microsoft
    </button>
  );
}
