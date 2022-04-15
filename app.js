var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var bodyParser = require("body-parser");
var serveStatic = require("serve-static");
var csrf = require("csurf");
var passport = require("passport");
var SequelizeStore = require("connect-session-sequelize")(session.Store);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
const db = require("./models");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); // todo: configure this

// Configure session
var sessionConfig = {
  secret: "keyboard_cat",
  resave: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: db.sequelize,
    modelKey: "Session",
    tableName: "sessions",
  }),
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sessionConfig.cookie.secure = true; // serve secure cookies
}

app.use(session(sessionConfig));
app.use(csrf());
app.use(passport.authenticate("session"));
app.use(serveStatic(path.join(__dirname, "public")));
app.use(function (req, res, next) {
  res.locals.appName = "Express AMS";
  res.locals.csrfToken = req.csrfToken();

  req.isAuthenticated()
    ? (res.locals.user = req.user)
    : (res.locals.user = null);

  next();
});

// Configure routes
app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
