var express = require('express');
const { dashboard } = require('../controllers/adminController');
const ensureIsAdmin = require('../middlewares/ensureIsAdmin');
var router = express.Router();
const ensureIsAuthenticated = require('../middlewares/ensureIsAuthenticated');

router.get('/', ensureIsAuthenticated, ensureIsAdmin, dashboard);

module.exports = router;
