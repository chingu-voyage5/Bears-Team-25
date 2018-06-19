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

router.get('/auth', passport.authorize('Slack'));

router.get('/auth/callback',
  passport.authenticate('Slack', { failureRedirect: 'http://localhost:3000/login' }),
  (req, res) => res.redirect('http://localhost:3000/') // Successful authentication, redirect home.
);


router.get("/sendMessage", isLoggedIn, (req, res, next) => {
  axios
    .post(
      "https://slack.com/api/chat.postMessage",
      {
        channel:'random',
        text: 'hello world',
        as_user: true
      },
      {
        headers: {'Authorization': "Bearer " +  process.env.slackToken}
   }

    )
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
