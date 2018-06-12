var express = require('express');
var router = express.Router();

// subroutes
const users = require('./users');
const applets=require('./applets');
// paths to subroutes (`api/${path}`)
router.use('/users', users)
router.use('/applets', applets)


module.exports = router;