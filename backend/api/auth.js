const express = require("express");
const app = express.Router();
const { User } = require("../db");
const { isLoggedIn } = require("./middleware");
const path = require("path");
const bcrypt = require("bcrypt");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
require("dotenv").config({ path: path.resolve(__dirname, "../", ".env") });

let salt1 = bcrypt.genSaltSync();
let salt2 = bcrypt.genSaltSync();
let secret = bcrypt.hashSync(salt1 + salt2, 10);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
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
        console.log("creating", user);
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
passport.serializeUser(function (user, done) {
  console.log("serialize", user);
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
    if (tokenData && tokenData.token) {
      res.redirect(`http://localhost:3000/client-route?token=${tokenData.token}`);
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.post("/", async (req, res, next) => {
  try {
    res.send(await User.authenticate(req.body));
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

app.get("/", isLoggedIn, (req, res, next) => {
  try {
    res.send(req.user);
  } catch (ex) {
    next(ex);
  }
});

app.put("/", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;
    //define the properties a user can change
    await user.update(req.body);
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;
