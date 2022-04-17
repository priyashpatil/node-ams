var express = require('express');
var router = express.Router();
const {
  employeesIndex,
  employeesStore,
} = require('../controllers/employeeController');
const authenticate = require('../middlewares/authenticate');

router.get('/', authenticate, employeesIndex);
router.post('/', authenticate, employeesStore);

module.exports = router;
