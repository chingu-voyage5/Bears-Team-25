"use strict";
const nodemailer = require("nodemailer");
const express = require("express");
const passport = require("passport");
const mailRouter = express.Router();
var User = require("../models/users");
require("dotenv").config();
const app = express();

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

//getting the authentication with the following scope
mailRouter.get(
  "/auth",
  passport.authenticate("gmail", {
    scope: ["profile", "email", "https://mail.google.com/"], //scope that send mail
    accessType: "offline",
    prompt: 'consent'
  })
);

mailRouter.get(
  "/auth/callback",
  passport.authenticate("gmail", {
    failureRedirect: "http://localhost:3000/login"
  }),
  (req, res) => res.redirect("http://localhost:3000/") // Successful authentication, redirect home.
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    clientId: JSON.parse(process.env.googleAuth).clientID,
    clientSecret: JSON.parse(process.env.googleAuth).clientSecret
  }
});

// if current access token expired, then new access token will be issued, and we can listen to this event and update
// all users that have linked this gmail account
transporter.on("token", token => {
  User.updateMany({ "gmail.email": token.user }, {"gmail.token": token.accessToken, "gmail.expires": token.expires},function(err, users) {
    if (err) {
      console.log(err);
      return next(err);
    }
  });
});

mailRouter.post("/sendMail", isLoggedIn, (req, res, next) => {
  const mailOptions = {
    from: req.user.gmail.email, // sender address
    to: "4ruslan.k@gmail.com", // list of receivers
    subject: "Hello", // Subject line
    text: req.body.message, // plain text body
    html: `<b>${req.body.message}</b>`, // html body
    auth: {
      user: req.user,
      refreshToken: req.user.gmail.refreshToken,
      accessToken: req.user.gmail.token,
      expires: req.user.gmail.expires
    }
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      status: "Email successfully sent"
    });
  });
});

exports.mailRouter = mailRouter;
exports.transporter = transporter;
