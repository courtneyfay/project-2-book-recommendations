console.log("booksController.js, checking in!");

// SETTING UP REQUIREMENTS AND VARIABLES
const db 									= require('../models');
const Book 								= require('../models/book.js');
const request 						= require('request');
const apiKey 							= ( process.env.apiKey || require('../config/env.js') );
let baseUrl 							= 'https://language.googleapis.com/v1beta2/documents:';	
const jsdom 							= require('jsdom');
const { JSDOM } 					= jsdom;
let PNG 									= require('node-png').PNG;
// FOR BASE64 IMAGE ENCODING FOR GOOGLE OCR
let fs 										= require('fs');
let path 									= require('path');
let mkdirp 								= require('mkdirp');
var webdriver 						= require('selenium-webdriver');


let parseBookText = (reqMaster, resMaster) => {

	// GET request, feed in the parameters to the URL, refine the search string!!
	request.get({
		url: 'https://www.googleapis.com/books/v1/volumes',
		qs: { 
			q: 'novels subject: cloud', //?q=flowers+inauthor:keyes 	//search term
			langRestrict: 'EN', //&langRestrict=EN 			//only uses english language books
			maxResults: 1, 	//&maxResults=40					//returns 40 results
			printType: 'books', 	//&printType=books 		//only returns books, no magazines
			//filter: 'full',	//&filter=partial 				//only returns books where at least part of the book is viewable online
			// projection: 'lite', //&projection=lite 	//only returns a little of what you need, not everything
			key: apiKey // &key={YOUR_API_KEY} 					//uses my APIKey to make the call
		}, 
		headers: {'content-type' : 'application/json'}	
	}, function(err, response, body) {
		if (err) console.log(err);

		//array of all the books returned from Google Books API
		let googleBook = JSON.parse(body);
		let bookUrl = googleBook.items[0].volumeInfo.previewLink;

		let driver = new webdriver.Builder()
											.forBrowser('chrome')
   										.build();

    driver.get(bookUrl);
    driver.getTitle().then(function(title) {
    	resMaster.send('page title is: ' + title);
    });

    driver.quit();

  //   driver.wait(until.titleIs('Google'), 5000);
  // var selectLinkOpeninNewTab = Keys.chord(Keys.CONTROL,"t");  
  // driver.findElement(By.css("body")).sendKeys(selectLinkOpeninNewTab);
  // driver.quit();

    //driver.findElement(By.cssSelector("body")).sendKeys(Keys.CONTROL +"t");

    // ArrayList<String> tabs = new ArrayList<String> (driver.getWindowHandles());
    //driver.switchTo().window(tabs.get(1)); //switches to new tab
    //driver.get("https://www.facebook.com");

    //driver.switchTo().window(tabs.get(0)); // switch back to main screen        
    // driver.get("https://www.news.google.com");



	});

	////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////// WEB SCRAPING IDEAS ///////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////

	// jsdom.jQueryify(window, "jquery-1.10.2.js", function (window, $) {
						//     try {
						//         $(window).scroll(function(){
						//             console.log("Scroll Happened.");
						//         });
						//         console.log("Triggering Scroll event...");  // 1
						//         $(window).trigger('scroll');
						//         console.log("Scroll event triggered.");     // 2
						//     }
						//     catch (ex) {
						//         console.log(ex);
						//     }
						// });

						//sets the page to be downloaded to page 10
						//let x = ["PA10"];	

						//sets the first page to start at to page 0
						//let i = 0;

						//scrolls down the page at a rate of 1000 milliseconds
				    //$('#viewport div:first-child').animate({scrollTop: i}, 1000);

				    //adds 2000 as the distance that the page scrolls down with each scroll
				    //i+=2000;

						/*for (let i = 0; i < bodyDOM.length; i++) {
							console.log(i);
							console.log(bodyDOM[i].textContent);
							console.log('												');
						}*/

						//appends a new link at the end of the body with an id of ‘xyzzy’
						//$("body").append($("<a id='xyz'/>"));
						////////ILLEGAL WITH JSDOM /////////////
						// let newLink = dom.window.document.createElement('a');
						//bodyDOM.append(newLink); 
						// console.log(bodyDOM.textContent);

				    //sets up a for loop where the index is less than the number of divs that are previewable so it won’t go over
				    //for (index = 0; index < $('div.pageImageDisplay img').length; ++index) {

				    //sets the page array?
				    //let page = /&pg=([A-Z]{2,3}\d+)&/.exec($('div.pageImageDisplay img')[index].src); 

				    //checks to see if the element in page is equal to page 10
					  //if it IS a match, then it returns -1 and runs all the code inside the IF statement which downloads the page
		    //     if ($.inArray(page[1], x) != -1) {
		    //         //console.log(x);
		    //         x.splice(x.indexOf(page[1]), 1);
		    //         var embiggen = $('div.pageImageDisplay img')[index].src.replace(/&w=\d+$/, "&w=1200");
		    //         $('#xyz').attr("download", page[1] + ".png");
		    //         $('#xyz').attr("href", embiggen);
		    //         $('#xyz')[0].click();
		    //     }
		    // }
		    // if (i < 30000) { setTimeout(nextPage, 1500, i); }

	////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////// ALL THIS TOTALLY WORKS! //////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////

	// Grab the file from the project
	// TODO: change this to a variable that can pick the file that was just created by the screenscraper
	/*let filePath = path.join(__dirname, '../public/images/DraculaDark.png');
	
	let imageFile = fs.readFileSync(filePath);

	// Covert the image data to a Buffer and base64 encode it.
	let encoded = new Buffer(imageFile).toString('base64');

	///////////////////////////////////////////////////////////////
	// Parse the book text from an image using Google Vision OCR //
	///////////////////////////////////////////////////////////////
	let options = { 
		method: 'POST',
	  url: 'https://vision.googleapis.com/v1/images:annotate',
	  qs: { 
	  	key: apiKey 
	  },
	  body: { 
	  	requests: [{ 
      	image: { 
      		content: encoded
      	},
          features: [{ 
          	type: 'DOCUMENT_TEXT_DETECTION' 
          }] 
       }] 
    },
	  json: true 
	};

	request(options, function (error, response, body) {
	  if (error) throw new Error(error);

	  let bookText = body.responses[0].fullTextAnnotation.text;
	  let bookTextNoLineBreaks = bookText.replace(/\n/g, ' ');

	  resMaster.send(bookTextNoLineBreaks);
	}); */
};

	  ///////////////////////////////////////////////////////////////////////
	  // Once it has the text from Google Vision OCR, 										 //
		// passes it in to perform the Natural Language Processing analysis  //
		///////////////////////////////////////////////////////////////////////

		/*
		// 2. DEFINE url and data for API requests
		let sentimentRequest = baseUrl + 'analyzeSentiment' + '?key=' + apiKey;
		let entitiesRequest = baseUrl + 'analyzeEntities' + '?key=' + apiKey;

		//3. post SENTIMENT request to Google API 
		request.post({
				headers: {'content-type' : 'application/json'},
				url: sentimentRequest, 
				json: {"document":{"type": "PLAIN_TEXT","language":"EN","content": bookTextNoLineBreaks },"encodingType":"UTF8"}
			}, function(err1, response1, body1) {
				if (err1) console.log(err1);

				console.log(body1);

				// 5. post ENTITY request to Google API 
				request.post({
						headers: {'content-type' : 'application/json'},
						url: entitiesRequest, 
						json: {"document":{"type": "PLAIN_TEXT","language":"EN","content": bookTextNoLineBreaks },"encodingType":"UTF8"}
					}, function(err2, response2, body2) {
						if (err2) console.log(err2);
						
						console.log(body2);
						resMaster.send(body2);
				});						
			});
			*/

