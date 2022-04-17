var express = require('express');
var router = express.Router();
const {
  employeesIndex,
  employeesStore,
  employeeCreate,
  employeeShow,
} = require('../controllers/employeeController');
const authenticate = require('../middlewares/authenticate');

router.get('/', authenticate, employeesIndex);
router.get('/add', authenticate, employeeCreate);
router.post('/', authenticate, employeesStore);
router.get('/:id', authenticate, employeeShow);

module.exports = router;