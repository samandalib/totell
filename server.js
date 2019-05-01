//creating node express app
var express = require('express');
var app = express();
//serving static files
app.use(express.static('public'));


//importing body-parser module to handle post requests
var bodyParser = require ('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

//importing sqlite module and creating the database
var sqlite3=require('sqlite3');
var db = new sqlite3.Database('totell.db');

var port = 3000;


app.listen(port, function(){
  console.log('Express app listening on port'+port);
});

app.get('/', function(request,response){
  response.send('Hello, World!')
});
