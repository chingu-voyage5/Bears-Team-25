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

router.post("/sendMessage", isLoggedIn, (req, res, next) => {
  let token = req.user.slack.token;
  let message = req.body.message || "hello world";
  let to = req.body.to || 'general';
 //console.log(message, to)
  if (token) {
    axios
      .post(
        "https://slack.com/api/chat.postMessage",
        {
          channel: to,
          text: message,
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

router.get("/fetchUsersAndChannels", isLoggedIn, (req, res, next) => {
  let token = req.user.slack.token;
  if (token) {
    async function fetchUsersAndChannels() {
      try {
        const usersPromise = axios("https://slack.com/api/users.list", {
          headers: { Authorization: "Bearer " + req.user.slack.token }
        });
        const channelsPromise = axios("https://slack.com/api/channels.list", {
          headers: { Authorization: "Bearer " + req.user.slack.token }
        });
        const [users, channels] = await Promise.all([
          usersPromise,
          channelsPromise
        ]);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ users: users.data.members, channels: channels.data.channels });
      } catch (err) {
        console.log(err);
        return next(err);
      }
    }
    fetchUsersAndChannels();
  }
});

module.exports = router;
