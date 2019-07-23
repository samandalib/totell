var mongoose = require('mongoose');
var User = require('./user.js');

mongoose.connect("mongodb+srv://hesamandalib:hesam14239@restaurant-7f8ln.mongodb.net/test?retryWrites=true",{useNewUrlParser: true})

var Schema=mongoose.Schema;

var commentsSchema= new Schema({
    _id:{type:Schema.Types.ObjectId},
    text:{type:String},
    user:{type:String},
    posted_at:{type:Date, default:Date()},
    Likes:{type:Array},
    DisLikes:{type:Array},
})

var menuItemsSchema= new Schema({
    image:{type:Buffer,},
    title:{type:String,required:true},
    ingredients:{type:Array, required:true},
    price: {type: Number, required:true},
    langs:{type:Array},
    description:{type:String},
    comments:[commentsSchema],

});

var menuSchema = new Schema({
    category:{type:String, required:true},
    items:[menuItemsSchema],
});

var boardSchema= new Schema({
    message:{type:Schema.Types.Mixed},
    latst_update:{type:Date}

})

var gallerySchema=new Schema({
    photo:{type:Buffer},
    uploadDate:{type:Date},
    comments:[commentsSchema],
    numberOfLikes:{type:Number},
})

var followersSchema = new Schema({
    userId:{type:Schema.Types.ObjectId, ref: 'User'},
})
var restaurantSchema = new Schema({
    _owner:{type:String , ref:'User'},
    _id:{type:Schema.Types.ObjectId},
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
    comments:[commentsSchema],
    boardMessages:[boardSchema],
    followers:[followersSchema],

})

restaurantSchema.virtual('fullString')
    .get(   function(){
        return this._owner+' '+this.name+' '+this.country+' '+
        this.currency+' '+this.state+' '+this.province+' '+
        this.city+' '+this.address+' '+this.zip+' '+this.phone+' '+
        this.website+' '+this.email+' '+this.owner+' '+this.type
    })


module.exports = mongoose.model('restaurant',restaurantSchema);
