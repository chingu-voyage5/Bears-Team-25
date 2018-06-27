var GitHubStrategy = require("passport-github").Strategy;

module.exports = function(passport) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: JSON.parse(process.env.github).clientID,
        clientSecret: JSON.parse(process.env.github).clientSecret,
        callbackURL:
          process.env.baseURL + JSON.parse(process.env.github).callbackURL,
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
      },
      function(req, token, refreshToken, profile, done) {
        var user = req.user;
        if (user) {
          user.github.token = token;
          user.github.id = profile._json.id;
          user.github.username = profile._json.login;
          user.save(function(err) {
            if (err) return done(err);
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
