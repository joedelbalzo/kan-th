const conn = require("../conn");
const { STRING, UUID, UUIDV4, INTEGER, ENUM } = conn.Sequelize;

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
  userId: {
    type: UUID,
    allowNull: true,
    references: {
      model: "users",
      key: "id",
    },
  },
  categoryOfBusiness: { type: STRING, allowNull: true },
  yearsOpen: { type: INTEGER, allowNull: true },
  numberOfPartners: { type: INTEGER, allowNull: true },
  numberOfLocations: { type: INTEGER, allowNull: true },
  description: { type: STRING, allowNull: true },
  legalStructure: { type: ENUM("LLC", "Corporation", "Partnership"), allowNull: true },
  mainProducts: { type: STRING, allowNull: true },
  servicesOffered: { type: STRING, allowNull: true },
  keyMarkets: { type: STRING, allowNull: true },
  majorCompetitors: { type: STRING, allowNull: true },
});
module.exports = Business;
