import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
import connectDB from "@/lib/db";
import Lead from "@/lib/models/Lead";

// ── Types ────────────────────────────────────────────────────────────────────
interface QuoteRequestBody {
  name: string;
  company?: string;
  country: string;
  email?: string;
  phone?: string;
  product?: string;
  quantity?: string;
  message?: string;
}

// ── HTML email template ───────────────────────────────────────────────────────
function buildEmailHtml(data: QuoteRequestBody): string {
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Company", data.company || "—"],
    ["Email", data.email ? `<a href="mailto:${data.email}">${data.email}</a>` : "Not provided"],
    ["Phone / WhatsApp", data.phone ? `<a href="tel:${data.phone}">${data.phone}</a>` : "Not provided"],
    ["Country", data.country],
    ["Product Interest", data.product || "—"],
    ["Estimated Quantity", data.quantity || "—"],
    ["Message", data.message || "—"],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
    <tr>
      <td style="padding:10px 14px;background:#f5f3f0;font-weight:600;color:#1c1c1c;font-size:13px;white-space:nowrap;border-bottom:1px solid #e5e5e5;">
        ${label}
      </td>
      <td style="padding:10px 14px;color:#333;font-size:13px;border-bottom:1px solid #e5e5e5;">
        ${value.replace(/\n/g, "<br/>")}
      </td>
    </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>New Quote Request — AÉRI Export</title>
</head>
<body style="margin:0;padding:0;font-family:Georgia,serif;background:#faf8f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">
    <!-- Header -->
    <tr>
      <td colspan="2" style="background:#1c1c1c;padding:28px 32px;">
        <p style="margin:0;color:#faf8f5;font-size:22px;font-weight:700;letter-spacing:0.12em;">AÉRI</p>
        <p style="margin:6px 0 0;color:#ffffff80;font-size:12px;letter-spacing:0.1em;font-family:Arial,sans-serif;">NEW QUOTE REQUEST — EXPORT</p>
      </td>
    </tr>
    <!-- Body -->
    <tr>
      <td colspan="2" style="padding:24px 32px 8px;">
        <p style="margin:0;color:#1c1c1c;font-size:14px;">A new quote request has been submitted via the AÉRI B2B homepage.</p>
      </td>
    </tr>
    <!-- Detail table -->
    <tr>
      <td colspan="2" style="padding:12px 32px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #e5e5e5;">
          ${tableRows}
        </table>
      </td>
    </tr>
    <!-- Footer -->
    <tr>
      <td colspan="2" style="background:#f5f3f0;padding:16px 32px;border-top:1px solid #e5e5e5;">
        <p style="margin:0;color:#1c1c1c80;font-size:11px;font-family:Arial,sans-serif;">
          Submitted via aerisnacks.com/api/quote · AÉRI Snacks · 1602/E GIDC HALOL-389350, Gujarat, India
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── POST handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body: QuoteRequestBody = await req.json();

    // Validate only required fields (Name and Country)
    if (!body.name?.trim() || !body.country?.trim()) {
      return NextResponse.json(
        { success: false, message: "Name and country are required." },
        { status: 400 }
      );
    }

    // Send email notification
    const emailSent = await sendEmail({
      to: "kriya@aerisnacks.com",
      subject: "New Quote Request - AÉRI Export",
      html: buildEmailHtml(body),
    });

    if (!emailSent) {
      console.error("[api/quote] Email delivery failed.");
    }

    // Save to MongoDB Lead model (best-effort — does not block success response)
    try {
      await connectDB();
      await Lead.create({
        contactName: body.name.trim(),
        company: body.company?.trim() || "N/A",
        country: body.country.trim(),
        quantity: body.quantity?.trim() || "N/A",
        phone: body.phone?.trim() || undefined,
        channel: body.product || undefined,
        notes: body.message?.trim() || undefined,
        email: body.email?.trim() || "quote-form@aerisnacks.com",
        status: "New",
      });
    } catch (dbErr) {
      // Non-fatal — log and continue
      console.error("[api/quote] MongoDB save failed:", dbErr);
    }

    return NextResponse.json(
      { success: true, message: "Quote request received." },
      { status: 200 }
    );
  } catch (err) {
    console.error("[api/quote] Unexpected error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to send." },
      { status: 500 }
    );
  }
}
