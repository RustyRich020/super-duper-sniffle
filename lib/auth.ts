import type { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required authentication setting: ${name}`);
  return value;
}

function allowedEmails(): Set<string> {
  return new Set(
    (process.env.WORKSPACE_ALLOWED_EMAILS || "")
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean),
  );
}

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: required("AZURE_CLIENT_ID"),
      clientSecret: required("AZURE_CLIENT_SECRET"),
      tenantId: required("AZURE_TENANT_ID"),
      authorization: { params: { scope: "openid profile email" } },
    }),
  ],
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  pages: { signIn: "/login", error: "/login" },
  callbacks: {
    async signIn({ user, profile }) {
      const expectedTenant = required("AZURE_TENANT_ID").toLowerCase();
      const tenant = String((profile as { tid?: string } | undefined)?.tid || "").toLowerCase();
      if (!tenant || tenant !== expectedTenant) return false;

      const allowed = allowedEmails();
      const email = user.email?.trim().toLowerCase() || "";
      return allowed.size > 0 && allowed.has(email);
    },
    async jwt({ token, profile }) {
      if (profile) token.tenantId = (profile as { tid?: string }).tid;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as typeof session.user & { tenantId?: string }).tenantId =
          token.tenantId as string | undefined;
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" ? "__Secure-qq-workspace-session" : "qq-workspace-session",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  secret: required("NEXTAUTH_SECRET"),
};
