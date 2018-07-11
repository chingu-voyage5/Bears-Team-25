const express = require("express");
const bodyParser = require("body-parser");
const myactivtiyRouter = express.Router();
let User = require("../models/users");
myactivtiyRouter.use(bodyParser.json());
var userObj = null;

//check if the user is authenticated
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

//find the particular user by their id
myactivtiyRouter.route("/").get((req, res, next) => {
	User.findById(req.session.passport.user, function(err, user) {
		userObj = user;
		res.statusCode = 200;
		res.setHeader("Content-Type", "application/json");
		res.json(userObj.activity);
	}).then(r => {
		// next();
	});
});


module.exports = myactivtiyRouter;
