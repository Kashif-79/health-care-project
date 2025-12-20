import nodemailer from "nodemailer";
import config from "../../../config";

const emailSender = async (email: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: config.emailSender.email,
      pass: config.emailSender.app_pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Health_Care" <krreza200@gmail.com>',
    to: email,
    subject: "Reset Password Link",
    // text: "Hello world?", // Plain-text version of the message
    html,
  });
};

export default emailSender;
