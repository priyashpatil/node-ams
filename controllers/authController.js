var authService = require('../services/authService');

exports.auth_login = async function (req, res) {
  res.render('login');
};

exports.handle_login = async function (req, res) {
  var data = req.body;
  var user = await authService.validate(data.username, data.password);

  if (user) {
    req.session.auth = JSON.stringify(user);
    req.session.save(function (err) {
      if (user.isAdmin) {
        res.redirect('/admin');
      } else {
        res.redirect('/');
      }
    });
  } else {
    req.session.messages = ['Username or Password is wrong'];
    req.session.save(function (err) {
      res.redirect('/login');
    });
  }
};

exports.auth_logout = async function (req, res) {
  req.user = null;
  req.session.auth = null;
  req.session.save(function (err) {
    if (err) {
      next(err);
    } else {
      res.redirect('/');
    }
  });
};
