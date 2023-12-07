const User = require("./User");
const Blogpost = require("./Blogpost");
const Tag = require("./Tag");
const Image = require("./Image");
const Business = require("./Business");
const MailingListUser = require("./MailingListUser");

Blogpost.belongsToMany(Tag, { through: "BlogpostTags" });
Tag.belongsToMany(Blogpost, { through: "BlogpostTags" });
Image.belongsTo(Blogpost, { foreignKey: "blogpostId" });
Blogpost.hasMany(Image, { foreignKey: "blogpostId" });

Business.belongsTo(User, { foreignKey: "businessId" });
User.hasOne(Business, { foreignKey: "businessId" });

module.exports = {
  User,
  Blogpost,
  Tag,
  Image,
  Business,
  MailingListUser,
};
