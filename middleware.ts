import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/login" },
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
