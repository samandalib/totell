let Restaurant = require('./restaurant.js')
let Users = require('./user.js')
var ObjectId = require('mongodb').ObjectId;




/*
Restaurant.update({name:"Sammy's Woodfired Pizza"},{$push:{followers:{username:'hesam'}}},
(err,result)=>{
    if (err) console.log('error in update:', err)
    console.log('successful update: ',result)
})
*/
//var o_id = new ObjectId("5d24991b2073e362d8dca5ec");
Users.find({"_id":ObjectId("5d25df306d017087b04056f9")}, (err,result)=>{
    if (err) console.log('error in find:', err)
    console.log('successful query: ',result)
    process.exit(1)
})

/*
Users.find({username:'roza'}, (err,result)=>{
    if (err) console.log('error in find Users: ',err)
    console.log('successfully query Users: ', typeof(result), result.length, result[0])
    process.exit(1)
})
*/
