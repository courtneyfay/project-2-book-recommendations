console.log("user.js, checking in!");

// setting constants to use
const mongoose 			= require('mongoose');
const Schema 				= mongoose.Schema;
const bcrypt 				= require('bcrypt-nodejs');

// defining UserSchema
let User = mongoose.Schema({
	local: {
		email			: String,
		password	: String,
		// TODO: bookshelf with reference IDs to books?
		//bookshelf : [ String ],
		//admin			: Boolean
	}
});

// salts the password 8 times
User.methods.encrypt = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// checks to see if the password matches the salted one in the db


// activating and exporting User to index
module.exports = mongoose.model('User', User);