const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
let Applet = require("../models/applet");
const myappletRouter = express.Router();
let User = require("../models/users");
myappletRouter.use(bodyParser.json());
var userObj = null;

myappletRouter.use(function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		console.log("You are not logged in here!");
		res.statusCode = 401;
		res.setHeader("Content-Type", "application/json");
		res.json({ success: false, status: "You are not logged in here!" });
	}
});

myappletRouter.use(function(req, res, next) {
	console.log(req);
	console.log("Here in MyRouter");
	console.log(req.session.passport); //showing undefined
	// passport.deserializeUser(function(id, done) {
	User.findById(req.session.passport.user, function(err, user) {
		console.log(user._id);
		userObj = user;
		console.log("Printing the user obj id");
		console.log(userObj._id);
	}).then(r => {
		next();
	});
	// });
});

myappletRouter.route("/").get((req, res, next) => {
	let allApplets = [];
	for (applet_id of userObj.appletIds) {
		console.log(applet_id);
		Applet.findOne({ _id: applet_id })
			.then(
				Applet => {
					allApplets.concat(Applet);
				},
				err => next(err)
			)
			.then(r => {
				console.log("Done getting the applets");
			})
			.catch(err => next(err));
	}
	console.log("Showing all Applets");
	console.log(allApplets);
	res.statusCode = 200;
	res.setHeader("Content-Type", "application/json");
	res.json(allApplets);
});
myappletRouter.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.send("error");
	console.log(err);
});

module.exports = myappletRouter;
