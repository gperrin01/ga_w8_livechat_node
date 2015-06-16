var express = require('express'); // Use the express library. 
var app = express(); // Create our app. 

var http = require('http');
server = http.createServer(app); // Create an HTTP server.
server.listen(process.env.PORT || 4000); // Listen on the default port, or on 4000 if there's not one.

// app.use('/static', express.static(__dirname + '/public')); // this wasnt workning! I used the below
app.use(express.static(__dirname + '/public'));

// added this myself otherwise no default engine provided for views
app.set('/views', './views');
app.set('view engine', 'ejs');

// added this myself otherwise cannot GET /
app.get('/', function(req, res) {
  res.render('index');
});