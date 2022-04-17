var express = require('express');
var router = express.Router();
const {
  employeesIndex,
  employeesStore,
  employeeCreate,
  employeeShow,
  employeeDelete,
  employeeUpdate,
} = require('../controllers/employeeController');
const ensureIsAuthenticated = require('../middlewares/ensureIsAuthenticated');

router.get('/', ensureIsAuthenticated, employeesIndex);
router.post('/', ensureIsAuthenticated, employeesStore);
router.get('/add', ensureIsAuthenticated, employeeCreate);
router.post('/delete/:id', ensureIsAuthenticated, employeeDelete);
router.post('/update/:id', ensureIsAuthenticated, employeeUpdate);
router.get('/:id', ensureIsAuthenticated, employeeShow);

module.exports = router;