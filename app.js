'use strict';

/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require('mongoose');

var path = require('path');
var sass = require('node-sass');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var http = require('http').Server(app);
var io = require('socket.io')(http);

var methodOverride = require('method-override');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');

var fs = require('fs');


//var app = express();
var app = module.exports = exports.app = express();

app.locals.siteName = "Goblab starter";

// Connect to database
var db = require('./config/db');

// Bootstrap models
var modelsPath = path.join(__dirname, 'models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

/**
 * Passport setup.
 */

var User = mongoose.models.User;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false);
    user.comparePassword(password, function(err, isMatch) {
      if (err) return done(err);
      if (isMatch) return done(null, user);
      return done(null, false);
    });
  });
}));


app.set('port', process.env.PORT || 3000);

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, { message: 'Internal Server Error'});
});
app.use(sass.middleware({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// Bootstrap routes/api
var routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach(function(file) {
  require(routesPath + '/' + file)(app);
});

/**
 * POST /token
 * Sign in using email and password.
 * @param {string} username
 * @param {string} password
 */

app.post('/token', function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if (err) return next(err);
    if (user) res.send({ access_token: user.token, user_id: user._id });
    else res.send(404, 'Incorrect username or password.');
  })(req, res, next);
});


app.listen(app.get('port'), function() {
  console.log('Express server running on port ' + app.get('port'));
});

http.listen(5000, function(){
  console.log('listening on *:5000');
});

io.on('connection', function(socket){
  socket.on('newRecord', function(message) {
    socket.broadcast.emit('newRecord', message);
  });  

  socket.on('deleteRecord', function(message) {
    socket.broadcast.emit('deleteRecord', message);
  });    
});

