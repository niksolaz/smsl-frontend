// config/database.js
var mongoose = require('mongoose');

var mongoAddress = process.env.MONGO_ADDRESS_SMSL_FRONTEND; // e.g. 127.0.0.1
var mongoAddressPort = process.env.MONGO_ADDRESS_PORT_SMSL_FRONTEND || 27017; // e.g. 27017
var mongoColletion = process.env.MONGO_COLLECTION_SMSL_FRONTEND; // e.g. smsl_frontend/myLogin
var mongoAddressScheme = "mongodb://";
var mongoURI = mongoAddressScheme + mongoAddress + ":" + mongoAddressPort + "/" + mongoColletion;

module.exports = {
	// looks example like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
    'url' : mongoURI
    
};
