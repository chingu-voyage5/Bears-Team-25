const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
let Applet = require("../models/applet");
const serviceRouter = express.Router();
let User = require("../models/users");
serviceRouter.use(bodyParser.json());
var userObj = null;
var async = require("async");
var isLoggedIn = require('../commonFunctions').isLoggedIn;

function extractUserInfo(userFromReq) {
	let isGoogleLinked, isFBLinked, isSlackToken;
	userFromReq.google.id ? (isGoogleLinked = true) : (isGoogleLinked = false);
	userFromReq.facebook.id ? (isFBLinked = true) : (isFBLinked = false);
	userFromReq.slack.token ? (isSlackToken = true) : (isSlackToken = false);
	userFromReq.gmail.refreshToken
		? (isGmailToken = true)
		: (isGmailToken = false);
	return (userInfo = {
		name: userFromReq.name,
		email: userFromReq.local.email,
		isGoogleLinked: isGoogleLinked,
		isFBLinked: isFBLinked,
		isSlackToken: isSlackToken,
		isGmailToken: isGmailToken
	});
}

//find the particular user by their id
serviceRouter.get("/", isLoggedIn, (req, res, next) => {
	let servicesSubscribed = [];
	let userObj = extractUserInfo(req.user);
	// console.log(req.user);
	// console.log(userObj);
	if (userObj.isFBLinked === true) {
		servicesSubscribed.push("Facebook");
	}
	if (userObj.isSlackToken === true) {
		servicesSubscribed.push("Slack");
	}
	if (userObj.isGmailToken === true) {
		servicesSubscribed.push("Mail");
	}
	console.log("Showing all services");
	console.log(servicesSubscribed);
	res.statusCode = 200;
	res.setHeader("Content-Type", "application/json");
	res.json(servicesSubscribed);
});

module.exports = serviceRouter;
