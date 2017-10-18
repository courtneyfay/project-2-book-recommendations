console.log("index.js, checking in!");

// setting constants to use
const mongoose 			= require('mongoose');
mongoose.connect("mongodb://localhost/book-me");

// requiring and exporting all models
module.exports.Book = require('./book.js');
module.exports.User = require('./user.js');