let callBooksAPI = function (req, res) {
	// GET request, feed in the parameters to the URL, refine the search string!!
	request.get({
		url: 'https://www.googleapis.com/books/v1/volumes',
		qs: { 
			q: 'novels subject: ship', //?q=flowers+inauthor:keyes 	//search term
			langRestrict: 'EN', //&langRestrict=EN 			//only uses english language books
			maxResults: 40, 	//&maxResults=40					//returns 40 results
			printType: 'books', 	//&printType=books 		//only returns books, no magazines
			//filter: 'full',	//&filter=partial 				//only returns books where at least part of the book is viewable online
			// projection: 'lite', //&projection=lite 	//only returns a little of what you need, not everything
			key: apiKey // &key={YOUR_API_KEY} 					//uses my APIKey to make the call
		}, 
		headers: {'content-type' : 'application/json'}	
	}, function(err, response, body) {
		if (err) console.log(err);

		//array of all the books returned from Google Books API
		let parsedGoogleBooksList = JSON.parse(body);

		// save all 40 books to the database with a loop
		for (let i = 0; i < parsedGoogleBooksList.items.length; i++) {

			// define the Google book	
			let googleBook = parsedGoogleBooksList.items[i];

			// only save a book if it HAS a description 
			if (googleBook.volumeInfo.description && googleBook.volumeInfo.description.length) {
			// !== undefined 
			
				/*
					play around with these IF statements to filter incoming books!
  										accessInfo.webReaderLink: 'http://play.google.com/books/reader?id=Hv3QAQAAQBAJ&hl=&as_brr=3&as_pt=BOOKS&printsec=frontcover&source=gbs_api',
  				!SAMPLE 		accessInfo.accessViewStatus: 'SAMPLE',
  				TRUE 				accessInfo.quoteSharingAllowed: false

  				TESTED
  				!PARTIAL 		accessInfo.viewability: 'PARTIAL',
  				TRUE 				accessInfo.publicDomain: false //not enough books are coming back and also it's not necessary
				*/

				// console.log('NEW BOOK!');
				// console.log('authors: ' + googleBook.volumeInfo.authors);
				// console.log('thumbnails: ' + googleBook.volumeInfo.imageLinks.smallThumbnail);
				// console.log('thumbnails: ' + typeof(googleBook.volumeInfo.imageLinks.smallThumbnail));
				// console.log('					');
				console.log('NEW BOOK!');
				console.log(googleBook);
				// console.log('title: ' + googleBook.volumeInfo.title);
				// console.log('authors: ' + googleBook.volumeInfo.authors);
				// console.log('viewability: ' + googleBook.accessInfo.viewability);
				// console.log('public domain: ' + googleBook.accessInfo.publicDomain);
				// console.log('web reader link: ' + googleBook.accessInfo.webReaderLink);
				// console.log('access view status: ' + googleBook.accessInfo.accessViewStatus);
				// console.log('quote sharing allowed: ' + googleBook.accessInfo.quoteSharingAllowed);
				console.log('					');

				// define a new book model 
				let newBook = new Book();
				
				// define each of the book properties with info from the Google Books API 
				//title
				newBook.title = googleBook.volumeInfo.title;
				//author array
				newBook.authors = googleBook.volumeInfo.authors;
				//coverUrl
				newBook.coverUrl = googleBook.volumeInfo.imageLinks.smallThumbnail;
				//sampleText
				newBook.sampleText = googleBook.volumeInfo.description;

				// 2. DEFINE url and data for API requests
				let sentimentRequest = baseUrl + 'analyzeSentiment' + '?key=' + apiKey;
				let entitiesRequest = baseUrl + 'analyzeEntities' + '?key=' + apiKey;

				// 3. post SENTIMENT request to Google API 
				request.post({
						headers: {'content-type' : 'application/json'},
						url: sentimentRequest, 
						json: {"document":{"type": "PLAIN_TEXT","language":"EN","content": newBook.sampleText },"encodingType":"UTF8"}
					}, function(err, response, body) {
						if (err) console.log(err);
						
						// 4. declare SENTIMENT variables in newBook object
						newBook.sentimentMagnitude = body.documentSentiment.magnitude;
						newBook.sentimentScore = body.documentSentiment.score;
						newBook.sentiment = 'not sure';

						// 5. post ENTITY request to Google API 
						request.post({
								headers: {'content-type' : 'application/json'},
								url: entitiesRequest, 
								json: {"document":{"type": "PLAIN_TEXT","language":"EN","content": newBook.sampleText },"encodingType":"UTF8"}
							}, function(err, response, body) {
								if (err) console.log(err);
								
								// 6. declare ENTITY variable in newBook object, in order of SALIENCE values
								let entities = body.entities;
								let entitiesArray = [];

								for (let i = 0; i < entities.length; i++) {
									entitiesArray.push(entities[i].name);
								}

								newBook.entities = entitiesArray;

								// 7. SAVE newBook to db
								newBook.save(newBook, function(err, book) {
									if (err) console.log(err);
								});
						});						
 				});
			}
		}
		res.sendStatus(200);
	});
};

