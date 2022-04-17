var express = require('express');
var passport = require('passport');
const ensureIsUnauthenticated = require('../middlewares/ensureIsUnauthenticated');
const authenticate = require('../middlewares/authenticate');
const { auth_login, auth_logout } = require('../controllers/authController');

var router = express.Router();

router.get('/login', ensureIsUnauthenticated, auth_login);

router.post(
  '/login',
  ensureIsUnauthenticated,
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureMessage: true,
  }),
  function (req, res) {
    if (req.isAuthenticated()) {
      res.redirect('/');
    } else {
      req.session.messages = ['Username or Passowrd is wrong'];
      req.session.save(function (err) {
        res.redirect('/login');
      });
    }
  },
);

router.post('/logout', authenticate, auth_logout);

module.exports = router;
