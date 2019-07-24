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

    putLikesCount(req,res){
        console.log('putLikesCount Launched')
        let user = req.session.user.username
        let restaurant_id = req.params.restid
        console.log(`restaurant_id in putLikesCount ${restaurant_id}`)
        let comment_id = req.params.comment_id
        console.log(`comment_id in putLikesCount ${comment_id}`)
        let like_status = req.params.status

        req.restaurant_db.findOne({_id:restaurant_id}, (error, foundRest)=>{
            if (error) res.status(500).send('error in finding restaurant', error )
            console.log(`found restaurant at putLikesCount: ${foundRest}`)
            for (let i=0; i<foundRest.comments.length; i++){//Go find the comment
                if (foundRest.comments[i]._id == comment_id){ // when comment is found
                    if (like_status == 1){//if the like_status is 1 i.e. user likes the comment
                        if (foundRest.comments[i].DisLikes.indexOf(user)>=0){//see if the user Disliked the comment before
                            let remove_index = foundRest.comments[i].DisLikes.indexOf(user)//get the index of user in DisLikes array
                            foundRest.comments[i].DisLikes.splice(remove_index, 1)//remove it from the list of DisLikes
                            foundRest.comments[i].Likes.push(user)//Add it to the list of Likes
                        }else if (foundRest.comments[i].Likes.indexOf(user)>=0){
                            continue
                        } else{
                            foundRest.comments[i].Likes.push(user)  // add it to likes
                        }

                    } else if (like_status == -1){//if like_status is -1 i.e. user dislikes the comment
                        if (foundRest.comments[i].Likes.indexOf(user)>=0){//see if the user  liked the comment before
                            let remove_index = foundRest.comments[i].Likes.indexOf(user)// get the index of the user in Likes array
                            foundRest.comments[i].Likes.splice(remove_index, 1)//remove it from the list of Likes
                            foundRest.comments[i].DisLikes.push(user)// add it to the list of dislikes
                        } else if (foundRest.comments[i].DisLikes.indexOf(user)>=0){//if the user is nutral about the comment
                            continue
                        }else{
                            foundRest.comments[i].DisLikes.push(user)
                        }

                    }else if (like_status == 0){//to make the user vote nutral
                        if (foundRest.comments[i].Likes.indexOf(user)>=0){//see if the user  liked the comment before
                            let remove_index = foundRest.comments[i].Likes.indexOf(user)// get the index of the user in Likes array
                            foundRest.comments[i].Likes.splice(remove_index, 1)//remove it from the list of Likes
                        } else if (foundRest.comments[i].DisLikes.indexOf(user)>=0){//see if the user Disliked the comment before
                            let remove_index = foundRest.comments[i].DisLikes.indexOf(user)//get the index of user in DisLikes array
                            foundRest.comments[i].DisLikes.splice(remove_index, 1)//remove it from the list of DisLikes
                        }
                    }
                }
            }
            req.restaurant_db.replaceOne({_id:restaurant_id}, foundRest, (err, replacedRest)=>{
                if (err) res.status(500).send('Error in replacing the restaurant object at update follows', err)
                console.log('Likes/DisLikes counts successfully updated')
            })
        })

    },
}
