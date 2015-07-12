// SERVER-SIDE JAVASCRIPT

// require express and other modules
var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
_ = require('underscore');

// server js and css files from public folder
app.use(express.static(__dirname + '/public'));

// configure bodyParser for handling data
app.use(bodyParser.urlencoded({extended: true}));
// defines date for piekus
var dateString = (new Date()).toLocaleDateString("en-US");

// pre-seeded phrase data
var piekus = [
	{ id: 1, title:"For the love of pie" , author: "Erin Mahoney", line1: "When I look at it,", line2: "The circle becomes a slice,", line3: "I eat the whole pie.", date: dateString },
	{ id: 2, title:"Pie in the sky" , author: "Bob Smith", line1: "Oh pie in the sky,", line2: "You look too bright to eat now,", line3: "The full moon is wow", date: dateString },
	{ id: 3, title:"Pie for no one" , author: "Annie Ross", line1: "Alone I stand here,", line2: "Hunger sounds from my stomach,", line3: "No pie to be found.", date: dateString }
];	

// ROUTES
// root route (serves index.html)
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/views/index.html');
});

// pieku index
app.get('/api/piekus', function(req, res) {
	// send all piekus as JSON response
	res.json(piekus);
});

// create new pieku
app.post('/api/piekus', function(req, res) {
	// grab params from form data
	var newPieku = req.body;
	// adds date to new pieku
	var dateString = (new Date()).toLocaleDateString("en-US");
	newPieku.date = dateString;
	// set sequential id (last id in 'piekus' array + 1)
	if (piekus.length > 0) {
		newPieku.id = piekus[piekus.length -1].id + 1;

	} else {
		newPieku.id = 0;
	}
	// add newPieku to 'piekus' array
	piekus.push(newPieku);
	// send newPieku as JSON response
	res.json(newPieku);
});

// update pieku
app.put('/api/piekus/:id', function(req, res) {
	// set the value of the id
	var targetId = parseInt(req.params.id);
	// find pieku in 'piekus' array matching the id
	var targetPieku = _.findWhere(piekus, {id: targetId});
	// update various parts of pieku post
	targetPieku.title = req.body.title;
	targetPieku.author = req.body.author;
	targetPieku.line1 = req.body.line1;
	targetPieku.line2 = req.body.line2;
	targetPieku.line3 = req.body.line3;
	// send target back to edited object
	res.json(targetPieku);
});

// delete pieku
app.delete('/api/piekus/:id', function(req, res) {
	// set the value of the id
	var targetId = parseInt(req.params.id);
	// find item in 'piekus' array matching the id
	var targetPieku = _.findWhere(piekus, {id:targetId});
	// get the index of the found pieku
	var index = piekus.indexOf(targetPieku);
	// remove the item at that index, only remove 1 item
	piekus.splice(index, 1);
	// send back deleted object
	res.json(targetPieku);
});

app.listen(3000, function() {
	console.log('Server started on localhost:3000');
});









