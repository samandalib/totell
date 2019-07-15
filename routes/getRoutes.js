module.exports = {
    getHomePage(req,res){
        res.status(200).send('Welcome to Totell App')
    },
    getSignUp(req,res){
        res.status(200).send('This must be the sign up form page')
    },

    getLogin(req,res){
/*
        console.log('from getLogin: ',req.session.user.email)
        if(req.session.user.username){
            res.send(`already logged in with ${req.session.user.username}`)
        }
*/
        if(req.session.user){
            /*
console.log('From CheckSignIn MW: ', req.session.user)
*/
            let route = `/regprofile/${ req.session.user.username}`
            res.send(`Dear ${req.session.user.username} you are already logged in!`)
            /*
res.redirect(route)
*/
        } else {
            res.status(200).send(`No active session!`)
        }
    },

    getRestShow(req,res){
        req.restaurant_db.find((err, allRestaurants)=>{
            if (err){
                res.type('html').status(500);
                res.send('Error in querying db: '+ err);
            }
            else if(allRestaurants.length == 0 ){
                res.type('html').status(200);
                res.send('There is no Restaurant info in database');
            }
            else{
                let list = res.json(allRestaurants);
                console.log('send list of all Restaurants')
            }
        })
    },

    getSearch(req,res){
        if(req.session.user.username){
            let sessionInfo =req.session.json()
            res.status(200).send(sessionInfo)
        } else{
            res.status(403).send('You must login before search')
        }

    },

    getSearchFilter(req,res){

        let filter = req.params.filter
        let filterParts = filter.split(' ')

        console.log('from /search: ', filter)
        let filterRegex= new RegExp(".*"+filter+".*", "i")
        console.log(`filterRegex : ${filterRegex}`)
        req.restaurant_db.find(
            {'$or':[{name:{$regex: filterRegex}},{address:{$regex: filterRegex}},{city:{$regex: filterRegex}},{state:{$regex: filterRegex}}]},
            {"name":1, "state":1, "city":1, "address":1, "zip":1, },
            (err,result)=>{
                if (err){
                    res.type('html').status(500);
                    res.send('Error in Searching db: '+ err);
                }else if (result.length == 0){
                    res.type('html').status(200)
                    res.send('There is no result for this search')
                } else{
                    console.log(result)
                    let srchRslt = res.json(result)
                    console.log('List of Results with Regex Search is sent')
                //srchRslt = {}
                //console.log('SEARCH RESULT RESET AFTER SENDING JSON')
            }

        })

    },

    getFullData(req,res){
        let filter = req.params.filter
        console.log('Filter in getFullData route: ', filter)
        if (filter){
            console.log('from /search/restaurant: ', filter)
            req.restaurant_db.findOne({name:filter}, (err,result)=>{
                if (err){
                    res.type('html').status(500);
                    res.send('Error in Searching db: '+ err);
                } else{
                    console.log(result)
                    let srchRslt = res.json(result)
                    console.log('Full data for the selected Item sent')
                    //srchRslt = {}
                    //console.log('SEARCH RESULT RESET AFTER SENDING JSON')
                }

            })
        } else {
            res.send('there is no filter set to search for')
        }
    },

    getRestMenu (req,res){
        let restaurant = req.params.restaurant
        let zip = req.params.zip
        let restNameRegex= new RegExp(".*"+restaurant+".*", "i")
        let restZipRegex = new RegExp(".*"+zip+".*", "i")
        console.log('From getRestMenu: ', restaurant)
        req.restaurant_db.findOne({$and:[{name:{$regex:restNameRegex}},{zip:{$regex:restZipRegex}}]},
            (err,result)=>{
            if (err){
                res.type('html').status(500);
                res.send('Error in Searching db: '+ err);
            } else{
                console.log('result from getRestMenu', result)
                res.status(200).send(result)
                console.log('Full data for the selected Item sent')
                //srchRslt = {}
                //console.log('SEARCH RESULT RESET AFTER SENDING JSON')
            }

        })
    },

    getRestProfile(req,res){
        let restName = req.params.restname
        let restZip = req.params.zip
        let restNameRegex= new RegExp(".*"+restName+".*", "i")
        let restZipRegex = new RegExp(".*"+restZip+".*", "i")
        console.log(`getting data for ${restName}`)
        req.restaurant_db.findOne({$and:[{name:{$regex:restNameRegex}},{zip:{$regex:restZipRegex}}]},
            {"menu":0, "owner":0, "menu_url":0, "id":0 },
            (err,result)=>{
                if (err) {
                    res.status(500).send('Error in searching db: '+err)
                } else{
                    res.status(200).send(result)
                    console.log('Data succesfully sent to client: ', result)
                }

            })
    },
    getRestInfo(req,res){
        let id = req.params.id
        let _id = req.ObjectId(id)
        req.restaurant_db.find({"_id":req.ObjectId(_id)},(err,result)=>{
            if (err) res.status(500).send('Error in finding restaurant with _id filter: ', err)
            console.log('Successfully found restaurant with _id filter: ', result)
            res.status(200).send(result)
        })
    },

    getRegProfile(req,res){
        let username = req.params.user
        if (req.session.user){
            let sessionOwner = req.session.user.username
            console.log(`from getRegProfile username:${username}, sessionOwner:${sessionOwner}`)
            if ( username && sessionOwner == username ){
                console.log('from if statement')

                req.user_db.findOne({username: username}, (err,result)=>{
                    if (err){
                        res.type('html').status(500);
                        res.send('Error in Searching db: '+ err);
                    } else{
                        console.log(result)
                        res.status(200).send(result)
                        //srchRslt = {}
                        //console.log('SEARCH RESULT RESET AFTER SENDING JSON')
                    }
                })
            } else{
                console.log('from else statement')
                res.status(400).send('You are not authorized to visit this page')
            }
        } else{
            res.status(403).send('You are not authorized to visit this page')
        }

    },

    getFollowStatus(req,res){
        let restName = req.params.restname
        let restZip = req.params.restzip
        restName = new RegExp(".*"+restName+".*", "i")
        restZip = new RegExp(".*"+restZip+".*", "i")
        let restQuery = {$and:[{name:{$regex:restName}},{zip:{$regex:restZip}}]}
        let user = req.session.user.username
        console.log(`user at getFollowStatus: ${user}` )
        req.restaurant_db.find(restQuery, (err,foundRest)=>{
            if (err) res.status(500).send('Error in Restaurant find query: ', err)
            let followers = foundRest[0].followers
            req.user_db.find({username:user},(err,foundUser)=>{
                if (err) res.status(500).send('Error in finding user ',err)
                console.log(`foundUser is ${foundUser}`)
                let user_id = foundUser[0].valueOf()._id.toString()
                let checkExistence = 0
                console.log(`followers : ${followers}`)
                for (let i=0; i<followers.length; i++){
                    console.log(`${i}. ${followers[i]._id} and ${user_id} `,followers[i].valueOf()._id.toString() == user_id )
                    if(followers[i].valueOf()._id.toString() == user_id){
                        checkExistence ++
                    }
                }
                console.log(`CheckExistence: ${checkExistence}`)
/*
                console.log(`user_id at getFollowStatus: ${user_id}`, typeof(user_id))
                console.log('followers.indexOf(user_id): ', followers.indexOf(user_id))
*/
                if (!checkExistence){
                    res.status(200).send([{followStatus:0}])
                } else{
                    res.status(200).send([{followStatus:1}])
                }
            })
        })

    },

    getFollowings(req,res){
        let user = req.params.user
        console.log(`From getFollowings: ${user}`)
        if (req.session.user){
            let activeUser = req.session.user.username
            if (user == activeUser){
                req.user_db.find({name:user}, {followings:1}, (err, result)=>{
                    if (err) res.status(300).send('error in searching database'+err)
                    res.status(200).send(result)
                })
            }
        } else {
            res.status(403).send('unauthorized request!')
        }
    },

    getRestBrief(req,res){
        restId = req.ObjectId(req.params.id)
        console.log(`restId at getRestBrief: ${restId}`)
        queryObject = {"_id": restId}
        console.log(`queryObject at getRestBrief: ${queryObject}`)
        req.restaurant_db.findOne(queryObject, {name:1, country:1,state:1, city:1, zip:1}, (err, foundRestaurant)=>{
            if (err) res.status(500).send('error in finding restaurant with its _id: ',err)
            console.log(`foundRestaurant at getRestBrief: ${foundRestaurant}`)
            res.status(200).send(foundRestaurant)
        })

    },

    getUserInfo(req,res){
        if (req.session.user){
            let username = req.session.user.username
            console.log(`username at getUserInfo: ${username}`)
            res.status(200).send({username:username})
        } else{
            res.status(404).send('No Active Session')
        }
    },

    getFollowCount(req,res){
        if (req.params.name && req.params.zip){
            console.log("running if section of getFollowCount callback")
            let restName = req.params.name
            let restZip = req.params.zip
            restName = new RegExp(".*"+name+".*", "i")
            restZip = new RegExp(".*"+zip+".*", "i")
            let restQuery = {$and:[{name:{$regex:restName}},{zip:{$regex:restZip}}]}
            req.restaurant_db.findOne(restQuery, {followers:1}, (err, foundRest)=>{
                if (err) res.status(500).send(`error in find query for followCount of Restaurant ${err}`)
                console.log(`FoundRest at getFollowCount: ${foundRest}`)

                res.status(200).send(foundRest[0])
            })
        } else if (req.params.name && !req.params.zip){
            console.log("running elseif section of getFollowCount callback")
            req.user_db.findOne({username:req.params.name}, {following:1}, (error, foundUser)=>{
                if (error) res.status(500).send(`error in find query for followCount of User ${error}`)
                console.log(`FoundUser at getFollowCount: ${foundUser}`)
                res.status(200).send(foundUser[0])
            })
        }

    }

}
