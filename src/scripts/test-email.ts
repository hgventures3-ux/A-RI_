import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function main() {
  console.log('Testing SMTP with:', process.env.SMTP_USER);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || 'test@test.com',
      to: 'niteshkushwaha592@gmail.com',
      subject: 'Test Email',
      text: 'This is a test email.',
    });
    console.log('Email sent:', info.messageId);
  } catch (err) {
    console.error('Failed to send email:', err);
  }
}

main();
