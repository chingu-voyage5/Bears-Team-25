var passport = require("passport");
var express = require("express");
var router = express.Router();
var isLoggedIn = require("../commonFunctions").isLoggedIn;
var addToNotSubscribedRemoveFromSubscribed = require("../commonFunctions")
  .addToNotSubscribedRemoveFromSubscribed;
const baseURL = require('../config/baseUrl');
router.get("/updates", (req, res, next) => {
  if (req.query["hub.verify_token"] === "ifttt") {
    res.send(req.query["hub.challenge"]);
  }
});

router.post("/updates", (req, res, next) => {
  res.statusCode = 200;
});

router.get(
  "/auth",
  passport.authorize("facebookApplet", {
    scope: ["public_profile", "email", "manage_pages"]
  })
);

router.get(
  "/auth/callback",
  passport.authenticate("facebookApplet", {
    failureRedirect: `${baseURL}error/Something went wrong.`
  }),
  (req, res) =>
    res.redirect(
      `${baseURL}success/Facebook successfully connected.`
    ) // Successful authentication, redirect home.
);

router.get("/disconnect", isLoggedIn, (req, res, next) => {
  var user = req.user;
  user.facebookApplet = undefined;
  addToNotSubscribedRemoveFromSubscribed(
    "Facebook",
    user.servicesSubscribed,
    user.servicesNotSubscribed
  );
  user.save().then(
    user => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      const { servicesNotSubscribed, servicesSubscribed } = user;
      res.json({ servicesNotSubscribed, servicesSubscribed });
      return;
    },
    err => {
      console.log(err);
      return next(err);
    }
  );
});

exports.facebookRouter = router;
