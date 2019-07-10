module.exports = {
    putFollow(req,res){
        let restName=req.params.restname
        let restZip = req.params.restzip
        let followStatus =Number(req.params.followstatus)
        let user = req.session.user.username
        let restId = ""
        console.log(`from putFollow: restName:
            ${restName}, restZip:${restZip}, followStatus:${followStatus}, user:${user}`)
/*
        req.restaurant_db.findOne({$and:[{name:restName},{zip:restZip}]},(err,result)=>{
            if (err) console.log('error in finding the restaurant or its _id')
            console.log('restaurant query result for _id is:', result)
            restId = result
            }
        )
*/
/*
        console.log(`restId : ${restId}`)
*/
        if (!followStatus){
            restName = new RegExp(".*"+restName+".*", "i")
            restZip = new RegExp(".*"+restZip+".*", "i")
            console.log(restName, restZip)
            req.restaurant_db.update({$and:[{name:{$regex:restName}},{zip:{$regex:restZip}}]},{$push:{followers:{username:user}}},
            (err,result)=>{
                if (err) res.status(500).send('There is an error in updating the field')
                console.log('restaurant collection succesfully updated: ',result)

            })
            console.log(`from putFollow user: ${user}`)
            req.user_db.update({username:user}, {$push:{following:{name:restName}}} ,
                (err,result)=>{
                if (err) res.status(500).send('There is no user with this username')
                console.log('user collection succesfully updated for following field')
            })
/*
            req.restaurant_db.findeOne({$and:[{name:restName},{zip:restZip}]},{name:1,zip:1,city:1,state:1,followers:1},
                (err,result)=>{
                if (err) console.log('error in finding the data for updated restaurant')
                console.log('restaurant query result for _id is:', result)
                res.status(204).send(result)
            })
*/
        } else{
            res.send('working on followStatus=1 to unfollow the page')
        }

    },

/*
    putUserFollowing(req,res){
        let user = req.session.user.username
        let rest = req.params.restname
        req.user_db.update({name:user},{$push:{following:{name:rest}}},
        (err,result)=>{
            if (err) res.status(500).send('There is an error in updating the field')
            console.log('restaurant collection succesfully updated: ',result)

        })
    }
*/

}
