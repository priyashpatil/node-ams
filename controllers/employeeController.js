var models = require('../models');
var emailService = require('../services/emailService');
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
  
  await emailService.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to: employee.email,
    subject: 'Welcome to Express AMS',
    html: '<b>Hello world</b>',
  });

  req.session.messages = [`Employee ${employee.name} Added Successfully.`];
  req.session.save(function (err) {
    res.redirect(`/admin/employees/${employee.id}`);
  });
};

exports.employeeShow = async function (req, res, next) {
  var emplyeeId = req.params.id;
  var employee = await models.User.findOne({
    where: { id: emplyeeId, isAdmin: false },
    include: models.Attendance,
  });

  if (!employee) {
    next(createError(404));
  } else {
    res.render('dashboard/employees_show', { employee });
  }
};

exports.employeeDelete = async function (req, res, next) {
  var emplyeeId = req.params.id;
  var employee = await models.User.findOne({
    where: { id: emplyeeId, isAdmin: false },
    include: models.Attendance,
  });

  if (!employee) {
    next(createError(404));
  } else {
    await employee.destroy();
    req.session.messages = [`Employee ${employee.name} Deleted Successfully.`];
    req.session.save(function (err) {
      res.redirect('/admin/employees');
    }); 
  }
};


exports.employeeUpdate = async function (req, res, next) {
  var data = req.body;
  var emplyeeId = req.params.id;

  var employee = await models.User.findOne({
    where: { id: emplyeeId, isAdmin: false },
    include: models.Attendance,
  });

  employee.name = data.name;
  employee.joinedAt = data.joinedAt;
  await employee.save();

  req.session.messages = [`Employee ${employee.name} Updated Successfully.`];
  req.session.save(function (err) {
    res.redirect(`/admin/employees/${employee.id}`);
  });
};