import nodeMailer from 'nodemailer';
import { MAIL_HOST, MAIL_USER, MAIL_PASS } from '../constants';

interface Options {
  subject: string;
  message: string;
  to: string;
}

const sendEmail = async (options: Options) => {
  const { to, subject, message } = options;
  const transporter = nodeMailer.createTransport({
    port: 465,
    host: MAIL_HOST,
    secure: false,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"Foo Foo "<foo@example.com>',
    to,
    subject,
    text: message,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
