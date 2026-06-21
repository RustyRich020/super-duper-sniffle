import { ConfidentialClientApplication } from "@azure/msal-node";

const msalConfig = {
  auth: {
    clientId: process.env.AZURE_CLIENT_ID || "",
    clientSecret: process.env.AZURE_CLIENT_SECRET || "",
    authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID || ""}`,
  },
};

let _cca: ConfidentialClientApplication | null = null;
function getCca() {
  if (!_cca) _cca = new ConfidentialClientApplication(msalConfig);
  return _cca;
}

export async function getEmbedToken(reportId: string, workspaceId: string) {
  const cca = getCca();
  const authResult = await cca.acquireTokenByClientCredential({
    scopes: ["https://analysis.windows.net/powerbi/api/.default"],
  });
  if (!authResult) throw new Error("Failed to acquire Power BI token");

  const headers = {
    Authorization: `Bearer ${authResult.accessToken}`,
    "Content-Type": "application/json",
  };

  const embedRes = await fetch(
    `https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/reports/${reportId}/GenerateToken`,
    { method: "POST", headers, body: JSON.stringify({ accessLevel: "View" }) }
  );
  if (!embedRes.ok) throw new Error(`Embed token failed: ${embedRes.status}`);
  const embedData = await embedRes.json();

  const reportRes = await fetch(
    `https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/reports/${reportId}`,
    { headers: { Authorization: `Bearer ${authResult.accessToken}` } }
  );
  if (!reportRes.ok) throw new Error(`Report metadata failed: ${reportRes.status}`);
  const reportData = await reportRes.json();

  return {
    embedToken: embedData.token,
    embedUrl: reportData.embedUrl,
    expiry: embedData.expiration,
  };
}

export async function exportRdlToPdf(workspaceId: string, reportId: string): Promise<Buffer> {
  const cca = getCca();
  const authResult = await cca.acquireTokenByClientCredential({
    scopes: ["https://analysis.windows.net/powerbi/api/.default"],
  });
  if (!authResult) throw new Error("Failed to acquire PBI token");
  const token = authResult.accessToken;

  const exportRes = await fetch(
    `https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/reports/${reportId}/ExportTo`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ format: "PDF" }),
    }
  );
  if (!exportRes.ok) throw new Error(`ExportTo failed: ${exportRes.status}`);
  const exportData = await exportRes.json();
  const exportId = exportData.id;

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