let screenshotBookText = function(req, res) {
	console.log('hit screenshotBookText function!');

	let viewer;
	let $ = function (x) { return [].slice.call(document.querySelectorAll(x)); };
	
	let makeImgDataGetter = function (canvas) {
	  return function (img) {
	    canvas.setAttribute('width', img.width);
	    canvas.setAttribute('height', img.height);
	    let context = canvas.getContext("2d");
	    context.drawImage(img, 0, 0);
	    return context.getImageData(0, 0, img.width, img.height);
	  };
	};
	let canvas = document.createElement("canvas");
	let getImageData = makeImgDataGetter(canvas);


	function getPageImage() {
	  let id = viewer.getPageId();
	  let num = viewer.getPageNumber();
	  let img = $('#viewerCanvas img').filter(function (el) {
	    return (new RegExp(id)).test(el.src);
	  })[0];
	  if (!img) return null;
	  let res = getImageData(img);
	  res.id = id;
	  res.num = num;
	  return res;
	}

	let prevId;
	function nextPage() {
	  let img = getPageImage();
	  if (img) {
	    let png = new PNG({ width: img.width, height: img.height});
	    let file = path.join(outdir, img.num+'-'+img.id+'.png');
	    png.data = img.data;
	    png.pack().pipe(fs.createWriteStream(file));
	  }
	  prevId = viewer.getPageId();
	  viewer.nextPage();
	  if (viewer.getPageId() === prevId)
	    alert('Done');
	  else
	    window.setTimeout(nextPage, 1000);
	    // window.setTimeout(nextPage, 700 + Math.floor(Math.random()*1000))
	}


	let args = require('nw.gui').App.argv;
	let bookid = args[0];
	if (!bookid) {
	  process.stderr.write('\nMissing <book-id> argument:\n');
	  process.stderr.write('Usage:\n\tnw . <book-id>\n# See Supported Identifiers at https://developers.google.com/books/docs/viewer/developers_guide\n');
	  process.exit(1);
	}

	let outdir = path.resolve(args[1] || '.');
	mkdirp.sync(outdir);

	google.load("books", "0");
	google.setOnLoadCallback(function initialize() {
	  viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
	  viewer.load(bookid);
	  setTimeout(nextPage, 3000);
	});
};




	//SO THE AJAX DOESN'T GET ANGRY
	// res.sendStatus(200);

	/////////////////////////////shit i've tried////////////////////////////////////////
	//sampleUrl = 'https://books.google.com/books?id=yWiMCwAAQBAJ&printsec=frontcover&dq=novels+subject:+ship&hl=&as_pt=BOOKS&cd=35&source=gbs_api#v=onepage&q&f=false';
	//'http://play.google.com/books/reader?id=lSMGAAAAQAAJ&hl=&as_brr=1&as_pt=BOOKS&printsec=frontcover&source=gbs_api';
	//WORKS!! 'http://xroads.virginia.edu/~hyper/poe/cask.html';
	//'https://play.google.com/books/reader?id=-4WVDgAAQBAJ&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api&pg=GBS.PA3';
	//'https://play.google.com/books/reader?id=kJeBjVJDsIgC&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api&pg=GBS.PA2';
	// actual webreaderlink: 'http://play.google.com/books/reader?id=kJeBjVJDsIgC&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api'; 
	// NOW IT'S: googleBook.volumeInfo.previewLink; NOT ANYMORE googleBook.accessInfo.webReaderLink;
	// TODO create a web scraper for Google Books preview page
	/*request.get({ 
			url: sampleUrl,
			headers: {
				"user-agent" : "Chrome/61.0.3163.100" //where did this come from? // 51.0.2704.103
			}
		}, function(err, response, body) {
				if (err) console.log(err);
				else {
					try {

						//define DOM variables to manipulate
						// const dom = new JSDOM(body);

						// var window = dom.parentWindow;

						// jsdom.jQueryify(window, "jquery-1.10.2.js", function (window, $) {
						//     try {
						//         $(window).scroll(function(){
						//             console.log("Scroll Happened.");
						//         });
						//         console.log("Triggering Scroll event...");  // 1
						//         $(window).trigger('scroll');
						//         console.log("Scroll event triggered.");     // 2
						//     }
						//     catch (ex) {
						//         console.log(ex);
						//     }
						// });

						//sets the page to be downloaded to page 10
						//let x = ["PA10"];	

						//sets the first page to start at to page 0
						//let i = 0;

						//scrolls down the page at a rate of 1000 milliseconds
				    //$('#viewport div:first-child').animate({scrollTop: i}, 1000);

				    //adds 2000 as the distance that the page scrolls down with each scroll
				    //i+=2000;

						/*for (let i = 0; i < bodyDOM.length; i++) {
							console.log(i);
							console.log(bodyDOM[i].textContent);
							console.log('												');
						}*/

						//appends a new link at the end of the body with an id of ‘xyzzy’
						//$("body").append($("<a id='xyz'/>"));
						////////ILLEGAL WITH JSDOM /////////////
						// let newLink = dom.window.document.createElement('a');
						//bodyDOM.append(newLink); 
						// console.log(bodyDOM.textContent);

				    //sets up a for loop where the index is less than the number of divs that are previewable so it won’t go over
				    //for (index = 0; index < $('div.pageImageDisplay img').length; ++index) {

				    //sets the page array?
				    //let page = /&pg=([A-Z]{2,3}\d+)&/.exec($('div.pageImageDisplay img')[index].src); 

				    //checks to see if the element in page is equal to page 10
					  //if it IS a match, then it returns -1 and runs all the code inside the IF statement which downloads the page
		    //     if ($.inArray(page[1], x) != -1) {
		    //         //console.log(x);
		    //         x.splice(x.indexOf(page[1]), 1);
		    //         var embiggen = $('div.pageImageDisplay img')[index].src.replace(/&w=\d+$/, "&w=1200");
		    //         $('#xyz').attr("download", page[1] + ".png");
		    //         $('#xyz').attr("href", embiggen);
		    //         $('#xyz')[0].click();
		    //     }
		    // }
		    // if (i < 30000) { setTimeout(nextPage, 1500, i); }

						

						//so the AJAX call doesn't get angry at you
						/*						
					}
					catch(e) {
						console.log('JSDOM error: ' + sampleUrl);
						res.sendStatus(e);
					}
				}
		});*/


