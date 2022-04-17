var models = require('../models');
var { sendMail } = require('../services/email');
var createError = require('http-errors');

exports.employeesIndex = async function (req, res, next) {
  var employees = await models.User.findAll({ where: { isAdmin: false } });
  res.render('dashboard/employees_index', { employees: employees });
};

exports.employeeCreate = async function (req, res, next) {
  res.render('dashboard/employees_add');
};

exports.employeesStore = async function (req, res, next) {
  var data = req.body;

  // check if employee exists in db
  var existingEmployee = await models.User.findOne({
    where: {
      email: data.email,
    },
  });

  if (existingEmployee) {
    req.session.messages = [
      `Employee with email ${data.email} already exists.`,
    ];
    return req.session.save(function (err) {
      res.redirect('/admin/employees/add');
    });
  }

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

exports.employeeShow = async function (req, res, next) {
  var emplyeeId = req.params.id;
  var employee = await models.User.findOne({
    where: { id: emplyeeId },
    include: models.Attendance,
  });

  if (!employee || employee.isAdmin) {
    next(createError(404));
  } else {
    res.render('dashboard/employees_show', { employee });
  }
};
