'use strict';

// Load configuration
var config = require('./config/config');
var mongoose = require('mongoose');

// Bootstrap db connection
var db = mongoose.connect(config.db.uri, config.db.options, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});

mongoose.connection.on('error', function(err) {
	console.error(chalk.red('MongoDB connection error: ' + err));
	process.exit(-1);
	}
);

// Init the express application
var app = require('./config/express')(db);

// Start the app by listening on <port>
app.listen(config.port);

console.log('app started');

// Expose app
exports = module.exports = app;
