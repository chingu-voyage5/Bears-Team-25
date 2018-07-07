var express = require('express');
var router = express.Router();

// subroutes
const users = require('./users');
const applets=require('./applets');
const myapplets=require('./myapplets');
const myactivity=require("./myactivity");
const slack = require('./slack').slackRouter;
const mail = require('./email').mailRouter;
const integrations = require('./integrations');
const services = require('./services')
const github = require('./github');
const trello = require('./trello').trelloRouter;
const facebook = require('./facebook').facebookRouter;
// paths to subroutes (`api/${path}`)
router.use('/users', users);
router.use('/applets', applets);
router.use('/myapplets',myapplets);
router.use('/myactivity',myactivity);
router.use('/slack', slack);
router.use('/gmail', mail);
router.use('/github', github);
router.use('/integrations', integrations);
router.use('/services', services);
router.use('/trello', trello);
router.use('/facebook', facebook);

module.exports = router;