var express = require('express');
const {
  attendanceIndex,
  attendanceStore,
} = require('../controllers/attendanceController');
var router = express.Router();
const ensureIsAuthenticated = require('../middlewares/ensureIsAuthenticated');

/* GET home page. */
router.get('/', ensureIsAuthenticated, attendanceIndex);
router.post('/', ensureIsAuthenticated, attendanceStore);

module.exports = router;
