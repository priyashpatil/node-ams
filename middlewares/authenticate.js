module.exports = function (req, res, next) {
  if ('auth' in req.session ) {
    req.user = JSON.parse(req.session.auth);
  } else {
    req.session.auth = null;
    req.user = null;
  }
  next();
};
