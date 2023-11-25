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
    res.send(response);
  } catch (ex) {
    next(ex);
  }
});

app.put("/:id", async (req, res, next) => {
  try {
    const post = await Blogpost.findByPk(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    const { firstTag, secondTag, thirdTag } = req.body;

    async function processTag(tag) {
      let cleanedTagName = tag.tagName.trim().toLowerCase();
      if (tag.id) {
        return tag.id;
      } else {
        const [newTag, created] = await Tag.findOrCreate({ where: { tagName: cleanedTagName } });
        return newTag.id;
      }
    }

    const tagIds = await Promise.all([
      processTag(firstTag),
      processTag(secondTag),
      processTag(thirdTag),
    ]);

    await post.setTags(tagIds);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = app;
