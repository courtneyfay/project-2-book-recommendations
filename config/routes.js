console.log("routes.js, checking in!");

// SETTING UP REQUIREMENTS AND VARIABLES
const express 						= require('express');
const router 							= express.Router();
const bookControllers 		= require('../controllers/bookControllers');

// INDEX ROUTE - DISPLAYS ALL BOOKS
router.get('/', bookControllers.booksGet);

// API ROUTE - CALL FOR DATA FROM ENTITY API
router.get('/entityapi', bookControllers.entityAPI);

// API ROUTE - CALL FOR DATA FROM SENTIMENT API
router.get('/sentimentapi', bookControllers.sentimentAPI);

module.exports = router;

//////////////////////////////////////////////////////////////////////////////////////////////////////
// FUTURE ROUTES //
///////////////////

// SHOW ROUTE

// CREATE ROUTE - POST A NEW BOOK
//router.post('/books', bookControllers.booksPost);

// EDIT ROUTE

// DELETE ROUTE