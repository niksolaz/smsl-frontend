// config/database.js
var mongoAddress = process.env.MONGO_ADDRESS; // e.g. 127.0.0.1
var mongoAddressPort = process.env.MONGO_ADDRESS_PORT || 27017; // e.g. 27017
var mongoColletion = process.env.MONGO_COLLECTION; // e.g. smsl/mycollection
var mongoAddressScheme = "mongodb://";
var mongoURI = mongoAddressScheme + mongoAddress + ":" + mongoAddressPort + "/" + mongoColletion;

module.exports = {
	// looks example like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
    'url' : mongoURI

};