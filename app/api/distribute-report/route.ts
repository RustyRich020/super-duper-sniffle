import { NextRequest, NextResponse } from "next/server";
import { exportRdlToPdf } from "@/lib/powerbi";
import { sendEmail, postToTeams, uploadToSharePoint } from "@/lib/graph";

export const maxDuration = 300; // 5 min timeout for PDF export polling

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date().toISOString().split("T")[0];
  const filename = `Governance-Packet-${today}.pdf`;
  const results: Record<string, string> = {};

  // 1. Export RDL to PDF
  let pdfBytes: Buffer;
  try {
    pdfBytes = await exportRdlToPdf(
      process.env.PBI_WORKSPACE_ID!,
      process.env.PBI_RDL_REPORT_ID!
    );
    results.export = "success";
  } catch (e) {
    return NextResponse.json(
      { error: `PDF export failed: ${(e as Error).message}`, results },
      { status: 502 }
    );
  }
  const pdfBase64 = pdfBytes.toString("base64");

  // 2. Email
  try {
    const recipients = (process.env.GRAPH_DISTRIBUTION_EMAIL || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (recipients.length) {
      await sendEmail(
        recipients,
        `Governance Packet — ${today}`,
        `<p>Attached is the weekly governance packet generated on ${today}.</p><p style="color:#6A6A6F;font-size:12px;">— QQ-Studios Documentation Workspace</p>`,
        pdfBase64,
        filename,
        process.env.GRAPH_SENDER_USER_ID || ""
      );
      results.email = "sent";
    } else {
      results.email = "skipped (no recipients)";
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
    } else {
      results.teams = "skipped (no team/channel configured)";
    }
  } catch (e) {
    results.teams = `failed: ${(e as Error).message}`;
  }

  // 4. SharePoint
  try {
    const driveId = process.env.GRAPH_SHAREPOINT_DRIVE_ID;
    if (driveId) {
      const uploaded = await uploadToSharePoint(
        driveId,
        "Governance Reports",
        filename,
        pdfBytes
      );
      results.sharepoint = `uploaded: ${uploaded.webUrl}`;
    } else {
      results.sharepoint = "skipped (no drive configured)";
    }
  } catch (e) {
    results.sharepoint = `failed: ${(e as Error).message}`;
  }

  return NextResponse.json({ date: today, filename, results });
}
