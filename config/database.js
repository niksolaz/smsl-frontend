// config/database.js
/*
module.exports = {
	// looks example like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
    'url' : process.env.MODULUS_SMSL_FRONTEND_URI

};
*/
// grab the things we need
var mongoose = require('mongoose');

var mongoAddress = process.env.MONGO_ADDRESS; // e.g. 127.0.0.1
var mongoAddressPort = process.env.MONGO_ADDRESS_PORT || 27017; // e.g. 27017
var mongoColletion = process.env.MONGO_COLLECTION; // e.g. msgGlobal/msgs
var mongoAddressScheme = "mongodb://";
var mongoURI = mongoAddressScheme + mongoAddress + ":" + mongoAddressPort + "/" + mongoColletion;

console.log("Connecting to MongoDB at the uri: ", mongoURI);
mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error: '));
db.once('connected',function(){
	console.log('Connected to the database');
});

var Schema = mongoose.Schema;
// create a schema
var userSchema = new Schema({
  name: String,
  email: String,
  admin: Boolean,
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = {
	'url': mongoURI,
	'user': User
};