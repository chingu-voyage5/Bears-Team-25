var Twit = require("twit");
const express = require("express");
const twitterRouter = express.Router();
var passport = require("passport");
var isLoggedIn = require('../commonFunctions').isLoggedIn;
var User = require("../models/users");
var addToNotSubscribedRemoveFromSubscribed = require('../commonFunctions').addToNotSubscribedRemoveFromSubscribed;
var postTrelloCard = require("../routes/trello").postCard;
var slackSendMessage = require("../routes/slack").slackSendMessage;
var transporter = require('../routes/email').transporter;
var mailOptions = require('../routes/email').mailOptions;


//trello actions
function trelloActions (applets, trelloToken, cardTitle, description) {
	appletsWithTrelloActions = applets.filter(applet => applet.option.watchTo === 'Trello');
	for (appletsWithTrelloAction of appletsWithTrelloActions) {
		let trelloOptions = appletsWithTrelloAction.action.trelloOptions;
		let trelloConfig = {...trelloOptions, token: trelloToken, cardTitle, description}
		postTrelloCard(trelloConfig).then(card => {
			console.log("trello card posted");
		});
	}
}

function slackActions(applets, slackToken, message) {
	appletsWithSlackActions = applets.filter(applet => applet.option.watchTo === 'Slack');
	for (appletsWithSlackAction of appletsWithSlackActions) {
		let slackOptions = appletsWithSlackAction.action.slackOptions;
		slackSendMessage(slackToken, message, slackOptions.to).then(message => {
			console.log("slack message sent");
		});
	}
}

function mailActions (applets, message, user) {
	appletsWithMailActions = applets.filter(applet => applet.option.watchTo === 'Mail');
	for (appletsWithMailAction of appletsWithMailActions) {
		let options = mailOptions(user, {email:  appletsWithMailAction.action.mailOptions.email,
				message: message})
		transporter.sendMail(options).then(message => {
			console.log("email  sent");
		});
	}
}


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
	
	var streams = {}

	User.find({ 'twitter.id': { $exists: true } })
	.exec(function(err, users) {
		if (err) return done(err);
		consumer_key = JSON.parse(process.env.twitter).consumerKey;
		consumer_secret = JSON.parse(process.env.twitter).consumerSecret;
		if (users.length !== 0) {
			for (let user of users) {
				let id = user.twitter.id;
				if (streams[id]) continue
				var T = new Twit({
					consumer_key,
					consumer_secret,
					access_token: user.twitter.token,
					access_token_secret: user.twitter.tokenSecret,
					timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
				});
				

				var stream = T.stream('user');
				streams[id] = stream;

				stream.on('tweet', function (tweet) {
					console.log(tweet)
					let twitterID = tweet.user.id;
					User.find({ "twitter.id": twitterID })
					.populate('appletIds')
					.exec(function(err, users) {
						if (err) return done(err);
						if (users.length !== 0) {
							for (user of users) {
								let applets = user.appletIds;
								applets = applets.filter(applet => applet.option.watchFrom === 'Twitter' && applet.isActive);

								// applets that triggered by any tweets 
								anyTwitsApplets = applets.filter(applet => applet.trigger.twitterOptions.byAnyTweet  && applet.isActive);

								// trello options / actions
								let cardTitle = `[New tweet by ${tweet.user.name}]`;
								let description = `[Text]: ${tweet.text}`;
								trelloActions(anyTwitsApplets, user.trello.token, cardTitle, description);

								//slack options / actions
								let message = `[New tweet] Text: [${tweet.text}] Author: ${tweet.user.name}`;
								slackActions(anyTwitsApplets, user.slack.token, message);

								//mail actions
								mailActions (anyTwitsApplets, message, user);

								
								//  applets that triggered by hasgtags in tweets 
								let hashtags = tweet.entities.hashtags;
								// checking if any applets have any hashtags from tweet as triggers
								hashtagTwitsApplets = applets.filter(applet => hashtags.some(hashtag => hashtag.text === (applet.trigger.twitterOptions.hashtag) && applet.isActive));
								// trello options / actions
								cardTitle = `[New hashtaged tweet by ${tweet.user.name}]`;
								description = `[Text]: ${tweet.text}`;
								trelloActions(hashtagTwitsApplets, user.trello.token, cardTitle, description);

								//slack options / actions
								message = `[New hashtaged tweet] Text: [${tweet.text}] Author: ${tweet.user.name}`;
								slackActions(hashtagTwitsApplets, user.slack.token, message);

								//mail actions
								mailActions (hashtagTwitsApplets, message, user);

							}
						}
					})
				 });

				 stream.on('follow', function (follow) {
					console.log(follow);
					// tweet.source.id; tweet.target.name tweet.target.screen_name: // person who started following
					// tweet.target.id  // person who was followed
				 });			 
			}
			} else {
			console.log("User not found");
		}


		
	});


		

			

			



// T.get('account/verify_credentials', { skip_status: true })
//   .catch(function (err) {
//     console.log('caught error', err.stack)
//   })
//   .then(function (result) {
//     console.log('data', result);
//   })



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
exports.streams = streams;
