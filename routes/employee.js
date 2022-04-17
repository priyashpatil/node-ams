var express = require('express');
var router = express.Router();
const {
  employeesIndex,
  employeesStore,
  employeeCreate,
  employeeShow,
  employeeDelete,
  employeeUpdate,
  validateEemployeeStoreData,
} = require('../controllers/employeeController');
const ensureIsAdmin = require('../middlewares/ensureIsAdmin');
const ensureIsAuthenticated = require('../middlewares/ensureIsAuthenticated');

router.get('/', ensureIsAuthenticated, ensureIsAdmin, employeesIndex);

router.post(
  '/',
  ensureIsAuthenticated,
  ensureIsAdmin,
  validateEemployeeStoreData,
  employeesStore,
);
router.get('/add', ensureIsAuthenticated, ensureIsAdmin, employeeCreate);

router.post(
  '/delete/:id',
  ensureIsAuthenticated,
  ensureIsAdmin,
  employeeDelete,
);

router.post(
  '/update/:id',
  ensureIsAuthenticated,
  ensureIsAdmin,
  employeeUpdate,
);

router.get('/:id', ensureIsAuthenticated, ensureIsAdmin, employeeShow);

module.exports = router;
