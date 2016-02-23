// Import libs
	var client = require('./client');
	var server = require('./server');
	var argv = require('yargs').argv;
	var type = 'client';

// Init
	if (argv.s || argv.server) type = 'server';
	switch (type) {

		case 'server':
			console.log('Server mode');
			var port = (argv.port || argv.p);
			if (!port) {
				console.error('Port not defined..');
				return;
			}
			console.log('Port: ', port);
			server.init(port);
		break;

		case 'client':
			console.log('Client mode');
			var domain = (argv.domain || argv.d);
			if (!domain) {
				console.error('Remote server domain not defined');
				return;
			}
			var clientId = (argv.clientId || argv.i);
			if (!clientId) {
				console.error('Client id not defined');
				return;
			}
			console.log('Domain: ', domain);
			console.log('Client Id: ', clientId);
			client.init(domain, clientId);
		break;

	}