var mongoose = require('mongoose');

mongoose.connect("mongodb+srv://hesamandalib:hesam14239@restaurant-7f8ln.mongodb.net/test?retryWrites=true",{useNewUrlParser: true})

var Schema=mongoose.Schema;

var newUserSchema= new Schema({
    username:{type:String, required:false, unique:false},
    password:{type:String,required:true},
    email:{type:String, required:true, unique:true},
});


module.exports = mongoose.model('Users',newUserSchema);
