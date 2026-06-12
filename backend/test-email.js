require('dotenv').config();
const nodemailer = require('nodemailer');

const email = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

console.log('Testing with Email:', email);
console.log('Testing with Pass:', pass ? '******' : 'MISSING');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: pass,
  },
});

console.log('Initiating test sequence...');

async function test() {
  try {
    console.log('Verifying transporter...');
    await transporter.verify();
    console.log('✅ Transporter is ready to take our messages');

    console.log('Sending test email...');
    const info = await transporter.sendMail({
      from: `"Test" <${email}>`,
      to: email,
      subject: "Test Email from Cashew App (Original Pass Format)",
      text: "If you receive this, your email configuration with spaces is working!",
    });
    console.log('✅ Test email sent successfully:', info.messageId);
  } catch (error) {
    console.error('❌ Email test failed with specific error:');
    console.error(error);
  }
}

test();
