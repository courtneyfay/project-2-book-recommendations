console.log("app.js, checking in!");

$(document).ready(function(){

	let $bookshelfList = $('.books-in-bookshelf');
  let $addBooksList = $('.books-to-add');
  let $adminButtons = $('.admin-buttons');
  let $editBooksList = $('.edit-a-book-button');
  let $headerList = $('.jumbotron-fluid');

  //listens for when an admin clicks on the admin button
  $headerList.on('click', '.admin-btn', function() {
    $.ajax({
      method: 'GET',
      url: '/new',  
      success: function(data) {
        $('html').html(data);
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

  //listens for when a user clicks on the home page button
  $headerList.on('click', '.home-page-btn', function() {
    $.ajax({
      method: 'GET',
      url: '/',  
      success: function(data) {
        $('html').html(data);
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

  //listens for when the admin clicks to submit the edited book to the database
  $editBooksList.on('click', '.submit-edit-btn', function() {
    $.ajax({
      method: 'PUT',
      url: '/new/' + $(this).attr('data-id'), 
      data: $('.edit-book-form').serialize(), 
      success: function(data) {
        console.log(data);
        // $('html').html(data);
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

  //listens for when the admin clicks to edit a book in the database
  $adminButtons.on('click', '.edit-btn', function() {
    $.ajax({
      method: 'GET',
      url: '/new/' + $(this).attr('data-id'), 
      success: function(data) {
        $('html').html(data);
      },
      error: function(err) {
        console.log(err);
      }
    });
  }); 

  //listens for when the admin clicks to delete a book from the database
  $adminButtons.on('click', '.delete-btn', function() {
    $.ajax({
      method: 'DELETE',
      url: '/new/' +$(this).attr('data-id'), 
      success: function(data) {
        console.log(data);
        $('.new-book').html(data);
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

  //listens for when a user clicks to remove a book from their bookshelf
  $bookshelfList.on('click', '.remove-btn', function() {
    $.ajax({
      method: 'DELETE',
      url: '/bookshelf/' +$(this).attr('data-id'), 
      success: function(data) {
        location.reload();
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

  //listens for when a user clicks to add a book to their bookshelf
  $addBooksList.on('click', '.add-btn', function() {
    let $addedBook = $(this).attr('data-id');

    $.ajax({
      method: 'POST',
      url: '/bookshelf',
      data: $(this).attr('data-id'), 
      success: function(html) {
        console.log(html);
        console.log($bookshelfList);
        console.log($addedBook);
      },
      error: function(err) {
        console.log(err);
      }
    });
  });
});

