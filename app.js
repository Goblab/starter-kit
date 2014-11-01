'use strict';

/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');

var path = require('path');
var sass = require('node-sass');
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

  socket.on('sort', function(message) {
    socket.broadcast.emit('sort', message);
  });  

  socket.on('deleteRecord', function(message) {
    socket.broadcast.emit('deleteRecord', message);
  });    
});

