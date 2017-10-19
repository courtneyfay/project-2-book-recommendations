console.log("booksController.js, checking in!");

// SETTING UP REQUIREMENTS AND VARIABLES
const db 									= require('../models');
const Book 								= require('../models/book.js');
const request 						= require('request');
const apiKey 							= ( process.env.apiKey || require('../config/env.js') );
let baseUrl 							= 'https://language.googleapis.com/v1beta2/documents:';	

let booksGet = function(req, res) {
	db.Book.find({}, function(err, books) {
		res.render('index.ejs', {books: books});
	});
};

let booksRecommendation = function(req, res) {
	res.render('recommendation.ejs');
};

let getNewBookForm = function(req, res) {
	res.render('addBookAdmin.ejs');
};

let postNewBook = function(req, res) {

	//TODO how to make it secret so that only admin can use this functionality? (express-passport project)

	// 1. grab data from the form and APIs add it to the new Book object
	let newBook = new Book();
	newBook.title = req.body.title;
	newBook.author = req.body.author;
	newBook.coverUrl = req.body.coverUrl;
	newBook.sampleText = req.body.sampleText;

	// 2. DEFINE url and data for API requests
	let sampleText = req.body.sampleText;
	// let sentimentError, sentimentResponse, sentimentBody;
	let sentimentRequest = baseUrl + 'analyzeSentiment' + '?key=' + apiKey;
	// let entityError, entityResponse, entityBody;
	let entitiesRequest = baseUrl + 'analyzeEntities' + '?key=' + apiKey;

	// 3. post SENTIMENT request to Google API 
	request.post({
			headers: {'content-type' : 'application/json'},
			url: sentimentRequest, 
			json: {"document":{"type": "PLAIN_TEXT","language":"EN","content": sampleText },"encodingType":"UTF8"}
		}, function(err, response, body) {
			if (err) console.log(err);
			
			// 4. declare SENTIMENT variables in newBook object
			newBook.sentimentMagnitude = body.documentSentiment.magnitude;
			newBook.sentimentScore = body.documentSentiment.score;
			newBook.sentiment = 'not sure';

			// 5. post ENTITY request to Google API 
			request.post({
					headers: {'content-type' : 'application/json'},
					url: entitiesRequest, 
					json: {"document":{"type": "PLAIN_TEXT","language":"EN","content": sampleText },"encodingType":"UTF8"}
				}, function(err, response, body) {
					if (err) console.log(err);
					
					// 6. declare ENTITY variable in newBook object
					let entities = body.entities;
					let entitiesArray = [];

					for (let i = 0; i < entities.length; i++) {
						entitiesArray.push(entities[i].name)
					}

					//console.log(entitiesArray);
					newBook.entities = entitiesArray;

					// 7. SAVE to entities array in db IN ORDER OF SALIENCE values
					newBook.save(newBook, function(err, book) {
						if (err) return(err);

						// 8. serve up saved book ejs
						//res.json(newBook);
						res.render('savedBookAdmin.ejs', {newBook: newBook});
					});
			});
		});
};

let getBookshelf = function(req, res) {
	//TODO change user ID so that it's not hardcoded and so it's being passed in by current user or whatever
	//maybe use req?
	db.User.find({_id: "59e8c8afcbe139b11cb3f65a"}, function(err, user) {
		if (err) return (err);
		let bookshelfIds = user[0].bookshelf;
		let bookshelf = [];

		// look up the book details based on the ID in the user's bookshelf
		for (let i = 0; i < bookshelfIds.length; i++) {
			db.Book.find({_id: bookshelfIds[i]}, function(err, book) {
				if (book) {
					bookshelf.push(book);
				} 
			});
		}

		// once the user bookshelf is full of details, serve up the book details to the bookshelf partial
		res.render('./partials/bookshelf.ejs', {bookshelf: bookshelf});
	});
};

let entityAPI = function(text) {
	
	// 1. DEFINE url and data for API request
	let entityError, entityResponse, entityBody;
	let entitiesRequest = baseUrl + 'analyzeEntities' + '?key=' + apiKey;

	// 2. POST request to Google API 
	request.post({
			headers: {'content-type' : 'application/json'},
			url: entitiesRequest, 
			json: {"document":{"type": "PLAIN_TEXT","language":"EN","content": text },"encodingType":"UTF8"}
		}, function(err, response, body) {
		entityError = err;
		entityResponse = response;
		entityBody = body.entities;

		// 3. RETURN what was received from entity API
		//if (entityBody) {
			// console.log(entityBody);
		return entityBody;
		//}
	});
};

let sentimentAPI = function(req, res) {
	
	// 1. define url and data for API request
	let sentimentError, sentimentResponse, sentimentBody;
	let sentimentRequest = baseUrl + 'analyzeSentiment' + '?key=' + apiKey;
	// TODO: change the sample text to whichever text is submitted through the input form 
	let sampleText = "It is a little remarkable, that — though disinclined to talk overmuch of myself and my affairs at the fireside, and to my personal friends — an autobiographical impulse should twice in my life have taken possession of me, in addressing the public. The first time was three or four years since, when I favored the reader — inexcusably, and for no earthly reason, that either the indulgent reader or the intrusive author could imagine — with a description of my way of life in the deep quietude of an Old Manse. And now — because, beyond my deserts, I was happy enough to find a listener or two on the former occasion—I again seize the public by the button, and talk of my three years’ experience in a Custom-House. The example of the famous “P. P., Clerk of this Parish,” was never more faithfully followed.";

	// 2. post request to Google API 
	request.post({
			headers: {'content-type' : 'application/json'},
			url: sentimentRequest, 
			json: {"document":{"type": "PLAIN_TEXT","language":"EN","content": sampleText },"encodingType":"UTF8"}
		}, function(err, response, body) {
		sentimentError = err;
		sentimentResponse = response;
		sentimentBody = body.documentSentiment;

		console.log(sentimentBody);
		// 3. show what was received from entity API back to the page
		// TODO: need to change to save to db
		res.render('sentimentTest.ejs', {sentimentBody: sentimentBody});
	});
};

module.exports.booksGet = booksGet;
module.exports.entityAPI = entityAPI;
module.exports.sentimentAPI = sentimentAPI;
module.exports.booksRecommendation = booksRecommendation;
module.exports.getNewBookForm = getNewBookForm;
module.exports.postNewBook = postNewBook;
module.exports.getBookshelf = getBookshelf;

//////////////////////////////////////////////////////////////////////////////////////////////////////
// FUTURE CONTROLLERS //
////////////////////////

// POST CONTROLLER MODEL
/*let cargoPost = function(req, res) {
	db.Cargo.create({description: req.body.description, title: req.body.title}, function(error, cargo){
		res.render('cargoShow.ejs', {cargo: cargo});
	});
};*/

// NEW BOOK FORM GET ROUTE
// NEW BOOK FORM POST ROUTE
/*
//Cargo form
app.get('/cargo/new', function(req, res) { //look at that controller
	res.render('cargoNew'); 
});

//Add new cargo
app.post('/cargo', function(req, res) { //and look at that controller
	Cargo.create({description: req.body.description, title: req.body.title}, function(error, cargo) {
		res.render('cargoShow', {cargo: cargo});
	});
});
*/