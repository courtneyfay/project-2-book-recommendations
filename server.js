console.log('server.js, checking in!');

// SET UP VARIABLES
const express 			= require('express');
const app 					= express();
const bodyParser 		= require('body-parser');
const routes 				= require(__dirname + '/config/routes.js');
const mongoose     	= require('mongoose');
const db 						= require('./models');
const passport     	= require('passport');
const morgan        = require('morgan');
const cookieParser  = require('cookie-parser');
const flash         = require('connect-flash');
const session       = require('express-session');

// SET UP (STUFF?)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev')); 
app.use(cookieParser());
app.use(bodyParser()); 

// SET UP EJS
app.set('views', __dirname + '/views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

// SET UP PASSPORT 
app.use(session({ secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS' })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

// USE PASSPORT MIDDLEWARE TO AUTHENTICATE AND PERSIST THE USER
require('./config/passport')(passport);
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

// SET UP ROUTER
app.use('/', routes);

// VROOM VROOM, START THE ENGINE!
app.listen(process.env.PORT || 3000, function() {
	console.log('listening either at heroku or http://localhost:3000');
});
