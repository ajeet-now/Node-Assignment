var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var fileUpload = require("express-fileupload");


var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');
var otpRouter = require('./routes/otp')

var app = express();
app.use(fileUpload());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/otp', otpRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
