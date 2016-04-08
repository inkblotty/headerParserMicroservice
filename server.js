var express = require('express');
var app = express();

var http = require('http').Server(app);
var path = require('path');
var os = require('os');
var port = process.env.PORT || 8080;

// we need the request's ip, lang, and software

app.get('/', function(req, res) {
	var responseJSON = {
		'ip': '',
		'language': req.headers['accept-language'].split(',')[0].toString(),
		'software': req.headers['user-agent'].match(/\(([a-z0-9\s\.;]+)\)/i)[1]
	}

	console.log(os.networkInterfaces());
	
	res.json(responseJSON);
})

http.listen(port, function() {
	console.log('listening on *:' + port);
});