# Microsoft Integration — Design Spec

**Sub-project:** 3 of 3 (Semantic Model + Reports → RDL Paginated → **Microsoft Integration**)
**Date:** 2026-06-20
**Status:** Approved

## Goal

Integrate Microsoft services into the QQ-Studios web app: Entra ID federated sign-in via Supabase Auth, Power BI Embedded report viewing (app owns data), and Graph API distribution of governance packets to Email, Teams, and SharePoint on a Vercel Cron schedule.

## 1. Entra ID Federated Auth

Add Microsoft as an OAuth provider in Supabase Auth alongside the existing email/password flow.

### Azure AD App Registration

- Register a single app in Entra ID that serves embedding, Graph API, and OAuth
- **Client ID** + **Client Secret** generated in the Azure portal
- **Redirect URI:** `https://meosdrvquwybipqjrzwv.supabase.co/auth/v1/callback`
- **API Permissions:**
  - `Power BI Service` → `Report.Read.All`, `Dataset.Read.All`
  - `Microsoft Graph` → `Mail.Send`, `Files.ReadWrite.All`, `ChannelMessage.Send`
- Admin consent granted for the tenant

### Supabase Configuration

- Supabase Dashboard → Auth → Providers → enable **Azure (Microsoft)**
- Enter the client ID and client secret from the app registration
- The Supabase session carries the Microsoft access token in `session.provider_token`

### Web App Changes

- Add a "Sign in with Microsoft" button on the landing page
- Button calls `supabase.auth.signInWithOAuth({ provider: 'azure', options: { redirectTo: window.location.origin } })`
- No changes to RLS policies, session management, or the existing email/password flow
- The landing page's `initLanding()` method gets one new button wired to the OAuth call

### Files Changed

- Modify: `components/forms/FormsApp.tsx` — add Microsoft sign-in button in landing JSX + wire onclick in `initLanding()`
- Modify: `components/forms/forms-css.ts` — add `.lnd-microsoft` button style (outlined, with Microsoft icon)

## 2. Power BI Embedded (App Owns Data)

Embed the 7 interactive report pages inside the web app. Authenticated users view reports without Power BI licenses.

### Token Flow

```
Browser                    Next.js API               Azure AD / Power BI
  │                           │                           │
  ├─ GET /api/embed-token ──→ │                           │
  │   (with Supabase cookie)  ├─ POST /oauth2/token ────→ │
  │                           │   (client_credentials)     │
  │                           │ ←── app access token ─────┤
  │                           ├─ POST /GenerateToken ───→ │
  │                           │   (Power BI REST API)      │
  │                           │ ←── embed token ──────────┤
  │ ←── { embedToken,        │                           │
  │       embedUrl } ────────┤                           │
  ├─ render <PowerBIEmbed /> │                           │
```

### Server-Side: `lib/powerbi.ts`

```typescript
import { ConfidentialClientApplication } from "@azure/msal-node";

const msalConfig = {
  auth: {
    clientId: process.env.AZURE_CLIENT_ID!,
    clientSecret: process.env.AZURE_CLIENT_SECRET!,
    authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
  },
};

const cca = new ConfidentialClientApplication(msalConfig);

export async function getEmbedToken(reportId: string, workspaceId: string) {
  const authResult = await cca.acquireTokenByClientCredential({
    scopes: ["https://analysis.windows.net/powerbi/api/.default"],
  });
  if (!authResult) throw new Error("Failed to acquire Power BI token");

  const embedRes = await fetch(
    `https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/reports/${reportId}/GenerateToken`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authResult.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessLevel: "View" }),
    }
  );
  if (!embedRes.ok) throw new Error(`Embed token failed: ${embedRes.status}`);
  const embedData = await embedRes.json();

  const reportRes = await fetch(
    `https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/reports/${reportId}`,
    {
      headers: { Authorization: `Bearer ${authResult.accessToken}` },
    }
  );
  const reportData = await reportRes.json();

  return {
    embedToken: embedData.token,
    embedUrl: reportData.embedUrl,
    expiry: embedData.expiration,
  };
}
```

### API Route: `app/api/embed-token/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getEmbedToken } from "@/lib/powerbi";

