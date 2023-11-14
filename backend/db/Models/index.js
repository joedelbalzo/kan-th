const User = require("./User");
const Blogpost = require("./Blogpost");
const Tag = require("./Tag");

Blogpost.belongsToMany(Tag, { through: "BlogpostTags" });
Tag.belongsToMany(Blogpost, { through: "BlogpostTags" });

module.exports = {
  User,
  Blogpost,
  Tag,
};
