// config/database.js

var mongoURI = process.env.MODULUS_SMSL_FRONTEND_URI

module.exports = {
	// looks example like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
    'url' : mongoURI

};