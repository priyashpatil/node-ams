var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const users = await models.User.findAll();
  res.json(users);
});

module.exports = router;
