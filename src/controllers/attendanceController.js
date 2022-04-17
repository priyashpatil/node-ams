var models = require('../models');

// My Attendance
exports.attendanceIndex = async function (req, res, next) {
  var attendances = await models.Attendance.findAll({
    where: {
      userId: req.user.id,
    },
  });

  res.render('attendance/index', { attendances });
};

// Mark Attendance
exports.attendanceStore = async function (req, res, next) {
  // Fetch previous attendance
  var attendance = await models.Attendance.findOne({
    where: { punchedAt: new Date(), userId: req.user.id },
  });

  if (attendance) {
    // Attendance already marked
    req.session.messages = ['Already marked'];
    req.session.save(function (err) {
      res.redirect('/');
    });
  } else {
    // Mark attendance
    await models.Attendance.create({
      userId: req.user.id,
      punchedAt: new Date(),
    });

    req.session.messages = ['Added'];
    req.session.save(function (err) {
      res.redirect('/');
    });
  }
};
