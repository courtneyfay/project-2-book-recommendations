console.log("book.js, checking in!");

// setting constants to use
const mongoose 			= require('mongoose');
const Schema 				= mongoose.Schema;
const random 				= require('mongoose-simple-random');


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
BookSchema.plugin(random);
// FURTHER READING: https://larry-price.com/blog/2014/09/15/fetching-random-mongoose-objects-the-simple-way/

// activating Book model
let Book = mongoose.model('Book', BookSchema);

// exporting Book to index
module.exports = Book;