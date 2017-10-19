console.log("usersController.js, checking in!");

const passport = require("passport");

// GET /signup
function getSignup(request, response, next) {
	response.render('signup.ejs', {message : request.flash('signupMessage')});
}

// POST /signup
function postSignup(request, response, next) {
	let signupStrategy = passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup.ejs',
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
	let loginStrategy = passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login.ejs',
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