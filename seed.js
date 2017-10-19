console.log('seed.js, checking in!');

const db = require('./models');

let booksList = [
	{
		title: "The Scarlet Letter",
	  author: "Nathaniel Hawthorne",
	  coverUrl: "http://prodimage.images-bn.com/pimages/9781593082079_p0_v4_s192x300.jpg",
	  sampleText: "A throng of bearded men, in sad-colored garments and gray, steeple-crowned hats, intermixed with women, some wearing hoods, and others bareheaded, was assembled in front of a wooden edifice, the door of which was heavily timbered with oak, and studded with iron spikes." +
		"The founders of a new colony, whatever Utopia of human virtue and happiness they might originally project, have invariably recognized it among their earliest practical necessities to allot a portion of the virgin soil as a cemetery, and another portion as the site of a prison. In accordance with this rule, it may safely be assumed that the forefathers of Boston had built the first prison-house, somewhere in the vicinity of Cornhill, almost as seasonably as they marked out the first burial-ground, on Isaac Johnson's lot, and round about his grave, which subsequently became the nucleus of all the congregated sepulchres in the old church-yard of King's Chapel. Certain it is, that, some fifteen or twenty years after the settlement of the town, the wooden jail was already marked with weather-stains and other indications of age, which gave a yet darker aspect to its beetle-browed and gloomy front. The rust on the ponderous iron-work of its oaken door looked more antique than any thing else in the new world. Like all that pertains to crime, it seemed never to have known a youthful era. Before this ugly edifice, and between it and the wheel-track of the street, was a grass-plot, much overgrown with burdock, pig-weed, apple-peru, and such unsightly vegetation, which evidently found something congenial in the soil that had so early borne the black flower of civilized society, a prison. But, on one side of the portal, and rooted almost at the threshold, was a wild rose-bush, covered, in this month of June, with its delicate gems, which might be imagined to offer their fragrance and fragile beauty to the prisoner as he went in, and to the condemned criminal as he came forth to his doom, in token that the deep heart of Nature could pity and be kind to him." +
		"This rose-bush, by a strange chance, has been kept alive in history; but whether it had merely survived out of the stern old wilderness, so long after the fall of the gigantic pines and oaks that originally overshadowed it,--or whether, as there is fair authority for believing, it had sprung up under the footsteps of the sainted Ann Hutchinson, as she entered the prison-door,--we shall not take upon us to determine. Finding it so directly on the threshold of our narrative, which is now about to issue from that inauspicious portal, we could hardly do otherwise than pluck one of its flowers and present it to the reader. It may serve, let us hope, to symbolize some sweet moral blossom, that may be found along the track, or relieve the darkening close of a tale of human frailty and sorrow.",
	  entities: [ "founders", "door", "edifice", "hats", "garments" ],
	  sentimentMagnitude: 5.3,
	  sentimentScore: -0.1,
	  sentiment: "mixed",
	  createdBy: "seed.js"
	},
	{
		title: "The Picture of Dorian Gray",
	  author: "Oscar Wilde",
	  coverUrl: "https://images-na.ssl-images-amazon.com/images/I/41DvyInpLaL._SX316_BO1,204,203,200_.jpg",
	  sampleText: "The studio was filled with the rich odour of roses, and when the light summer wind stirred amidst the trees of the garden, there came through the open door the heavy scent of the lilac, or the more delicate perfume of the pink-flowering thorn." +
		"From the corner of the divan of Persian saddle-bags on which he was lying, smoking, as was his custom, innumerable cigarettes, Lord Henry Wotton could just catch the gleam of the honey-sweet and honey-coloured blossoms of a laburnum, whose tremulous branches seemed hardly able to bear the burden of a beauty so flamelike as theirs; and now and then the fantastic shadows of birds in flight flitted across the long tussore-silk curtains that were stretched in front of the huge window, producing a kind of momentary Japanese effect, and making him think of those pallid, jade-faced painters of Tokyo who, through the medium of an art that is necessarily immobile, seek to convey the sense of swiftness and motion. The sullen murmur of the bees shouldering their way through the long unmown grass, or circling with monotonous insistence round the dusty gilt horns of the straggling woodbine, seemed to make the stillness more oppressive. The dim roar of London was like the bourdon note of a distant organ." +
		"In the centre of the room, clamped to an upright easel, stood the full-length portrait of a young man of extraordinary personal beauty, and in front of it, some little distance away, was sitting the artist himself, Basil Hallward, whose sudden disappearance some years ago caused, at the time, such public excitement and gave rise to so many strange conjectures." +
		"As the painter looked at the gracious and comely form he had so skilfully mirrored in his art, a smile of pleasure passed across his face, and seemed about to linger there. But he suddenly started up, and closing his eyes, placed his fingers upon the lids, as though he sought to imprison within his brain some curious dream from which he feared he might awake." +
		"“It is your best work, Basil, the best thing you have ever done,” said Lord Henry languidly. “You must certainly send it next year to the Grosvenor. The Academy is too large and too vulgar. Whenever I have gone there, there have been either so many people that I have not been able to see the pictures, which was dreadful, or so many pictures that I have not been able to see the people, which was worse. The Grosvenor is really the only place.”",
	  entities: [ "Henry Wotton", "painter", "saddle-bags", "summer wind", "odour" ],
	  sentimentMagnitude: 6.4,
	  sentimentScore: 0,
	  sentiment: "mixed",
	  createdBy: "seed.js"
	},
	{
		title: "Middlemarch",
	  author: "George Eliot",
	  coverUrl: "https://images-na.ssl-images-amazon.com/images/I/51si2zLhkhL._SX311_BO1,204,203,200_.jpg",
	  sampleText: "Since I can do no good because a woman, Reach constantly at something that is near it. —The Maid’s Tragedy: Beaumont and Fletcher" +
		"Miss Brooke had that kind of beauty which seems to be thrown into relief by poor dress. Her hand and wrist were so finely formed that she could wear sleeves not less bare of style than those in which the Blessed Virgin appeared to Italian painters; and her profile as well as her stature and bearing seemed to gain the more dignity from her plain garments, which by the side of provincial fashion gave her the impressiveness of a fine quotation from the Bible, — or from one of our elder poets, — in a paragraph of today’s newspaper. She was usually spoken of as being remarkably clever, but with the addition that her sister Celia had more common-sense. Nevertheless, Celia wore scarcely more trimmings; and it was only to close observers that her dress differed from her sister’s, and had a shade of coquetry in its arrangements; for Miss Brooke’s plain dressing was due to mixed conditions, in most of which her sister shared. The pride of being ladies had something to do with it: the Brooke connections, though not exactly aristocratic, were unquestionably ‘good’: if you inquired backward for a generation or two, you would not find any yard-measuring or parcel-tying forefathers — anything lower than an admiral or a clergyman; and there was even an ancestor discernible as a Puritan gentleman who served under Cromwell, but afterwards conformed, and managed to come out of all political troubles as the proprietor of a respectable family estate. " +
		"Young women of such birth, living in a quiet country-house, and attending a village church hardly larger than a parlor, naturally regarded frippery as the ambition of a huckster’s daughter. Then there was well-bred economy, which in those days made show in dress the first item to be deducted from, when any margin was required for expenses more distinctive of rank.",
	  entities: [ "Brooke", "something", "kind", "good", "hand" ],
	  sentimentMagnitude: 3.8,
	  sentimentScore: 0,
	  sentiment: "mixed",
	  createdBy: "seed.js"
	},
	{
		title: "Alice's Adventures in Wonderland",
	  author: "Lewis Carroll",
	  coverUrl: "https://images-na.ssl-images-amazon.com/images/I/91uMrXq%2B4RL._AC_UL320_SR230,320_.jpg",
	  sampleText: "Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, “and what is the use of a book,” thought Alice, “without pictures or conversations?”"  +
		"So she was considering, in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her." +
		"There was nothing so very remarkable in that; nor did Alice think it so very much out of the way to hear the Rabbit say to itself “Oh dear! Oh dear! I shall be too late!” (when she thought it over afterwards, it occurred to her that she ought to have wondered at this, but at the time it all seemed quite natural); but, when the Rabbit actually took a watch out its waistcoat-pocket, and looked at it, and then hurried on, Alice started to her feet, for it flashed across her mind that she had never before seen a rabbit with either a waistcoat-pocket, or a watch to take out of it, and, burning with curiosity, she ran across the field after it, and was just in time to see it pop down a large rabbit-hole under the hedge.",
	  entities: [ "Alice", "book", "White Rabbit", "use", "sister" ],
	  sentimentMagnitude: 1.7,
	  sentimentScore: -0.2,
	  sentiment: "mixed",
	  createdBy: "seed.js"
	},
	{
		title: "The Cask of Amontillado",
	  author: "Edgar Allan Poe",
	  coverUrl: "https://images-na.ssl-images-amazon.com/images/I/41dLguPFN0L._SX331_BO1,204,203,200_.jpg",
	  sampleText: "THE thousand injuries of Fortunato I had borne as I best could, but when he ventured upon insult I vowed revenge. You, who so well know the nature of my soul, will not suppose, however, that gave utterance to a threat. At length I would be avenged; this was a point definitely, settled --but the very definitiveness with which it was resolved precluded the idea of risk. I must not only punish but punish with impunity. A wrong is unredressed when retribution overtakes its redresser. It is equally unredressed when the avenger fails to make himself felt as such to him who has done the wrong." +
		"It must be understood that neither by word nor deed had I given Fortunato cause to doubt my good will. I continued, as was my in to smile in his face, and he did not perceive that my to smile now was at the thought of his immolation." +
		"He had a weak point --this Fortunato --although in other regards he was a man to be respected and even feared. He prided himself on his connoisseurship in wine. Few Italians have the true virtuoso spirit. For the most part their enthusiasm is adopted to suit the time and opportunity, to practise imposture upon the British and Austrian millionaires. In painting and gemmary, Fortunato, like his countrymen, was a quack, but in the matter of old wines he was sincere. In this respect I did not differ from him materially; --I was skilful in the Italian vintages myself, and bought largely whenever I could." +
		"It was about dusk, one evening during the supreme madness of the carnival season, that I encountered my friend. He accosted me with excessive warmth, for he had been drinking much. The man wore motley. He had on a tight-fitting parti-striped dress, and his head was surmounted by the conical cap and bells. I was so pleased to see him that I thought I should never have done wringing his hand.",
	  entities: [ "Fortunato", "length", "insult", "revenge", "injuries" ],
	  sentimentMagnitude: 6.2,
	  sentimentScore: 0,
	  sentiment: "mixed",
	  createdBy: "seed.js"
	}
];

// UPDATE USER TO INCLUDE BOOKSHELF ENTRIES FOR DB TESTING
/*db.User.findById("59e8c8afcbe139b11cb3f65a", (err, user) => {
	if (err) {
		res.send(err);
	}
	if (user) {
		//user.admin = true;
		//user.bookshelf.push("59e8c94c307f16b1581e74df", "59e8c94c307f16b1581e74de", "59e8c94c307f16b1581e74e1");
		//user.save();
		console.log(user);
	} else {
		console.log('else');
	}
});*/

// REMOVE SPECIFIC BOOKS FROM THE DB AFTER TESTING
/*db.Book.remove({_id: "59e91fa972902ac3ffe20e55"}, (err, book) => {
	if (err) {
		console.log(err);
	} else {
    console.log('successfully removed book');
  }
});*/
