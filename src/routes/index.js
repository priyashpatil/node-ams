var express = require('express');
var router = express.Router();
const authenticate = require('../middlewares/authenticate');

/* GET home page. */
router.get('/', authenticate, function (req, res, next) {
  res.render('index');
});

module.exports = router;
