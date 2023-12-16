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
      const imageTypes = ["homePicture", "bannerPicture", "contentPicture"];

      for (const imageType of imageTypes) {
        if (req.files[imageType] && req.files[imageType][0]) {
          const image = req.files[imageType][0];
          const processedImage = await sharp(image.buffer).toFormat("webp").toBuffer();
          const imageName = generateFileName();
          await uploadFile(processedImage, imageName, processedImage.mimetype);

          await Image.create({
            blogpostId: req.params.id,
            awsPicID: imageName,
            position: imageType.replace("Picture", ""),
            picNickname: image.originalname,
            caption: `insert ${imageType.replace("Picture", "")} pic caption here`,
          });
        }
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
    const { homeCap, bannerCap, contentCap } = req.body.captions;
    try {
      const imageTypes = ["homePicture", "bannerPicture", "contentPicture"];
      for (const imageType of imageTypes) {
        if (req.files[imageType] && req.files[imageType][0]) {
          const image = req.files[imageType][0];
          const processedImage = await sharp(image.buffer).toFormat("webp").toBuffer();
          const imageName = generateFileName();
          const currentImage = await Image.findOne({
            where: {
              blogpostId: req.params.id,
              position: imageType.replace("Picture", ""),
            },
          });

          await uploadFile(processedImage, imageName, processedImage.mimetype);

          let cap;
          if (imageType == "homePicture") {
            cap = homeCap;
          }
          if (imageType == "bannerPicture") {
            cap = bannerCap;
          }
          if (imageType == "contentPicture") {
            cap = contentCap;
          }

          await Image.update(
            {
              awsPicID: imageName,
              picNickname: image.originalname,
              picCaption: cap,
            },
            {
              where: {
                blogpostId: req.params.id,
                position: imageType.replace("Picture", ""),
              },
            }
          );
          if (currentImage) {
            await deleteFile(currentImage.awsPicID);
          }
        }
      }

      res.sendStatus(200);
    } catch (ex) {
      console.error(ex);
      const errorResponse = {
        message: "An error occurred.",
        errorType: ex.name || "UnknownError",
        details: ex.message || "No additional details available.",
      };
      if (process.env.NODE_ENV === "development") {
        errorResponse.stack = ex.stack;
      }

      res.status(404).send(errorResponse);
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
