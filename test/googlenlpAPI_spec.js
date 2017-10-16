const expect = require('chai').expect;
const request = require('request');

let baseUrl = 'https://language.googleapis.com/v1beta2/documents:';	
const setKey = require('../public/scripts/env.js');
let apiKey = setKey();

// TESTS THE ANALYZE ENTITIES API CALL
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

// TESTS THE ANALYZE SENTIMENTS API CALL
describe('Google NLP analyzeSentiment API', function() {
	let apiError, apiResponse, apiBody;
	let sentimentRequest = baseUrl + 'analyzeSentiment' + '?key=' + apiKey;
	before(function(done) {
		request.post({
			headers: {'content-type' : 'application/json'},
			url: sentimentRequest, 
			json: {"document":{"type":"PLAIN_TEXT","language":"EN","content":"It is a little remarkable, that — though disinclined to talk overmuch of myself and my affairs at the fireside, and to my personal friends — an autobiographical impulse should twice in my life have taken possession of me, in addressing the public. The first time was three or four years since, when I favored the reader — inexcusably, and for no earthly reason, that either the indulgent reader or the intrusive author could imagine — with a description of my way of life in the deep quietude of an Old Manse. And now — because, beyond my deserts, I was happy enough to find a listener or two on the former occasion—I again seize the public by the button, and talk of my three years’ experience in a Custom-House. The example of the famous “P. P., Clerk of this Parish,” was never more faithfully followed."},"encodingType":"UTF8"}
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
	it('returns sentiment as an object', function() {
		expect(apiBody.documentSentiment).to.be.an('object');
	});
	it('returns document sentiment magnitude that is 0 or greater', function() {
		console.log(apiBody.documentSentiment.magnitude); //.magnitude); //.to.equal(2.3);
	});
	it('returns document sentiment score that is between -1.0 and 1.0');
	it('returns sentences (array or object?)');
	it('returns sentence sentiment magnitude that is 0 or greater');
	it('returns sentence sentiment score that is between -1.0 and 1.0');
	it('returns sentence text');
});

//expect({a: 1}).to.be.an('object');
	//expect(apiBody.sentence).to.not.be.empty;
	// if (typeof(apiBody) == 'string') {
 