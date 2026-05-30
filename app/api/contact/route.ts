import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Webhook URL not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        name: body.name ?? "",
        email: body.email ?? "",
        company: body.company ?? "",
        projectType: body.projectType ?? "",
        deliverable: body.deliverable ?? "",
        contactPref: body.contactPref ?? "",
        message: body.message ?? "",
      }),
    });

    if (!res.ok) throw new Error("Sheets webhook returned non-OK");

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit to Google Sheets" },
      { status: 500 }
    );
  }
}
