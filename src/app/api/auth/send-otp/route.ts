import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Resend } from "resend";
import connectDB from "@/lib/db";
import OTP from "@/lib/models/OTP";

// No need for Resend SDK anymore since we use Resend via SMTP

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, purpose } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailLower = email.toLowerCase().trim();
    const otpPurpose = purpose || "Login";

    // Rate Limiting: Check if more than 3 OTPs requested in last 5 mins
    const recentOtps = await OTP.countDocuments({
      email: emailLower,
      createdAt: { $gte: new Date(Date.now() - 5 * 60 * 1000) },
    });

    if (recentOtps >= 3) {
      return NextResponse.json(
        { error: "Too many OTP requests. Please wait 5 minutes." },
        { status: 429 }
      );
    }

    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Save to DB (replaces older OTPs for the same purpose and email to avoid clutter)
    await OTP.deleteMany({ email: emailLower, purpose: otpPurpose });
    
    await OTP.create({
      email: emailLower,
      otp: otpCode,
      purpose: otpPurpose,
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>AÉRI Verification Code</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #FAF8F5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FAF8F5; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                
                <!-- Header -->
                <tr>
                  <td align="center" style="padding: 40px 0 30px 0; border-bottom: 1px solid #f0f0f0;">
                    <h1 style="margin: 0; font-family: 'Times New Roman', Times, serif; font-size: 32px; font-weight: 400; letter-spacing: 6px; color: #1C1C1C; text-transform: uppercase;">
                      A<span style="font-size: 28px;">É</span>RI
                    </h1>
                  </td>
                </tr>
                
                <!-- Body -->
                <tr>
                  <td style="padding: 40px 40px 30px 40px;">
                    <p style="margin: 0 0 15px 0; font-size: 16px; color: #1C1C1C; line-height: 1.6;">Hello,</p>
                    <p style="margin: 0 0 30px 0; font-size: 16px; color: #4A4A4A; line-height: 1.6;">
                      Here is your verification code to securely access your AÉRI customer space:
                    </p>
                    
                    <!-- OTP Box -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="padding: 25px 0; background-color: #FAF8F5; border-radius: 12px; border: 1px solid rgba(212, 175, 55, 0.2);">
                          <p style="margin: 0; font-family: 'Courier New', Courier, monospace; font-size: 38px; font-weight: bold; letter-spacing: 12px; color: #D4AF37; text-align: center;">
                            ${otpCode}
                          </p>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="margin: 30px 0 0 0; font-size: 14px; color: #888888; line-height: 1.5;">
                      This code is valid for <strong>5 minutes</strong>. If you did not request this code, please ignore this email.
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td align="center" style="padding: 30px 40px; background-color: #1C1C1C;">
                    <p style="margin: 0; font-family: 'Times New Roman', Times, serif; font-size: 18px; letter-spacing: 3px; color: #D4AF37; text-transform: uppercase;">AÉRI Makhana</p>
                    <p style="margin: 15px 0 0 0; font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 1px;">Le snacking qui vous élève.</p>
                    <p style="margin: 10px 0 0 0; font-size: 11px; color: #555555;">&copy; ${new Date().getFullYear()} AÉRI. All rights reserved.</p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // ---------------------------------------------------------
    // METHOD A: Use RESEND (Preferred - via SMTP to avoid SDK fetch issues)
    // ---------------------------------------------------------
    if (process.env.RESEND_API_KEY) {
      const resendTransporter = nodemailer.createTransport({
        host: "smtp.resend.com",
        port: 465,
        secure: true,
        auth: {
          user: "resend",
          pass: process.env.RESEND_API_KEY,
        },
      });

      try {
        await resendTransporter.sendMail({
          from: process.env.SMTP_FROM || "AÉRI Makhana <onboarding@resend.dev>",
          to: emailLower,
          subject: `Your AÉRI Verification Code: ${otpCode}`,
          html: htmlContent,
        });
        return NextResponse.json({ success: true, message: "OTP sent successfully via Resend SMTP" });
      } catch (error: any) {
        console.error("❌ Resend SMTP Error:", error);
        return NextResponse.json({ error: "Failed to send OTP via Resend. Please try again." }, { status: 500 });
      }
    }

    // ---------------------------------------------------------
    // METHOD B: Use NODEMAILER (Fallback with robust error handling)
    // ---------------------------------------------------------
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify SMTP connection to catch auth errors early
    try {
      await transporter.verify();
    } catch (smtpAuthError: any) {
      console.error("❌ SMTP Authentication Failed:", smtpAuthError.message);
      
      // Give a helpful response if it's the specific Google WebLoginRequired error
      if (smtpAuthError.message.includes("534-5.7.9")) {
         return NextResponse.json(
          { error: "Email server security block (Google). The site admin needs to verify the login." },
          { status: 502 }
        );
      }

      return NextResponse.json(
        { error: "Email server authentication failed. Please contact support." },
        { status: 502 }
      );
    }

    const mailOptions = {
      from: process.env.SMTP_FROM || `"AÉRI Makhana" <${process.env.SMTP_USER}>`,
      to: emailLower,
      subject: `Your AÉRI Verification Code: ${otpCode}`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: "OTP sent successfully via SMTP" });

  } catch (error: any) {
    console.error("❌ General Send OTP Error:", error);
    return NextResponse.json({ error: "Failed to send OTP. Please try again later." }, { status: 500 });
  }
}
