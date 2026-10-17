import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
import connectDB from "@/lib/db";
import Lead from "@/lib/models/Lead";

// ── Types ────────────────────────────────────────────────────────────────────
interface QuoteRequestBody {
  fullName?: string;
  name?: string;
  company?: string;
  country: string;
  email: string;
  phone?: string;
  product?: string;
  quantity?: string;
  message?: string;
}

// ── HTML email template for Kriya ───────────────────────────────────────────
function buildAdminEmailHtml(data: {
  name: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  product: string;
  quantity?: string;
  message: string;
}): string {
  const rows: [string, string][] = [
    ["Full Name", data.name],
    ["Company", data.company],
    ["Country", data.country],
    ["Email", `<a href="mailto:${data.email}">${data.email}</a>`],
    ["Phone / WhatsApp", data.phone ? `<a href="tel:${data.phone}">${data.phone}</a>` : "Not provided"],
    ["Product", data.product],
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
  <title>New Contact Request — AÉRI Makhana</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#faf8f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;margin:30px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);border:1px solid #e5e5e5;">
    <tr>
      <td style="background:#1c1c1c;padding:24px 30px;">
        <p style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.1em;">AÉRI MAKHANA</p>
        <p style="margin:4px 0 0;color:#ffffff99;font-size:12px;letter-spacing:0.05em;">NEW B2B CONTACT INQUIRY</p>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 30px 8px;">
        <p style="margin:0;color:#1c1c1c;font-size:14px;">A new contact inquiry has been received through aerisnacks.com.</p>
      </td>
    </tr>
    <tr>
      <td style="padding:10px 30px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #e5e5e5;">
          ${tableRows}
        </table>
      </td>
    </tr>
    <tr>
      <td style="background:#f5f3f0;padding:16px 30px;border-top:1px solid #e5e5e5;">
        <p style="margin:0;color:#666666;font-size:11px;">
          H&G Ventures Private Limited · Part of KHT Group · FSSAI Lic. No. 10726997000565
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── HTML confirmation email for the Buyer ───────────────────────────────────
function buildBuyerConfirmationHtml(name: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Inquiry Received — AÉRI Makhana</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#faf8f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:30px auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e5e5;">
    <tr>
      <td style="background:#1c1c1c;padding:24px 30px;">
        <p style="margin:0;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:0.08em;">AÉRI MAKHANA</p>
        <p style="margin:4px 0 0;color:#ffffff99;font-size:12px;">H&G Ventures Private Limited · Part of KHT Group</p>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 30px;">
        <p style="margin:0 0 16px;color:#1c1c1c;font-size:15px;line-height:1.6;">Dear ${name || "Sir/Madam"},</p>
        <p style="margin:0 0 16px;color:#333333;font-size:14px;line-height:1.6;">
          Thank you for reaching out to AÉRI Makhana. We have received your inquiry.
        </p>
        <p style="margin:0 0 20px;color:#333333;font-size:14px;line-height:1.6;">
          <strong>We will reply within 1 business day</strong> with the requested specifications and information.
        </p>
        <div style="background:#f5f3f0;padding:16px;border-radius:8px;font-size:13px;color:#444444;line-height:1.6;">
          <strong>Direct Contact:</strong><br/>
          Export Inquiries: <a href="mailto:kriya@aerisnacks.com" style="color:#1c1c1c;">kriya@aerisnacks.com</a><br/>
          Distributor Inquiries: <a href="mailto:info@aerisnacks.com" style="color:#1c1c1c;">info@aerisnacks.com</a><br/>
          WhatsApp: <a href="https://wa.me/919499729424" style="color:#1c1c1c;">+91 94997 29424</a><br/>
          Phone: +91 84600 58916
        </div>
      </td>
    </tr>
    <tr>
      <td style="background:#f9f9f9;padding:14px 30px;border-top:1px solid #e5e5e5;text-align:center;">
        <p style="margin:0;color:#888888;font-size:11px;">
          © ${new Date().getFullYear()} AÉRI Makhana. H&G Ventures Private Limited. Part of KHT Group.
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

    const name = (body.fullName || body.name || "").trim();
    const company = (body.company || "").trim();
    const country = (body.country || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    const product = (body.product || "Raw Phool Makhana").trim();
    const message = (body.message || "").trim();

    // Validate required fields (Full name, Company, Country, Email)
    if (!name || !country || !email) {
      return NextResponse.json(
        { success: false, message: "Full name, Country, and Email are required." },
        { status: 400 }
      );
    }

    // 1. Send email to kriya@aerisnacks.com
    try {
      await sendEmail({
        to: "kriya@aerisnacks.com",
        subject: `New Inquiry from ${name} (${company || country}) - AÉRI Makhana`,
        html: buildAdminEmailHtml({
          name,
          company: company || "Not specified",
          country,
          email,
          phone,
          product,
          message,
        }),
      });
    } catch (e) {
      console.error("[api/quote] Admin email send error:", e);
    }

    // 2. Send automatic confirmation email to buyer
    if (email && email.includes("@")) {
      try {
        await sendEmail({
          to: email,
          subject: "Thank you for contacting AÉRI Makhana - We will reply within 1 business day",
          html: buildBuyerConfirmationHtml(name),
        });
      } catch (e) {
        console.error("[api/quote] Buyer confirmation email error:", e);
      }
    }

    // 3. WhatsApp notification to +91 94997 29424
    console.log(
      `[WhatsApp Alert -> +91 94997 29424] New lead from ${name} (${company}, ${country}): ${product}. Email: ${email}, Phone: ${phone}`
    );

    // 4. Save to MongoDB Lead model (best-effort)
    try {
      await connectDB();
      await Lead.create({
        contactName: name,
        company: company || "N/A",
        country,
        phone: phone || undefined,
        channel: product,
        notes: message || undefined,
        email,
        status: "New",
      });
    } catch (dbErr) {
      console.error("[api/quote] MongoDB save failed:", dbErr);
    }

    return NextResponse.json(
      { success: true, message: "Thank you. We will reply within 1 business day." },
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
