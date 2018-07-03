var Twit = require("twit");
const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("../config/cors");
const twitterRouter = express.Router();
console.log("Starting");
// enabling CORS for development
var T = new Twit({
	consumer_key: process.env.twitter_api_key,
	consumer_secret: process.env.twitter_api_secret,
	access_token: process.env.twitter_access_token,
	access_token_secret: process.env.twitter_token_secret,
	timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
	strictSSL: true // optional - requires SSL certificates to be valid.
});

// T.get('account/verify_credentials', { skip_status: true })
//   .catch(function (err) {
//     console.log('caught error', err.stack)
//   })
//   .then(function (result) {
//     console.log('data', result);
//   })

console.log("here in twiter router");
var T = new Twit({
	consumer_key: process.env.twitter_api_key,
	consumer_secret: process.env.twitter_api_secret,
	access_token: process.env.twitter_access_token,
	access_token_secret: process.env.twitter_token_secret,
	timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
	strictSSL: true // optional - requires SSL certificates to be valid.
});

T.get("search/tweets", { q: "banana since:2011-07-11", count: 100 }, function(
	err,
	data,
	response
) {
	if (err) {
		console.log("error " + err);
	}
	console.log(data);
});

console.log("Done");
// export default twitterRouter;
