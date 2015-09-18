// expose our config directly to our application using module.exports

module.exports = {
	'facebookAuth':{
		'clientID'      : process.env.FACEBOOK_SMSL_FRONTEND__ID, // Facebook AppID
        'clientSecret'  : process.env.FACEBOOK_SMSL_FRONTEND__SECRET, // Facebook AppSecret
        'callbackURL'   : process.env.FACEBOOK_SMSL_FRONTEND__REDIRECTURI // Facebook App Redirect URI
	},
	'twitterAuth':{
		'consumerKey'       : process.env.TWITTER_SMSL_FRONTEND__CONSUMER_KEY, // Twitter Consumer Key
        'consumerSecret'    : process.env.TWITTER_SMSL_FRONTEND__CONSUMER_SECRET, // Twitter Consumer Secret
        'callbackURL'       : process.env.TWITTER_SMSL_FRONTEND__CALLBACK_URL // Twitter Callback URL
	},
	'googleAuth':{
		'clientID'      : process.env.GOOGLE_SMSL_FRONTEND__CLIENT_ID, // Google Client ID
        'clientSecret'  : process.env.GOOGLE_SMSL_FRONTEND__CLIENT_SECRET, // Google Client Secret
        'callbackURL'   : process.env.GOOGLE_SMSL_FRONTEND__URL // Google Callback URL
	}
};