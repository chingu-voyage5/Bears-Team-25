var express = require('express');
var router = express.Router();

// full path is api/users/login
router.get('/login', function(req, res, next) {
    res.json('Trying to sign in');
  });

module.exports = router;