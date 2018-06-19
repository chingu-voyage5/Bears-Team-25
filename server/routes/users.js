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

function extractUserInfo(userFromReq) {
  let isGoogleLinked, isFBLinked, isSlackToken
  (userFromReq.google.id) ? (isGoogleLinked = true) : (isGoogleLinked = false);
  (userFromReq.facebook.id) ? (isFBLinked = true) : (isFBLinked = false);
  (userFromReq.slack.token) ? (isSlackToken = true) : (isSlackToken = false);
  return userInfo = { name: userFromReq.name, email: userFromReq.local.email, isGoogleLinked: isGoogleLinked, isFBLinked: isFBLinked,
  isSlackToken: isSlackToken }
}

// this route is just used to get the user basic info
router.get("/user", isLoggedIn, (req, res, next) => {
  if (req.user) {
    return res.json({
      user: extractUserInfo(req.user)
    });
  } else {
    return res.json({ user: null });
  }
});

router.post("/unlink", isLoggedIn, (req, res, next) => {
  user = req.user;
  var social = req.body.social;
  if (social)  {
    user[social] = undefined;
    }
  user.save().then(
    () => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({status: "Account successfully unlinked" });
      return;
    },
    err => {
      console.log(err);
      return next(err);
    }
  );
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
          user: extractUserInfo(req.user)
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
        res.json({
          success: true,
          status: "You have successfully signed up!",
          user: extractUserInfo(req.user)
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
    if (!user.local.password) {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");
      return res.json({ success: false, status: "You don't have password." });
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

router.get("/auth/facebook/callback", function(req, res, next) {
  passport.authenticate("facebook", function(err, user, info) {
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
        message = info.message
        if (message) {
          res.redirect('http://localhost:3000/' + info.message)
        }
        else {
          res.redirect('http://localhost:3000/')
        }
        return;
      });
    } else {
      res.redirect('http://localhost:3000/login')
      return;
    }
  })(req, res, next);
});

// google ---------------------------------

// send to google to do the authentication
router.get(
  "/auth/google",
  passport.authenticate("google", {display: 'popup', scope: ["profile", "email"] })
);


router.get("/auth/google/callback", function(req, res, next) {
  passport.authenticate("google", function(err, user, info) {
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
        message = info.message
        if (message) {
          res.redirect('http://localhost:3000/' + info.message)
        }
        else {
          res.redirect('http://localhost:3000/')
        }
        return;
      });
    } else {
      res.redirect('http://localhost:3000/login')
      return;
    }
  })(req, res, next);
});

module.exports = router;
