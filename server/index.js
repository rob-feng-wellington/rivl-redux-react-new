'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var open = require('open');
var r = require('rethinkdb');
var compression = require('compression');
//import open from 'open';
//import compression from 'compression';


var wsListen = require('rethinkdb-websocket-server').listen;

// Configure rethinkdb-websocket-server to listen on the /db path
// Set up the HTTP routes
var app = express();

app.use(compression());
app.use(express.static('public'));
//app.use(favicon(path.join(__dirname,'assets','public','favicon.ico')));

app.get('*', function(req, res) {
res.sendFile(path.join(__dirname, '../public/index.html'));
});

var httpServer = http.createServer(app);
var port = process.env.PORT || 5000;

fs.readFile('./cacert', function(err, caCert) {

    var serverConfig = {
        httpServer: httpServer,
        dbHost: 'aws-ap-southeast-1-portal.1.dblayer.com',
        dbPort: 15329,
        unsafelyAllowAnyQuery: true,
        dbAuthKey: 'hQwx6x0O4mY9pHQHgkY0eW5h8wpbGu73esv2h-aBVVg',
        dbSsl: {
            ca: caCert
        }
    };
    wsListen(serverConfig);
    
    // Start the HTTP server on the configured port
    httpServer.listen(port);
    console.log('Server started port: ' + port);
});

