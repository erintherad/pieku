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

// pre-seeded phrase data
var piekus = [
	{ id: 1, title:"For the love of pie" , author: "Erin Mahoney", post: "When I look at it," + "<br>" + "The circle becomes a slice," + "<br>" + "I eat the whole pie." },
	{ id: 2, title:"Pie in the sky" , author: "Bob Smith", post: "Oh pie in the sky," + "<br>" + "You look too bright to eat now," + "<br>" + "The full moon is wow" },
	{ id: 3, title:"Pie for no one" , author: "Annie Ross", post: "Alone I stand here," + "<br>" + "Hunger sounds from my stomach," + "<br>" + "No pie to be found." }
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
app.put('/api/pieus/:id', function(req, res) {
	// set the value of the id
	var targetId = parseInt(req.params.id);
	// find pieku in 'piekus' array matching the id
	var targetPieku = _.findWhere(piekus, {id: targetId});
	// update various parts of pieku post
	targetPieku.title = req.body.title;
	targetPieku.author = req.body.author;
	targetPieku.post = req.body.post;
	targetPieku.date = req.body.date;
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










