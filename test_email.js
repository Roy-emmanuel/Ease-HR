require('dotenv').config(); // Load .env
const nodemailer = require('nodemailer');

async function testEmail() {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify connection
    await transporter.verify();
    console.log('✅ SMTP connection successful. Emails can be sent!');
  } catch (error) {
    console.error('❌ SMTP connection failed:', error.message);
  }
}

testEmail();