const axios = require("axios");
var passport = require("passport");
var express = require("express");
var router = express.Router();
var User = require("../models/users");
var isLoggedIn = require('../commonFunctions').isLoggedIn;
var addToNotSubscribedRemoveFromSubscribed = require('../commonFunctions').addToNotSubscribedRemoveFromSubscribed;


router.get("/updates", (req, res, next) => {
    console.log(req.query['hub.verify_token'])
    if (req.query['hub.verify_token'] === 'ifttt') {
        res.send(req.query['hub.challenge'])
    }
  });


router.post("/updates", (req, res, next) => {
    console.log(req.body.entry[0].changed_fields);
  });  


router.get("/auth", passport.authorize("facebookApplet"));

router.get(
  "/auth/callback",
  passport.authenticate("facebookApplet", {
    failureRedirect: "http://localhost:3000/error/Something went wrong."
  }),
  (req, res) => res.redirect("http://localhost:3000/success/Facebook successfully connected.") // Successful authentication, redirect home.
);

router.get("/disconnect", isLoggedIn, (req, res, next) => {
  var user = req.user;
  user.facebookApplet = undefined;
  addToNotSubscribedRemoveFromSubscribed('Facebook', user.servicesSubscribed, user.servicesNotSubscribed);
  user.save().then(
    (user) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      const {servicesNotSubscribed, servicesSubscribed} = user;
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
