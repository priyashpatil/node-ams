const dotenv = require('dotenv');
dotenv.config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var csrf = require('csurf');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models');
const appConfig = require('./config/app');
const authenticate = require('./middlewares/authenticate');

var authRouter = require('./routes/auth');
var attendanceRouter = require('./routes/attendance');
var adminRouter = require('./routes/admin');
var employeeRouter = require('./routes/employee');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: appConfig.secret,
    resave: true,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: db.sequelize,
      modelKey: 'Session',
      tableName: 'sessions',
    }),
    cookie: {
      secure: false, // true on production
    },
  }),
);
app.use(csrf());
app.use(authenticate);
app.use(serveStatic(path.join(__dirname, '..', 'public')));

app.use(function (req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  res.locals.path = req.path;
  res.locals.user = req.user || null;
  next();
});

app.use(function (req, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !!msgs.length;
  req.session.messages = [];
  next();
});

app.locals.appName = appConfig.appName;

// Configure routes
app.use('/', authRouter);
app.use('/', attendanceRouter);
app.use('/admin', adminRouter);
app.use('/admin/employees', employeeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
