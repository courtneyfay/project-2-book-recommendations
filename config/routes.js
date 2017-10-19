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

// PASSPORT ROUTES FOR LOGIN
router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin)

// PASSPORT ROUTE FOR LOGOUT
router.route('/logout')
  .get(usersController.getLogout)

//////////////////////////////////////////////////////////////////////
// BOOK ROUTES //
/////////////////

// INDEX ROUTE - DISPLAYS ALL BOOKS
router.get('/', booksController.booksGet);

// TEST RECOMMENDATION ROUTE - DISPLAY RECOMMENDATION PAGE
router.get('/recommendation', booksController.booksRecommendation);

// CREATE ROUTE - ADMIN CAN ADD NEW BOOKS WITH THE FORM
router.route('/new')
  .get(booksController.getNewBookForm)
  .post(booksController.postNewBook)

// BOOKSHELF ROUTE - USER CAN SEE THEIR BOOKSHELF OF BOOKS
router.get('/bookshelf', booksController.getBookshelf);

// TESTING API ROUTE - CALL FOR DATA FROM ENTITY API
//router.get('/entityapi', booksController.entityAPI);

// TESTING API ROUTE - CALL FOR DATA FROM SENTIMENT API
//router.get('/sentimentapi', booksController.sentimentAPI);

module.exports = router;

//////////////////////////////////////////////////////////////////////////////////////////////////////
// FUTURE ROUTES //
///////////////////

// SHOW ROUTE

// EDIT ROUTE

// DELETE ROUTE