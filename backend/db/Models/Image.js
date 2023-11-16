const conn = require("../conn");
const { STRING, UUID, UUIDV4, ENUM } = conn.Sequelize;

const Image = conn.define("image", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  position: {
    type: ENUM("home", "content", "banner"),
  },
  awsPicID: {
    type: STRING,
    allowNull: true,
  },
  picNickname: {
    type: STRING,
  },
  awsPicURL: {
    type: STRING(500),
    allowNull: true,
  },
  picCaption: {
    type: STRING,
    allowNull: true,
  },
});
module.exports = Image;
