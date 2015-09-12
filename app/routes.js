// app/routes.js

module.exports = function(app,passport){
	//route for Home page
	app.get('/',function(req,res){
		res.render('index.ejs'); //load index.ejs file in views
	});
	//route for Login form
	app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });
    //route for Processing the login form
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    //route for Signup form
    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
    //route for processing the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
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