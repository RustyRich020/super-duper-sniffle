import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/login" },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-qq-workspace-session"
          : "qq-workspace-session",
    },
  },
  callbacks: {
    authorized: ({ token }) =>
      Boolean(
        token?.workspaceAuthorized === true &&
          token.tenantId === process.env.AZURE_TENANT_ID,
      ),
  },
});

export const config = {
  matcher: [
    "/((?!api/auth|api/cron|api/distribute-report|login|_next/static|_next/image|favicon.ico|assets/).*)",
  ],
};
