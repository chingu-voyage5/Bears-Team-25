var passport = require("passport");
var express = require("express");
var router = express.Router();
var User = require("../models/users");

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    console.log("You are not logged in!");
    res.statusCode = 401;
    res.setHeader("Content-Type", "application/json");
    res.json({ success: false, status: "You are not logged in!" });
  }
}

// this route is just used to get the user basic info
router.get("/user", isLoggedIn, (req, res, next) => {
  if (req.user) {
    let isGoogleLinked, isFBLinked
    (req.user.gogle) ? (isGoogleLinked = true) : (isGoogleLinked = false);
    (req.user.facebook) ? (isFBLinked = true) : (isFBLinked = false);
    return res.json({
      user: { name: req.user.name, email: req.user.local.email, isGoogleLinked: isGoogleLinked, isFBLinked: isFBLinked }
    });
  } else {
    return res.json({ user: null });
  }
});

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

router.get("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    req.session.destroy();
    res.clearCookie("connect.sid"); // clean up session info from client-side
    return res.json({ msg: "logging you out" });
  } else {
    return res.json({ msg: "no user to log out!" });
  }
});

router.post("/change_password", isLoggedIn, function(req, res, next) {
  var user = req.user;
  // checking if don't have current local password or provided password is valid
  if (!user.local.password || user.validPassword(req.body.oldPassword)) {
    // if true - assign new password
    user.local.password = user.generateHash(req.body.password);
    user.save().then(
      user => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: true,
          status: "Password successfully changed"
        });
        return;
      },
      err => {
        console.log(err);
        return next(err);
      }
    );
    // if not valid - send error message
  } else {
    res.statusCode = 401;
    res.setHeader("Content-Type", "application/json");
    return res.json({ success: false, status: "Wrong password" });
  }
});

router.post("/delete_account", isLoggedIn, function(req, res, next) {
  User.findById(req.user._id, function(err, user) {
    if (err) {
      return res.json({ success: false, status: err });
    }
    // checking if provided password is valid
    if (user.validPassword(req.body.password)) {
      User.findByIdAndRemove(req.user._id, function(err, user) {
        if (err) {
          return res.json({ success: false, status: err });
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ success: false, status: "Account succesfully deleted" });
        return;
      });
    } else {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");
      return res.json({ success: false, status: "Wrong password" });
    }
  });
});

router.post("/change_email", isLoggedIn, function(req, res, next) {
  // checking if provided email already in use
  User.findOne({ "local.email": req.body.email }, function(err, user) {
    if (err) {
      console.log(err);
      return next(err);
    }
    // if user with such email exist - send error message
    if (user) {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");
      return res.json({
        success: false,
        status: "This email is already in use"
      });
    }

    //
    User.findById(req.user._id, function(err, user) {
      if (err) {
        return res.json({ success: false, status: err });
      }
      user.local.email = req.body.email;
      user.save().then(
        user => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({
            success: true,
            status: "Email successfully changed",
            email: user.local.email
          });
          return;
        },
        err => {
          console.log(err);
          return next(err);
        }
      );
    });
  });
});

// facebook -------------------------------

// send to facebook to do the authentication
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {display: 'popup', scope: ["public_profile", "email"] })
);

// handle the callback after facebook has authenticated the user
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/login"
  })
);

// google ---------------------------------

// send to google to do the authentication
router.get(
  "/auth/google",
  passport.authenticate("google", {display: 'popup', scope: ["profile", "email"] })
);

// the callback after google has authenticated the user
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/login"
  })
);

module.exports = router;
