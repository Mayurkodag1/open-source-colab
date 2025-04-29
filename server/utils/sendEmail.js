import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: import.meta.env.VITE_EMAIL,
      pass: import.meta.env.VITE_PASSWORD,
    },
  });

  const message = {
    from: `$ Open Source Collab <${import.meta.env.VITE_EMAIL}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};

export default sendEmail;