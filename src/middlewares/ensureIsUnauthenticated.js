module.exports = function (req, res, next) {
  if (req.user) {
    if (req.user.isAdmin) {
      res.redirect('/admin');
    } else {
      res.redirect('/');
    }
  } else {
    next();
  }
};
