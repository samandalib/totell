var mongoose = require('mongoose');

mongoose.connect("mongodb+srv://hesamandalib:hesam14239@restaurant-7f8ln.mongodb.net/test?retryWrites=true",{useNewUrlParser: true})

var Schema=mongoose.Schema;

var menuItemsSchema= new Schema({
    image:{type:String, required:false, unique:false},
    name:{type:String,required:true},
    ingredients:{type:Array, required:true},
    currency:{type:String, required:true},
    price: {type: Number, required:true},
    langs:{type:Array, required:true},
});

var menuSchema = new Schema({
    categor:{type:String, required:true},
    items:[menuItemsSchema],
});

var restaurantSchema = new Schema({
    name:{type:String, required:true},
    country:{type:String},
    city:{type:String, required:true},
    address:{type:String, required:true},
    phone:{type:Number, required: true},
    website:{type:String},
    email:{type:String},
    owner:{type:String, required:true},
    menus:[menuSchema]

})

module.exports = mongoose.model('restaurant',restaurantSchema);
