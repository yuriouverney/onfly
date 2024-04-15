import environment from '../util/environment';
import nodemailer from 'nodemailer';
environment.init();
import config from '../config/config';

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: parseInt(config.email.port),
  secure: config.email.port === '465',
  auth: {
    user: config.email.email,
    pass: config.email.password,
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"Expense Tracker" <${config.email.email}>`,
      to: to,
      subject: subject,
      text: text,
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
