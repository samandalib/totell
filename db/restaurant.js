var mongoose = require('mongoose');

mongoose.connect("mongodb+srv://hesamandalib:hesam14239@restaurant-7f8ln.mongodb.net/test?retryWrites=true",{useNewUrlParser: true})

var Schema=mongoose.Schema;

var menuItemsSchema= new Schema({
    image:{type:String,},
    title:{type:String,required:true},
    ingredients:{type:Array, required:true},
    price: {type: Number, required:true},
    langs:{type:Array},
    description:{type:String},
});

var menuSchema = new Schema({
    category:{type:String, required:true},
    items:[menuItemsSchema],
});

var restaurantSchema = new Schema({
    id:{type:String},
    name:{type:String, required:true},
    country:{type:String},
    currency:{type:String},
    state:{type:String},
    province: {type:String},
    city:{type:String, required:true},
    address:{type:String, required:true},
    zip:{type:String},
    phone:{type:Number, required: true},
    website:{type:String},
    email:{type:String},
    owner:{type:String, required:true},
    menu:[menuSchema],
    type:{type:String},

})

module.exports = mongoose.model('restaurant',restaurantSchema);
