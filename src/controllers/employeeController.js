var models = require('../models');
var { sendMail } = require('../services/email');

exports.employeesIndex = async function (req, res, next) {
  var employees = await models.User.findAll({ where: { isAdmin: false } });
  res.render('dashboard/employees', { employees: employees });
};

exports.employeeCreate = async function(req, res, next) {
  res.render('dashboard/employees_add');
}

exports.employeesStore = async function (req, res, next) {
  var data = req.body;

  var employee = await models.User.create({
    name: data.name,
    email: data.email,
    password: 'password',
    joinedAt: data.joinedAt,
  });

  await sendMail(
    '"Fred Foo 👻" <foo@example.com>',
    employee.email,
    'Welcome to Express AMS',
    '<b>Hello world</b>',
  );

  res.redirect('/admin/employees');
};
