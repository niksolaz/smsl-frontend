// Load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

//Load up the user model
var User = require('../app/models/user');

//Load tha auth variables
var configAuth = require('./auth');

module.exports = function(passport){

	//Used to serialize the user for the session
	passport.serializeUser(function(user,done){
		done(null,user.id);
	});

	//Used to deserialize user for session
	passport.deserializeUser(function(id,done){
		User.findById(id,function(err,user){
			done(err,user);
		});
	});
};