/* GOOGLE BOOKS WEB SCRAPING
//initializes jquery
javascript:if(!window.jQuery||confirm('Overwrite\x20current\x20version?\x20v'+jQuery.fn.jquery))(function(d,s){s=d.createElement('script');s.src='https://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.js';(d.head||d.documentElement).appendChild(s)})(document);

//appends a new link at the end of the body with an id of ‘xyzzy’
$("body").append($("<a id='xyz'/>"));

//sets the page to be downloaded to page 10
var x = ["PA10"];


function nextPage(i) {
    //scrolls down the page at a rate of 200 milliseconds

    $('#viewport div:first-child').animate({scrollTop: i}, 1000);

    //adds 1020 as the distance that the page scrolls down with each scroll
    i+=2000;

    //sets up a for loop where the index is less than the number of divs that are previewable so it won’t go over
    for (index = 0; index < $('div.pageImageDisplay img').length; ++index) {

        //sets the page array?
        var page = /&pg=([A-Z]{2,3}\d+)&/.exec($('div.pageImageDisplay img')[index].src); 
	//console.log(page);

	//console.log(index);

        //checks to see if the element in page is equal to page 10
	 //if it IS a match, then it returns -1 and runs all the code inside the IF statement which downloads the page
        if ($.inArray(page[1], x) != -1) {
            //console.log(x);
            x.splice(x.indexOf(page[1]), 1);
            var embiggen = $('div.pageImageDisplay img')[index].src.replace(/&w=\d+$/, "&w=1200");
            $('#xyz').attr("download", page[1] + ".png");
            $('#xyz').attr("href", embiggen);
            $('#xyz')[0].click();
        }
    }
    if (i < 30000) { setTimeout(nextPage, 1500, i); }
}

*/

