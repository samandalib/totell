//Importing requirements
const express = require('express');
const session = require('express-session')
const path = require('path');
const bodyParser = require ('body-parser');
const callbacks = require('./routes')

var app = express();
var router = express.Router()

//setting mongoDB as a database for the project
var User=require('./db/user.js');
var Restaurant=require('./db/restaurant.js');

//Moddleware
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({extended:true}));
app.use((req,res,next)=>{
    req.user_db = User
    req.restaurant_db=Restaurant
    next()
})

var {
    PORT = 5000,
} = process.env



app.get('/', (req,res) => res.status(200).send('Totell App'))

app.get('/login', callbacks.getRoutes.getLogin)
app.post('/login', callbacks.postRoutes.postLogin)

app.get('/restshow', callbacks.getRoutes.getRestShow)

app.post('/filter', callbacks.postRoutes.postFilter)
app.get('/search', callbacks.getRoutes.getSearch)
app.get('/search/:filter', callbacks.getRoutes.getSearchFilter)

app.post('/usereg', callbacks.postRoutes.postUserReg);

app.post('/addrestaurant', callbacks.postRoutes.postAddRest);



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


app.get('*',(req,res) => res.send('This is from totell app'));

app.listen(PORT, function(){
  console.log('Menu app listening on port'+PORT);
});
