console.log('server.js, checking in!');

// SET UP VARIABLES
const express 			= require('express');
const app 					= express();
const bodyParser 		= require('body-parser');
const mongoose     	= require('mongoose');
const passport     	= require('passport');
const db 						= require('./models');

app.use(bodyParser.urlencoded({ extended: true }));

// SET UP EJS
app.set('views', __dirname + '/views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

// INDEX ROUTE - DISPLAYS ALL BOOKS
app.get('/', function(req, res) {
	db.Book.find({}, function(err, books) {
		res.render('index.ejs', {books: books});
	});
});

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

app.listen(3000, function() {
	console.log('listening at http://localhost:3000');
});
