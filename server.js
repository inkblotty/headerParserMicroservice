var express = require('express');
var app = express();

var http = require('http').Server(app);
var path = require('path');
var getIP = require('external-ip')();
var port = process.env.PORT || 8080;

// we need the request's ip, lang, and software

var setIp = '';
	
getIP(function(err, ip) {
	if (err) {
		throw err
	} else {
		setIp = ip;
	}
})

app.get('/api/whoami', function(req, res) {

	var responseJSON = {
		'ip': setIp,
		'language': req.headers['accept-language'].split(',')[0].toString(),
		'software': req.headers['user-agent'].match(/\(([a-z0-9\s\.;]+)\)/i)[1]
	}
	
	res.json(responseJSON);
})

http.listen(port, function() {
	console.log('listening on *:' + port);
});