let Restaurant = require('./restaurant.js')
let Users = require('./user.js')
var ObjectId = require('mongodb').ObjectId;



Restaurant.find({name:"Brick Oven Restaurant"/*Take it from url params*/}, (err,result)=>{
        if (err) console.log('error in find query: ', err)
        result[0].followers.push(ObjectId("5d233beaa3cbc73be4ff0e26"/*Take it from session*/))
        console.log('Result[0] is: ', result[0])
        let res_id = result[0]._id
        console.log(`res_id: ${res_id}`)
        Restaurant.replaceOne({name:"Brick Oven Restaurant"},result[0], (error,rslt)=>{
            if (error) res.status(500).send('Error in update query: ', error)
            console.log('Record Successfully replaced: ', rslt)
            console.log('rslt[0]: ',rslt[0])
        })
        Users.find({username: "hesam"/*Take it from session*/}, (error, res)=>{
            if (error) console.log('error in Users.find: ', error)
            console.log(`res in Users.find: ${res}`)
            res[0].following.push(res_id)
        })

})
/*
let updatedObj = orgnlObject[0].followers.push(ObjectId("5d233beaa3cbc73be4ff0e26"))
console.log('updatedObj: ', updatedObj)
*/

/*
Restaurant.find({name:"Sammy's Woodfired Pizza"}, (err,result)=>{
    if (err) res.status(500).send('Error in find query: ', err)
    let updatedObj = result[0]
/*
    console.log(typeof(updatedObj._id),updatedObj._id )
*/
/*
    updatedObj.followers.push(ObjectId("5d233beaa3cbc73be4ff0e26"))
    console.log(updatedObj, typeof(updatedObj))
    result.save((err,updatedObj)=>{
        if (err) res.status(500).send()
        console.log('updateObj is:', updatedObj)
        res.send(updatedObj)
    })
})
*/

/*
Restaurant.update({name:"Sammy's Woodfired Pizza"},{$push:{followers:{username:'hesam'}}},
(err,result)=>{
    if (err) console.log('error in update:', err)
    console.log('successful update: ',result)
})
*/
//var o_id = new ObjectId("5d24991b2073e362d8dca5ec");
/*
Users.find({"_id":ObjectId("5d25df306d017087b04056f9")}, (err,result)=>{
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