/* BAND CAMP WEB SCRAPING
						if (!error) {
							try {
								const dom = new JSDOM(body);
								var aTags = dom.window.document.getElementsByTagName("a");
								for (let i = 0; i < aTags.length; i++) {
									if (aTags[i].getAttribute("href") && aTags[i].getAttribute("href").indexOf("bandcamp") !== -1) {
										getbandcampEmbed(bandId, aTags[i].getAttribute("href"), event);
										return;
									}
									// else if (aTags[i].getAttribute("href") && aTags[i].getAttribute("href").indexOf("soundcloud") !== -1) {
									// 	getsoundcloudEmbed(bandId, aTags[i].getAttribute("href"), event);
									// 	return;
									// }
								}
								//no links were found, search google!
								//googleSearchBand(bandId, event, bandName);
							}
							catch (e) {
								console.log("JSDOM error " + options.url);
							}
						}
						*/ 


let booksGet = function(req, res) {
	  db.Book.find({}, function(err, books) {
			// callBooksAPI();
			res.render('index.ejs', {books: books});
		});
};

let booksRecommendation = function(req, res) {
	let originBook = req.body.bookId;

	//find the book based on the ID
	db.Book.find({_id: originBook}, function(err, originBook) {
		if (err) console.log(err);
		
		// algorithm for randomly finding 2 books from the db to serve up
		// TODO make this algorithm match books based on NLP entity and sentiment data
		db.Book.findRandom({}, {}, {limit: 2}, function(err, recommendedBooks) {
			if(err) console.log(err);

			// once the algorithm has grabbed the 2 recommended books, serve up the recommendation page
			res.render('recommendation.ejs', {
				originBook: originBook,
				recommendedBooks: recommendedBooks
			});
		});
	});	
};

