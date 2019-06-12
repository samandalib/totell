//creating node express app
var express = require('express');
var session = require('express-session')
var path = require('path');

var app = express();
var router = express.Router()

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

var {
    PORT = 5000,
    searchfilter = "",
} = process.env

console.log('initiate searchfilter variable: ', searchfilter)

app.listen(PORT, function(){
  console.log('Menu app listening on port'+PORT);
});

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname)+'/client/public/index.html')
});

app.use('/login', (req,res)=>{
    console.log('username: ', req.body.username)
    console.log('password: ', req.body.password)
    User.find({username:req.body.username, password:req.body.password}, (err,user)=>{
        if(err){
            res.type('html').status(500);
            res.send('Error in Login: '+ err);
        }
        else if (user.length == 0){
            res.type('html').status(200);
            res.send('There is no User with this username/password in the database')
        } else{
            res.send(`${user} sucessfully logged in`)
        }
    })
})

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
var changeSearchFilter = (req,res,next)=>{
    searchfilter = req.body.searchtext
    console.log('from middleware: ' ,searchfilter)
    next();
}
/*
var resetSearchFilter = (req,res,next)=>{
    searchfilter = ""
    console.log('Reset search filter: ', searchfilter)
    next();
}
*/


app.use('/filter', changeSearchFilter,  (req,res)=>{
    console.log('search text: ', req.body.searchtext)
    let filter = req.body.searchtext
    console.log('filter is: ',filter)
    //res.redirect('/searchfilter')
    //let pattern = `/${filter}$/i`
    //console.log(pattern)
})
    //try{
        /*result = Restaurant.find({$or:[{title:{$regex:pattern}},
            {state:{$regex:pattern}},
            {city: {$regex:pattern}},
        ]});*/
app.use('/searchfilter',(req,res)=>{
    console.log('from /searchfilter: ', searchfilter)
    Restaurant.find({name:searchfilter},(err,result)=>{
        if (err){
            res.type('html').status(500);
            res.send('Error in Searching db: '+ err);
        }else if (result.length == 0){
            res.type('html').status(200)
            res.send('There is no result for this search')
        } else{
            console.log(result)
            let srchRslt = res.json(result)
            console.log('List of Results with Regex Search is sent')


        }
    }
    )
})

app.post('/usereg',(req,res)=>{
    console.log(req.body)
    var newUser= new User ({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        country: req.body.country,
        membership: req.body.membership
    });
    newUser.save((err)=>{
        if(err){
            res.type('html').status(500);
            res.send('Error in sign up process: '+err);
        }
        else{
            res.send('user succesfully registered on database');
        }
    });
});


app.post('/addrestaurant', (req,res)=>{
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



app.use('/updatemenu', (req,res)=>{
    res.send('updating menu')
    //====>TO DO ===> UPDATE AN EXISTING MENU CATEGORIES/ITEMS
    // ?? NEED TO KNOW MORE ABOUT UPDATING IN MONGODB ??
})

app.use('/menu/restaurantId/:restaurantId', (req, res)=>{
    //====>TO DO ===> MUST WORK ON THIS ROUTE
    console.log(JSON.stringify(req.params))
    var id = req.params.restaurantId
    console.log('from express app', id);
    try{
        result = Restaurant.find({"id":id})
        if (!result){
            res.send('no record for this id');
        }
        else{
            let result = res.json(result);
            console.log('send restaurant info to the component')
        }
    }
    catch(error){
        console.log('there is an error in querying db '+error)
    }
});


app.get('*',(req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'))
});
