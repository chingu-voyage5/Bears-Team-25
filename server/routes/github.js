const axios = require("axios");
var passport = require("passport");
var express = require("express");
var router = express.Router();
var GithubWebHook = require("express-github-webhook");
var webhookHandler = GithubWebHook({ path: "/updates", secret: "secret" });
var User = require("../models/users");
var postTrelloCard = require("../routes/trello").postCard;

router.use(webhookHandler); // use our middleware

// Now could handle following events
webhookHandler.on("*", function(event, repo, data) {
  // console.log(event);
});

webhookHandler.on("issues", function(repo, data) {
  console.log("issue stuff");
  // console.log(repo)
  // console.log(data);
  let userGitID = data.sender.id;
  if (data.action === "opened") {
    // find all users with this git ID
    User.find({ "github.id": userGitID }, function(err, users) {
      if (err) return done(err);
      if (users.length !== 0) {
        for (user of users) {
          if (user.trello.token && user.trello.listName) {
            let cardTitle = `[${data.repository.full_name}]${data.issue.title}`
            let description = `[Issue] \n\n Repo: [${data.repository.full_name}]\n\n` +
            `IssueTitle: ${data.issue.title}\n\nBy ${data.issue.user.login}\n\n${data.issue.body}`
            let trelloConfig = {...user.trello, cardTitle, description}
            postTrelloCard(trelloConfig).then(card => {
              // console.log("success");
            });
          }
        }
      } else {
        console.log("User not found");
      }
    });
  }
});

webhookHandler.on("installation", function(repo, data) {
  // console.log('repo', repo);
  // console.log('data', data);
  let userGitID = data.installation.account.id;
  if (data.action == "created") {
    // if app is installed to account with this id, we should update all account, that use this git id
    User.find({ "github.id": userGitID }, function(err, users) {
      if (err) return done(err);
      if (users.length !== 0) {
        for (user of users) {
            user.github.isAppInstalled = true;
            user.save(function(err) {
              if (err) return next(err);
            });
        }
      } else {
        console.log("User not found");
      }
    });
  }
  if (data.action === "deleted") {
    // if user uninstalls application, that means we should delete git tokens from all acccount that
    // use this git ID
    User.find({ "github.id": userGitID }, function(err, users) {
      if (err) return done(err);
      if (users.length !== 0) {
        for (user of users) {
            user.github = undefined;
            user.save(function(err) {
              if (err) return next(err);
            });
        }
      } else {
        console.log("User not found");
      }
    });
  }
  data.installation.id;
  data.installation.account; // .login .id .avatar_url;
  data.repositories;
  data.installation.repository_selection; // all  / selected
});

webhookHandler.on("installation_repositories", function(repo, data) {
  // console.log('repo', repo);
  // console.log('data', data);
  data.action; // removed added
  data.repositories_added; // [] can have many if from 'selected' to 'all'
  data.repositories_removed; // [] data.repositories_removed[0].  id / name /full_name / private
  // can have many if from 'all' to 'selected'
});

router.get("/auth", passport.authenticate("github"));

router.get(
  "/auth/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:3000/"
  }),
  (req, res) =>
    res.redirect("https://github.com/apps/autoapplet/installations/new") // Successful authentication, redirect home.
);

// router.post("/updates", function(req, res, next) {
//   console.log(req.body.installation)
// });

module.exports = router;
