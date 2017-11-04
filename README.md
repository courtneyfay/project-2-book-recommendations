# BookMe

## Approach taken:
```
BookMe helps readers find better book recommendations using textual analysis and natural language processing. Readers can add recommended books to their bookshelves, and administrators can add, edit and delete books from the site's book library. This is my first full stack app!

```

## Technologies used:
```
* APIs:
	* Google Books
	* Google Natural Language Processing (Entity Analysis and Sentiment Analysis)
* Node.js
* Express
* Bootstrap
* MongoDB
* Mongoose
* Javascript
* JQuery
* AJAX
* EJS
* Mocha 
* Passport
* Heroku

(thanks to Jeff for the starter list!)
```

## Installation instructions:
```
Heroku link: https://mighty-springs-60426.herokuapp.com/

* node seed.js to get started with some books
* you can sign up any sample user to play with bookshelf functionality
* use test@test.test/test to play with admin functionality (or once you have your own user setup, go into heroku database to make them an admin if you want to CRUD data (add admin property and set to true for that user))

```

## Unsolved problems:
```
* How to get sample text for the books I'm pulling in from Google Books API -- this was WAY harder than I anticipated!
* I'd like to actually use the entity and sentiment analysis to recommend books. Right now it's randomly pulling 2 items from the database, which is not ideal.
* Some of the styling is not up to par. In particular, the login/signup pages and the home page are UGLY.
```
------------------------------------------------------------------------

## Other useful links:

### Presentation slides: https://docs.google.com/presentation/d/1kVXLjir_B7FiagPsxinnT09zjizUMjuNdK-iJtc6dDA/edit?usp=sharing

### Trello board link: https://trello.com/b/jngSrLKW/project-2-book-me

### Toggle link: https://www.toggl.com/app/timer

### Google sheets time tracker: https://docs.google.com/spreadsheets/d/1-Qb4htVyT8RGr-NQ0YlZYGhOFQ7VaihiWZemR-N7r5E/edit?usp=sharing

### Pinterest link: https://www.pinterest.com/faycourtney/project-2-ideas/

## Wireframes: 
![alt text](wireframes/bookme_wireframes_1.jpg "BookMe Wireframe Home page")
![alt text](wireframes/bookme_wireframes_2.jpg "BookMe Wireframe Book Recommendation page")
![alt text](wireframes/bookme_wireframes_3.jpg "BookMe Wireframe Login page")
![alt text](wireframes/bookme_wireframes_4.jpg "BookMe Wireframe Bookshelf page")
![alt text](wireframes/bookme_wireframes_5.jpg "BookMe Wireframe New saved book page")

## Database model: 
![alt text](wireframes/bookme_wireframes_6.jpg "Database model for BookMe")