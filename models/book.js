console.log("cargo.js, checking in!");

// requiring mongoose
let mongoose = require("mongoose");

// creating Book schema
let Schema = mongoose.Schema;
let BookSchema = new Schema({
  title: String,
  author: String,
  coverUrl: String,
  sampleText: String,
  entities: [ String ],
  sentimentMagnitude: Number,
  sentimentScore: Number,
  sentimentCalculate: Number
});

// activating Book model
let Book = mongoose.model('Book', BookSchema);

// exporting Book to index
module.exports = Book;