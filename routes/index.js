var express = require("express");
var router = express.Router();
var passport = require("passport");
const authenticate = require("../middlewares/authenticate");

/* GET home page. */
router.get("/", authenticate, function (req, res, next) {
  res.render("index");
});

module.exports = router;
