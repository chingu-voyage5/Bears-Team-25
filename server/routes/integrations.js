const axios = require("axios");
var passport = require("passport");
var express = require("express");
var router = express.Router();
var transporter = require("./email").transporter;

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

router.post(
  "/sendMessageThroughSlackAndGmail",
  isLoggedIn,
  (req, res, next) => {
    let token = req.user.slack.token;
    let message = req.body.message || "hello world";
    let to = req.body.to || 'general';
    const mailOptions = {
      from: req.user.gmail.email, // sender address
      to: "4ruslan.k@gmail.com", // list of receivers
      subject: "Hello", // Subject line
      text: req.body.message, // plain text body
      html: `<b>${req.body.message}</b>`, // html body
      auth: {
        user: req.user.gmail.email,
        refreshToken: req.user.gmail.refreshToken,
        accessToken: req.user.gmail.token,
        expires: req.user.gmail.expires
      }
    };

    if (token) {
      async function sendMessage() {
        try {
          const mailPromise = transporter.sendMail(mailOptions);
          const slackPromise = axios.post(
            "https://slack.com/api/chat.postMessage",
            {
              channel: to,
              text: message,
              as_user: true
            },
            {
              headers: { Authorization: "Bearer " + req.user.slack.token }
            }
          );
          const [slack, gmail] = await Promise.all([mailPromise, slackPromise]);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({
            slack: "success",
            gmail: "success"
          });
        } catch (err) {
          console.log(err);
          return next(err);
        }
      }
      sendMessage();
    }
  }
);

module.exports = router;
