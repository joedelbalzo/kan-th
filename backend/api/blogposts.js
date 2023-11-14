const express = require("express");
const app = express.Router();
const { Blogpost, User } = require("../db");
const { Op } = require("sequelize");
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

const multer = require("multer");
const sharp = require("sharp");
const crypto = require("crypto");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { uploadFile, deleteFile, getObjectSignedUrl } = require("../s3.js");

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

const { isLoggedIn } = require("./middleware.js");

// get all the blogposts
app.get("/", async (req, res, next) => {
  try {
    let response = await Blogpost.findAll();
    // console.log("response in the get all", response);
    let output = [];
    for (reply of response) {
      if (reply.homePicture) {
        console.log("call aws for home picture");
        reply.homePicURL = await getObjectSignedUrl(reply.homePicture);
      }
      if (reply.bannerPicture) {
        console.log("call aws for banner picture");
        reply.bannerPicURL = await getObjectSignedUrl(reply.bannerPicture);
      }
      if (reply.contentPicture) {
        console.log("call aws for content picture");
        reply.contentPicURL = await getObjectSignedUrl(reply.contentPicture);
      }
      // console.log("reply", reply);
      output.push(reply);
    }

    console.log("output", output);

    res.send(output);
  } catch (ex) {
    next(ex);
  }
});

// get all the blogposts for a user
app.get("/:token", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.params.token);
    const blogposts = await Blogpost.findAll({
      where: {
        userId: user.id,
      },
    });
    res.send(blogposts);
  } catch (ex) {
    next(ex);
  }
});

// get a single blogpost
app.get("/:blogpostId", async (req, res, next) => {
  try {
    const blogpost = await Blogpost.findByPk(req.params.blogpostId, {
      include: [{ model: Product, attributes: ["id", "name"] }],
    });
    if (!blogpost) {
      return res.status(404).json({ message: "Blogpost not found" });
    }
    res.json(blogpost);
  } catch (err) {
    next(err);
  }
});

// add blogpost
app.post("/", isLoggedIn, async (req, res, next) => {
  try {
    res.status(201).send(await Blogpost.create({ ...req.body, userId: req.user.id }));
  } catch (ex) {
    next(ex);
  }
});

app.put("/:id", isLoggedIn, async (req, res, next) => {
  try {
    console.log(req.body);
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
    console.log("This does not work!!!!");
    const blogpost = await Blogpost.findByPk(req.params.id);
    console.log(blogpost);
    await blogpost.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
