let Restaurant = require('./restaurant.js')
let Users = require('./user.js')
var ObjectId = require('mongodb').ObjectId;
const fs=require('fs')
const path = require('path')

fs.readFile(path.join(__dirname,'/default_user_photo.png'), (err, data)=>{
    if (err) console.log('error in reading file')
    console.log('file data read succesfully', data)
    Users.updateOne({user:'hesam'}, {$set:{photo:data}},(err,result)=>{
            if (err) console.log('error in updating users photos: ', err)
            console.log('Updated users photos with default picture ', result)
            process.exit()
    })
})

/*
Restaurant.updateMany({}, {$set:{country:"United States of America"}},(err, result)=>{
    if (err) console.log('cannot update many documents : ',err)
    console.log('updated many documents: ', result)
    process.exit()
})
*/

//Restaurant.find({name:"Brick Oven Restaurant"/*Take it from url params*/}, (err,result)=>{
//        if (err) console.log('error in find query: ', err)
//        result[0].followers.push(ObjectId("5d233beaa3cbc73be4ff0e26"/*Take it from session*/))
//        console.log('Result[0] is: ', result[0])
//        let res_id = result[0]._id
//        console.log(`res_id: ${res_id}`)
//        Restaurant.replaceOne({name:"Brick Oven Restaurant"},result[0], (error,rslt)=>{
//            if (error) res.status(500).send('Error in update query: ', error)
//            console.log('Record Successfully replaced: ', rslt)
//            console.log('rslt[0]: ',rslt[0])
//        })
//        Users.find({username: "hesam"/*Take it from session*/}, (error, res)=>{
//            if (error) console.log('error in Users.find: ', error)
//            console.log(`res in Users.find: ${res}`)
//            res[0].following.push(res_id)
//        })

//})



/*
Restaurant.find({name:"Sammy's Woodfired Pizza"}, (err,result)=>{
    if (err) res.status(500).send('Error in find query: ', err)
    let updatedObj = result[0]



/*
Restaurant.update({name:"Sammy's Woodfired Pizza"},{$push:{followers:{username:'hesam'}}},
(err,result)=>{
    if (err) console.log('error in update:', err)
    console.log('successful update: ',result)
})
*/
//var o_id = new ObjectId("5d24991b2073e362d8dca5ec");
/*
Users.find({"_id":"5ce268f9a783fe2f9cf367cb"}, (err,result)=>{
    if (err) console.log('error in find:', err)
    console.log('successful query: ',result)
    process.exit(1)
})
*/

/*
Users.find({username:'roza'}, (err,result)=>{
    if (err) console.log('error in find Users: ',err)
    console.log('successfully query Users: ', typeof(result), result.length, result[0])
    process.exit(1)
})
*/