let getNewBookForm = function(req, res) {
	res.render('addBookAdmin.ejs');
};

let addNewBook = function(req, res) {

	// 1. grab data from the form and APIs add it to the new Book object
	let newBook = new Book();
	newBook.title = req.body.title;
	newBook.authors = req.body.authors;
	newBook.coverUrl = req.body.coverUrl;
	newBook.sampleText = req.body.sampleText;

	// 2. DEFINE url and data for API requests
	let sampleText = req.body.sampleText;
	// let sentimentError, sentimentResponse, sentimentBody;
	let sentimentRequest = baseUrl + 'analyzeSentiment' + '?key=' + apiKey;
	// let entityError, entityResponse, entityBody;
	let entitiesRequest = baseUrl + 'analyzeEntities' + '?key=' + apiKey;

	// 3. post SENTIMENT request to Google API 
	request.post({
			headers: {'content-type' : 'application/json'},
			url: sentimentRequest, 
			json: {"document":{"type": "PLAIN_TEXT","language":"EN","content": sampleText },"encodingType":"UTF8"}
		}, function(err, response, body) {
			if (err) console.log(err);
			
			// 4. declare SENTIMENT variables in newBook object
			newBook.sentimentMagnitude = body.documentSentiment.magnitude;
			newBook.sentimentScore = body.documentSentiment.score;
			newBook.sentiment = 'not sure';

			// 5. post ENTITY request to Google API 
			request.post({
					headers: {'content-type' : 'application/json'},
					url: entitiesRequest, 
					json: {"document":{"type": "PLAIN_TEXT","language":"EN","content": sampleText },"encodingType":"UTF8"}
				}, function(err, response, body) {
					if (err) console.log(err);
					
					// 6. declare ENTITY variable in newBook object
					let entities = body.entities;
					let entitiesArray = [];

					for (let i = 0; i < entities.length; i++) {
						entitiesArray.push(entities[i].name);
					}

					newBook.entities = entitiesArray;

					// 7. SAVE to entities array in db IN ORDER OF SALIENCE values
					newBook.save(newBook, function(err, book) {
						if (err) return(err);

						// 8. serve up saved book ejs
						res.render('savedBookAdmin.ejs', {newBook: newBook});
					});
			});
		});
};

