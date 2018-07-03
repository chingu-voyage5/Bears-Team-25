"use strict";
const nodemailer = require("nodemailer");
const express = require("express");
const passport = require("passport");
const mailRouter = express.Router();
var User = require("../models/users");
require("dotenv").config();
const app = express();
var isLoggedIn = require('../commonFunctions').isLoggedIn;

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


const mailOptions = (user, json) => {
  return {
    from: user.gmail.email, // sender address
    to: json.email, // list of receivers
    subject: "IFTTT message", // Subject line
    text: json.message, // plain text body
    html: `<b>${json.message}</b>`, // html body
    auth: {
      user: user.gmail.email,
      refreshToken: user.gmail.refreshToken,
      accessToken: user.gmail.token,
      expires: user.gmail.expires
    }
  }
};

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
    failureRedirect: "http://localhost:3000/error/Something went wrong."
  }),
  (req, res) => res.redirect("http://localhost:3000/success/Gmail successfully connected.") // Successful authentication, redirect home.
);

mailRouter.get("/disconnect", isLoggedIn, (req, res, next) => {
  var user = req.user;
  user.gmail = undefined;
  let index = user.servicesSubscribed.map(service => service.service).indexOf('Mail');
  if (index !== -1)  user.servicesSubscribed.splice(index, 1);
  index = user.servicesNotSubscribed.indexOf('Mail');
  if (index === -1) user.servicesNotSubscribed.push('Mail');
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

exports.mailRouter = mailRouter;
exports.transporter = transporter;
exports.mailOptions = mailOptions;
