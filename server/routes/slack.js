const axios = require("axios");
var passport = require("passport");
var express = require("express");
var router = express.Router();
var isLoggedIn = require("../commonFunctions").isLoggedIn;
var deleteApplets = require("../commonFunctions").deleteApplets;
const baseURL = require('../config/baseUrl')

const slackSendMessage = (token, message, to) =>
  axios.post(
    "https://slack.com/api/chat.postMessage",
    {
      channel: to,
      text: message,
      as_user: true
    },
    {
      headers: { Authorization: "Bearer " + token }
    }
  );

router.get("/auth", passport.authorize("Slack"));

router.get(
  "/auth/callback",
  passport.authenticate("Slack", {
    failureRedirect: baseURL + "error/Something went wrong."
  }),
  (req, res) =>
    res.redirect(baseURL + "success/Slack successfully connected.") // Successful authentication, redirect home.
);

router.get("/disconnect", isLoggedIn, (req, res, next) => {
  var user = req.user;
  user.slack = undefined;
  deleteApplets("Slack", user, res, next);
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
        res.json({
          users: users.data.members,
          channels: channels.data.channels
        });
      } catch (err) {
        console.log(err);
        return next(err);
      }
    }
    fetchUsersAndChannels();
  } else {
    res.statusCode = 401;
    res.setHeader("Content-Type", "application/json");
    res.json({ success: false, status: "You don't have access token!" });
  }
});

exports.slackRouter = router;
exports.slackSendMessage = slackSendMessage;
