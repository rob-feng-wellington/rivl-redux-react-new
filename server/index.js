'use strict';

var express = require('express');
var http = require('http');
var path = require('path');  
import open from 'open';
import compression from 'compression';
var wsListen = require('rethinkdb-websocket-server').listen;

process.env.DB_PATH = '/';
process.env.DB_HOST = 'rethinkdb://admin:hQwx6x0O4mY9pHQHgkY0eW5h8wpbGu73esv2h-aBVVg@aws-ap-southeast-1-portal.1.dblayer.com';
process.env.DB_PORT = 15329;
process.env.SERVER_PORT = 5000;

// Set up the HTTP routes
var app = express();

app.use(compression());
app.use(express.static('public'));
//app.use(favicon(path.join(__dirname,'assets','public','favicon.ico')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

var httpServer = http.createServer(app);

// Configure rethinkdb-websocket-server to listen on the /db path
var serverConfig = {
	    httpServer: httpServer,
	    httpPath: process.env.DB_PATH,	
	    dbHost: process.env.DB_HOST,
	    dbPort: process.env.DB_PORT,
	    unsafelyAllowAnyQuery: true,
	};

wsListen(serverConfig);
// Start the HTTP server on the configured port
httpServer.listen(process.env.PORT || process.env.SERVER_PORT);
console.log('Server started');