console.log('server.js, checking in!');

// SET UP VARIABLES
const express 			= require('express');
const app 					= express();
const bodyParser 		= require('body-parser');
const mongoose     	= require('mongoose');
const passport     	= require('passport');
const db 						= require('./models');
const request 			= require('request');
const setKey 				= require('./config/env.js');
const routes 				= require(__dirname + '/config/routes.js');
let apiKey 					= setKey();

// SET UP BODY PARSER
app.use(bodyParser.urlencoded({ extended: true }));

// SET UP EJS
app.set('views', __dirname + '/views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

// SET UP ROUTER
app.use('/', routes);

// VROOM VROOM, START THE ENGINE!
app.listen(process.env.PORT || 3000, function() {
	console.log('listening either at heroku or http://localhost:3000');
});
