var express = require('express');
var router = express.Router();

// subroutes
const users = require('./users');
const applets=require('./applets');
const myapplets=require('./myapplets');
const myactivity=require("./myactivity");
const slack = require('./slack');
// paths to subroutes (`api/${path}`)
router.use('/users', users);
router.use('/applets', applets);
router.use('/myapplets',myapplets);
router.use('/myactivity',myactivity);
router.use('/slack', slack);

module.exports = router;