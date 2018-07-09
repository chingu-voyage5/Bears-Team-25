var passport = require("passport");
var express = require("express");
var router = express.Router();
var GithubWebHook = require("express-github-webhook");
var webhookHandler = GithubWebHook({ path: "/updates", secret: "secret" });
var User = require("../models/users");
var postTrelloCard = require("../routes/trello").postCard;
var slackSendMessage = require("../routes/slack").slackSendMessage;
var transporter = require('../routes/email').transporter;
var mailOptions = require('../routes/email').mailOptions;
var isLoggedIn = require('../commonFunctions').isLoggedIn;
var deleteApplets = require('../commonFunctions').deleteApplets;

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
    User.find({ "github.id": userGitID })
    .populate('appletIds')
    .exec(function(err, users) {
      if (err) return done(err);
      if (users.length !== 0) {
        // trello options 
        let cardTitle = `[${data.repository.full_name}]${data.issue.title}`
        let description = `[Issue] \n\n Repo: [${data.repository.full_name}]\n\n` +
        `IssueTitle: ${data.issue.title}\n\nBy ${data.issue.user.login}\n\n${data.issue.body}`
        // slack options 
        let message = `[New Issue] Repo: [${data.repository.full_name}] ` +
        `IssueTitle: ${data.issue.title} Author: ${data.issue.user.login}`

        for (user of users) {
          let applets = user.appletIds;
          applets = applets.filter(applet => applet.option.watchFrom === 'Github' && applet.isActive);

          //trello actions
          appletsWithTrelloActions = applets.filter(applet => applet.option.watchTo === 'Trello');
          trelloToken = user.trello.token;
          for (appletsWithTrelloAction of appletsWithTrelloActions) {
            let trelloOptions = appletsWithTrelloAction.action.trelloOptions;
            let trelloConfig = {...trelloOptions, token: trelloToken, cardTitle, description}
            postTrelloCard(trelloConfig).then(card => {
              console.log("trello card posted");
            });
          }

          //slack actions
          appletsWithSlackActions = applets.filter(applet => applet.option.watchTo === 'Slack');
          slackToken = user.slack.token;
          for (appletsWithSlackAction of appletsWithSlackActions) {
            let slackOptions = appletsWithSlackAction.action.slackOptions;
            slackSendMessage(slackToken, message, slackOptions.to).then(message => {
              console.log("slack message sent");
            });
          }

        //mail actions
        appletsWithMailActions = applets.filter(applet => applet.option.watchTo === 'Mail');
        gmailTolen = user.gmail.token;
        for (appletsWithMailAction of appletsWithMailActions) {
          let options = mailOptions(user, {email:  appletsWithMailAction.action.mailOptions.email,
             message: message})
          transporter.sendMail(options).then(message => {
            console.log("email  sent");
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
            addToNotSubscribedRemoveFromSubscribed('Github', user.servicesSubscribed, user.servicesNotSubscribed);
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
            let index = user.servicesSubscribed.map(service => service.service).indexOf('Github');
            if (index !== -1)  user.servicesSubscribed.splice(index, 1);
            index = user.servicesNotSubscribed.indexOf('Github');
            if (index === -1) user.servicesNotSubscribed.push('Github');
            user.save(function(err) {
              if (err) return next(err);
            });
        }
      } else {
        console.log("User not found");
      }
    });
  }
});

webhookHandler.on("installation_repositories", function(repo, data) {
  // console.log('repo', repo);
  // console.log('data', data);
});

router.get("/auth", passport.authenticate("github"));

router.get(
  "/auth/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:3000/error/Something went wrong."
  }),
  (req, res) =>
    res.redirect("https://github.com/apps/autoapplet/installations/new") // Successful authentication, redirect home.
);

router.get("/disconnect", isLoggedIn, (req, res, next) => {
  var user = req.user;
  user.github = undefined;
  deleteApplets('Github', user, res, next);
});

module.exports = router;
