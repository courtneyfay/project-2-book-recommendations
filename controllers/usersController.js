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
		failureRedirect: '/signup',
		failureFlash: true
	});
	
	return signupStrategy(request, response, next);
}

module.exports.getSignup = getSignup;
module.exports.postSignup = postSignup;

/*= {
  getSignup: getSignup,
  postSignup: postSignup
};*/