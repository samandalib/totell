var mongoose = require('mongoose');
var Restaurants = require('./restaurant.js')

mongoose.connect("mongodb+srv://hesamandalib:hesam14239@restaurant-7f8ln.mongodb.net/test?retryWrites=true",{useNewUrlParser: true})

var Schema=mongoose.Schema;

var newUserSchema= new Schema({
    _id:{type:Number},
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    country:{type:String},
    membership: {type:String},
    restaurants:[{type:Schema.Types.ObjectId, ref:'Restaurants'}]
});


module.exports = mongoose.model('Users',newUserSchema);
