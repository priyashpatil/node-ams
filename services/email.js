('use strict');
const nodemailer = require('nodemailer');
const emailConfig = require('../config/email');

exports.sendMail = async function smtpEmail(
  from,
  to,
  subject,
  html,
) {
  const transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
      user: emailConfig.auth.user,
      pass: emailConfig.auth.pass,
    },
  });

  // send mail with defined transport object
  await transport.sendMail({
    from: from, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: html, // html body
  });
};
