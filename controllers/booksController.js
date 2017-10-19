console.log("booksController.js, checking in!");

// SETTING UP REQUIREMENTS AND VARIABLES
const db 									= require('../models');
const request 						= require('request');
const setKey 							= ( process.env.apiKey || require('../config/env.js') );
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
	
	//grab data from the form and add it to the Book collection in the db
	let newBook = { 
		title : req.body.title, 
		author : req.body.author,
		coverUrl : req.body.coverUrl,
		sampleText : req.body.sampleText 
	};

	//add functionality to hit the API calls from here before you create the new book!!

	db.Book.create(newBook, function(err, book) {
		if (err) return(err);
		res.json(newBook);
	});

	/*
	let VacationSchema = new Schema({
		activity: String,
		city: String,
		country: String,
		photoUrl: String
});
	// CREATE route to add a new dream vacation
app.post('/api/dream-vacations', function vacations_create(req,res) {

  let newVacation = { 
    activity: req.body.activity, 
    city: req.body.city,
    country: req.body.country,
    photoUrl: req.body.photoUrl
  };

  db.Vacation.create(newVacation, function(err, vacation) {
    res.json(newVacation);
  });
  
});
	*/
	/*
	app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
  // take input from form and parse it out
  /*let newID = 0; 
  for (let i = 0; i < todos.length; i++) {
    newID = todos[i]._id;
  };
  newID ++;
  let newTask = req.body.task;
  let newDescription = req.body.description;

  // push the new todo object into the todos array
  let newTodo = { "_id" : newID , "task" : newTask, "description" : newDescription };
  todos.push(newTodo);

  // then display the new todo element
  res.json(newTodo);
});
	*/
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

let entityAPI = function(req, res) {
	
	// 1. define url and data for API request
	let entityError, entityResponse, entityBody;
	let entitiesRequest = baseUrl + 'analyzeEntities' + '?key=' + apiKey;
	// TODO: change the sample text to whichever text is submitted through the input form 
	let sampleText = "Lawrence of Arabia is a highly rated film biography about British Lieutenant T. E. Lawrence. Peter OToole plays Lawrence in the film.";

	// 2. post request to Google API 
	request.post({
			headers: {'content-type' : 'application/json'},
			url: entitiesRequest, 
			json: {"document":{"type": "PLAIN_TEXT","language":"EN","content": sampleText },"encodingType":"UTF8"}
		}, function(err, response, body) {
		entityError = err;
		entityResponse = response;
		entityBody = body.entities;

		// 3. show what was received from entity API back to the page
		// TODO: need to change to save to db
		res.render('entityTest.ejs', {entityBody: entityBody});
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