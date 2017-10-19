console.log("booksController.js, checking in!");

// SETTING UP REQUIREMENTS AND VARIABLES
const db 									= require('../models');
const request 						= require('request');
const setKey 							= require('../config/env.js');
let apiKey 								= setKey();
let baseUrl 							= 'https://language.googleapis.com/v1beta2/documents:';	

let booksGet = function(req, res) {
	db.Book.find({}, function(err, books) {
		res.render('index.ejs', {books: books});
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