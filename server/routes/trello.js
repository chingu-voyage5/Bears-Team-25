const axios = require("axios");
var passport = require("passport");
var express = require("express");
var router = express.Router();
var User = require("../models/users");

router.get(
  "/auth",
  passport.authorize("trello", {
    scope: {
      read: "true",
      write: "true"
    },
    expiration: "never",
    name: "IFTTT"
  })
);

router.get(
  "/auth/callback",
  passport.authenticate("trello", {
    failureRedirect: "http://localhost:3000/"
  }),
  (req, res) => res.redirect("http://localhost:3000/") // Successful authentication, redirect home.
);

module.exports = router;
