var User = require("../../models/users");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

module.exports = function(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: JSON.parse(process.env.googleAuth).clientID,
        clientSecret: JSON.parse(process.env.googleAuth).clientSecret,
        callbackURL:
          process.env.baseURL + JSON.parse(process.env.googleAuth).callbackURL,
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
      },
      function(req, token, refreshToken, profile, done) {
        // check if the user is already logged in
        if (!req.user) {
          User.findOne({ "google.id": profile.id }, function(err, user) {
            if (err) return done(err);
            if (user) {
              // if there is a user id already but no token (user was linked at one point and then removed)
              if (!user.google.token) {
                user.google.token = token;
                user.google.name = profile.displayName;
                user.google.email = (
                  profile.emails[0].value || ""
                ).toLowerCase(); // pull the first email

                user.save(function(err) {
                  if (err) return done(err);

                  return done(null, user);
                });
              }

              return done(null, user);
            } else {
              var newUser = new User();

              newUser.google.id = profile.id;
              newUser.google.token = token;
              newUser.google.name = profile.displayName;
              newUser.google.email = (
                profile.emails[0].value || ""
              ).toLowerCase(); // pull the first email
              newUser.name = profile.displayName;

              newUser.save(function(err) {
                if (err) return done(err);

                return done(null, newUser);
              });
            }
          });
        } else {
          // user already exists and is logged in, we have to link accounts
          var user = req.user; // pull the user out of the session
          User.findOne({ "google.id": profile.id }, function(err, googleUser) {
            if (err) return done(err);
            // check if this google account is already in use, if it exists, don't link account
            if (googleUser) {
              return done(null, user, {
                message: "error/This account already in use."
              });
            }
            user.google.id = profile.id;
            user.google.token = token;
            user.google.name = profile.displayName;
            user.google.email = (profile.emails[0].value || "").toLowerCase(); // pull the first email
            user.save(function(err) {
              if (err) return done(err);
              return done(null, user, {
                message: "success/You successfully linked your Google account."
              });
            });
          });
        }
      }
    )
  );
};