let getEditBookForm = function(req, res) {
	console.log('hitting the EDIT FORM function!');
	
	//figure out where the book id is in the request
	let bookId = req.params.id;

	//remove the book from the books collection
	db.Book.find({_id: bookId}, function(err, book) {
		if (err) return(err);

		//return administrator to the edit the book form
		res.render('./editBookAdmin.ejs', {
			book: book
		});
	});
};

let editNewBook = function(req, res) {
	console.log('hitting the EDITNEWBOOK function!');
	
	//figure out where the book id is in the request
	let bookId = req.params.id;

	//look up the record to edit
	db.Book.findOne({_id: bookId}, function(err, book) {
		if (err) return(err);

		//if the title is NOT the same, update it
		if (book.title !== req.body.title) {
			console.log('titles are NOT the same!');
			book.title = req.body.title;
		}

		//if the authors are NOT the same, update it
		if (book.authors !== req.body.authors) {
			console.log('authors are NOT the same!');
			book.authors = req.body.authors;
		}

		//if the coverUrl is NOT the same, update it
		if (book.coverUrl !== req.body.coverUrl) {
			console.log('coverUrls are NOT the same!');
			book.coverUrl = req.body.coverUrl;
		}
		
		//if the sampleText is NOT the same, update it
		if (book.sampleText !== req.body.sampleText) {
			console.log('sampleTexts are NOT the same!');
			book.sampleText = req.body.sampleText;
		}

		//save the data
		book.save(book, function(err) {
			if (err) return(err);

			//serve up the savedbook page
			return res.render('savedBookAdmin.ejs', {newBook: book});			
		});
	});
};

let getSavedBookForm = function(req, res) {
	console.log('hitting the GET SAVEDBOOKFORM');
};

let deleteNewBook = function(req, res) {

	//figure out where the book id is in the request
	let bookId = req.params.id;

	//remove the book from the books collection
	db.Book.remove({_id: bookId}, function(err, book) {
		if (err) return(err);

		//return administrator to the add a new book page
		return res.redirect(303, '/new');
	});

};

let getBookshelf = function(req, res) {

	// Find the user's bookshelf
	let userId = req.user._id;
	db.User.find({_id: userId}, function(err, user) {
		if (err) return (err);
		let bookshelfIds = user[0].bookshelf;

		// look up all the books' info based on book id in the book collection
		db.Book.find({_id: {$in: bookshelfIds}}, function(err, bookshelf) {
			if (err) console.log(err);

			// once the user bookshelf is full of details like cover URL, serve up the bookshelf page
			res.render('./myBookshelf.ejs', {
				bookshelf: bookshelf,
				user: user
			});
		});	
	});
};

let addBookToBookshelf = function(req, res) {

	// Find the user's bookshelf
	let userId = req.user._id;

	db.User.find({_id: userId}, function(err, user) {
		if (err) return (err);
		
		// TODO: first check to make sure it isn't already in the array
		// TODO: don't add a new book if its value is null

		// grab the new book ID from the form, and push it into the user's bookshelf array!
		user[0].bookshelf.push(req.body.bookId);

		let bookshelfIds = user[0].bookshelf;

		// save updated array to the db
		user[0].save(function(err, newBookshelf) {
			if (err) return (err);
			
			// look up all the books' info based on book id in the book collection
			db.Book.find({_id: {$in: bookshelfIds}}, function(err, bookshelf) {
			if (err) console.log(err);

				// once the user bookshelf is full of details like cover URL, serve up the bookshelf page
				//res.redirect(303, '/bookshelf');
				// once the user bookshelf is full of details like cover URL, serve up the bookshelf page
				res.render('./myBookshelf.ejs', {
					bookshelf: bookshelf,
					user: user
				});
			});
		});	
	});
};		

