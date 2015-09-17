// expose our config directly to our application using module.exports

module.exports = {
	'facebookAuth':{
		'clientID'      : process.env.FACEBOOK_MAT_ID, //app ID
        'clientSecret'  : process.env.FACEBOOK_MAT_SECRET, //app Secret
        'callbackURL'   : process.env.FACEBOOK_MAT_REDIRECTURI //app URI
	},
	'twitterAuth':{
		'consumerKey'       : process.env.MAT_TWITTER_CONSUMER_KEY,
        'consumerSecret'    : process.env.MAT_TWITTER_CONSUMER_SECRET,
        'callbackURL'       : process.env.MAT_TWITTER_CALLBACK_URL
	},
	'googleAuth':{
		'clientID'      : process.env.MAT_GOOGLE_CLIENT_ID,
        'clientSecret'  : process.env.MAT_GOOGLE_CLIENT_SECRET,
        'callbackURL'   : process.env.MAT_GOOGLE_URL
	}
};