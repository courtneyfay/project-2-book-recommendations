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
	let originBook = req.body.bookId;

	//find the book based on the ID
	db.Book.find({_id: originBook}, function(err, originBook) {
		if (err) console.log(err);
		
		// algorithm for randomly finding 2 books from the db to serve up
		// TODO make this algorithm match books based on NLP entity and sentiment data
		db.Book.findRandom({}, {}, {limit: 2}, function(err, recommendedBooks) {
			if(err) console.log(err);

			// once the algorithm has grabbed the 2 recommended books, serve up the recommendation page
			res.render('recommendation.ejs', {
				originBook: originBook,
				recommendedBooks: recommendedBooks
			});
		});
	});	
};

let getNewBookForm = function(req, res) {
	res.render('addBookAdmin.ejs');
};

let addNewBook = function(req, res) {

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

					newBook.entities = entitiesArray;

					// 7. SAVE to entities array in db IN ORDER OF SALIENCE values
					newBook.save(newBook, function(err, book) {
						if (err) return(err);

						// 8. serve up saved book ejs
						res.render('savedBookAdmin.ejs', {newBook: newBook});
					});
			});
		});
};

let getEditBookForm = function(req, res) {
	console.log('hitting the EDIT FORM function!');
	
	//figure out where the book id is in the request
	let bookId = req.params.id;

	//remove the book from the books collection
	db.Book.find({_id: bookId}, function(err, book) {
		if (err) return(err);

		//return administrator to the edit the book form
		res.render('./editBookAdmin.ejs', {
			book: book
		});
	});
};

let editNewBook = function(req, res) {
	console.log('hitting the EDITNEWBOOK function!');
	
	//figure out where the book id is in the request
	let bookId = req.params.id;

	//look up the record to edit
	db.Book.findOne({_id: bookId}, function(err, book) {
		if (err) return(err);

		//if the title is NOT the same, update it
		if (book.title !== req.body.title) {
			console.log('titles are NOT the same!');
			book.title = req.body.title;
		};

		//if the author is NOT the same, update it
		if (book.author !== req.body.author) {
			console.log('authors are NOT the same!');
			book.author = req.body.author;
		};

		//if the coverUrl is NOT the same, update it
		if (book.coverUrl !== req.body.coverUrl) {
			console.log('coverUrls are NOT the same!');
			book.coverUrl = req.body.coverUrl;
		};
		
		//if the sampleText is NOT the same, update it
		if (book.sampleText !== req.body.sampleText) {
			console.log('sampleTexts are NOT the same!');
			book.sampleText = req.body.sampleText;
		};

		//save the data
		book.save(book, function(err) {
			if (err) return(err);

			//serve up the savedbook page
			return res.render('savedBookAdmin.ejs', {newBook: book});			
		});
	});
};

let getSavedBookForm = function(req, res) {
	console.log('hitting the GET SAVEDBOOKFORM');
};

let deleteNewBook = function(req, res) {

	//figure out where the book id is in the request
	let bookId = req.params.id;

	//remove the book from the books collection
	db.Book.remove({_id: bookId}, function(err, book) {
		if (err) return(err);

		//return administrator to the add a new book page
		return res.redirect(303, '/new');
	});

};

let getBookshelf = function(req, res) {

	// Find the user's bookshelf
	let userId = req.user._id;
	db.User.find({_id: userId}, function(err, user) {
		if (err) return (err);
		let bookshelfIds = user[0].bookshelf;

		// look up all the books' info based on book id in the book collection
		db.Book.find({_id: {$in: bookshelfIds}}, function(err, bookshelf) {
			if (err) console.log(err);

			// once the user bookshelf is full of details like cover URL, serve up the bookshelf page
			res.render('./myBookshelf.ejs', {
				bookshelf: bookshelf,
				user: user
			});
		});	
	});
};

let addBookToBookshelf = function(req, res) {

	// Find the user's bookshelf
	let userId = req.user._id;

	db.User.find({_id: userId}, function(err, user) {
		if (err) return (err);
		
		// TODO: first check to make sure it isn't already in the array
		// TODO: don't add a new book if its value is null

		// grab the new book ID from the form, and push it into the user's bookshelf array!
		user[0].bookshelf.push(req.body.bookId);

		let bookshelfIds = user[0].bookshelf;

		// save updated array to the db
		user[0].save(function(err, newBookshelf) {
			if (err) return (err);
			
			// look up all the books' info based on book id in the book collection
			db.Book.find({_id: {$in: bookshelfIds}}, function(err, bookshelf) {
			if (err) console.log(err);

				// once the user bookshelf is full of details like cover URL, serve up the bookshelf page
				//res.redirect(303, '/bookshelf');
				// once the user bookshelf is full of details like cover URL, serve up the bookshelf page
				res.render('./myBookshelf.ejs', {
					bookshelf: bookshelf,
					user: user
				});
			});
		});	
	});
};		

let removeBookFromBookshelf = function(req, res) {

	//figure out where the data id is in the request
	let removeBook = req.params.id;

	// Find the user's bookshelf
	let userId = req.user._id;
	db.User.find({_id: userId}, function(err, user) {
		if (err) return(err);

		let bookshelfIds = user[0].bookshelf;

		//find the book in the user's bookshelf array and remove it
		for (let i = 0; i < bookshelfIds.length; i++) {
			if (bookshelfIds[i] === removeBook) {
				bookshelfIds.splice(i, 1);
			}
		}

		// save updated array to the db
		user[0].save(function(err, user) {
			if (err) return(err);

			let newBookShelfIds = user.bookshelf;

			// look up all the books' info based on book id in the book collection
			db.Book.find({_id: {$in: newBookShelfIds}}, function(err, bookshelf) {
				if (err) console.log(err);

				// once the user bookshelf is full of details like cover URL, serve up the bookshelf page
				res.redirect(303, '/bookshelf');
			});
		});
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
module.exports.addNewBook = addNewBook;
module.exports.getBookshelf = getBookshelf;
module.exports.getEditBookForm = getEditBookForm;
module.exports.editNewBook = editNewBook;
module.exports.getSavedBookForm = getSavedBookForm;
module.exports.deleteNewBook = deleteNewBook;
module.exports.addBookToBookshelf = addBookToBookshelf;
module.exports.removeBookFromBookshelf = removeBookFromBookshelf;