const nodemailer = require("nodemailer");
require("dotenv").config({ path: ".env.local" });

async function testEmail() {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    console.log("Verifying SMTP connection...");
    await transporter.verify();
    console.log("SMTP connection verified successfully.");
    
  } catch (err) {
    console.error("SMTP Error:", err);
  }
}

testEmail();
