import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import connectDB from "@/lib/db";
import OTP from "@/lib/models/OTP";

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

    // Send Email via Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM || `"AÉRI Makhana" <${process.env.SMTP_USER}>`,
      to: emailLower,
      subject: `Your AÉRI Verification Code: ${otpCode}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #1C1C1C; text-align: center;">AÉRI Makhana</h2>
          <p style="font-size: 16px; color: #333;">Hello,</p>
          <p style="font-size: 16px; color: #333;">Here is your verification code to access your account:</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #D4AF37; padding: 10px 20px; background: #faf8f5; border-radius: 8px;">${otpCode}</span>
          </div>
          <p style="font-size: 14px; color: #666;">This code is valid for 5 minutes. Please do not share it with anyone.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999; text-align: center;">&copy; ${new Date().getFullYear()} AÉRI. All rights reserved.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "OTP sent successfully" });
  } catch (error: any) {
    console.error("Send OTP Error:", error);
    return NextResponse.json({ error: "Failed to send OTP. Please try again." }, { status: 500 });
  }
}
