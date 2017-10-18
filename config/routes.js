console.log("routes.js, checking in!");

let express 						= require('express');
let router 							= express.Router();
let bookControllers 		= require('../controllers/bookControllers');

// INDEX ROUTE - DISPLAYS ALL BOOKS
router.get('/', bookControllers.booksGet);

// CREATE ROUTE - POST A NEW BOOK
//router.post('/cargo', bookControllers.booksPost);

module.exports = router;