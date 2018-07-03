
var OAuth1Strategy = require('passport-oauth1');
var addToSubscribedRemoveFromNotSubscribed = require('../../commonFunctions').addToSubscribedRemoveFromNotSubscribed;


OAuth1Strategy.prototype.userAuthorizationParams = function(options) {
    return {scope:  ['read', 'write'], expiration: 'never', name: 'IFTTT'}
    };

module.exports = function(passport) {
    passport.use('trello', new OAuth1Strategy({
        requestTokenURL: 'https://trello.com/1/OAuthGetRequestToken',
        accessTokenURL: 'https://trello.com/1/OAuthGetAccessToken',
        userAuthorizationURL: 'https://trello.com/1/OAuthAuthorizeToken',
        consumerKey: JSON.parse(process.env.trello).consumerKey,
        consumerSecret: JSON.parse(process.env.trello).consumerSecret,
        callbackURL: process.env.baseURL + JSON.parse(process.env.trello).callbackURL,
        signatureMethod: "HMAC-SHA1",
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
      },
      function(req, token, tokenSecret, profile, cb) {
        var user = req.user;
        if (user) {
          user.trello.token = token;
          user.trello.tokenSecret = tokenSecret;
          addToSubscribedRemoveFromNotSubscribed('Trello', false, true,
           user.servicesSubscribed, user.servicesNotSubscribed);
          user.save(function(err) {
            if (err) return cb(err);
            return cb(null, user);
          });
        } else {
          const error = new Error("User should be logged in");
          return cb(error, null);
        }
      }
    ));
}