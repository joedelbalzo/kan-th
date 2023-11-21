const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: "jdelbalzo99@gmail.com",
    pass: "xxxxxxxxxx",
  },
  secure: true,
});

app.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;
  const mailData = {
    from: name,
    to: "jdelbalzo99@gmail.com",
    subject: subject,
    text: message,
    html: "<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>",
  };

  await transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.status(200).send({ message: "Mail send", message_id: info.messageId });
  });
});

// route.post('/contact', (req, res) => {
//   const {to, subject, text } = req.body;
//   const mailData = {
//       from: 'youremail@gmail.com',
//       to: to,
//       subject: subject,
//       text: text,
//       html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
//       attachments: [
//           {   // file on disk as an attachment
//               filename: 'nodemailer.png',
//               path: 'nodemailer.png'
//           },
//           {   // file on disk as an attachment
//               filename: 'text_file.txt',
//               path: 'text_file.txt'
//           }
//       ]
// };
// transporter.sendMail(mailData, (error, info) => {
//   if (error) {
//     return console.log(error);
//   }
//   res.status(200).send({ message: "Mail send", message_id: info.messageId });
// });

module.exports = app;
