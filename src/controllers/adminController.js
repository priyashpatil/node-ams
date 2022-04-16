var models = require('../models');

exports.dashboard = function (req, res, next) {
  res.render('dashboard/index');
};

exports.employeesIndex = async function (req, res, next) {
  var employees = await models.User.findAll();
  res.render('dashboard/employees', { employees: employees });
};

exports.employeesStore = async function (req, res, next) {
  var data = req.body;

  await models.User.create({
    name: data.name,
    email: data.email,
    password: 'password',
    joinedAt: data.joinedAt,
  });

  res.redirect('/admin/employees');
};
