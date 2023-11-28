const conn = require("../conn");
const { STRING, UUID, UUIDV4 } = conn.Sequelize;

const Tag = conn.define("tag", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
});
module.exports = Tag;
