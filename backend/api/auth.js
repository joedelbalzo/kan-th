const express = require("express");
const app = express.Router();
const { User, MailingListUser } = require("../db");
const { isLoggedIn, isAdmin } = require("./middleware");
const { updateCSVFile } = require("../s3");
const path = require("path");
const bcrypt = require("bcrypt");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
require("dotenv").config({ path: path.resolve(__dirname, "../", ".env") });

let salt1 = bcrypt.genSaltSync();
let salt2 = bcrypt.genSaltSync();
let secret = bcrypt.hashSync(salt1 + salt2, 10);

const callbackURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/auth/google/callback"
    : "https://www.usevali.com/api/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: callbackURL,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const [user] = await User.findOrCreate({
          where: { googleId: profile.id },
          defaults: {
            username: `google_${profile.id}`,
            adminStatus: false,
          },
        });
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/google", passport.authenticate("google", { scope: ["profile"] }));

app.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), async function (req, res) {
  try {
    const tokenData = await req.user.generateToken();
    if (tokenData && tokenData.token && process.env.NODE_ENV == "development") {
      res.redirect(`https://localhost:3000/client-route?token=${tokenData.token}`);
    }
    if (tokenData && tokenData.token && process.env.NODE_ENV == "production") {
      res.redirect(`https://www.usevali.com/client-route?token=${tokenData.token}`);
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

app.get("/mailinglist", isAdmin, isLoggedIn, async (req, res, next) => {
  try {
    res.send(
      await MailingListUser.findAll({
        order: [["createdAt", "DESC"]],
      })
    );
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
});

app.post("/mailinglist", async (req, res, next) => {
  try {
    const newEmail = req.body.email;
    await MailingListUser.create({
      email: newEmail,
      currentlyActive: true,
    });

    const csvFileName = "mailing-list/mailingList.csv";
    const newLine = `${newEmail}`;

    await updateCSVFile(csvFileName, newLine);

    res.sendStatus(201);
  } catch (ex) {
    next(ex);
  }
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

//admin things
app.get("/users", isAdmin, isLoggedIn, async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.send(allUsers);
  } catch (ex) {
    next(ex);
  }
});
app.get("/filteredusers", isAdmin, isLoggedIn, async (req, res, next) => {
  try {
    const { param } = req.body;
    // console.log(param);
    const allUsers = await User.findAll();
    res.send(allUsers);
  } catch (ex) {
    next(ex);
  }
});

//basic user things
app.get("/", isLoggedIn, (req, res, next) => {
  try {
    res.send(req.user);
  } catch (ex) {
    next(ex);
  }
});

app.post("/register", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send(user.generateToken());
  } catch (ex) {
    next(ex);
  }
});
app.post("/", async (req, res, next) => {
  try {
    res.send(await User.authenticate(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.put("/user/:id", async (req, res, next) => {
  try {
    let userUpdates = req.body.formData;
    let userToEdit = await User.findByPk(req.params.id);
    let updatedUser = await User.update(
      {
        firstName: userUpdates.firstName,
        lastName: userUpdates.lastName,
        businessName: userUpdates.businessName,
        city: userUpdates.city,
        state: userUpdates.state,
        updates: userUpdates.updates,
        isNewUser: false,
      },
      {
        where: { id: userToEdit.id },
      }
    );
    res.send(updatedUser);
  } catch (ex) {
    next(ex);
  }
});

app.put("/user", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;
    // console.log(user, req.body);
    //define the properties a user can change
    await user.update(req.body);
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;
