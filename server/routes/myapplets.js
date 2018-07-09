const express = require("express");
const bodyParser = require("body-parser");
let Applet = require("../models/applet");
const myappletRouter = express.Router();
let User = require("../models/users");
myappletRouter.use(bodyParser.json());
var isLoggedIn = require("../commonFunctions").isLoggedIn;


myappletRouter.get("/", isLoggedIn, (req, res, next) => {
  applets = req.user.appletIds;
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(applets);
});

myappletRouter.delete("/:id", isLoggedIn, (req, res, next) => {
  var id = req.params.id.toString()
  Applet.findOneAndDelete({ _id: id, user: req.user._id }).exec(function(err, applet) {
	if (err) return next(err);
	var user = req.user
	applets = user.appletIds;
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
