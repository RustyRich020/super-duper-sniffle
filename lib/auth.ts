import type { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required authentication setting: ${name}`);
  return value;
}

function configuredSet(name: string): Set<string> {
  return new Set(
    (process.env[name] || "")
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean),
  );
}

type EntraProfile = {
  sub: string;
  name?: string;
  email?: string;
  preferred_username?: string;
  upn?: string;
  tid?: string;
  roles?: string[];
  groups?: string[];
};

function hasWorkspaceAccess(profile: EntraProfile): boolean {
  const allowedRoles = configuredSet("WORKSPACE_ALLOWED_APP_ROLES");
  const allowedGroups = configuredSet("WORKSPACE_ALLOWED_GROUP_IDS");
  if (allowedRoles.size === 0 && allowedGroups.size === 0) return false;

  const roles = (profile.roles || []).map((value) => value.toLowerCase());
  const groups = (profile.groups || []).map((value) => value.toLowerCase());
  return (
    roles.some((role) => allowedRoles.has(role)) ||
    groups.some((group) => allowedGroups.has(group))
  );
}

export const authOptions: NextAuthOptions = {
  logger: {
    error(code, metadata) {
      const error = (metadata instanceof Error ? metadata : metadata?.error) as
        | (Error & { code?: string; type?: string; error?: string })
        | undefined;
      console.error(
        JSON.stringify({
          event: "next-auth-error",
          code,
          errorName: error?.name || null,
          errorCode: error?.code || error?.error || null,
          errorType: error?.type || null,
        }),
      );
    },
    warn(code) {
      console.warn(JSON.stringify({ event: "next-auth-warning", code }));
    },
    debug() {},
  },
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
      profile(profile: EntraProfile) {
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
          roles: profile.roles || [],
          groups: profile.groups || [],
        };
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  pages: { signIn: "/login", error: "/login" },
  callbacks: {
    async signIn({ profile }) {
      const entraProfile = profile as EntraProfile | undefined;
      return Boolean(
        entraProfile &&
          entraProfile.tid === required("AZURE_TENANT_ID") &&
          hasWorkspaceAccess(entraProfile),
      );
    },
    async jwt({ token, profile }) {
      if (profile) {
        // The provider's authority is tenant-specific, so a successful token
        // exchange has already been restricted to this configured tenant.
        token.tenantId = required("AZURE_TENANT_ID");
        token.workspaceAuthorized = hasWorkspaceAccess(profile as EntraProfile);
        token.workspaceRoles = (profile as EntraProfile).roles || [];
        token.workspaceGroups = (profile as EntraProfile).groups || [];
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as typeof session.user & { tenantId?: string }).tenantId =
          token.tenantId as string | undefined;
        (session.user as typeof session.user & { roles?: string[] }).roles =
          (token.workspaceRoles as string[] | undefined) || [];
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
