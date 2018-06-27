var passport = require("passport");
var localLogin = require("./passportStrategies/localLogin");
var localSignUp = require('./passportStrategies/localSignUp');
var facebookAuth = require('./passportStrategies/faceboookAuth');
var googleAuth = require('./passportStrategies/googleAuth');
var slack = require('./passportStrategies/slackStrategy');
var gmail = require('./passportStrategies/gmail');
var github = require('./passportStrategies/github');
var trello = require('./passportStrategies/trello')
var User = require("../models/users");

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

// using configured strategies
localLogin(passport);
localSignUp(passport);
facebookAuth(passport);
googleAuth(passport);
slack(passport);
gmail(passport);
github(passport);
trello(passport);



