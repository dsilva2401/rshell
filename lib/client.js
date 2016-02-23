// Import libs
	var shelljs = require('shelljs');
	var request = require('request');
	var fs = require('fs');
	var reqUrl = '';

// Verify url parameter
	var startAskingForCommands = function () {
		setInterval(function () {
			request({
				uri: reqUrl,
				method: 'GET',
				timeout: 900
			}, function(error, response, body) {
				if (error) {
					console.error('Error on request', error);
					return;
				}
				if (body) {
					console.log('Command to execute: ', body);
					executeAndResponse(body);
				}
			});
		}, 1000);
	}
	var executeAndResponse = function (command) {
		fs.appendFileSync('log', Date.now()+': '+command+'\n');
		console.log('Executing: ', command);
		shelljs.exec( command, { async: true, silent: true }, function (code, out, error) {
			request({
				uri: reqUrl,
				method: 'PUT',
				form: {
					code: code,
					out: out,
					error: error
				}
			}, function(error, response, body) {
				console.log('Command execution results sent');
			});
		});
	}

// Export method
	exports.init = function (domain, clientId) {
		reqUrl = domain+'/client/'+clientId+'/command';
		startAskingForCommands();
	}