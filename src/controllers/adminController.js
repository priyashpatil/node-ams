('use strict');
var models = require('../models');
const nodemailer = require('nodemailer');

exports.dashboard = function (req, res, next) {
  res.render('dashboard/index');
};

exports.employeesIndex = async function (req, res, next) {
  var employees = await models.User.findAll({ where: { isAdmin: false } });
  res.render('dashboard/employees', { employees: employees });
};

exports.employeesStore = async function (req, res, next) {
  var data = req.body;

  var employee = await models.User.create({
    name: data.name,
    email: data.email,
    password: 'password',
    joinedAt: data.joinedAt,
  });

  var transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '84610207f083f1',
      pass: '6d1831d9b19e0d',
    },
  });

  // send mail with defined transport object
  await transport.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: employee.email, // list of receivers
    subject: 'Welcome to Express AMS', // Subject line
    text: 'Onboarding Email',
    html: '<b>Hello world?</b>', // html body
  });

  res.redirect('/admin/employees');
};
