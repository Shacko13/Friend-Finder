// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Express server
var app = express();
var PORT = process.env.PORT || 8080;

// Public directory for accessing CSS files
app.use(express.static(path.join(__dirname, './app/public')));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

// Routing
require(path.join(__dirname, './app/routing/apiRoutes'))(app);
require(path.join(__dirname, './app/routing/htmlRoutes'))(app);

// Start server to begin listening
app.listen(PORT, function() {
  console.log('App listening on PORT: ' + PORT);
});