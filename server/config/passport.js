var passport = require("passport");
var User = require("../models/users");
var LocalStrategy = require("passport-local").Strategy;

// =========================================================================
// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// =========================================================================
// LOCAL LOGIN =============================================================
// =========================================================================
passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, username, password, done) {
      let email = null;
      if (req.body.email) email = req.body.email.toLowerCase(); // Use lower-case email to avoid case-sensitive email matching
      if (username) username = username.toLowerCase(); // Use lower-case usernames/emails to avoid case-sensitive e-mail/username matching
      // asynchronous
      process.nextTick(function() {
        //trying to find submited username in Datebase
        User.findOne({ "local.username": username }, function(err, user) {
          // if there are any errors, return the error
          if (err) return done(err);
          // if no user is found by username, we try to find user by email
          else if (!user) {
            User.findOne({ "local.email": username }, function(err, user) {
              // if there are any errors, return the error
              if (err) return done(err);
              // if no user is found, return the message
              else if (!user)
                return done(null, false, {
                  message: "Wrong password or username/email"
                });
              else if (!user.validPassword(password))
                return done(null, false, {
                  message: "Wrong password or username/email"
                });
              // all is well, return user
              else return done(null, user);
            });
          } else if (!user.validPassword(password))
            return done(null, false, {
              message: "Wrong password or username/email"
            });
          // all is well, return user
          else return done(null, user);
        });
      });
    }
  )
);

// =========================================================================
// LOCAL SIGN UP =============================================================
// =========================================================================

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

      // asynchronous
      process.nextTick(function() {
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
      });
    }
  )
);
