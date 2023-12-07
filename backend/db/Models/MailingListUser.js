const conn = require("../conn");
const { STRING, UUID, UUIDV4, BOOLEAN } = conn.Sequelize;

const MailingListUser = conn.define("mailinglistuser", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  currentlyActive: {
    type: BOOLEAN,
    defaultValue: true,
  },
});
module.exports = MailingListUser;
