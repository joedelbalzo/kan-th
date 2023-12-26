const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const { Blogpost } = require("./db/index");
const RSS = require("rss");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

async function generateRSSFeed() {
  let feed = new RSS({
    title: "Vali Blog",
    description: "Vali Blog -- a blog about financial strategies and guidance for small business owners.",
    feed_url: "https://usevali.com/rss",
    site_url: "https://usevali.com",
  });

  const blogposts = await Blogpost.findAll({
    where: { published: true },
    order: [["publishedAt", "DESC"]],
  });

  blogposts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.content,
      url: `https://usevali.com/blog/${post.id}`,
      guid: post.id,
      date: post.publishedAt,
    });
  });

  return feed.xml();
}

app.get("/rss", async (req, res) => {
  try {
    const rssFeedXml = await generateRSSFeed();
    res.type("application/rss+xml");
    res.send(rssFeedXml);
  } catch (ex) {
    console.error("RSS Feed Generation Error:", ex);
    res.status(500).send({ message: "Error generating RSS feed." });
  }
});

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use("/api/auth/", require("./api/auth"));
app.use("/api/blogposts/", require("./api/blogposts"));
app.use("/api/images/", require("./api/images"));
app.use("/api/tags/", require("./api/tags"));
app.use("/api/contact/", require("./api/contact"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

module.exports = app;
