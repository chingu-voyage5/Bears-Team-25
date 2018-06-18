const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
let Applet = require("../models/applet");
const myactivtiyRouter = express.Router();
let User = require("../models/users");
myactivtiyRouter.use(bodyParser.json());
var userObj = null;
var async = require("async");

myactivtiyRouter.use(function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		console.log("You are not logged in here!");
		res.statusCode = 401;
		res.setHeader("Content-Type", "application/json");
		res.json({ success: false, status: "You are not logged in here!" });
	}
});

myactivtiyRouter.route("/").get((req, res, next) => {
	console.log(req);
	console.log("Here in MyActivity");
	console.log(req.session.passport); //showing undefined
	// passport.deserializeUser(function(id, done) {
	User.findById(req.session.passport.user, function(err, user) {
		console.log(user._id);
		userObj = user;
		console.log("Printing the user obj activity");
		console.log(userObj.activity);
		res.statusCode = 200;
		res.setHeader("Content-Type", "application/json");
		res.json(userObj.activity);
	}).then(r => {
		next();
	});
});

myactivtiyRouter.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.send("error");
	console.log(err);
});

module.exports = myactivtiyRouter;
