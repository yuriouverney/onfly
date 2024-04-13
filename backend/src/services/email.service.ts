import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.example.com', // Replace with your SMTP host
  port: 587, // Typically SMTP runs on 587, but your host's settings may vary
  secure: false, // True if port is 465, or false for other ports
  auth: {
    user: 'user@example.com', // Your SMTP username
    pass: 'password' // Your SMTP password
  }
});

/**
 * Send an email
 * @param to Recipient email address
 * @param subject Email subject
 * @param text Email text content
 */
export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const info = await transporter.sendMail({
      from: '"Expense Tracker" <no-reply@example.com>', // Sender address
      to: to, // List of receivers
      subject: subject, // Subject line
      text: text, // Plain text body
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
