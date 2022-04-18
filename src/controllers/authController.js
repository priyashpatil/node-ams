var authService = require('../services/authService');
const Joi = require('joi');

// Show login form
exports.auth_login = async function (req, res) {
  res.render('login');
};

// Validate login data
exports.validate_login_data = async function (req, res, next) {
  
  const schema = Joi.object({
    username: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  try {
    req.validatedData = await schema.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });
    next();
  } catch (err) {
    var errorMessages = err.details.map((el) => el.message);
    req.session.messages = errorMessages;
    req.session.save(function (err) {
      return res.redirect('/login');
    });
  }
};

// Handle user login
exports.handle_login = async function (req, res, next) {
  const validatedData = req.validatedData;

  user = await authService.validate(
    validatedData.username,
    validatedData.password,
  );

  // Update session if creds are valid
  // Othwerise throw error
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

// Logout user
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
