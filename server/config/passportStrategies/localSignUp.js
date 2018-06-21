var LocalStrategy = require("passport-local").Strategy;
var User = require("../../models/users");

module.exports = function(passport) {
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
      },
      function(req, username, password, done) {
        let email = null;
        if (req.body.email) email = req.body.email.toLowerCase(); // Use lower-case email to avoid case-sensitive email matching
        if (username) username = username.toLowerCase(); // Use lower-case username to avoid case-sensitive username matching

        // if the user is not already logged in:
        if (!req.user) {
          User.findOne({ "local.username": username }, function(err, user) {
            // if there are any errors, return the error
            if (err) return done(err);
            // check to see if theres already a user with that username
            if (user) {
              return done(null, false, {
                message: "That username is already taken."
              });
            } else {
              // check to see if theres already a user with that email
              if (email) {
                User.findOne({ "local.email": email }, function(err, user) {
                  // if there are any errors, return the error
                  if (err) return done(err);
                  // check to see if theres already a user with that email
                  if (user) {
                    return done(null, false, {
                      message: "That email is already taken."
                    });
                  } else {
                    // check to see if theres already a user with that email
                    // create the user
                    var newUser = new User();
                    newUser.local.username = username;
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.name = username;
                    newUser.save(function(err) {
                      if (err) return done(err);

                      return done(null, newUser);
                    });
                  }
                });
              } else {
                // create the user
                var newUser = new User();
                newUser.local.username = username;
                newUser.local.email = "";
                newUser.name = username;
                newUser.local.password = newUser.generateHash(password);
                newUser.save(function(err) {
                  if (err) return done(err);

                  return done(null, newUser);
                });
              }
            }
          });
        } else {
          return done(null, req.user);
        }
      }
    )
  );
};
