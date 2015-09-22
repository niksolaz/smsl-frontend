var googleAuth = require('./google');
var twitterAuth = require('./twitter');
var facebookAuth = require('./facebook');
var localAuth = require('./local');


module.exports = function(passport, configAuth, userModel){
  googleAuth(passport, configAuth, userModel);
  twitterAuth(passport, configAuth, userModel);
  facebookAuth(passport, configAuth, userModel);
  localAuth(passport, configAuth, userModel);
};