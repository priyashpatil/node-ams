var express = require('express');
const { dashboard } = require('../controllers/adminController');
var router = express.Router();
const authenticate = require('../middlewares/authenticate');

router.get('/', authenticate, dashboard);

module.exports = router;
