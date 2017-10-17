console.log('seed.js, checking in!');

let db = require('./models');

let booksList = [
	{
		title: "The Scarlet Letter",
	  author: "Nathaniel Hawthorne",
	  coverUrl: "http://prodimage.images-bn.com/pimages/9781593082079_p0_v4_s192x300.jpg",
	  sampleText: "A throng of bearded men, in sad-colored garments and gray, steeple-crowned hats, intermixed with women, some wearing hoods, and others bareheaded, was assembled in front of a wooden edifice, the door of which was heavily timbered with oak, and studded with iron spikes." +
		"The founders of a new colony, whatever Utopia of human virtue and happiness they might originally project, have invariably recognized it among their earliest practical necessities to allot a portion of the virgin soil as a cemetery, and another portion as the site of a prison. In accordance with this rule, it may safely be assumed that the forefathers of Boston had built the first prison-house, somewhere in the vicinity of Cornhill, almost as seasonably as they marked out the first burial-ground, on Isaac Johnson's lot, and round about his grave, which subsequently became the nucleus of all the congregated sepulchres in the old church-yard of King's Chapel. Certain it is, that, some fifteen or twenty years after the settlement of the town, the wooden jail was already marked with weather-stains and other indications of age, which gave a yet darker aspect to its beetle-browed and gloomy front. The rust on the ponderous iron-work of its oaken door looked more antique than any thing else in the new world. Like all that pertains to crime, it seemed never to have known a youthful era. Before this ugly edifice, and between it and the wheel-track of the street, was a grass-plot, much overgrown with burdock, pig-weed, apple-peru, and such unsightly vegetation, which evidently found something congenial in the soil that had so early borne the black flower of civilized society, a prison. But, on one side of the portal, and rooted almost at the threshold, was a wild rose-bush, covered, in this month of June, with its delicate gems, which might be imagined to offer their fragrance and fragile beauty to the prisoner as he went in, and to the condemned criminal as he came forth to his doom, in token that the deep heart of Nature could pity and be kind to him." +
		"This rose-bush, by a strange chance, has been kept alive in history; but whether it had merely survived out of the stern old wilderness, so long after the fall of the gigantic pines and oaks that originally overshadowed it,--or whether, as there is fair authority for believing, it had sprung up under the footsteps of the sainted Ann Hutchinson, as she entered the prison-door,--we shall not take upon us to determine. Finding it so directly on the threshold of our narrative, which is now about to issue from that inauspicious portal, we could hardly do otherwise than pluck one of its flowers and present it to the reader. It may serve, let us hope, to symbolize some sweet moral blossom, that may be found along the track, or relieve the darkening close of a tale of human frailty and sorrow.",
	  entities: [ "", "", "" ],
	  sentimentMagnitude: 0,
	  sentimentScore: 0,
	  sentimentCalculate: 0
	},
	{
		title: "",
	  author: "",
	  coverUrl: "",
	  sampleText: "",
	  entities: [ "", "", "" ],
	  sentimentMagnitude: 0,
	  sentimentScore: 0,
	  sentimentCalculate: 0
	},
	{
		title: "",
	  author: "",
	  coverUrl: "",
	  sampleText: "",
	  entities: [ "", "", "" ],
	  sentimentMagnitude: 0,
	  sentimentScore: 0,
	  sentimentCalculate: 0
	},
	{
		title: "",
	  author: "",
	  coverUrl: "",
	  sampleText: "",
	  entities: [ "", "", "" ],
	  sentimentMagnitude: 0,
	  sentimentScore: 0,
	  sentimentCalculate: 0
	},
	{
		title: "",
	  author: "",
	  coverUrl: "",
	  sampleText: "",
	  entities: [ "", "", "" ],
	  sentimentMagnitude: 0,
	  sentimentScore: 0,
	  sentimentCalculate: 0
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