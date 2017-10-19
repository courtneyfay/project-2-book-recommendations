console.log("routes.js, checking in!");

// SETTING UP REQUIREMENTS AND VARIABLES
const express 						= require('express');
const router 							= express.Router();
const booksController 		= require('../controllers/booksController.js');
const bodyParser 					= require('body-parser');
const methodOverride 			= require('method-override');
const passport 						= require('passport');
const usersController 		= require('../controllers/usersController.js');

// CHECKS USER AUTHENTICATION
function authenticatedUser(req, res, next) {
	//if the user is authenticated, then we continue the execution
	if (req.isAuthenticated()) return next();

	//otherwise the request is always redirected to the home page
	res.redirect('/');
};

//////////////////////////////////////////////////////////////////////
// PASSPORT ROUTES //
/////////////////////

// PASSPORT ROUTES FOR SIGNUP
router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup)

//////////////////////////////////////////////////////////////////////
// BOOK ROUTES //
/////////////////

// INDEX ROUTE - DISPLAYS ALL BOOKS
router.get('/', booksController.booksGet);

// API ROUTE - CALL FOR DATA FROM ENTITY API
router.get('/entityapi', booksController.entityAPI);

// API ROUTE - CALL FOR DATA FROM SENTIMENT API
router.get('/sentimentapi', booksController.sentimentAPI);

module.exports = router;

//////////////////////////////////////////////////////////////////////////////////////////////////////
// FUTURE ROUTES //
///////////////////

// SHOW ROUTE

// CREATE ROUTE - POST A NEW BOOK
//router.post('/books', booksController.booksPost);

// EDIT ROUTE

// DELETE ROUTE