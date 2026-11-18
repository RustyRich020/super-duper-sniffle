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
      authorization: {
        params: {
          scope: "openid profile email",
          prompt: "select_account",
        },
      },
      profile(profile) {
        const email = String(
          profile.email || profile.preferred_username || profile.upn || "",
        )
          .trim()
          .toLowerCase();

        return {
          id: profile.sub,
          name: profile.name,
          email,
          image: null,
          tenantId: profile.tid,
        };
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  pages: { signIn: "/login", error: "/login" },
  callbacks: {
    async signIn({ user, profile }) {
      const entraProfile = profile as
        | { email?: string }
        | undefined;

      const allowed = allowedEmails();
      const identities = [
        user.email,
        entraProfile?.email,
      ]
        .map((value) => value?.trim().toLowerCase() || "")
        .filter(Boolean);

      return allowed.size > 0 && identities.some((identity) => allowed.has(identity));
    },
    async jwt({ token, profile }) {
      if (profile) {
        // The provider's authority is tenant-specific, so a successful token
        // exchange has already been restricted to this configured tenant.
        token.tenantId = required("AZURE_TENANT_ID");
      }
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
