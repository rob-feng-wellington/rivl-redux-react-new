'use strict';

var express = require('express');
var http = require('http');
var wsListen = require('rethinkdb-websocket-server').listen;

// Set up the HTTP routes
var app = express();
app.use('/', express.static('assets'));
app.use('/node_modules', express.static('node_modules'));
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})
var httpServer = http.createServer(app);


// Configure rethinkdb-websocket-server to listen on the /db path

var serverConfig = {
    httpServer: httpServer,
    httpPath: process.env.DB_PATH || '/db',
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: process.env.DB_PORT || '28015',
    unsafelyAllowAnyQuery: true,
};
wsListen(serverConfig);

// Start the HTTP server on the configured port
httpServer.listen(process.env.PORT || 8015);
console.log('Server started');