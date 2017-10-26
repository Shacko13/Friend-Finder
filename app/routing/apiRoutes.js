// Dependencies
var path = require('path');

// Require friends data file
var friends = require('../data/friends.js');

// Export API routes
module.exports = function(app) {	

	// List of friends
	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	// New friend entry
	app.post('/api/friends', function(req, res) {		
		var userInput = req.body;
		var userResponses = userInput.scores;

		// Best match
		var matchName = '';
		var matchImage = '';
		var totalDifference = 0;

		// Loop through friends list
		for (var i = 0; i < friends.length; i++) {
			// Figure differenes for each question
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}
			// If lowest difference, record match
			if (diff < totalDifference) {
				totalDifference = diff;
				matchName = friends[i].name;
				matchImage = friends[i].photo;
			}
		}

		// Add new user
		friends.push(userInput);

		// Send response
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
};
