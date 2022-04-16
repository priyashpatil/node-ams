exports.auth_login = async function (req, res) {
  res.render('login');
};

exports.auth_logout = async function (req, res) {
  req.logout();
  req.session.cookie.maxAge = 0;
  res.redirect('/');
};
