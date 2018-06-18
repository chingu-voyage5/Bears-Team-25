const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const Applet = require("../models/applet");
const appletRouter = express.Router();
let User = require("../models/users");
appletRouter.use(bodyParser.json());
let userObj = null;

appletRouter.use(function(req, res, next) {
	//get the user details from current session
	User.findById(req.session.passport.user, function(err, user) {
		userObj = user;
	})
		.then(r => {
			next();
		})
		.catch(err => next(err));
});

appletRouter
	.route("/")
	.get((req, res, next) => {
		Applet.find({})
			.then(
				Applet => {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json(Applet);
				},
				err => next(err)
			)
			.catch(err => next(err));
	})
	.post((req, res, next) => {
		let id = null;
		let service = null;
		Applet.create(req.body)
			.then(
				applet => {
					id = applet._id;
					service = applet.option.watchFrom;
				},
				err => next(err)
			)
			.then(r => {
				User.findOneAndUpdate(
					{ _id: userObj._id },
					{
						$push: {
							appletIds: id.toString(),
							activity: { date: Date.now(), serviceFrom: service }
						}
					}
				)
					.then(
						update => {
							res.statusCode = 200;
							res.setHeader("Content-Type", "application/json");
							res.json(r);
						},
						err => next(err)
					)
					.catch(err => next(err));
			})
			.catch(err => next(err));
	})
	.put((req, res, next) => {
		res.statusCode = 403;
		res.end("PUT operation not supported on /Applet");
	})
	.delete((req, res, next) => {
		res.statusCode = 403;
		res.end("Delete operation not supported on /Applet");
	});
appletRouter.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.send("error");
	console.log(err);
});

module.exports = appletRouter;
