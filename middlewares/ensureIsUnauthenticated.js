module.exports = function ensureIsUnauthenticated(req, res, next) {
  if (req.user) {
    res.redirect('/');
  } else {
    next();
  }
};
