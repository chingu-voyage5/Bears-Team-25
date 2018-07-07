var Twit = require("twit");
const express = require("express");
const twitterRouter = express.Router();
var passport = require("passport");
var isLoggedIn = require('../commonFunctions').isLoggedIn;
var addToNotSubscribedRemoveFromSubscribed = require('../commonFunctions').addToNotSubscribedRemoveFromSubscribed;

twitterRouter.get("/auth", passport.authorize("twitter"));

twitterRouter.get(
  "/auth/callback",
  passport.authenticate("twitter", {
    failureRedirect: "http://localhost:3000/error/Something went wrong."
  }),
  (req, res) => res.redirect("http://localhost:3000/success/Twitter successfully connected.") // Successful authentication, redirect home.
);

twitterRouter.get("/disconnect", isLoggedIn, (req, res, next) => {
	var user = req.user;
	user.slack = undefined;
	addToNotSubscribedRemoveFromSubscribed('Twitter', user.servicesSubscribed, user.servicesNotSubscribed);
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


// var T = new Twit({
// 	consumer_key: JSON.parse(process.env.twitter).consumerKey,
// 	consumer_secret: JSON.parse(process.env.twitter).consumerSecret,
// 	access_token: process.env.twitter_access_token,
// 	access_token_secret: process.env.twitter_token_secret,
// 	timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
// 	strictSSL: true // optional - requires SSL certificates to be valid.
// });

// T.get('account/verify_credentials', { skip_status: true })
//   .catch(function (err) {
//     console.log('caught error', err.stack)
//   })
//   .then(function (result) {
//     console.log('data', result);
//   })

// console.log("here in twiter router");
// var T = new Twit({
// 	consumer_key: process.env.twitter_api_key,
// 	consumer_secret: process.env.twitter_api_secret,
// 	access_token: process.env.twitter_access_token,
// 	access_token_secret: process.env.twitter_token_secret,
// 	timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
// 	strictSSL: true // optional - requires SSL certificates to be valid.
// });

// // var stream = T.stream('user');
// var stream = T.stream('user'); 

// //get all tweets from user
// stream.on('tweet', function (tweet) {
//  console.log(tweet);
// });

// //when tweet is favorited by user
// stream.on('favorite', function (event) {
//   console.log("favouited");
// });

// //updates on users
// stream.on('user_update', function (event) {
//   console.log("User updated");
// });

// console.log("Done");
// // export default twitterRouter;


exports.twitterRouter = twitterRouter;
