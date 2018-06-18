var LocalStrategy = require("passport-local").Strategy;
var User = require("../../models/users");

module.exports = function(passport) {
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
      }
    )
  );
};