export async function GET(req: NextRequest) {
  // Verify Supabase session
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: { cookie: req.headers.get("cookie") || "" },
      },
    }
  );
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const token = await getEmbedToken(
    process.env.PBI_REPORT_ID!,
    process.env.PBI_WORKSPACE_ID!
  );
  return NextResponse.json(token);
}
```

### Client Component: `components/PowerBIEmbed.tsx`

```typescript
"use client";

import { useEffect, useState } from "react";
import { PowerBIEmbed as PBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

interface EmbedConfig {
  embedToken: string;
  embedUrl: string;
  expiry: string;
}

export default function PowerBIEmbed() {
  const [config, setConfig] = useState<EmbedConfig | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/embed-token")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to get embed token");
        return r.json();
      })
      .then(setConfig)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="pbi-error">Unable to load report: {error}</div>;
  if (!config) return <div className="pbi-loading">Loading report...</div>;

  return (
    <PBIEmbed
      embedConfig={{
        type: "report",
        embedUrl: config.embedUrl,
        accessToken: config.embedToken,
        tokenType: models.TokenType.Embed,
        settings: {
          panes: { filters: { visible: false } },
          background: models.BackgroundType.Transparent,
          navContentPaneEnabled: true,
        },
      }}
      cssClassName="pbi-frame"
    />
  );
}
```

### Report Page: `app/reports/page.tsx`

```typescript
import type { Metadata } from "next";
import PowerBIEmbed from "@/components/PowerBIEmbed";

export const metadata: Metadata = {
  title: "Reports — QQ-Studios",
};

const CSS = `
  .reports-wrap { max-width: 1400px; margin: 0 auto; padding: 24px 36px; }
  .reports-title { font-family: 'Spectral', serif; font-weight: 600; font-size: 34px;
    letter-spacing: -0.5px; margin: 0 0 6px; color: #222226; }
  .reports-sub { font-family: 'Spectral', serif; font-style: italic; font-size: 15px;
    color: #6A6A6F; margin: 0 0 24px; }
  .pbi-frame { width: 100%; height: calc(100vh - 180px); border: 1px solid #E3E3DE;
    border-radius: 12px; overflow: hidden; }
  .pbi-loading, .pbi-error { font-family: 'IBM Plex Sans', sans-serif; font-size: 14px;
    color: #6A6A6F; padding: 48px; text-align: center; }
  .pbi-error { color: #C2603F; }
`;

export default function ReportsPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="reports-wrap">
        <h1 className="reports-title">Reports</h1>
        <p className="reports-sub">Interactive Power BI governance and planner dashboards</p>
        <PowerBIEmbed />
      </div>
    </>
  );
}
```

### NavBar Update

Add "Reports" to the route list in `components/NavBar.tsx`:

```typescript
const ROUTES = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/", label: "Forms" },
  { href: "/notebook", label: "Notebook" },
  { href: "/workbook", label: "Workbook" },
  { href: "/operating-model", label: "Operating Model" },
  { href: "/governance-reports", label: "Governance" },
  { href: "/reports", label: "Reports" },
];
```

## 3. Graph API Distribution

Three channels for sending the governance packet PDF on a schedule.

### Server-Side: `lib/graph.ts`

```typescript
import { ConfidentialClientApplication } from "@azure/msal-node";

const msalConfig = {
  auth: {
    clientId: process.env.AZURE_CLIENT_ID!,
    clientSecret: process.env.AZURE_CLIENT_SECRET!,
    authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
  },
};

const cca = new ConfidentialClientApplication(msalConfig);

async function getGraphToken() {
  const result = await cca.acquireTokenByClientCredential({
    scopes: ["https://graph.microsoft.com/.default"],
  });
  if (!result) throw new Error("Failed to acquire Graph token");
  return result.accessToken;
}

