var express = require('express');
var app = express();

var http = require('http').Server(app);
var path = require('path');
var port = process.env.PORT || 8080;

app.get('/', function(req, res) {
	// clientIp will be ::1 on localhost, as it's a loopback
	var clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	var responseJSON = {
		'ipaddress': clientIp,
		'language': req.headers['accept-language'].split(',')[0].toString(),
		'software': req.headers['user-agent'].match(/\(([a-z0-9\s\.;]+)\)/i)[1]
	}
	
	res.json(responseJSON);
})

http.listen(port, function() {
	console.log('listening on *:' + port);
});