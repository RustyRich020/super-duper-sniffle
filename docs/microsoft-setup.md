# Microsoft Integration Setup

## 1. Azure AD App Registration

1. Go to Azure Portal → Entra ID → App registrations → New registration
2. Name: "QQ-Studios"
3. Supported account types: "Accounts in this organizational directory only"
4. Redirect URI: Web → `https://meosdrvquwybipqjrzwv.supabase.co/auth/v1/callback`
5. After creation, note the **Application (client) ID** and **Directory (tenant) ID**
6. Go to Certificates & secrets → New client secret → note the **Value**
7. Go to API permissions → Add:
   - Microsoft Graph: `Mail.Send`, `Files.ReadWrite.All`, `ChannelMessage.Send` (Application)
   - Power BI Service: `Report.Read.All`, `Dataset.Read.All` (Delegated)
8. Click "Grant admin consent"

## 2. Supabase Auth Provider

1. Supabase Dashboard → Authentication → Providers → Azure (Microsoft)
2. Enable the provider
3. Enter the Client ID and Client Secret from step 1
4. Save

## 3. Vercel Environment Variables

Set in Vercel Dashboard → Project Settings → Environment Variables:

- `AZURE_CLIENT_ID` — from step 1
- `AZURE_CLIENT_SECRET` — from step 1
- `AZURE_TENANT_ID` — from step 1
- `PBI_WORKSPACE_ID` — Power BI workspace ID
- `PBI_REPORT_ID` — interactive report ID
- `PBI_RDL_REPORT_ID` — paginated report ID
- `GRAPH_DISTRIBUTION_EMAIL` — comma-separated recipient emails
- `GRAPH_SENDER_USER_ID` — mailbox user ID for sending
- `GRAPH_TEAMS_TEAM_ID` — Teams team ID
- `GRAPH_TEAMS_CHANNEL_ID` — Teams channel ID
- `GRAPH_SHAREPOINT_DRIVE_ID` — SharePoint drive ID

## 4. Power BI Workspace

1. Create or use a Premium/PPU workspace
2. Publish the interactive report and RDL paginated report
3. Add the Azure AD app's service principal as a workspace Member
