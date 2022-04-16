var express = require('express');
const {
  dashboard,
  employeesIndex,
  employeesStore,
} = require('../controllers/adminController');
var router = express.Router();
const authenticate = require('../middlewares/authenticate');

router.get('/', authenticate, dashboard);
router.get('/employees', authenticate, employeesIndex);
router.post('/employees', authenticate, employeesStore);

module.exports = router;
