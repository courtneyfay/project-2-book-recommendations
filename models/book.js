console.log("book.js, checking in!");

// setting constants to use
const mongoose 			= require('mongoose');
const Schema 				= mongoose.Schema;

// defining BookSchema
let BookSchema = new Schema({
  title: String,
  author: String,
  coverUrl: String,
  sampleText: String,
  entities: [ String ],
  sentimentMagnitude: Number,
  sentimentScore: Number,
  sentiment: String,
  createdBy: String // userID? referenced data
});

// activating Book model
let Book = mongoose.model('Book', BookSchema);

// exporting Book to index
module.exports = Book;