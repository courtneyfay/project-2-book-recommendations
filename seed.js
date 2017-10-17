console.log('seed.js, checking in!');

let db = require('./models');

let booksList = [
	{
		title: "howdeedoodee",
		author: "lateeda", 
		sampleText: "lala"
	},
	{
		title: "howdeedoodee",
		author: "lateeda", 
		sampleText: "lala"
	},
	{
		title: "howdeedoodee",
		author: "lateeda", 
		sampleText: "lala"
	}
];

/*db.Book.remove({}, function(err, books){

  db.Book.create(booksList, function(err, books){
    if (err) { return console.log('ERROR', err); }
    console.log("created", books.length, "books");
    console.log("all books:", books);
    process.exit();
  });

});*/