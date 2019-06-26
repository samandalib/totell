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
        if (filter){
            console.log('from /search: ', filter)
            req.restaurant_db.find({name:filter},(err,result)=>{
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
                    srchRslt = {}
                    console.log('SEARCH RESULT RESET AFTER SENDING JSON')
                }

            })
        } else {
            res.send('there is no filter set to search for')
        }
    }
}
