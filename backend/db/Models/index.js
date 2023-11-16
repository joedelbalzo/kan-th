const User = require("./User");
const Blogpost = require("./Blogpost");
const Tag = require("./Tag");
const Image = require("./Image");

Blogpost.belongsToMany(Tag, { through: "BlogpostTags" });
Tag.belongsToMany(Blogpost, { through: "BlogpostTags" });
Image.belongsTo(Blogpost, { foreignKey: "blogpostId" });
Blogpost.hasMany(Image, { foreignKey: "blogpostId" });

module.exports = {
  User,
  Blogpost,
  Tag,
  Image,
};
