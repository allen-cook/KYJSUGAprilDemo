var port = parseInt(process.argv[2] || "8080", 10);

var fs = require("fs"),
    path = require("path"),
    express = require("express"),
    util  = require('util'),
	_ = require('underscore');

var io = require('socket.io').listen(port+1);

var app = express();

app.configure(function(){
	app.use('/', express.static(__dirname + '/../client/'));
});

io.on('connection', function(socket)
{
	socket.on('chat:message', function (data, callback) {
		socket.emit('chat:message', data);
		socket.broadcast.emit('chat:message', data);
		if (typeof callback === 'function')
		{
			callback(null, data);
		}
	});
});
