const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
app.use(express.json());
const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../", ".env"),
});

const emailUser = process.env.VALI_CONTACT_EMAIL;
const emailPassword = process.env.VALI_CONTACT_EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});

app.post("/", (req, res) => {
  // console.log(req.body, "in the contact api");

  const { name, senderEmail, subject, message } = req.body;

  const mailOptions = {
    from: senderEmail,
    to: emailUser,
    subject: subject,
    text: `Message from: ${name}, Email: ${senderEmail}, Message: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

module.exports = app;
