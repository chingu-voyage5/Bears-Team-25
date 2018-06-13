var passport = require("passport");
var express = require("express");
var router = express.Router();

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    console.log("You are not logged in!");
    var err = new Error("You are not logged in!");
    err.status = 403;
    next(err);
  }
}

// full path is api/users/login
router.post("/login", function(req, res, next) {
  passport.authenticate("local-login", function(err, user, info) {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (user) {
      req.logIn(user, function(err) {
        if (err) {
          console.log("error when logging in");
          return next(err);
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: true,
          status: "You have successfully signed in!",
          user: {
            name: req.user.name,
            id: req.user._id,
            email: req.user.local.email
          }
        });
        return;
      });
    } else {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");
      res.json({ success: false, status: info.message });
      return;
    }
  })(req, res, next);
});

router.post("/signup", function(req, res, next) {
  passport.authenticate("local-signup", function(err, user, info) {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (user) {
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        console.log("req.user", req.user);
        res.json({
          success: true,
          status: "You have successfully signed up!",
          user: {
            name: req.user.name,
            id: req.user._id,
            email: req.user.local.email
          }
        });
        return;
      });
    } else {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");
      res.json({ success: false, status: info.message });
    }
  })(req, res, next);
});

router.post("/change_password", isLoggedIn, function(req, res, next) {
 console.log('request')
 return res.json({message: "Hello"});
});

module.exports = router;
