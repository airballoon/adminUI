/**
 * Module dependencies.
 */

var express = require('express');
var logger = require('morgan');
var app = express();
var favicon = require('static-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var serveStatic = require('serve-static');
var fs = require('fs-extra');
var _ = require('lodash');
var routes = require('./routes');


var db = require('./models');

app.set('port', 3003);
app.engine('.html', require('ejs').__express)
app.set('views', __dirname + '/views');
app.set('view engine', 'html');


app.use(logger('dev'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(__dirname + '/public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser('stars app'));
app.use(session({
  secret: 'keyboard cat',
  key: 'sid',
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

app.get('/', function(req, res) {
  res.render('index');
});

// 404
app.get('*', function(req, res) {
  res.render('404.ejs');
});


if (!module.parent) {
  db
  .sequelize
  .sync({
    force: false
  })
  .complete(function(err) {
    if (err) {
      throw err;
    } else {
      http.createServer(app).listen(app.get('port'), function(e) {
        console.log('Express started on port 3003.');
      });
    }
  });
}


