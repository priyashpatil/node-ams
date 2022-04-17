var express = require('express');
const {
  attendanceIndex,
  attendanceStore,
} = require('../controllers/attendanceController');
var router = express.Router();
const ensureIsAuthenticated = require('../middlewares/ensureIsAuthenticated');
const ensureIsEmployee = require('../middlewares/ensureIsEmployee');

router.get('/', ensureIsAuthenticated, ensureIsEmployee, attendanceIndex);
router.post('/', ensureIsAuthenticated, ensureIsEmployee, attendanceStore);

module.exports = router;
