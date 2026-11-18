# Workspace authentication hardening deployment gate

Status: locally implemented and verified; not deployed.

## Required Vercel environment variables

- `AZURE_CLIENT_ID`: application ID for the single-tenant QQ Studios Entra registration.
- `AZURE_CLIENT_SECRET`: current client-secret value stored only in Vercel.
- `AZURE_TENANT_ID`: directory ID for `QQStudios.onmicrosoft.com`.
- `NEXTAUTH_URL`: `https://workspace.qq-studios.com`.
- `NEXTAUTH_SECRET`: at least 32 cryptographically random bytes, stored only in Vercel.
- `WORKSPACE_ALLOWED_EMAILS`: comma-separated approved identities. The application denies every sign-in when this variable is empty.

Initial allowlist:

```text
richard@QQStudios.onmicrosoft.com
```

## Entra app registration

Configure the registration as single tenant and add this Web redirect URI:

```text
https://workspace.qq-studios.com/api/auth/callback/azure-ad
```

Do not retain the obsolete Supabase callback as the interactive workspace sign-in path.

## Release gates

1. Keep Vercel Authentication set to **All Deployments**.
2. Deploy to a protected preview first.
3. Confirm an unapproved tenant user is denied.
4. Confirm an approved QQ Studios user can sign in and sign out.
5. Confirm signed-out requests to every page and sensitive API redirect to `/login`.
6. Confirm no client/governance phrases occur in `.next/static`.
7. Move form persistence behind authenticated server routes before restoring cloud save.
8. Remove Vercel production protection only after the preceding checks pass in production.

## Verified locally

- Production build succeeds.
- `/`, `/dashboard`, `/governance-reports`, and `/api/embed-token` redirect signed-out clients to `/login`.
- `/login` returns successfully without a session.
- Email/password registration, magic links, and Supabase OAuth entry points were removed from the Forms interface.
- The governance client packet is no longer imported into the route bundle.
- Sensitive phrase scans returned zero matches in `.next/static`.

## Remaining data-layer work

The legacy Forms client still contains optional browser-to-Supabase persistence code. It is not an approved production data path. Keep cloud persistence disabled until it is replaced by authenticated server routes with per-user authorization and verified row-level policies.
