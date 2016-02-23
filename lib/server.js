// Vars
	var express = require('express');
	var bodyParser = require('body-parser');
	var app = express();
	var queue = {};

// Methods
	var resetClient = function (clientId) {
		queue[clientId] = {};
	}

// Settings
	app.use( bodyParser.json() );
	app.use( bodyParser.urlencoded({ extended: true }) );

// Routes
	app.post('/client/:clientId/command', function (req, res, next) {
		var clientId = req.params.clientId;
		queue[clientId] = queue[clientId] || {};
		// Already sent command
		if (queue[clientId].currentCommand) {
			res.status(409);
			res.end('Command already sent');
			return;
		}
		// Execute new command
		queue[clientId].currentCommand = req.body.command;
		var intval = setInterval(function () {
			if (queue[clientId].response) {
				res.send(queue[clientId].response);
				res.end();
				clearInterval(intval);
				resetClient(clientId);
				return;
			}
		}, 100);
	});

	app.get('/client/:clientId/command', function (req, res, next) {
		var clientId = req.params.clientId;
		queue[clientId] = queue[clientId] || {};
		res.send( queue[clientId].currentCommand );
		res.end();
	});

	app.put('/client/:clientId/command', function (req, res, next) {
		var clientId = req.params.clientId;
		queue[clientId] = queue[clientId] || {};
		// queue[clientId].response = req.body.results;
		queue[clientId].response = {
			code: req.body.code,
			out: req.body.out,
			error: req.body.error
		}
		if ( req.body.code != '0' ) res.status(400);
		res.send( 'Command results set ..' );
		res.end();
	});

// Export
	exports.init = function (port) {
		app.listen(port);
	}