var createError = require('http-errors');

module.exports = function (req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    next(createError(403));
  }
};
