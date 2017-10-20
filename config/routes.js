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
router.get('/recommendation', booksController.booksRecommendation);

// TESTING BOOKSHELF ROUTE - USER CAN SEE THEIR BOOKSHELF OF BOOKS
router.route('/bookshelf')
  .get(authenticatedUser, booksController.getBookshelf);

// CREATE, EDIT, DELETE ROUTES - ADMIN ONLY
router.route('/new')
  .get(administratorUser, booksController.getNewBookForm)
  .post(administratorUser, booksController.postNewBook);

router.route('/edit')
  .get(administratorUser, booksController.editNewBook);

router.route('/delete')
  .get(administratorUser, booksController.removeNewBook);

// TESTING API ROUTE - CALL FOR DATA FROM ENTITY API
//router.get('/entityapi', booksController.entityAPI);

// TESTING API ROUTE - CALL FOR DATA FROM SENTIMENT API
//router.get('/sentimentapi', booksController.sentimentAPI);

module.exports = router;