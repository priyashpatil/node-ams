var models = require('../models');

exports.attendanceIndex = async function (req, res, next) {
  var attendances = await models.Attendance.findAll({
    where: {
      userId: req.user.id,
    },
  });

  res.render('attendance/index', { attendances });
};

exports.attendanceStore = async function (req, res, next) {
  await models.Attendance.create({
    userId: req.user.id,
    punchedAt: new Date(),
  });

  req.session.messages = ['Added'];
  req.session.save(function (err) {
    res.redirect('/');
  });
};
