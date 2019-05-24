//creating node express app
var express = require('express');
var path = require('path');

var app = express();

//serving static files from React App
app.use(express.static(path.join(__dirname, 'client/build')));

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
var User=require('./db/user.js');
var Restaurant=require('./db/restaurant.js');

const port = process.env.PORT || 5000;


app.listen(port, function(){
  console.log('Menu app listening on port'+port);
});

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname)+'/client/public/index.html')
});

app.get('/restshow', (req,res) =>{
    Restaurant.find((err, allRestaurants)=>{
        if (err){
            res.type('html').status(500);
            res.send('Error in querying db: '+ err);
        }
        else if(allRestaurants.length == 0 ){
            res.type('html').status(200);
            res.send('There is no Restaurant info in database');
        }
        else{
            let list = res.json(allRestaurants);
            console.log('send list of all Restaurants')
        }
    })
}
)


app.use('/signup',(req,res)=>
    res.redirect('/client/build/signupform.html')
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



app.get('/restform',(req,res)=>
    {res.redirect('/public/resturant.html');});

app.use('/addrestaurant', (req,res)=>{
    var newRestaurant= new Restaurant ({
        name: req.body.RestName,
        country: req.body.RestCoutnry,
        city: req.body.RestCity,
        address: req.body.RestAddress,
        phone: req.body.RestPhone,
        website: req.body.RestWeb,
        email: req.body.RestEmail,
        owner: req.body.RestOwner,
        menus: [],
    });
    newRestaurant.save((err)=>{
        if(err){
            console.log(req.body.RestName);
            res.type('html').status(500);
            res.send('Error in Resturant Registration process: '+err);
        }
        else{
            console.log(req.body.RestName);
            console.log("record successfully saved")
            res.send("resturant registered")

        }
    });
});

app.get('*',(req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'))
});
