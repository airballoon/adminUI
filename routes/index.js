
var fs = require('fs');
var path = require('path');
var _ = require('lodash');


exports.login = function(req, res) {
  res.render('login', {});
};

exports.index = function(req, res) {
  res.render('index', {});
};
