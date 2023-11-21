const { User } = require("../db");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

const isLoggedIn = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    req.user = user;
    next();
  } catch (ex) {
    next(ex);
  }
};

const restrictAccess = (req, res, next) => {
  const origin =
    req.headers.origin || req.headers.referer || "localhost:3000" || "http://localhost:3000";
  console.log("origin", origin);
  if (origin) {
    if (
      origin === "https://www.usevali.com" ||
      origin === "https://usevali.com" ||
      origin.startsWith("asitenamedka") ||
      origin.startsWith(process.env.DEV_SITE) ||
      origin.startsWith("http://localhost:3000")
    ) {
      next();
    } else {
      res.status(403).send("Access Denied: Only Vali and its subpaths can access the database.");
    }
  } else {
    res.status(403).send("Access Denied: Origin or Referer header is not set.");
  }
};

module.exports = {
  isLoggedIn,
  restrictAccess,
};