let removeBookFromBookshelf = function(req, res) {

	//figure out where the data id is in the request
	let removeBook = req.params.id;

	// Find the user's bookshelf
	let userId = req.user._id;
	db.User.find({_id: userId}, function(err, user) {
		if (err) return(err);

		let bookshelfIds = user[0].bookshelf;

		//find the book in the user's bookshelf array and remove it
		for (let i = 0; i < bookshelfIds.length; i++) {
			if (bookshelfIds[i] === removeBook) {
				bookshelfIds.splice(i, 1);
			}
		}

		// save updated array to the db
		user[0].save(function(err, user) {
			if (err) return(err);

			let newBookShelfIds = user.bookshelf;

			// look up all the books' info based on book id in the book collection
			db.Book.find({_id: {$in: newBookShelfIds}}, function(err, bookshelf) {
				if (err) console.log(err);

				// once the user bookshelf is full of details like cover URL, serve up the bookshelf page
				res.redirect(303, '/bookshelf');
			});
		});
	});
};

let entityAPI = function(text) {
	
	// 1. DEFINE url and data for API request
	let entityError, entityResponse, entityBody;
	let entitiesRequest = baseUrl + 'analyzeEntities' + '?key=' + apiKey;

	// 2. POST request to Google API 
	request.post({
			headers: {'content-type' : 'application/json'},
			url: entitiesRequest, 
			json: {"document":{"type": "PLAIN_TEXT","language":"EN","content": text },"encodingType":"UTF8"}
		}, function(err, response, body) {
		entityError = err;
		entityResponse = response;
		entityBody = body.entities;

		// 3. RETURN what was received from entity API
		//if (entityBody) {
			// console.log(entityBody);
		return entityBody;
		//}
	});
};

let sentimentAPI = function(req, res) {
	
	// 1. define url and data for API request
	let sentimentError, sentimentResponse, sentimentBody;
	let sentimentRequest = baseUrl + 'analyzeSentiment' + '?key=' + apiKey;
	// TODO: change the sample text to whichever text is submitted through the input form 
	let sampleText = "It is a little remarkable, that — though disinclined to talk overmuch of myself and my affairs at the fireside, and to my personal friends — an autobiographical impulse should twice in my life have taken possession of me, in addressing the public. The first time was three or four years since, when I favored the reader — inexcusably, and for no earthly reason, that either the indulgent reader or the intrusive author could imagine — with a description of my way of life in the deep quietude of an Old Manse. And now — because, beyond my deserts, I was happy enough to find a listener or two on the former occasion—I again seize the public by the button, and talk of my three years’ experience in a Custom-House. The example of the famous “P. P., Clerk of this Parish,” was never more faithfully followed.";

	// 2. post request to Google API 
	request.post({
			headers: {'content-type' : 'application/json'},
			url: sentimentRequest, 
			json: {"document":{"type": "PLAIN_TEXT","language":"EN","content": sampleText },"encodingType":"UTF8"}
		}, function(err, response, body) {
		sentimentError = err;
		sentimentResponse = response;
		sentimentBody = body.documentSentiment;

		console.log(sentimentBody);
		// 3. show what was received from entity API back to the page
		// TODO: need to change to save to db
		res.render('sentimentTest.ejs', {sentimentBody: sentimentBody});
	});
};

module.exports.callBooksAPI = callBooksAPI;
module.exports.parseBookText = parseBookText;
module.exports.booksGet = booksGet;
module.exports.entityAPI = entityAPI;
module.exports.sentimentAPI = sentimentAPI;
module.exports.booksRecommendation = booksRecommendation;
module.exports.getNewBookForm = getNewBookForm;
module.exports.addNewBook = addNewBook;
module.exports.getBookshelf = getBookshelf;
module.exports.getEditBookForm = getEditBookForm;
module.exports.editNewBook = editNewBook;
module.exports.getSavedBookForm = getSavedBookForm;
module.exports.deleteNewBook = deleteNewBook;
module.exports.addBookToBookshelf = addBookToBookshelf;
module.exports.removeBookFromBookshelf = removeBookFromBookshelf;