const { User, Business } = require("../db");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

const isLoggedIn = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization, {
      include: [
        {
          model: Business,
        },
      ],
    });
    req.user = user;
    next();
  } catch (ex) {
    next(ex);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const admin = await User.findByToken(req.headers.authorization);
    if (admin && admin.adminStatus == true) {
      next();
    } else {
      res.status(401).send("For [Admin] Eyes Only");
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).send("Internal Server Error");
  }
};

const restrictAccess = (req, res, next) => {
  const origin = req.headers.origin || req.headers.referer || "localhost:3000" || "http://localhost:3000";
  if (origin) {
    if (
      origin === "https://www.joinvali.com" ||
      origin === "https://joinvali.com" ||
      origin.startsWith("asitenamedka") ||
      origin.startsWith("joedelbalzo") ||
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
  isAdmin,
  isLoggedIn,
  restrictAccess,
};
