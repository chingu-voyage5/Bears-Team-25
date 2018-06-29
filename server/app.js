const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var appRoot = require('app-root-path');
var favicon = require('serve-favicon');
const mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
const cors = require('./config/cors')

require('dotenv').load(); // loading .env file

const index = require('./routes/index');
const app = express();

// mongoose.connect(process.env.URI);
var url = 'mongodb://localhost:27017/voyage5';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to mongoDB');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(appRoot.path, 'build/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// enabling CORS for development
app.use(cors.corsWithOptions);


app.use(cookieParser());

// configure passport
require('./config/passport');

// required for passport
app.use(session({
  secret: process.env.SECRET, // session secret
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// including all routes from index and serve them through /api path
app.use('/api', index);
// if not API request, serve files from build folder (React SPA)
app.use(express.static(path.join(appRoot.path, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(appRoot.path, 'build/index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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