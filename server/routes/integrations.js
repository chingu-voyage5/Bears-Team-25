var express = require("express");
var router = express.Router();
var transporter = require("./email").transporter;
var mailOptions = require('./email').mailOptions;
var slackSendMessage = require('./slack').slackSendMessage;

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
    let email = req.body.email;
    let options = mailOptions(req.user, req.body)
    if (token) {
      async function sendMessageThroughSlackAndGmail() {
        try {
          const mailPromise = transporter.sendMail(options);
          const slackPromise = slackSendMessage(req.user.slack.token, message, to);
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
      sendMessageThroughSlackAndGmail();
    }
  }
);

module.exports = router;
