console.log("usersController.js, checking in!");

const passport = require("passport");

// GET /signup
function getSignup(request, response, next) {
	response.render('signup', {message : request.flash('signupMessage')});
}

// POST /signup
function postSignup(request, response, next) {
	var signupStrategy = passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	});
	
	return signupStrategy(request, response, next);
}

// GET /login
function getLogin(request, response, next) {
	response.render('login.ejs', {message: request.flash('loginMessage')}); 
}

// POST /login 
function postLogin(request, response, next) {
	var loginStrategy = passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	});

	return loginStrategy(request, response, next);
}

// GET /logout
function getLogout(request, response, next) {
	request.logout();
	response.redirect('/');
}

module.exports.getSignup = getSignup;
module.exports.postSignup = postSignup;
module.exports.getLogin = getLogin;
module.exports.postLogin = postLogin;
module.exports.getLogout = getLogout;