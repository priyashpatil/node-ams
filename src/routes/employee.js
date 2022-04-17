var express = require('express');
var router = express.Router();
const {
  employeesIndex,
  employeesStore,
  employeeCreate,
  employeeShow,
  employeeDelete,
} = require('../controllers/employeeController');
const authenticate = require('../middlewares/authenticate');

router.get('/', authenticate, employeesIndex);
router.post('/', authenticate, employeesStore);
router.get('/add', authenticate, employeeCreate);
router.post('/delete/:id', authenticate, employeeDelete);
router.get('/:id', authenticate, employeeShow);

module.exports = router;