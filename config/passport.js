console.log("passport.js, checking in!");

const LocalStrategy 	= require('passport-local').Strategy;
const User 						= require('../models/user.js');

module.exports = function(passport) {

	passport.serializeUser(function(user, callback) {
		callback(null, user.id);
	});

	passport.deserializeUser(function(id, callback) {
		User.findById(id, function(err, user) {
			callback(err, user);
		})
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	}, function(req, email, password, callback) {

		//Find a user with this email
		User.findOne({'local.email' : email}, function(err, user) {
			if (err) return callback(err);

			// if there already IS a user with that email, check the password
			if (user) {
				return callback(null, false, req.flash('signupMessage', 'This email has already been signed up.'));
			} else {
				
				// if there is NOT already a user with that email, create one
				let newUser = new User();
				newUser.local.email = email;
				console.log(email);
				newUser.local.password = newUser.encrypt(password);
				newUser.save(function(err) {
					if (err) throw err;
					return callback(null, newUser);
				});
			}
		});
	}));

	passport.use('local-login', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	}, function(req, email, password, callback) {
		User.findOne({'local.email': email}, function(err, user) {
			if (err) return callback(err);
			//no user found
			if (!user) {
				return callback(null, false, req.flash('loginMessage', 'No user found.'));
			}
			//Wrong password
			if (!user.validPassword(password)) {
				return callback(null, false, req.flash('loginMessage', 'Wrong password'));
			}

			return callback(null, user);
		});
	}));
};