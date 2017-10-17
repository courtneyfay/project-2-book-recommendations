console.log('server.js, checking in!');

// SET UP VARIABLES
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// SET UP MONGO DB AND MONGOOSE SCHEMA / MODELS
// let mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/bookme');
// let Schema = mongoose.Schema;
// let BookSchema = new Schema({
// 	title: String,
// 	author: String
// });
// let Book = mongoose.model('Book', BookSchema);

// SET UP EJS
// app.set('views', __dirname + '/views');
// app.engine('ejs', require('ejs').renderFile);
// app.set('view engine', 'ejs');

// INDEX ROUTE - DISPLAYS ALL BOOKS
app.get('/books', function(req, res) {
	res.send('books from DB should print out here');
	// res.json();
});

// NEW BOOK FORM GET ROUTE
// NEW BOOK FORM POST ROUTE

app.listen(3000, function() {
	console.log('listening at http://localhost:3000');
});
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

//Start server
app.listen(3000, function() {
	console.log("Listening at http://localhost:3000");
});
*/