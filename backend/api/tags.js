const express = require("express");
const app = express.Router();
const { Tag, Blogpost, Image } = require("../db");
const { getObjectSignedUrl } = require("../s3.js");

app.get("/", async (req, res, next) => {
  try {
    res.send(await Tag.findAll());
  } catch (ex) {
    next(ex);
  }
});

//get all posts where a single tag is.
app.get("/:id", async (req, res, next) => {
  const tagId = req.params.id;
  console.log("trying tags with ID:", tagId);
  try {
    let response = await Blogpost.findAll({
      include: [
        {
          model: Tag,
          where: { id: tagId },
        },
        {
          model: Image,
        },
      ],
    });

    await Promise.all(
      response.map(async (blogpost) => {
        await Promise.all(
          blogpost.images.map(async (image) => {
            if (image.awsPicURL === null) {
              image.awsPicURL = await getObjectSignedUrl(image.awsPicID);
            }
          })
        );
      })
    );
    console.log(response);

    res.send(response);
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;
