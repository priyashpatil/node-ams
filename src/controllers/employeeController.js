var models = require('../models');
var emailService = require('../services/emailService');
var createError = require('http-errors');
var authService = require('../services/authService');
var appConfig = require('../config/app');
const Joi = require('joi');

exports.employeesIndex = async function (req, res, next) {
  var employees = await models.User.findAll({ where: { isAdmin: false } });
  res.render('dashboard/employees_index', { employees: employees });
};

exports.employeeCreate = async function (req, res, next) {
  res.render('dashboard/employees_add');
};

// Validate employee store data
exports.validateEemployeeStoreData = async function (req, res, next) {
  
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    joinedAt: Joi.date().required().required().less(new Date()),
  });

  try {
    req.validatedData = await schema.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });
    next();
  } catch (err) {
    var errorMessages = err.details.map((el) => el.message);
    req.session.messages = errorMessages;
    req.session.save(function (err) {
      return res.redirect('/admin/employees/add');
    });
  }
};

exports.employeesStore = async function (req, res, next) {
  var data = req.validatedData;

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

  var generatedPass = await authService.passGen(12);
  var hashedPass = await authService.hashPassword(generatedPass);

  var employee = await models.User.create({
    name: data.name,
    email: data.email,
    password: hashedPass,
    joinedAt: data.joinedAt,
  });

  await emailService.sendMail({
    from: `"${req.user.name} 👻" <${req.user.email}>`,
    to: employee.email,
    subject: `Welcome to ${appConfig.appName}`,
    html: `<h1>Hello ${employee.name}</h1>
    <p>${req.user.name} added you to ${appConfig.appName}. Please Login using following credentials.</p>
    <p>
      Username: <code>${employee.email}</code> <br/>
      Password: <code>${generatedPass}</code> <br/>
      Login Link: <a href="${appConfig.appUrl}/login">Click here to login</a>
    </p>
    `,
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


// Validate employee update data
exports.validateEemployeeUpdateData = async function (req, res, next) {
  
  const schema = Joi.object({
    name: Joi.string().required(),
    joinedAt: Joi.date().required().required().less(new Date()),
  });

  try {
    req.validatedData = await schema.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });
    next();
  } catch (err) {
    var errorMessages = err.details.map((el) => el.message);
    req.session.messages = errorMessages;
    req.session.save(function (err) {
      return res.redirect(`/admin/employees/${req.params.id}`);
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
