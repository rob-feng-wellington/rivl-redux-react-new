'use strict';

var express = require('express');
var http = require('http');
var path = require('path');  
var wsListen = require('rethinkdb-websocket-server').listen;
console.log("NODE_ENV: " + process.env.NODE_ENV);

if(process.env.NODE_ENV === 'production') {
	process.env.DB_PATH = '/db';
	process.env.DB_HOST = 'localhost';
	process.env.DB_PORT = 28015;
	process.env.SERVER_PORT = 5000;
} else {
	process.env.DB_PATH = '/db';
	process.env.DB_HOST = 'localhost';
	process.env.DB_PORT = 28015;
	process.env.SERVER_PORT = 8015;
}
// Set up the HTTP routes
var app = express();
app.use(express.static('public'));
//app.use(favicon(path.join(__dirname,'assets','public','favicon.ico')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
var httpServer = http.createServer(app);

// Configure rethinkdb-websocket-server to listen on the /db path

var serverConfig = {
    httpServer: httpServer,
    httpPath: process.env.DB_PATH || '/db',
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: process.env.DB_PORT || 28015,
    unsafelyAllowAnyQuery: true,
};
wsListen(serverConfig);

// Start the HTTP server on the configured port
httpServer.listen(process.env.PORT || process.env.SERVER_PORT);
console.log('Server started');