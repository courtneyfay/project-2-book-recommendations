console.log("routes.js, checking in!");

// SETTING UP REQUIREMENTS AND VARIABLES
const express 						= require('express');
const router 							= express.Router();
const booksController 		= require('../controllers/booksController.js');
const usersController     = require('../controllers/usersController.js');
const bodyParser 					= require('body-parser');
const methodOverride 			= require('method-override');
const passport 						= require('passport');

//////////////////////////////////////////////////////////////////////
// MIDDLEWARE //
////////////////

// CHECKS USER AUTHENTICATION
function authenticatedUser(req, res, next) {
	//if the user is authenticated, then we continue the execution
	if (req.isAuthenticated()) return next();

	//otherwise the request is always redirected back to the page it came from
	res.redirect('/login');
};

// CHECKS TO SEE IF USER IS AN ADMIN
function administratorUser(req, res, next) {
  //if the user is an admin, then we continue the execution
  if (req.user.admin === true && req.isAuthenticated()) {
    return next();
  }

  //otherwise the request is always redirected to the home page
  res.redirect('/');
};

//////////////////////////////////////////////////////////////////////
// PASSPORT ROUTES //
/////////////////////

// PASSPORT ROUTES FOR SIGNUP
router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup);

// PASSPORT ROUTES FOR LOGIN
router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin);

// PASSPORT ROUTE FOR LOGOUT
router.route('/logout')
  .get(usersController.getLogout);

//////////////////////////////////////////////////////////////////////
// BOOK ROUTES //
/////////////////

// INDEX ROUTE - USER CAN SEE ALL BOOKS
router.get('/', booksController.booksGet);

// TESTING RECOMMENDATION ROUTE - DISPLAY RECOMMENDATION PAGE
router.post('/recommendation', booksController.booksRecommendation);

// BOOKSHELF ROUTE - USER CAN SEE THEIR OWN BOOKSHELF OF BOOKS AND ADD/DELETE BOOKS
router.route('/bookshelf')
  .get(authenticatedUser, booksController.getBookshelf)
  .post(authenticatedUser, booksController.addBookToBookshelf);
router.route('/bookshelf/:id')
  .delete(authenticatedUser, booksController.removeBookFromBookshelf);

// CREATE, EDIT, DELETE ROUTES - ADMIN ONLY
router.route('/new')
  .get(administratorUser, booksController.getNewBookForm)
  .post(administratorUser, booksController.addNewBook);
router.route('/new/:id')
  .get(administratorUser, booksController.getEditBookForm)
  .put(administratorUser, booksController.editNewBook) //post
  .delete(administratorUser, booksController.deleteNewBook);  
  
module.exports = router;