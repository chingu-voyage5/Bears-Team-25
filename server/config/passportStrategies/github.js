var GitHubStrategy = require("passport-github").Strategy;
var User = require("../../models/users");

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
          let index = user.servicesSubscribed.indexOf('Github')
          if (index === -1) user.servicesSubscribed.push({service: 'Github', isWebhooks: true, isActions: false})
          index = user.servicesNotSubscribed.indexOf('Github')
          if (index !== -1) user.servicesNotSubscribed.splice(index, 1) 
          isAppInstalled = false;
          // check if app was installed on any other account ,that uses this git id,
          // if app installed there, this means we already have webhooks for this user 
          User.findOne({ "github.id": profile._json.id }, function(err, gitUser) {
            if (err) return done(err);
            if (gitUser && gitUser.github.isAppInstalled) {
              isAppInstalled = true;
            }
            user.github.isAppInstalled = isAppInstalled
            user.save(function(err) {
              if (err) return done(err);
              return done(null, user);
            });
          });
     
        } else {
          const error = new Error("User should be logged in");
          return done(error, null);
        }
      }
    )
  );
};
