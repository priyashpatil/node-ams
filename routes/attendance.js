var express = require('express');
const {
  attendanceIndex,
  attendanceStore,
} = require('../controllers/attendanceController');
var router = express.Router();
const authenticate = require('../middlewares/authenticate');

/* GET home page. */
router.get('/', authenticate, attendanceIndex);
router.post('/', authenticate, attendanceStore);

module.exports = router;
