// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS
// require express and other modules
var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
_ = require('underscore');

// server js and css files from public folder
app.use(express.static(__dirname + '/public'));

// configure bodyParser for handling data
app.use(bodyParser.urlencoded({extended: true}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pieku');

var db = require('./models/models');


// PIEKU ROUTES
// root route (serves index.html)
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/views/index.html');
});

// get all piekus
app.get('/api/piekus', function (req, res) {
	// find all piekus in db
	db.Pieku.find({}).populate('author').exec(function (err, piekus) {
		res.json(piekus);
	});
});

// update pieku
app.put('/api/piekus/:id', function (req, res) {
	// set the value of the id
	var targetId = req.params.id;

	// find pieku in db by id
	db.Pieku.findOne({_id: targetId}, function (err, foundPieku) {
		// update the pieku post
		foundPieku.title = req.body.title;
		foundPieku.author = req.body.author;
		foundPieku.line1 = req.body.line1;
		foundPieku.line2 = req.body.line2;
		foundPieku.line3 = req.body.line3;

		// save updated pieku in db
		foundPieku.save(function (err, savedPieku) {
			res.json(savedPieku)
		});
	});
});

// delete pieku
app.delete('/api/piekus/:id', function (req, res) {
	// set the value of the id
	var targetId = req.params.id;

	// find pieku in db by id and remove
	db.Pieku.findOneAndRemove({_id: targetId}, function (err, deletedPieku) {
		res.json(deletedPieku);
	});
});

// create new pieku
app.post('/api/piekus', function (req, res) {
	// create an author record
	var newAuthor = new db.Author ({
		name: req.body.author
	});

	// save new author record
	newAuthor.save(function (err, savedAuthor) {

		// create new pieku with form data
		var newPieku = new db.Pieku ({
			title: req.body.title,
			author: savedAuthor,
			line1: req.body.line1,
			line2: req.body.line2,
			line3: req.body.line3,
			date: dateString,
		});

		// save new pieku in db
		newPieku.save(function(err, savedPieku) {
			res.json(savedPieku);
		});
	});
});

// get one pieku
app.get('/api/piekus/:id', function (req, res) {
	// set the value of the id
	var targetId = req.params.id;

	// find phrase in db by id
	db.Pieku.findOne({_id: targetId}, function (err, foundPieku) {
		res.json(foundPieku);
	});
});

// defines date for piekus
var dateString = (new Date()).toLocaleDateString("en-US");


// AUTHOR ROUTES
// get all authors
app.get('/api/authors', function (req, res) {
	// query db to find authors and send authors as json response
	db.Author.find({}).exec(function (err, author) {
		res.json(author)
	});
});

// create a new author
app.post('/api/authors', function (req, res) {
		// create an author record
	var newAuthor = new db.Author ({
		name: req.body.name
	});

	// save new author record
	newAuthor.save(function (err, author) {
		// send as json response
		res.json(newAuthor);
	});
});

// specific author to specific post
app.put('/api/piekus/:id/authors/:authorid', function (req, res) {
	var authorId = req.params.authorid;
	db.Author.findOne({_id: authorId});
	var piekuId = req.params.id;
	db.Pieku.findOne({_id: piekuId}, function (err, pieku) {
		pieku.author = authorId;

		// save the updated post
		pieku.save(function (err, pieku) {
			res.json(pieku);
		});
	});
});


// COMMENT ROUTES
// create a new comment on pieku
app.post('/api/piekus/:id/comments', function (req, res) {
	// get the id of pieku
	var postId = req.params.id;
	// finds post based off of id
	db.Pieku.findOne({_id: postId}).exec(function (err, pieku){
		// create an author record
		var newAuthor = new db.Author ({
			name: req.body.author
		});

		// save new author record
		newAuthor.save(function (err, savedAuthor) {

			// create new comment record
			var newComment = new db.Comment({
				author: savedAuthor,
				text: req.body.text 
			});

			// save new pieku in db
			newComment.save(function(err, savedComment) {
				// Push new comment into comments and save
				pieku.comments.push(savedComment);
				pieku.save();

				res.json(savedComment);
			});	
		});
	});
	
});



// get comments on one pieku
app.get('/api/piekus/:id/comments', function (req, res) {
	// get the id of the pieku
	var postId = req.params.id;

	// find pieku by id
	db.Pieku.findOne({_id: postId}).deepPopulate('comments.author').exec(function (err, pieku) {
		res.json(pieku.comments);
	});
});



app.listen(3000, function() {
	console.log('Server started on localhost:3000');
});


// OLD CODE


// // pre-seeded phrase data
// var piekus = [
// 	{ id: 1, title:"For the love of pie" , author: "Erin Mahoney", line1: "When I look at it,", line2: "The circle becomes a slice,", line3: "I eat the whole pie.", date: dateString },
// 	{ id: 2, title:"Pie in the sky" , author: "Bob Smith", line1: "Oh pie in the sky,", line2: "You look too bright to eat now,", line3: "Oh what a full moon!", date: dateString },
// 	{ id: 3, title:"Pie for no one" , author: "Annie Ross", line1: "Alone I stand here,", line2: "Hunger sounds from my stomach,", line3: "No pie to be found.", date: dateString }
// ];

// pieku index
// app.get('/api/piekus', function(req, res) {
// 	// send all piekus as JSON response
// 	res.json(piekus);
// });

// // create new pieku
// app.post('/api/piekus', function(req, res) {
// 	// grab params from form data
// 	var newPieku = req.body;
// 	// adds date to new pieku
// 	var dateString = (new Date()).toLocaleDateString("en-US");
// 	newPieku.date = dateString;
// 	// set sequential id (last id in 'piekus' array + 1)
// 	if (piekus.length > 0) {
// 		newPieku.id = piekus[piekus.length -1].id + 1;

// 	} else {
// 		newPieku.id = 0;
// 	}
// 	// add newPieku to 'piekus' array
// 	piekus.push(newPieku);
// 	// send newPieku as JSON response
// 	res.json(newPieku);
// });

// // update pieku
// app.put('/api/piekus/:id', function(req, res) {
// 	// set the value of the id
// 	var targetId = parseInt(req.params.id);
// 	// find pieku in 'piekus' array matching the id
// 	var targetPieku = _.findWhere(piekus, {id: targetId});
// 	// update various parts of pieku post
// 	targetPieku.title = req.body.title;
// 	targetPieku.author = req.body.author;
// 	targetPieku.line1 = req.body.line1;
// 	targetPieku.line2 = req.body.line2;
// 	targetPieku.line3 = req.body.line3;
// 	// send target back to edited object
// 	res.json(targetPieku);
// });

// // delete pieku
// app.delete('/api/piekus/:id', function(req, res) {
// 	// set the value of the id
// 	var targetId = parseInt(req.params.id);
// 	// find item in 'piekus' array matching the id
// 	var targetPieku = _.findWhere(piekus, {id:targetId});
// 	// get the index of the found pieku
// 	var index = piekus.indexOf(targetPieku);
// 	// remove the item at that index, only remove 1 item
// 	piekus.splice(index, 1);
// 	// send back deleted object
// 	res.json(targetPieku);
// });










