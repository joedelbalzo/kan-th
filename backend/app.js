const express = require("express");
const app = express();
const path = require("path");
app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend/dist")));
// app.use("/public", express.static(path.join(__dirname, "../../frontend/public")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/index.html"), {
//     client_id: process.env.client_id,
//   });
// });

app.use("/api/auth/", require("./api/auth"));
app.use("/api/blogposts/", require("./api/blogposts"));
app.use("/api/images/", require("./api/images"));

module.exports = app;
