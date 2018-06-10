var express = require('express');
var router = express.Router();
var User = require('../models/users');

// full path is api/users/login
router.post('/login', function(req, res, next) {
    res.json('Trying to sign in');
  });

module.exports = router;