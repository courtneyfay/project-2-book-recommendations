const expect = require('chai').expect;
const request = require('request');

let baseUrl = 'https://language.googleapis.com/v1beta2/documents:';	
const setKey = require('../public/scripts/env.js');
let apiKey = setKey();

describe('Google NLP analyzeEntities API', function() {
	let apiError, apiResponse, apiBody;
	let entitiesRequest = baseUrl + 'analyzeEntities' + '?key=' + apiKey;
	before(function(done) {
		request.post({
			headers: {'content-type' : 'application/json'},
			url: entitiesRequest, 
			json: {"document":{"type": "PLAIN_TEXT","language":"EN","content":"Lawrence of Arabia is a highly rated film biography about British Lieutenant T. E. Lawrence. Peter OToole plays Lawrence in the film."},"encodingType":"UTF8"}
		}, function(err, res, body) {
				apiError = err;
				apiResponse = res;
				apiBody = body;
				done();
			});
	});	

	it('receives a 200 / OK HTTP status code', function() {
		expect(apiResponse.statusCode).to.equal(200);
	});
	it('returns entities as an array', function() {
		expect(apiBody.entities).to.be.an('array');
	});
	it('returns entity name', function() {
		expect(apiBody.entities[0].name).to.equal('T.E. Lawrence'); 
	});
	it('returns salience value for entity between 0 and 1', function() {
		expect(apiBody.entities[0].salience).to.equal(0.39270478);
		expect(apiBody.entities[0].salience).to.be.above(-1);
		expect(apiBody.entities[0].salience).to.be.below(1);
	});
	it('returns type of entity', function() {
		expect(apiBody.entities[0].type).to.equal('PERSON');
	});
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

//expect({a: 1}).to.be.an('object');
	//expect(apiBody.sentence).to.not.be.empty;
	// if (typeof(apiBody) == 'string') {
 