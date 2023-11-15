const express = require("express");
const app = express();

const { Blogpost, User } = require("../db");

const multer = require("multer");
const sharp = require("sharp");
const crypto = require("crypto");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { uploadFile } = require("../s3");

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

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
        await Blogpost.update(
          {
            homePicture: homePicName,
            homePictureNickname: req.files.homePicture[0].originalname,
          },
          {
            where: { id: req.params.id },
          }
        );
      }
      if (req.files.bannerPicture && req.files.bannerPicture[0]) {
        bannerPic = await sharp(req.files.bannerPicture[0].buffer).toFormat("webp").toBuffer();
        bannerPicName = generateFileName();
        await uploadFile(bannerPic, bannerPicName, bannerPic.mimetype);
        await Blogpost.update(
          {
            bannerPicture: bannerPicName,
            bannerPictureNickname: req.files.bannerPicture[0].originalname,
          },
          {
            where: { id: req.params.id },
          }
        );
      }
      if (req.files.contentPicture && req.files.contentPicture[0]) {
        contentPic = await sharp(req.files.contentPicture[0].buffer).toFormat("webp").toBuffer();
        contentPicName = generateFileName();
        await uploadFile(contentPic, contentPicName, contentPic.mimetype);
        await Blogpost.update(
          {
            contentPicture: contentPicName,
            contentPictureNickname: req.files.contentPicture[0].originalname,
          },
          {
            where: { id: req.params.id },
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
