module.exports = {
    getLogin(req,res){
        console.log('getLogin route launched')
        res.status(200).send('Login Page')
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
        res.status(200).send('This is the search page')
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

}
