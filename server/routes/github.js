const axios = require("axios");
var passport = require("passport");
var express = require("express");
var router = express.Router();
var GithubWebHook = require("express-github-webhook");
var webhookHandler = GithubWebHook({ path: "/updates", secret: "secret" });
var User = require("../models/users");

router.use(webhookHandler); // use our middleware

// Now could handle following events
webhookHandler.on("*", function(event, repo, data) {
  // console.log(event);
});

webhookHandler.on("issues", function(repo, data) {
  console.log('new issue')
  // console.log(repo)
  // console.log(data)
});

webhookHandler.on("installation", function(repo, data) {
  // console.log('repo', repo);
  // console.log('data', data);
  let id = data.installation.account.id
  User.findOne({ "github.id": id }, function(err, user) {
    if (err) return done(err);

    if (user) { 
      console.log('User installed app and have git token in our DB')
    }

    else {
      console.log('User installed app, but doesn\'t have github account / or account itself in our DB')
    }

  })






  if (data.action == "created") {
  }
  if (data.action === "deleted") {
  }
  data.installation.id;
  data.installation.account // .login .id .avatar_url;
  data.repositories
  data.installation.repository_selection // all  / selected
});


webhookHandler.on("installation_repositories", function(repo, data) {
  // console.log('repo', repo);
  // console.log('data', data);
  data.action // removed added
  data.repositories_added   // [] can have many if from 'selected' to 'all'
  data.repositories_removed // [] data.repositories_removed[0].  id / name /full_name / private
  // can have many if from 'all' to 'selected'
});

router.get("/auth", passport.authenticate("github"));

router.get(
  "/auth/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:3000/"
  }),
  (req, res) => res.redirect("https://github.com/apps/iftttclone/installations/new") // Successful authentication, redirect home.
);

// router.post("/updates", function(req, res, next) {
//   console.log(req.body.installation)
// });

module.exports = router;