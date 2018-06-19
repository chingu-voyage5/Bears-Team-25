var SlackStrategy = require("passport-slack-oauth2").Strategy;

module.exports = function(passport) {
  passport.use(
    new SlackStrategy(
      {
        clientID: JSON.parse(process.env.slack).clientID,
        clientSecret: JSON.parse(process.env.slack).clientSecret,
        callbackURL:
          process.env.baseURL + JSON.parse(process.env.slack).callbackURL,
        skipUserProfile: false, // false is default
        scope: [
          "identity.basic",
          //   "identity.email",
          //   "identity.avatar",
          //   "identity.team",
          "users:read",
          "channels:read",
          "chat:write:user"
        ],
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not) // default
      },

      (req, accessToken, refreshToken, profile, done) => {
        var user = req.user;
        if (user) {
          user.slack.token = accessToken;
          user.save(function(err) {
            if (err) return done(err);
            return done(null, user);
          });
        } else {
          const error = new Error ('User should be logged in');
          return done(error, null);
        }
      }
    )
  );
};
