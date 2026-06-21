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

async function getGraphToken(): Promise<string> {
  const cca = getCca();
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
): Promise<void> {
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
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`sendMail failed (${res.status}): ${err}`);
  }
}

export async function postToTeams(
  teamId: string,
  channelId: string,
  message: string,
  pdfBytes: Buffer,
  filename: string
): Promise<void> {
  const token = await getGraphToken();

  // Get channel files folder
  const folderRes = await fetch(
    `https://graph.microsoft.com/v1.0/teams/${teamId}/channels/${channelId}/filesFolder`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!folderRes.ok) throw new Error(`Get filesFolder failed: ${folderRes.status}`);
  const folder = await folderRes.json();
  const driveId = folder.parentReference.driveId;
  const folderId = folder.id;

  // Upload PDF
  const fileRes = await fetch(
    `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${folderId}:/${filename}:/content`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/pdf",
      },
      body: pdfBytes as unknown as BodyInit,
    }
  );
  if (!fileRes.ok) throw new Error(`Teams file upload failed: ${fileRes.status}`);
  const fileData = await fileRes.json();

  // Post message with attachment reference
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
): Promise<{ webUrl: string }> {
  const token = await getGraphToken();
  const res = await fetch(
    `https://graph.microsoft.com/v1.0/drives/${driveId}/root:/${folderPath}/${filename}:/content`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/pdf",
      },
      body: pdfBytes as unknown as BodyInit,
    }
  );
  if (!res.ok) throw new Error(`SharePoint upload failed: ${res.status}`);
  return res.json();
}
