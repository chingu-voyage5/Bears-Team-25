const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const Applet = require("../models/applet");
const appletRouter = express.Router();
let User = require("../models/users");
appletRouter.use(bodyParser.json());
let userObj = null;
appletRouter.use(function(req, res, next) {
    console.log(req.session); //showing only cookie
    console.log(req.sessionID);
    console.log("Here in Router");
    console.log(req.session.passport); //showing undefined
    // passport.deserializeUser(function(id, done) {
    User.findById(req.session.passport.user, function(err, user) {
        console.log(user._id);
        userObj = user;
        console.log("Printing the user obj id");
        console.log(userObj._id);
    }).then(r => {
        next();
    });
    // });
});

appletRouter
    .route("/")
    .get((req, res, next) => {
        Applet.find({})
            .then(
                Applet => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(Applet);
                },
                err => next(err)
            )
            .catch(err => next(err));
    })
    .post((req, res, next) => {
        let id = null;
        Applet.create(req.body)
            .then(
                applet => {
                    console.log("Applet Created ", applet);
                    id = applet._id;
                    console.log("Here is the id " + id);
                },
                err => next(err)
            )
            .then(r => {
                User.findOneAndUpdate(
                    { _id: userObj._id },
                    { $push: { appletIds: id } }
                )
                    .then(
                        update => {
                            console.log(update);
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.json(r);
                        },
                        err => next(err)
                    )
                    .catch(err => next(err));
            })
            .catch(err => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end("PUT operation not supported on /Applet");
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end("Delete operation not supported on /Applet");
    });
appletRouter.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send("error");
    console.log(err);
});

module.exports = appletRouter;
