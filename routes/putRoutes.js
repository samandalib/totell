module.exports = {
    putFollow(req,res){
        let restName=req.params.restname
        let restZip = req.params.restzip
        let followStatus =Number(req.params.followstatus)
        let user = req.session.user.username
        let user_id = req.session.user._id
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
            let restQuery = {$and:[{name:{$regex:restName}},{zip:{$regex:restZip}}]}
            req.restaurant_db.find(restQuery, (err,foundRest)=>{
                    if (err) res.status(500).send('Error in Restaurant find query')
                    foundRest[0].followers.push(user_id)
                    console.log('Result[0] is: ', foundRest[0])
                    let res_id = foundRest[0]._id
                    console.log(`res_id: ${res_id}`)
                    req.restaurant_db.replaceOne(restQuery,foundRest[0], (error,updatedRest)=>{
                        if (error) res.status(500).send('Error in replcace query: ', error)
                        res.status(200).send()
                        console.log('Restaurant.replaceOne successfully executed: ', updatedRest)
                    })
                    req.user_db.find({username: user/*Take it from session*/}, (error, founduser)=>{
                        if (error) res.status(500).send('Error in Users.find query', error)
                        console.log(`founduser in Users.find: ${founduser}`)
                        founduser[0].following.push(res_id)
                        req.user_db.replaceOne({username: user/*Take it from session*/},founduser[0],(er,updateduser)=>{
                            if(er) res.status(500).send('error in Users.replaceOne', er)
                            console.log('Users.replaceOne succesfully executed: ', updateduser)
                            res.status(200).send()
                        } )
                    })

            })


/*
            let updateRest = {$push:{followers:{username:user}}}
            req.restaurant_db.update(restQuery,updateRest,
            (err,result)=>{
                if (err) res.status(500).send('There is an error in updating the field: ')
                console.log('restaurant collection succesfully updated: ',result)

            })
            console.log(`from putFollow user: ${user}`)
            let userQuery = {username:user}
            let updateUser = {$push:{following:{name:restName}}}
            req.user_db.update(userQuery, updateUser,
                (err,result)=>{
                if (err) res.status(500).send('There is no user with this username')
                console.log('user collection succesfully updated for following field: ',result)
            })
*/
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
