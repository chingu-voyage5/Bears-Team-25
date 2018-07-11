var FacebookStrategy = require("passport-facebook").Strategy;
var addToSubscribedRemoveFromNotSubscribed = require("../../commonFunctions")
  .addToSubscribedRemoveFromNotSubscribed;

module.exports = function(passport) {
  var fbStrategy = JSON.parse(process.env.facebookAuth);
  fbStrategy.callbackURL = process.env.baseURL + "api/facebook/auth/callback";
  fbStrategy.passReqToCallback = true; // allows us to pass in the req from our route (lets us check if a user is logged in or not)
  passport.use(
    "facebookApplet",
    new FacebookStrategy(fbStrategy, function(
      req,
      token,
      refreshToken,
      profile,
      done
    ) {
      var user = req.user;
      if (user) {
        user.facebookApplet.token = token;
        user.id = profile.id;
        addToSubscribedRemoveFromNotSubscribed(
          "Facebook",
          true,
          false,
          user.servicesSubscribed,
          user.servicesNotSubscribed
        );
        user.save(function(err) {
          if (err) return done(err);
          return done(null, user);
        });
      } else {
        const error = new Error("User should be logged in");
        return done(error, null);
      }
    })
  );
};