export async function sendEmail(
  recipients: string[],
  subject: string,
  body: string,
  pdfBase64: string,
  filename: string,
  senderUserId: string
) {
  const token = await getGraphToken();
  const res = await fetch(
    `https://graph.microsoft.com/v1.0/users/${senderUserId}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject,
          body: { contentType: "HTML", content: body },
          toRecipients: recipients.map((email) => ({
            emailAddress: { address: email },
          })),
          attachments: [
            {
              "@odata.type": "#microsoft.graph.fileAttachment",
              name: filename,
              contentType: "application/pdf",
              contentBytes: pdfBase64,
            },
          ],
        },
      }),
    }
  );
  if (!res.ok) throw new Error(`sendMail failed: ${res.status}`);
}

export async function postToTeams(
  teamId: string,
  channelId: string,
  message: string,
  pdfBytes: Buffer,
  filename: string
) {
  const token = await getGraphToken();

  // Upload PDF to channel files
  const uploadRes = await fetch(
    `https://graph.microsoft.com/v1.0/teams/${teamId}/channels/${channelId}/filesFolder`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const folder = await uploadRes.json();
  const driveId = folder.parentReference.driveId;
  const folderId = folder.id;

  const fileRes = await fetch(
    `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${folderId}:/${filename}:/content`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/pdf",
      },
      body: pdfBytes,
    }
  );
  if (!fileRes.ok) throw new Error(`Teams file upload failed: ${fileRes.status}`);
  const fileData = await fileRes.json();

  // Post message with file reference
  const msgRes = await fetch(
    `https://graph.microsoft.com/v1.0/teams/${teamId}/channels/${channelId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: { contentType: "html", content: message },
        attachments: [
          {
            id: fileData.id,
            contentType: "reference",
            contentUrl: fileData.webUrl,
            name: filename,
          },
        ],
      }),
    }
  );
  if (!msgRes.ok) throw new Error(`Teams message failed: ${msgRes.status}`);
}

export async function uploadToSharePoint(
  driveId: string,
  folderPath: string,
  filename: string,
  pdfBytes: Buffer
) {
  const token = await getGraphToken();
  const res = await fetch(
    `https://graph.microsoft.com/v1.0/drives/${driveId}/root:/${folderPath}/${filename}:/content`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/pdf",
      },
      body: pdfBytes,
    }
  );
  if (!res.ok) throw new Error(`SharePoint upload failed: ${res.status}`);
  return res.json();
}
```

### PDF Generation: Power BI Export API

The distribute route uses the Power BI REST API to export the published RDL as PDF:

```typescript
export async function exportRdlToPdf(
  workspaceId: string,
  reportId: string
): Promise<Buffer> {
  const cca = new ConfidentialClientApplication(msalConfig);
  const authResult = await cca.acquireTokenByClientCredential({
    scopes: ["https://analysis.windows.net/powerbi/api/.default"],
  });
  if (!authResult) throw new Error("Failed to acquire PBI token");
  const token = authResult.accessToken;

  // Start export
  const exportRes = await fetch(
    `https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/reports/${reportId}/ExportTo`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ format: "PDF" }),
    }
  );
  if (!exportRes.ok) throw new Error(`ExportTo failed: ${exportRes.status}`);
  const exportData = await exportRes.json();
  const exportId = exportData.id;

  // Poll for completion (max 5 minutes)
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 10000));
    const statusRes = await fetch(
      `https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/reports/${reportId}/exports/${exportId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const statusData = await statusRes.json();
    if (statusData.status === "Succeeded") {
      const fileRes = await fetch(
        `https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/reports/${reportId}/exports/${exportId}/file`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return Buffer.from(await fileRes.arrayBuffer());
    }
    if (statusData.status === "Failed") {
      throw new Error(`Export failed: ${JSON.stringify(statusData)}`);
    }
  }
  throw new Error("Export timed out after 5 minutes");
}
```

### Distribute Route: `app/api/distribute-report/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { exportRdlToPdf } from "@/lib/powerbi";
import { sendEmail, postToTeams, uploadToSharePoint } from "@/lib/graph";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date().toISOString().split("T")[0];
  const filename = `Governance-Packet-${today}.pdf`;

  // 1. Export RDL to PDF
  const pdfBytes = await exportRdlToPdf(
    process.env.PBI_WORKSPACE_ID!,
    process.env.PBI_RDL_REPORT_ID!
  );
  const pdfBase64 = pdfBytes.toString("base64");

  const results: Record<string, string> = {};

  // 2. Email
  try {
    const recipients = (process.env.GRAPH_DISTRIBUTION_EMAIL || "").split(",").filter(Boolean);
    if (recipients.length) {
      await sendEmail(
        recipients,
        `Governance Packet — ${today}`,
        `<p>Attached is the weekly governance packet generated on ${today}.</p><p>— QQ-Studios</p>`,
        pdfBase64,
        filename,
        process.env.GRAPH_SENDER_USER_ID || ""
      );
      results.email = "sent";
    }
  } catch (e) {
    results.email = `failed: ${(e as Error).message}`;
  }

  // 3. Teams
  try {
    const teamId = process.env.GRAPH_TEAMS_TEAM_ID;
    const channelId = process.env.GRAPH_TEAMS_CHANNEL_ID;
    if (teamId && channelId) {
      await postToTeams(
        teamId,
        channelId,
        `<p><strong>Governance Packet — ${today}</strong></p><p>Weekly governance and status report package.</p>`,
        pdfBytes,
        filename
      );
      results.teams = "posted";
    }
  } catch (e) {
    results.teams = `failed: ${(e as Error).message}`;
  }

  // 4. SharePoint
  try {
    const driveId = process.env.GRAPH_SHAREPOINT_DRIVE_ID;
    if (driveId) {
      await uploadToSharePoint(driveId, "Governance Reports", filename, pdfBytes);
      results.sharepoint = "uploaded";
    }
  } catch (e) {
    results.sharepoint = `failed: ${(e as Error).message}`;
  }

  return NextResponse.json({ date: today, filename, results });
}
```

### Cron Handler: `app/api/cron/distribute/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(new URL("/api/distribute-report", req.url), {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.CRON_SECRET}` },
  });
  const data = await res.json();
  return NextResponse.json(data);
}
```

### Vercel Cron: `vercel.json`

```json
{
  "crons": [
    {
      "path": "/api/cron/distribute",
      "schedule": "0 6 * * 1"
    }
  ]
}
```

Weekly on Monday at 06:00 UTC.

## New Dependencies

| Package | Purpose |
|---------|---------|
| `powerbi-client-react` | Official Power BI React embedding library |
| `@azure/msal-node` | Server-side MSAL for acquiring app tokens (Power BI + Graph) |

## Environment Variables (Vercel)

| Variable | Description |
|----------|-------------|
| `AZURE_CLIENT_ID` | Entra app registration client ID |
| `AZURE_CLIENT_SECRET` | Entra app registration client secret |
| `AZURE_TENANT_ID` | Entra tenant ID |
| `PBI_WORKSPACE_ID` | Power BI workspace containing published reports |
| `PBI_REPORT_ID` | Interactive report ID (for embedding) |
| `PBI_RDL_REPORT_ID` | Published RDL report ID (for PDF export) |
| `GRAPH_DISTRIBUTION_EMAIL` | Comma-separated recipient emails |
| `GRAPH_SENDER_USER_ID` | User ID or UPN for sending emails |
| `GRAPH_TEAMS_TEAM_ID` | Teams team ID |
| `GRAPH_TEAMS_CHANNEL_ID` | Teams channel ID |
| `GRAPH_SHAREPOINT_DRIVE_ID` | SharePoint document library drive ID |
| `CRON_SECRET` | Auto-set by Vercel for cron authentication |

## File Structure (new/modified)

```
super-duper-sniffle/
├── app/
│   ├── api/
│   │   ├── embed-token/route.ts          (new)
│   │   ├── distribute-report/route.ts    (new)
│   │   └── cron/distribute/route.ts      (new)
│   └── reports/page.tsx                   (new)
├── components/
│   ├── PowerBIEmbed.tsx                   (new)
│   ├── NavBar.tsx                         (modify — add Reports link)
│   └── forms/
│       ├── FormsApp.tsx                   (modify — Microsoft sign-in button)
│       └── forms-css.ts                   (modify — .lnd-microsoft style)
├── lib/
│   ├── powerbi.ts                         (new)
│   └── graph.ts                           (new)
├── vercel.json                            (new)
└── package.json                           (modify — add 2 deps)
```

## Constraints

- Two new npm dependencies: `powerbi-client-react`, `@azure/msal-node`
- Azure AD app registration required with admin consent
- Power BI Premium or PPU workspace required for embedding and RDL export
- Supabase Microsoft OAuth provider must be enabled in dashboard (manual step)
- All secrets stored in Vercel env vars, never in code
- Embed token API route requires authenticated Supabase session
- Cron and distribute routes require `CRON_SECRET` header
- Graph API uses app-level permissions (client_credentials flow) for unattended cron execution
- `ExportTo` API has rate limits (Power BI Service) — one export at a time per report
- Vercel Cron on free tier supports daily; pro tier supports any cron expression
- Verification: `npm run lint && npm run build` for code changes; manual testing for Azure/Graph integration
