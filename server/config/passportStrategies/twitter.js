var TwitterStrategy = require("passport-twitter").Strategy;
var openStreamsForTwitterUser = require("../../routes/twitter")
  .openStreamsForTwitterUser;
var streams = require("../../routes/twitter").streams;
var addToSubscribedRemoveFromNotSubscribed = require("../../commonFunctions")
  .addToSubscribedRemoveFromNotSubscribed;

module.exports = function(passport) {
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: JSON.parse(process.env.twitter).consumerKey,
        consumerSecret: JSON.parse(process.env.twitter).consumerSecret,
        callbackURL:
          process.env.baseURL + JSON.parse(process.env.twitter).callbackURL,
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
      },
      function(req, token, tokenSecret, profile, done) {
        var user = req.user;
        if (user) {
          user.twitter.token = token;
          user.twitter.tokenSecret = tokenSecret;
          user.twitter.username = profile.username;
          user.twitter.id = profile.id;
          addToSubscribedRemoveFromNotSubscribed(
            "Twitter",
            true,
            false,
            user.servicesSubscribed,
            user.servicesNotSubscribed
          );
          user.save(function(err) {
            if (err) return done(err);
            // launching streaming api
            openStreamsForTwitterUser(user, streams);
            return done(null, user);
          });
        } else {
          const error = new Error("User should be logged in");
          return done(error, null);
        }
      }
    )
  );
};
