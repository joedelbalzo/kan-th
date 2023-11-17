const express = require("express");
const app = express();
const path = require("path");
app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use("/api/auth/", require("./api/auth"));
app.use("/api/blogposts/", require("./api/blogposts"));
app.use("/api/images/", require("./api/images"));
app.use("/api/tags/", require("./api/tags"));

module.exports = app;
