var mongoose = require('mongoose');
var Restaurants = require('./restaurant.js')

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://hesamandalib:hesam14239@restaurant-7f8ln.mongodb.net/test?retryWrites=true",{useNewUrlParser: true})

var Schema=mongoose.Schema;

var followingSchema = new Schema({
    restaurants:[{type:Schema.Types.ObjectId, ref:'Restaurants'}],
    startDate:{type:Date, default:Date.now}
})

var followersSchema = new Schema({
    pageName:{type:String},
    startDate:{type:Date, default:Date.now},
})

var UserSchema= new Schema({
    restaurants:[{type:Schema.Types.ObjectId, ref:'Restaurants'}],
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    country:{type:String},
    dateJoined:{type:Date, default:Date.now},
    membership: {type:String},
    photo:{ data: Buffer, contentType: String },
    following:[followingSchema],
    followers:[followersSchema],
});


module.exports = mongoose.model('Users',UserSchema);
