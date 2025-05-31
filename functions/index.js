const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

const smtpConfig = functions.config().smtp;

const transporter = nodemailer.createTransport({
  host: smtpConfig.host || "smtp.gmail.com",
  port: smtpConfig.port ? Number(smtpConfig.port) : 465,
  secure: true,
  auth: {
    user: smtpConfig.user,
    pass: smtpConfig.pass,
  },
});

exports.sendContactEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { name, email, subject, message } = req.body;

    try {
      await transporter.sendMail({
        from: "furniroproject@gmail.com",
        to: email,
        subject: subject || "Thank you for contacting Furniro!",
        html: `
          <p>Hello, ${name}!</p>
          <p>Thank you for reaching out to Furniro. We have received your message:</p>
          <blockquote>${message}</blockquote>
          <p>Our team will get back to you as soon as possible. If you have any additional questions, feel free to reply to this email.</p>
          <p>Best regards,<br/>Furniro Support Team</p>
        `,
      });
      res.status(200).send({ success: true });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });
});