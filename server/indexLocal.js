'use strict';

var express = require('express');
var http = require('http');
var path = require('path');  
import open from 'open';
import compression from 'compression';
var wsListen = require('rethinkdb-websocket-server').listen;

// Set up the HTTP routes
var app = express();

app.use(compression());
app.use(express.static('dist'));
//app.use(favicon(path.join(__dirname,'assets','public','favicon.ico')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

var httpServer = http.createServer(app);
var port = process.env.PORT || 8015;
// Configure rethinkdb-websocket-server to listen on the /db path
wsListen({
    httpServer: httpServer,
    httpPath: '/db',
    dbHost: 'localhost',
    dbPort: 28015,
    unsafelyAllowAnyQuery: true,
});

// Start the HTTP server on the configured port
httpServer.listen(port);
console.log('Server started port:' + port);