console.log("user.js, checking in!");

// setting constants to use
const mongoose 			= require('mongoose');
const Schema 				= mongoose.Schema;
const bcrypt 				= require('bcrypt-nodejs');

// defining UserSchema
let UserSchema = mongoose.Schema({
	local: {
		email			: String,
		password	: String,
		// TODO: bookshelf with reference IDs to books?
		bookshelf : [ String ],
		admin			: Boolean
	}
	
	// TODO: other functions for passport from express-passport project
	// User.methods.encrypt
	// User.methods.validPassword
});

// activating User model
let User = mongoose.model('User', UserSchema);

// exporting User to index
module.exports = User;