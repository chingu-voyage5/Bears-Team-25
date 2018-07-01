var User = require("../../models/users");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

module.exports = function(passport) {
  passport.use(
    "gmail",
    new GoogleStrategy(
      {
        clientID: JSON.parse(process.env.googleAuth).clientID,
        clientSecret: JSON.parse(process.env.googleAuth).clientSecret,
        callbackURL:
          process.env.baseURL + JSON.parse(process.env.gmail).callbackURL,
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
      },
      function(req, token, refreshToken, profile, done) {
        var user = req.user;
        if (user) {
          user.gmail.token = token;
          user.gmail.email = (profile.emails[0].value || "").toLowerCase();
          user.gmail.refreshToken = refreshToken;
          let index = user.servicesSubscribed.map(service => service.service).indexOf('Mail');
          if (index === -1)  {user.servicesSubscribed.push({service: 'Mail', isWebhooks: false, isActions: true})};
          index = user.servicesNotSubscribed.indexOf('Mail');
          if (index !== -1) user.servicesNotSubscribed.splice(index, 1);
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
