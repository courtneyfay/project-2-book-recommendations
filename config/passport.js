const LocalStrategy 	= require('passport-local').Strategy;
const User 						= require('../models/user.js');

module.exports = function(passport) {

	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	}, function(req, email, password, callback) {
		
		//Find a user with this email
		User.findOne({'local.email' : email}, function(err,user) {
			if (err) return callback(err);

			// if there already IS a user with that email
			if (user) {
				return callback(null, false, req.flash('signupMessage', 'This email has already been signed up.'));
			} else {
				
				// if there is NOT already a user with that email, create one
				let newUser = new User();
				newUser.local.email = email;
				newUser.local.password = newUser.encrypt(password);
				newUser.save(function(err) {
					if (err) throw err;
					return callback(null, newUser);
				});
			}
		});
	}));

};