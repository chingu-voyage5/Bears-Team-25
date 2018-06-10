var express = require('express');
var router = express.Router();

// subroutes
const users = require('./users');

// paths to subroutes (`api/${path}`)
router.use('/users', users)


module.exports = router;