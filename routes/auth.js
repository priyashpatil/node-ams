var express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var crypto = require("crypto");
var models = require("../models");
const ensureIsUnauthenticated = require("../middlewares/ensureIsUnauthenticated");
const authenticate = require("../middlewares/authenticate");

passport.use(
  new LocalStrategy(async function (username, password, done) {
    var user = await models.User.findOne({ where: { email: username } });

    if (!user) {
      return done(null, false);
    }

    if (user.password != password) {
      return done(null, false);
    }

    return done(null, user);
  })
);

passport.serializeUser(function (user, done) {
  process.nextTick(function () {
    done(null, {
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    });
  });
});

passport.deserializeUser(function (user, done) {
  process.nextTick(function () {
    return done(null, user);
  });
});

var router = express.Router();

router.get("/login", ensureIsUnauthenticated, function (req, res, next) {
  res.render("login");
});

router.post(
  "/login",
  ensureIsUnauthenticated,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
    successReturnToOrRedirect: "/",
  })
);

router.post("/logout", authenticate, async function (req, res, next) {
  await req.session.destroy(function (err) {
    if (err == null) {
      res.redirect("/");
    }
  });
});

module.exports = router;
