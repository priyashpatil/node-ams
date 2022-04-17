('use strict');
const nodemailer = require('nodemailer');
const emailConfig = require('../config/email');

module.exports = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  auth: {
    user: emailConfig.auth.user,
    pass: emailConfig.auth.pass,
  },
});
