const express = require("express");
const app = express();

const { Blogpost, User, Image } = require("../db");

const multer = require("multer");
const sharp = require("sharp");
const crypto = require("crypto");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { uploadFile } = require("../s3");

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

app.post(
  "/:id",
  upload.fields([
    { name: "homePicture", maxCount: 1 },
    { name: "bannerPicture", maxCount: 1 },
    { name: "contentPicture", maxCount: 1 },
  ]),
  async (req, res, next) => {
    try {
      let homePic = req.files.homePicture;
      let bannerPic = req.files.bannerPicture;
      let contentPic = req.files.contentPicture;

      if (req.files.homePicture && req.files.homePicture[0]) {
        homePic = await sharp(req.files.homePicture[0].buffer).toFormat("webp").toBuffer();
        homePicName = generateFileName();
        await uploadFile(homePic, homePicName, homePic.mimetype);
        await Image.create({
          blogpostId: req.params.id,
          awsPicID: homePicName,
          position: "home",
          picNickname: req.files.homePicture[0].originalname,
          caption: "insert home pic caption here",
        });
      }
      if (req.files.bannerPicture && req.files.bannerPicture[0]) {
        bannerPic = await sharp(req.files.bannerPicture[0].buffer).toFormat("webp").toBuffer();
        bannerPicName = generateFileName();
        await uploadFile(bannerPic, bannerPicName, bannerPic.mimetype);
        await Image.create({
          blogpostId: req.params.id,
          awsPicID: bannerPicName,
          position: "banner",
          picNickname: req.files.bannerPicture[0].originalname,
          caption: "insert banner pic caption here",
        });
      }
      if (req.files.contentPicture && req.files.contentPicture[0]) {
        contentPic = await sharp(req.files.contentPicture[0].buffer).toFormat("webp").toBuffer();
        contentPicName = generateFileName();
        await uploadFile(contentPic, contentPicName, contentPic.mimetype);
        await Image.create({
          blogpostId: req.params.id,
          awsPicID: contentPicName,
          position: "content",
          picNickname: req.files.contentPicture[0].originalname,
          caption: "insert content pic caption here",
        });
      }

      res.sendStatus(200);
    } catch (ex) {
      res.status(404).send({ message: "Issue uploading pictures." });
      next(ex);
    }
  }
);
app.put(
  "/:id",
  upload.fields([
    { name: "homePicture", maxCount: 1 },
    { name: "bannerPicture", maxCount: 1 },
    { name: "contentPicture", maxCount: 1 },
  ]),
  async (req, res, next) => {
    try {
      let homePic = req.files.homePicture;
      let bannerPic = req.files.bannerPicture;
      let contentPic = req.files.contentPicture;

      if (req.files.homePicture && req.files.homePicture[0]) {
        homePic = await sharp(req.files.homePicture[0].buffer).toFormat("webp").toBuffer();
        homePicName = generateFileName();
        await uploadFile(homePic, homePicName, homePic.mimetype);
        await Image.update(
          {
            awsPicID: homePicName,
            position: "home",
            picNickname: req.files.homePicture[0].originalname,
            caption: "insert home pic caption here",
          },
          {
            where: {
              blogpostId: req.params.id,
              position: "home",
            },
          }
        );
      }
      if (req.files.bannerPicture && req.files.bannerPicture[0]) {
        bannerPic = await sharp(req.files.bannerPicture[0].buffer).toFormat("webp").toBuffer();
        bannerPicName = generateFileName();
        await uploadFile(bannerPic, bannerPicName, bannerPic.mimetype);
        await Image.update(
          {
            awsPicID: bannerPicName,
            position: "banner",
            picNickname: req.files.bannerPicture[0].originalname,
            caption: "insert banner pic caption here",
          },
          {
            where: {
              blogpostId: req.params.id,
              position: "banner",
            },
          }
        );
      }
      if (req.files.contentPicture && req.files.contentPicture[0]) {
        contentPic = await sharp(req.files.contentPicture[0].buffer).toFormat("webp").toBuffer();
        contentPicName = generateFileName();
        await uploadFile(contentPic, contentPicName, contentPic.mimetype);
        await Image.update(
          {
            awsPicID: contentPicName,
            position: "content",
            picNickname: req.files.contentPicture[0].originalname,
            caption: "insert content pic caption here",
          },
          {
            where: {
              blogpostId: req.params.id,
              position: "content",
            },
          }
        );
      }

      res.sendStatus(200);
    } catch (ex) {
      res.status(404).send({ message: "Issue uploading pictures." });
      next(ex);
    }
  }
);

// app.delete("/:id", async (req, res) => {
//   const id = +req.params.id;
//   const post = await prisma.posts.findUnique({ where: { id } });

//   await deleteFile(post.imageName);

//   await prisma.posts.delete({ where: { id: post.id } });
//   res.send(post);
// });

module.exports = app;
