const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
let Applet = require("../models/applet");
const myappletRouter = express.Router();
let User = require("../models/users");
myappletRouter.use(bodyParser.json());
var userObj = null;
var async = require("async");
var isLoggedIn = require("../commonFunctions").isLoggedIn;

myappletRouter.use(function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    console.log("You are not logged in here!");
    res.statusCode = 401;
    res.setHeader("Content-Type", "application/json");
    res.json({ success: false, status: "You are not logged in here!" });
  }
});

myappletRouter.use(function(req, res, next) {
  //find the particular user and store his details
  User.findById(req.session.passport.user, function(err, user) {
    userObj = user;
  }).then(r => {
    next();
  });
});

myappletRouter.route("/").get((req, res, next) => {
  let allApplets = [];
  //For each element in userObj.appletIds, the function in second parameter is called and when it's code, the third paramter function is called.
  //Done to have it wait will the particular applet is found out, else the process return before that
  async.each(
    userObj.appletIds,
    (applet_id, callback) => {
      Applet.findOne({ _id: mongoose.Types.ObjectId(applet_id) })
        .then(
          Applet => {
            allApplets.push(Applet);
          },
          err => next(err)
        )
        .then(r => {
          callback(null);
        })
        .catch(err => next(err));
    },
    // 3rd param is the function to call when everything's done
    function(err) {
      // All tasks are done now
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(allApplets);
    }
  );
});

myappletRouter.delete("/:id", isLoggedIn, (req, res, next) => {
  var id = req.params.id.toString()
  Applet.findOneAndDelete({ _id: id }).exec(function(err, applet) {
	if (err) return next(err);
	var user = req.user
	applets = user.appletIds;
	console.log(applets)
	var i = 0;
    for (let applet of applets) {
		if (applet._id.equals(id)) break;
		i++
	}
    applets.splice(i, 1)
    user.save().then(
      user => {
		User.populate(user, {path:"appletIds"}, function(err, user) {
			if (err) return next(err);
			res.statusCode = 200;
			res.setHeader("Content-Type", "application/json");
			res.json(user.appletIds);
			return;

		});
      },
      err => {
        console.log(err);
        return next(err);
      }
    );
  });
});

module.exports = myappletRouter;
