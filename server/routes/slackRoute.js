const axios = require("axios");
var passport = require("passport");
var express = require("express");
var router = express.Router();
var User = require("../models/users");

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    console.log("You are not logged in!");
    res.statusCode = 401;
    res.setHeader("Content-Type", "application/json");
    res.json({ success: false, status: "You are not logged in!" });
  }
}

router.get("/auth", passport.authorize("Slack"));

router.get(
  "/auth/callback",
  passport.authenticate("Slack", {
    failureRedirect: "http://localhost:3000/login"
  }),
  (req, res) => res.redirect("http://localhost:3000/") // Successful authentication, redirect home.
);

router.get("/sendMessage", isLoggedIn, (req, res, next) => {
  let token = req.user.slack.token;
  let text = 'hello world';
  let channel = 'random';
  if (token) {
    axios
      .post(
        "https://slack.com/api/chat.postMessage",
        {
          channel: channel,
          text: text,
          as_user: true
        },
        {
          headers: { Authorization: "Bearer " + req.user.slack.token }
        }
      )
      .then(response => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response.data);
      })
      .catch(err => {
        console.log(err);
        return next(err);
      });
  } else {
    res.redirect("http://localhost:3001/slack/auth");
    return;
  }
});

router.get("/fetchChannels", isLoggedIn, (req, res, next) => {
  let token = req.user.slack.token;
  if (token) {
    axios
      .get("https://slack.com/api/channels.list", {
        headers: { Authorization: "Bearer " + req.user.slack.token }
      })
      .then(response => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response.data);
      })
      .catch(err => {
        console.log(err);
        return next(err);
      });
  } else {
    res.redirect("http://localhost:3001/slack/auth");
    return;
  }
});

router.get("/fetchUsers", isLoggedIn, (req, res, next) => {
  let token = req.user.slack.token;
  if (token) {
    axios
      .get("https://slack.com/api/users.list", {
        headers: { Authorization: "Bearer " + req.user.slack.token }
      })
      .then(response => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response.data);
      })
      .catch(err => {
        console.log(err);
        return next(err);
      });
  } else {
    res.redirect("http://localhost:3001/slack/auth");
    return;
  }
});



module.exports = router;
