var express = require('express');

const ensureIsUnauthenticated = require('../middlewares/ensureIsUnauthenticated');
const {
  auth_login,
  auth_logout,
  handle_login,
  validate_login_data,
} = require('../controllers/authController');
const ensureIsAuthenticated = require('../middlewares/ensureIsAuthenticated');

var router = express.Router();

router.get('/login', ensureIsUnauthenticated, auth_login);
router.post('/login', ensureIsUnauthenticated, validate_login_data, handle_login);
router.post('/logout', ensureIsAuthenticated, auth_logout);

module.exports = router;
