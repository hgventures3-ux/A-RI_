const nodemailer = require("nodemailer");
require("dotenv").config({ path: ".env.local" });

async function testResendSMTP() {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.resend.com",
      port: 465,
      secure: true,
      auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY,
      },
    });

    console.log("Verifying Resend SMTP connection...");
    await transporter.verify();
    console.log("✅ Resend SMTP connection verified successfully.");
    
  } catch (err) {
    console.error("❌ Resend SMTP Error:", err);
  }
}

testResendSMTP();
