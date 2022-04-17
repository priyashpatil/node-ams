var express = require('express');
const { dashboard } = require('../controllers/adminController');
var router = express.Router();
const ensureIsAuthenticated = require('../middlewares/ensureIsAuthenticated');

router.get('/', ensureIsAuthenticated, dashboard);

module.exports = router;
