const express = require("express");
const app = express.Router();
const { Blogpost, Tag, Image } = require("../db");
const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-2" });

const multer = require("multer");
const sharp = require("sharp");
const crypto = require("crypto");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { getObjectSignedUrl } = require("../s3.js");

const { isLoggedIn, restrictAccess } = require("./middleware.js");

// get all the PUBLISHED blogposts
app.get("/", async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    let blogposts = await Blogpost.findAll({
      where: {
        published: true,
      },
      include: [Image, Tag],
      limit: limit,
      offset: (page - 1) * limit,
      order: [["publishedAt", "DESC"]],
    });

    let responseData = blogposts.map((blogpost) => blogpost.get({ plain: true }));
    await Promise.all(
      responseData.map(async (blogpost) => {
        await Promise.all(
          blogpost.images.map(async (image) => {
            if (image.awsPicURL === null) {
              image.awsPicURL = await getObjectSignedUrl(image.awsPicID);
            }
          })
        );
      })
    );

    res.send(responseData);
  } catch (ex) {
    console.error("Error in /api/blogposts:", ex);

    next(ex);
  }
});

// get all the DRAFTED AND UNPUBLISHED blogposts
app.get("/drafted", restrictAccess, async (req, res, next) => {
  try {
    let blogposts = await Blogpost.findAll({
      where: {
        published: false,
      },
      include: [Image, Tag],
    });

    let responseData = blogposts.map((blogpost) => blogpost.get({ plain: true }));

    await Promise.all(
      responseData.map(async (blogpost) => {
        await Promise.all(
          blogpost.images.map(async (image) => {
            if (image.awsPicURL === null) {
              image.awsPicURL = await getObjectSignedUrl(image.awsPicID);
            }
          })
        );
      })
    );

    res.send(responseData);
  } catch (ex) {
    next(ex);
  }
});

// get a single blogpost
app.get("/:id", async (req, res, next) => {
  try {
    const blogpost = await Blogpost.findByPk(req.params.id, {
      include: [Image, Tag],
    });
    if (!blogpost) {
      return res.status(404).json({ message: "Blogpost not found" });
    }

    await Promise.all(
      blogpost.images.map(async (image) => {
        try {
          if (image.awsPicURL === null) {
            image.awsPicURL = await getObjectSignedUrl(image.awsPicID);
          }
        } catch (error) {
          console.error("Error fetching signed URL for image:", error);
        }
      })
    );

    res.send(blogpost);
  } catch (ex) {
    res.status(404).send({ message: "No blogpost found with the given ID." });
    next(ex);
  }
});

// add blogpost
app.post("/", isLoggedIn, async (req, res, next) => {
  try {
    res.status(201).send(await Blogpost.create({ ...req.body, userId: req.user.id }));
  } catch (ex) {
    res.status(404).send({ message: "No blogpost found with the given ID." });
    next(ex);
  }
});

app.put("/:id", isLoggedIn, async (req, res, next) => {
  try {
    let id = req.params.id;
    let request = req.body;
    const [update] = await Blogpost.update(
      {
        title: request.title,
        subtitle: request.subtitle,
        content: request.content,
        lastSaved: request.lastSaved,
      },
      {
        where: { id: id },
      }
    );
    res.status(200).send(await Blogpost.findByPk(id));
  } catch (ex) {
    res.status(404).send({ message: "No blogpost found with the given ID." });
    next(ex);
  }
});

//
//
// RSS FEED GEN
//
//
// async function generateRSSFeed() {
//   let feed = new RSS({
//     title: "Vali Blog",
//     description: "Vali Blog -- a blog about financial strategies and guidance for small business owners.",
//     feed_url: "https://usevali.com/rss",
//     site_url: "https://usevali.com",
//   });

//   const blogposts = await Blogpost.findAll({
//     where: { published: true },
//     order: [["publishedAt", "DESC"]],
//   });

//   blogposts.forEach((post) => {
//     feed.item({
//       title: post.title,
//       description: post.content,
//       url: `https://usevali.com/blog/${post.id}`,
//       date: post.publishedAt,
//     });
//   });

//   return feed.xml();
// }

// app.get("/rss", async (req, res) => {
//   try {
//     const rssFeedXml = await generateRSSFeed();
//     res.type("application/rss+xml");
//     res.send(rssFeedXml);
//   } catch (ex) {
//     res.status(500).send({ message: "Error generating RSS feed." });
//   }
// });

app.put("/publish/:id", isLoggedIn, restrictAccess, async (req, res, next) => {
  try {
    let today = new Date().toISOString();
    let id = req.params.id;
    const [update] = await Blogpost.update(
      {
        published: true,
        publishedAt: today,
        lastSaved: today,
      },
      {
        where: { id: id },
      }
    );

    const rssFeedXml = await generateRSSFeed();

    res.status(200).send(await Blogpost.findByPk(id));
  } catch (ex) {
    res.status(404).send({ message: "No blogpost found with the given ID." });
    next(ex);
  }
});

//this needs to somehow save the date that it was published.
app.put("/hidden/:id", isLoggedIn, restrictAccess, async (req, res, next) => {
  try {
    let id = req.params.id;
    let today = new Date().toISOString();

    const [update] = await Blogpost.update(
      {
        published: false,
        archived: true,
        archivedOn: today,
      },
      {
        where: { id: id },
      }
    );
    res.status(200).send(await Blogpost.findByPk(id));
  } catch (ex) {
    res.status(404).send({ message: "No blogpost found with the given ID." });
    next(ex);
  }
});

// delete blogpost
app.delete("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const blogpost = await Blogpost.findByPk(req.params.id);
    await blogpost.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;
