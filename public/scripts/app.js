console.log("app.js, checking in!");
// const booksController     = require('../config/routes.js');
var $bookshelfList;

$(document).ready(function(){

  //listens for when a user clicks to remove a book from their bookshelf;
	$booksList = $('.books-in-bookshelf');
  
  $booksList.on('click', '.delete-btn', function() {
    console.log('clicked delete button to', '/bookshelf'+$(this).attr('data-id')); 
    $.ajax({
      method: 'DELETE',
      url: '/bookshelf/' +$(this).attr('data-id'), 
      success: function(result) {
        console.log('success!');
      },
      error: function(err) {
        console.log(err);
      }
    });
  });
  
  /*
	 $('#newBookForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/books',
      data: $(this).serialize(),
      success: newVacationSuccess,
      error: newVacationError
    });
  });
	*/

  /*
  $.ajax({
    method: 'GET',
    url: '/api/dream-vacations',
    success: handleSuccess,
    error: handleError
  });
  */
});