import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "amangupta.webmobril@gmail.com",
    pass: "ppxfkrvioxqpxobf",
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