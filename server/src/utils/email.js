import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass:  process.env.EMAIL_PASS,
  },
});
export const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  await transporter.sendMail({
    from: '"Academexa" <amangupta.webmobril@gmail.com>',
    to,
    subject,
    html,
  });
};