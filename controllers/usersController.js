const passport = require("passport");

// GET /signup
function getSignup(request, response, next) {
	response.render('signup', {message : request.flash('signupMessage')});
}

// POST /signup
function postSignup(request, response, next) {
	let signupStrategy = passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	});

	return signupStrategy(request, response, next);
}

module.exports = {
  getSignup: getSignup,
  postSignup: postSignup
};