var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sequelize = require('./config/database');
console.log('Database connected'); 

// load routes
var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
var batteriesRouter = require('./routes/batteries');
var healthChecksRouter = require('./routes/healthChecks');

// sync database models
var Battery = require('./models/Batteries');
var HealthCheck = require('./models/Health_Checks');
var UsageLog = require('./models/Usage_Logs');
var Attachment = require('./models/Attachments');
var Status = require('./models/Status');
var User = require('./models/Users');

// Define model relationships
const defineAssociations = require('./models/associations');
defineAssociations();


// sync database tables 
async function syncDatabase() {
  try {
    await sequelize.sync({force:false});
    console.log('Database & tables synced'); 
  } catch (error) {
    console.error('unable to sync database using sequelize', error);
  }
}

syncDatabase();



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/api/v1', batteriesRouter);
app.use('/api/v1/batteries', healthChecksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
