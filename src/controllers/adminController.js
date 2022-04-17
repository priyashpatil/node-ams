('use strict');
var models = require('../models');

exports.dashboard = async function (req, res, next) {
  var today = new Date();

  var attendees = await models.Attendance.findAll({
    where: {
      punchedAt: today,
    },
    include: models.User,
  });

  res.render('dashboard/index', { attendees });
};