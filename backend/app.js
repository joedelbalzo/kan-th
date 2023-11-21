const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use("/api/auth/", require("./api/auth"));
app.use("/api/blogposts/", require("./api/blogposts"));
app.use("/api/images/", require("./api/images"));
app.use("/api/tags/", require("./api/tags"));
app.use("/api/contact/", require("./api/contact"));

module.exports = app;
