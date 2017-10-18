console.log("bookControllers.js, checking in!");

// Set up DB models
let db = require('../models');

let booksGet = function(req, res) {
	db.Book.find({}, function(err, books) {
		res.render('index.ejs', {books: books});
	});
};

module.exports.booksGet = booksGet;
//module.exports.bookPost = bookPost;

/*let cargoPost = function(req, res) {
	db.Cargo.create({description: req.body.description, title: req.body.title}, function(error, cargo){
		res.render('cargoShow.ejs', {cargo: cargo});
	});
};*/

// INDEX ROUTE - DISPLAYS ALL BOOKS
/*app.get('/', function(req, res) {
	db.Book.find({}, function(err, books) {
		res.render('index.ejs', {books: books});
	});
});*/

// POST ROUTE - CALL THE NLP API
// app.post('/api', function(req, res) {
//let apiError, apiResponse, apiBody;
//let baseUrl = 'https://language.googleapis.com/v1beta2/documents:';	
//let entitiesRequest = baseUrl + 'analyzeEntities' + '?key=' + apiKey;
	
// console.log(err);
// console.log(res);
// console.log(body);

/*app.post({
	headers: {'content-type' : 'application/json'},
	url: entitiesRequest, 
	json: {"document":{"type": "PLAIN_TEXT","language":"EN","content":"Lawrence of Arabia is a highly rated film biography about British Lieutenant T. E. Lawrence. Peter OToole plays Lawrence in the film."},"encodingType":"UTF8"}
}, function(err, res, body) {
	apiError = err;
	apiResponse = res;
	apiBody = body;
	done();
});*/

	//call the nlp app, send it data
	//find the corresponding book in the database by title
	//db.Book.findOne({title: title}, function(err, book) {

	//});
	//show the data received on a new test.ejs page
	//res.render('test.ejs', {});

	//TODO: create new data in the database

	/*
	request.post({
			headers: {'content-type' : 'application/json'},
			url: entitiesRequest, 
			json: {"document":{"type": "PLAIN_TEXT","language":"EN","content":"Lawrence of Arabia is a highly rated film biography about British Lieutenant T. E. Lawrence. Peter OToole plays Lawrence in the film."},"encodingType":"UTF8"}
		}, function(err, res, body) {
		apiError = err;
		apiResponse = res;
		apiBody = body;
		done();
	});
	*/

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