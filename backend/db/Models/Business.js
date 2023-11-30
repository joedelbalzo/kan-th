const conn = require("../conn");
const { STRING, UUID, UUIDV4 } = conn.Sequelize;

const Business = conn.define("business", {
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
module.exports = Business;
