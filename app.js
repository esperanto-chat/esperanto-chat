var express = require('express');
var socket_io    = require( "socket.io" );
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//mongo setup
var MongoClient = require('mongodb').MongoClient;


var app = express();
var exphbs  = require('express-handlebars');

// Socket.io
var io           = socket_io();
app.io           = io;

var routes = require('./routes/index')(io);
var login = require('./routes/login');
var rooms = require('./routes/rooms');
var users = require('./routes/users');
var signup = require('./routes/signup');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.engine('hbs', exphbs({
  extname: '.hbs',
  layoutsDir: path.resolve(__dirname, 'views')
}));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

function getUser(request) {
    var user,
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        if(parts.shift().trim() == 'user'){
          var userOpts = decodeURI(parts.join('='));
          user = {
            'username' : userOpts.split('|')[0],
            'pl'       : userOpts.split('|')[1]
          };
        }
    });

    return user;
}

app.use('/', function (req, res, next) {
  var user = getUser(req);

  if(user){
    req.user = user;
  }

  next();
});

app.use('/app', routes);
app.use('/login', login);
app.use('/rooms', rooms);
app.use('/signup', signup);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
