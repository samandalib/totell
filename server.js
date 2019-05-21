//creating node express app
var express = require('express');
var app = express();
//serving static files
app.use('/public',express.static('public'));

app.set('view engine', 'ejs');

//importing body-parser module to handle post requests
var bodyParser = require ('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

/*
//importing sqlite module and creating the database
var sqlite3=require('sqlite3');
var db = new sqlite3.Database('totell.db');
*/

//setting mongoDB as a database for the project
var User=require('./src/user.js')
var Restaurant=require('./src/restaurant.js')
var port = 3000;


app.listen(port, function(){
  console.log('Totell app listening on port'+port);
});

app.get('/', function(req,res){
  res.redirect('/public/index.html')
});


app.use('/signup',(req,res)=>
    res.redirect('/public/signupform.html')
);

app.use('/usereg',(req,res)=>{
    var newUser= new User ({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    });
    newUser.save((err)=>{
        if(err){
            res.type('html').status(500);
            res.send('Error in sign up process: '+err);
        }
        else{
            res.render('registered', {user: newUser});
        }
    });
});



app.get('/resturantform',(req,res)=>
    {res.redirect('/public/resturant.html');});

app.use('/addresturant', (req,res)=>{
    var newRestaurant= new Restaurant ({
        name: req.body.restName,
        country: req.body.restCoutnry,
        city: req.body.restCity,
        address: req.body.restAddress,
        phone: req.body.restPhone,
        website: req.body.restWeb,
        email: req.body.restEmail,
        owner: req.body.restOwner,
        menus: [],
    });
    newRestaurant.save((err)=>{
        if(err){
            console.log(req.body.restName);
            res.type('html').status(500);
            res.send('Error in Resturant Registration process: '+err);
        }
        else{
            console.log(req.body.restName);
            console.log("record successfully saved")
            res.send("resturant registered")

        }
    });
});
