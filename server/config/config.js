'use strict';

var _ = require('lodash'),
	fs = require('fs'),
	mysql = require('mysql');

var conf = {
	db: {
		uri: 'mongodb://localhost/deviboard-dev',
		options: {
			user: '',
			pass: ''
		}
	},
	port: 8181
};

var config = _.merge(conf, (fs.existsSync('./config/local.js') && require('./local.js')) || {} );

if (config.mysql) {
	config.mysqlPool = mysql.createPool(config.mysql);
}

module.exports = config;