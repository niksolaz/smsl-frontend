// app/routes.js

module.exports = function(app,passport){
	//route for Home page
	app.get('/',function(req,res){
		res.render('index.ejs'); //load index.ejs file in views
	});
	//route for Login form
    //route for Processing the login form
    //route for Signup form
    //route for processing the signup form

    //route for showing the profile page
    app.get('/profile',isLoggedIn,function(req,res){
    	res.render('profile.ejs',{
    		user: req.user //get the user out of session and pass to template
    	});
    });

    //===================
	//FACEBOOK ==========
	//===================
	//route for facebook autentication and login
	app.get('/auth/facebook',passport.authenticate('facebook',{ scope: 'email'}));
	//handle the callback after facebook has authenticate the user
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook',{
			successRedirect:'/profile',
			failureRedirect:'/'
		}));

	//route for logout
	app.get('/logout',function(req,res){
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}