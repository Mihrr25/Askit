// sendForgotPasswordEmail.js
import nodemailer from 'nodemailer';
let transporter;
export function initializeMailer() {
  transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
  secure: true, 
  secureConnection: false,
  tls: {
     ciphers: "SSLv3",
  },
  requireTLS: true,
  port: 465,
  debug: true,
  connectionTimeout: 10000,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

}



/**
 * Sends a password reset email to the user
 * @param {string} toEmail - Recipient's email
 * @param {string} token - Unique reset token
 */
export async function sendForgotPasswordEmail(toEmail, token) {
  const resetLink = `${process.env.FRONTEND_URL}?token=${token}`;

  const mailOptions = {
    from: `"Support" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Reset Your Password',
    html: `
      <p>You requested a password reset.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Reset email sent:', info.response);
  } catch (error) {
    console.error('Error sending reset email:', error);
    throw error;
  }
}
