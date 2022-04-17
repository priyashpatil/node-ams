var express = require('express');

const ensureIsUnauthenticated = require('../middlewares/ensureIsUnauthenticated');
const authenticate = require('../middlewares/authenticate');
const { auth_login, auth_logout } = require('../controllers/authController');

var router = express.Router();

router.get('/login', ensureIsUnauthenticated, auth_login);

router.post(
  '/login',
  ensureIsUnauthenticated,
  function (req, res) {
    if (req.user) {
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
