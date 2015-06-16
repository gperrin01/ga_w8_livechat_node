var express = require('express'); // Use the express library. 
var app = express(); // Create our app. 

var http = require('http');
server = http.createServer(app); // Create an HTTP server.
server.listen(process.env.PORT || 4000); // Listen on the default port, or on 4000 if there's not one.

// app.use('/static', express.static(__dirname + '/public')); 
// this wasnt workning! I used the below
app.use(express.static(__dirname + '/public'));

// added this myself otherwise no default engine provided for views
app.set('/views', './views');
app.set('view engine', 'ejs');

// added this myself otherwise cannot GET /
app.get('/', function(req, res) {
  res.render('index');
});

var io = require('socket.io').listen(server);

// SERVER EVENTS, when you see this request, do that - then check script on index.ejs for what happens
//function(socket) says, when you connect on THIS socket, do that with THIS socket

io.sockets.on('connection', function(socket) {

  socket.emit('connected');

  // should the below be here, or inside its on io.socket.on?? 
  
  // why is writeLine here and not in app.js, as is the function saying what we do when connected?
  socket.on('chat', function(data) {
    // writeLine(data.name, data.line);
    socket.broadcast.emit('chat', data);
  });

  socket.on('action', function(data) {
    socket.broadcast.emit('action', data);
  });

}); // end server ents on connection to a socket









