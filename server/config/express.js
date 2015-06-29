'use strict';

var fs = require('fs'),
	config = require('./config'),
	express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	path = require('path');

module.exports = function(db) {
	var app = express();

	app.use(function(req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});

	app.set('view engine', 'swig');

	app.set('showStackError', true);

	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	app.use(express.static(path.resolve('../')));

	app.use(function(err, req, res, next) {
		if (!err) return next();

		res.status(500).render('500', {
			error: err.stack
		});
	});


	app.get('/api/test', function(req, res) {
		res.status(200).send({
			'var': 'value'
		});
	});

	app.get('/', function(req, res) {
	  res.render('home', {
	    title: 'Welcome'
	  });
	});

	app.use(function(req, res) {
		res.status(404).send({
			error: 'Not Found'
		});
	});

	return app;

};