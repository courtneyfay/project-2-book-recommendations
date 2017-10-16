const expect = require('chai').expect;
const request = require('request');

let baseUrl = 'https://language.googleapis.com/v1beta2/documents:';	
const setKey = require('../public/scripts/env.js');
let apiKey = setKey();

describe('Google NLP analyzeEntities API', function() {
	let apiError, apiResponse, apiBody;
	let entitiesRequest = baseUrl + 'analyzeEntities' + '?key=' + apiKey;
	
	before(function(done) {
		//let testData = {"document":{"type": "PLAIN_TEXT","language":"EN","content":"Lawrence of Arabia is a highly rated film biography about British Lieutenant T. E. Lawrence. Peter OToole plays Lawrence in the film."},"encodingType":"UTF8"};
		//let jsonTestData = JSON.stringify(testData);
		request.post({
			headers: {'content-type' : 'application/json'},
			url: entitiesRequest, 
			json: {"document":{"type": "PLAIN_TEXT","language":"EN","content":"Lawrence of Arabia is a highly rated film biography about British Lieutenant T. E. Lawrence. Peter OToole plays Lawrence in the film."},"encodingType":"UTF8"}
		}, function(err, res, body) {
			apiError = err;
			apiResponse = res;
			apiBody = body;
			console.log(body);
			done();
		});
	});	
	
	it('receives a 200 / OK HTTP status code', function(apiResponse) {
		// console.log(apiResponse.IncomingMessage);
		// console.log(apiResponse);
		expect(apiResponse).to.equal(200);
		//statusCode
	});
	it('returns entities (array or object?)');
		//apiBody
		// if (typeof(apiBody) == 'string') {
	it('returns entity names');
		//apiBody
	it('returns salience values for entities between 0 and 1');
		//apiBody
	it('returns type of entity');
		//apiBody
	it('returns sentiment values between -1.0 and 1.0');
		//apiBody 
});

//before 
	//analyzeEntities URL
	//request to analyzeEntities URL
	//require API key from somewhere else
	//send dummy POST data
	/* EXAMPLE: {"document":{"type":"PLAIN_TEXT","language":"EN","content":"'Lawrence of Arabia' is a highly rated film biography about British Lieutenant T. E. Lawrence. Peter O'Toole plays Lawrence in the film."},"encodingType":"UTF8"}
		*/
	//save error, response and body to new variables

describe('Google NLP analyzeSentiment API', function() {
	it('receives a 200 / OK HTTP status code');
	it('returns document sentiment magnitude that is 0 or greater');
	it('returns document sentiment score that is between -1.0 and 1.0');
	it('returns sentences (array or object?)');
	it('returns sentence sentiment magnitude that is 0 or greater');
	it('returns sentence sentiment score that is between -1.0 and 1.0');
	it('returns sentence text');
});
 