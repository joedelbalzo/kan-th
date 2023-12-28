const User = require("./User");
const Blogpost = require("./Blogpost");
const Tag = require("./Tag");
const Image = require("./Image");
const Business = require("./Business");
const MailingListUser = require("./MailingListUser");
const { FinancialInfo, encrypt, decrypt } = require("./FinancialInfo");

Blogpost.belongsToMany(Tag, { through: "BlogpostTags" });
Tag.belongsToMany(Blogpost, { through: "BlogpostTags" });
Image.belongsTo(Blogpost, { foreignKey: "blogpostId" });
Blogpost.hasMany(Image, { foreignKey: "blogpostId" });

Business.belongsTo(User, { foreignKey: "userId" });
User.hasOne(Business, { foreignKey: "userId" });

Business.hasMany(FinancialInfo, { foreignKey: "businessId" });
FinancialInfo.belongsTo(Business, { foreignKey: "businessId" });

module.exports = {
  User,
  Blogpost,
  FinancialInfo,
  Tag,
  Image,
  Business,
  MailingListUser,
  encrypt,
  decrypt,
};
