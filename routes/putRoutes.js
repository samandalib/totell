module.exports = {
    putFollow(req,res){
        function arrayRemove(arr, value) {

            return arr.filter(function(ele){
                return ele._id.toString() != value.toString();
            });

        }
        let restName=req.params.restname
        let restZip = req.params.restzip
        restName = new RegExp(".*"+restName+".*", "i")
        restZip = new RegExp(".*"+restZip+".*", "i")
        let followStatus =Number(req.params.followstatus)
        let user = req.session.user.username
        let user_id = req.session.user._id
        console.log(`from putFollow: restName:
            ${restName}, restZip:${restZip}, followStatus:${followStatus}, user:${user}`)
        if (followStatus){
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

        } else{
            console.log(restName, restZip)
            let restQuery = {$and:[{name:{$regex:restName}},{zip:{$regex:restZip}}]}

            req.restaurant_db.find(restQuery, (err,foundRest)=>{
                    if (err) res.status(500).send('Error in Restaurant find query in removing section')
                    console.log('Result[0] is: ', foundRest[0])
                    let res_id = foundRest[0]._id
                    let followersArray = foundRest[0].followers
                    let modifiedArray_followers = arrayRemove(followersArray, user_id)
                    foundRest[0].followers = modifiedArray_followers
                    req.restaurant_db.replaceOne(restQuery,foundRest[0], (error,updatedRest)=>{
                        if (error) res.status(500).send('Error in replcace query in removing section : ', error)
                        res.status(200).send()
                        console.log('Restaurant.replaceOne  in removing section executed: ', updatedRest)
                    })
                    req.user_db.find({username: user/*Take it from session*/}, (error, founduser)=>{
                        if (error) res.status(500).send('Error in Users.find query in removing section ', error)
                        console.log(`founduser in Users.find: ${founduser}`)
                        let followingArray = founduser[0].following
                        let modifiedArray_following = arrayRemove(followingArray, res_id)
                        founduser[0].following = modifiedArray_following
                        req.user_db.replaceOne({username: user/*Take it from session*/},founduser[0],(er,updateduser)=>{
                            if(er) res.status(500).send('error in Users.replaceOne in removing section ', er)
                            console.log('Users.replaceOne in removing section executed: ', updateduser)
                            res.status(200).send()
                        } )
                    })

            })
            res.send('working on followStatus=1 to unfollow the page')
        }

    },

/*
    postComment(req,res){
        if (req.params.name && req.params.zip){
            console.log("running if section of getFollowCount callback")

            let restName = req.params.name
            let restZip = req.params.zip
            restName = new RegExp(".*"+name+".*", "i")
            restZip = new RegExp(".*"+zip+".*", "i")
            let restQuery = {$and:[{name:{$regex:restName}},{zip:{$regex:restZip}}]}

            let commentList = []
            let newComment = {text:req.body.commentText, user:req.session.user.username, posted_at:Date.now()}

            req.restaurant_db.findOne(restQuery,(error, foundRest)=>{
                if (error) res.status(500).send('Error in finding Restaurant for updating comments', error)
                console.log(`foundRest at putComment ${foundRest}`)
                foundRest.comments.push(newComment)
                req.restaurant_db.replaceOne(restQuery, foundRest, (err, replacedRest)=>{
                    if (err) res.status(500).send('error in replacing the restaurant', err)
                    console.log(`replaced object at putComment ${replacedRest}`)
                    res.state(200).send(replacedRest)
                })
            })
    }else{
        res.status(500).send('Restaurant properties are not specified correctly')
    }
}
*/

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
