var User = require("../../models/users");
var FacebookStrategy = require("passport-facebook").Strategy;

module.exports = function(passport) {
  var fbStrategy = JSON.parse(process.env.facebookAuth);
  fbStrategy.callbackURL = process.env.baseURL + fbStrategy.callbackURL;
  fbStrategy.passReqToCallback = true; // allows us to pass in the req from our route (lets us check if a user is logged in or not)
  passport.use(
    new FacebookStrategy(fbStrategy, function(
      req,
      token,
      refreshToken,
      profile,
      done
    ) {
      // check if the user is already logged in
      if (!req.user) {
        User.findOne({ "facebook.id": profile.id }, function(err, user) {
          if (err) return done(err);

          if (user) {
            // if there is a user id already but no token (user was linked at one point and then removed)
            if (!user.facebook.token) {
              user.facebook.token = token;
              user.facebook.name =
                profile.name.givenName + " " + profile.name.familyName;

              user.save(function(err) {
                if (err) return done(err);

                return done(null, user);
              });
            }

            return done(null, user); // user found, return that user
          } else {
            // if there is no user, create them
            var newUser = new User();

            newUser.facebook.id = profile.id;
            newUser.facebook.token = token;
            newUser.facebook.name =
              profile.name.givenName + " " + profile.name.familyName;
            newUser.name =
              profile.name.givenName + " " + profile.name.familyName;

            newUser.save(function(err) {
              if (err) return done(err);

              return done(null, newUser);
            });
          }
        });
      } else {
        // user already exists and is logged in, we have to link accounts
        var user = req.user; // pull the user out of the session
        // check if this google account is already in use, if it exists, don't link account, just return previous acc
        User.findOne({ "facebook.id": profile.id }, function(err, FBUser) {
          if (err) return done(err);
          if (FBUser) {
            return done(null, user, {
              message: "error/This account already in use."
            });
          }
          user.facebook.id = profile.id;
          user.facebook.token = token;
          user.facebook.name =
            profile.name.givenName + " " + profile.name.familyName;
          user.save(function(err) {
            if (err) return done(err);
            return done(null, user, {
              message: "success/You successfully linked your Facebook account."
            });
          });
        });
      }
    })
  );
};
