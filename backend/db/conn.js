const Sequelize = require("sequelize");
const config = {};

if (process.env.QUIET) {
  config.logging = false;
} else config.logging = false;
const conn = new Sequelize(process.env.DATABASE_URL || "postgres://localhost/theo_db", config);

module.exports = conn;
