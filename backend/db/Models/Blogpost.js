const { ARRAY } = require("sequelize");
const conn = require("../conn");
const { STRING, UUID, UUIDV4, BOOLEAN, TEXT, DATE, INTEGER } = conn.Sequelize;

const Blogpost = conn.define("blogpost", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  title: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "The title must not be empty." },
      len: { args: [3, 300], msg: "The title must be between 3 and 300 characters long." },
    },
  },
  subtitle: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "The subtitle must not be empty." },
      len: { args: [3, 300], msg: "The subtitle must be between 3 and 300 characters long." },
    },
  },
  content: {
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: "The content must not be empty." },
      len: { args: [3, 30000], msg: "3,000 word maximum" },
    },
  },
  published: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  publishedAt: {
    type: DATE,
    allowNull: true,
  },
  lastSaved: {
    type: DATE,
    allowNull: true,
  },
  archived: {
    type: BOOLEAN,
    allowNull: true,
  },
  archivedOn: {
    type: DATE,
    allowNull: true,
  },
});

module.exports = Blogpost;
