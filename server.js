var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static('dist'))

app.get(['/', '*'],  function(req, res){
	 fs.readFile('index.html', 'utf-8', function(err, body){
	 	res.send(body);
	 });
});

app.listen(8080);