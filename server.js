//Importing requirements
const express = require('express');
const session = require('express-session')
const path = require('path');
const logger = require('morgan');
const expressValidator = require('express-validator');
const bodyParser = require ('body-parser');
const callbacks = require('./routes')
var MongoDBStore=require('connect-mongodb-session')(session)
var ObjectId = require('mongodb').ObjectId;

var app = express();

var Store = new MongoDBStore({
    uri:mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://hesamandalib:hesam14239@restaurant-7f8ln.mongodb.net/test?retryWrites=true",{useNewUrlParser: true})
    collection: 'Sessions'
})
Store.on('error', (error)=> console.log('error in connection to store/sessions collection:', error))


//setting mongoDB as a database for the project
var User = require('./db/user.js');
var Restaurant = require('./db/restaurant.js');

//Moddleware
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//app.use(expressValidator());
app.use((req,res,next)=>{//This middleware defines decoration for accessing db
    req.user_db = User
    req.restaurant_db=Restaurant
    req.store = Store
    next()
})
app.use((req,res,next)=>{
    req.ObjectId = ObjectId
    next()
})
app.use(session({
    secret:'This is a secret',
    cookie:{maxAge: 1000*60*60 },//session lasts 1 houre
    store: Store,
    resave:false,
    saveUninitialized:false,
}))

//Deplying on Heroku
if (process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));

  app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  })
}
///////////////////////////////////////////////////
function checkSignIn(req, res, next){
   if(req.session.user){
       console.log('From CheckSignIn MW: ', req.session.user)
       res.send('You are already logged in!')
      next();     //If session exists, proceed to page
   } else {
      var err = new Error("Not logged in!");
      console.log('No data for req.session.user found');
      next(err);  //Error, trying to access unauthorized page!
   }
}

var {
    PORT = process.env.PORT || 5000,
} = process.env

//FOR CHECKING SESSION FUNCTIONALITY
app.get('/protected_page', checkSignIn, (req, res)=>{
    console.log('/protected_page: ', req.session)
   res.send('protected_page')
});
/////////////////////////////////////

app.get('/', callbacks.getRoutes.getHomePage)
//(req,res) => res.status(200).send('Totell App'))

app.get('/login',callbacks.getRoutes.getLogin)
app.post('/login', callbacks.postRoutes.postLogin)

app.get('/regprofile/:user', callbacks.getRoutes.getRegProfile)

app.get('/signup', callbacks.getRoutes.getSignUp)
app.post('/signup', callbacks.postRoutes.postUserReg)

app.post('/logout', callbacks.postRoutes.postLogOut)

app.get('/restshow', callbacks.getRoutes.getRestShow)

/*
app.post('/filter', callbacks.postRoutes.postFilter)

*/
app.get('/search', callbacks.getRoutes.getSearch)
app.get('/search/:filter', callbacks.getRoutes.getSearchFilter)
app.get('/search/restaurant/:filter', callbacks.getRoutes.getFullData)
app.get('/menu/:restaurant/:zip', callbacks.getRoutes.getRestMenu)
app.get('/restprofile/:restname/:zip', callbacks.getRoutes.getRestProfile)
app.get('/getrestinfo/:id', callbacks.getRoutes.getRestInfo)
app.get('/checkfollow/:restname/:restzip', callbacks.getRoutes.getFollowStatus)
app.get('/followings/:user', callbacks.getRoutes.getFollowings)
app.get('/menuform/:restaurant/:zip', callbacks.getRoutes.getRestMenu)
app.get('/getrestbrief/:id', callbacks.getRoutes.getRestBrief)
app.get('/getuserinfo', callbacks.getRoutes.getUserInfo)
app.get('/getuserphoto/:username', callbacks.getRoutes.getUserPhoto)
app.get('/getfollowcount/:name', callbacks.getRoutes.getFollowCount)
app.get('/getlikes/:restname/:restzip', callbacks.getRoutes.getLikes)
app.get('/showprofile/:user', callbacks.getRoutes.getShowProfile)
app.get('/checklikestatus/:resname/:restzip/:activeuser', callbacks.getRoutes.getLikeStatus)
/*
app.put('/menuform/:restaurant/:zip', callbacks.putRoutes.putRestaurantMenu)
*/
app.post('/postcomment/:restname/:restzip', callbacks.postRoutes.postComment)

app.put('/putfollow/:restname/:restzip/:followstatus', callbacks.putRoutes.putFollow)
app.put('/putlikescount/:restid/:comment_id/:status', callbacks.putRoutes.putLikesCount)
/*
app.put('/updateuserdb/:restname', callbacks.putRoutes.putUserFollowing)
*/

app.post('/addrestaurant', callbacks.postRoutes.postAddRest);



app.post('/updatemenu/:menu', (req,res)=>{
    res.send('updating menu')
    //====>TO DO ===> UPDATE AN EXISTING MENU CATEGORIES/ITEMS
    // ?? NEED TO KNOW MORE ABOUT UPDATING IN MONGODB ??
})

app.get('/menu/:restaurantId', (req, res)=>{
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
