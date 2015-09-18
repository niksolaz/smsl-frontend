// expose our config directly to our application using module.exports

module.exports = {
	'facebookAuth':{
		'clientID'      : process.env.FACEBOOK_SMSL_FRONTEND__ID, //app ID
        'clientSecret'  : process.env.FACEBOOK_SMSL_FRONTEND__SECRET, //app Secret
        'callbackURL'   : process.env.FACEBOOK_MAT_REDIRECTURI //app URI
	},
	'twitterAuth':{
		'consumerKey'       : process.env.TWITTER_SMSL_FRONTEND__CONSUMER_KEY,
        'consumerSecret'    : process.env.TWITTER_SMSL_FRONTEND__CONSUMER_SECRET,
        'callbackURL'       : process.env.TWITTER_SMSL_FRONTEND__CALLBACK_URL
	},
	'googleAuth':{
		'clientID'      : process.env.GOOGLE_SMSL_FRONTEND__CLIENT_ID,
        'clientSecret'  : process.env.GOOGLE_SMSL_FRONTEND__CLIENT_SECRET,
        'callbackURL'   : process.env.GOOGLE_SMSL_FRONTEND__URL
	}
};