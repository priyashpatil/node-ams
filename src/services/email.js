('use strict');
const nodemailer = require('nodemailer');

exports.sendMail = async function smtpEmail(
  from = '"Fred Foo 👻" <foo@example.com>',
  to,
  subject,
  html,
) {
  const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '84610207f083f1',
      pass: '6d1831d9b19e0d',
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
