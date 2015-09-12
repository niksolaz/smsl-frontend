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

	//code for login  >>> use('local-login', new LocalStrategy) <<<
	//===================
	//LOCAL LOGIN =======
	//===================
	passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);
            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            // all is well, return successful user
            return done(null, user);
        });

    }));
	// code for signup >>> use('local-signup', new LocalStrategy) <<<
	//===================
	//LOCAL SIGNUP ======
	//===================
	passport.use('local-signup',new LocalStrategy({
		// by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
	},
	function(req, email, password, done){
		// asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                // if there is no user with that email
                // create the user
                var newUser = new User();
                
                // set the user's local credentials
                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

        });
	}));
	//===================
	//FACEBOOK ==========
	//===================
	passport.use(new FacebookStrategy({
		//pull in our app id and secret from our auth.js file
		clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL
	},
	//facebook will send back the token and profile
	function(token,refreshToken,profile,done){
		//asynchronous
		process.nextTick(function(){
			//find user in database based on their facebook id
			User.findOne({'facebook.id': profile.id},function(err,user){
				// if there is an error, stop everything and return that
                // ie an error connecting to the database
                if(err) return done(err);

                //if user is found, then log them in
                if(user){
                	return done(null,user) //user found, return user
                }else{
                	//if not exist user in facebbok, create them
                	var newUser = new User();
                	//set facebook info in our user model
                	newUser.facebook.id    = profile.id; // set the users facebook id                   
                    newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                    newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                    //and save user in database
                    newUser.save(function(err){
                    	if(err) throw err;
                    	//if successful, return the new user
                    	return done(null,newUser);
                    });
                }
			});
		});
	}));
};