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

const { isLoggedIn } = require("./middleware.js");

// get all the blogposts
app.get("/", async (req, res, next) => {
  try {
    let blogposts = await Blogpost.findAll({
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
    const blogpost = await Blogpost.findByPk(req.params.blogpostId, {});
    if (!blogpost) {
      return res.status(404).json({ message: "Blogpost not found" });
    }
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
        content: request.content,
        tags: request.tags,
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
