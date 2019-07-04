var mongoose = require('mongoose');
var User = require('./user.js');

mongoose.connect("mongodb+srv://hesamandalib:hesam14239@restaurant-7f8ln.mongodb.net/test?retryWrites=true",{useNewUrlParser: true})

var Schema=mongoose.Schema;

var menuItemsSchema= new Schema({
    image:{type:Buffer,},
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
    _id:{type:Number},
    _owner:{type:Number , ref:'User'},
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

restaurantSchema.virtual('fullString')
    .get(   function(){
        return this._owner+' '+this.name+' '+this.country+' '+
        this.currency+' '+this.state+' '+this.province+' '+
        this.city+' '+this.address+' '+this.zip+' '+this.phone+' '+
        this.website+' '+this.email+' '+this.owner+' '+this.type
    })


module.exports = mongoose.model('restaurant',restaurantSchema);
