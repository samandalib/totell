module.exports = {
    postLogin(req,res){
        console.log('username: ', req.body.username)
        console.log('password: ', req.body.password)
        req.user_db.find({username:req.body.username, password:req.body.password}, (err,user)=>{
            if(err){
                res.type('html').status(500);
                res.send('Error in Login: '+ err);
            }
            else if (user.length == 0){
                res.type('html').status(200);
                res.send('There is no  with this username/password in the database')
            } else{
                res.send(`${user} sucessfully logged in`)
            }
        })
    },

    postFilter(req,res){
        if (req.body.searchtext){
            console.log('search text: ', req.body.searchtext)
            let filter = req.body.searchtext
            console.log('filter is: ',filter)
            res.status(200).send('search filter clarified')
        }else{
            res.status(400).send('There is no search parameter, please go to /search route')
        }
    },

    postUserReg(req,res){
        console.log(req.body)
        var newUser= new req.user_db ({//Changed from User to req.user_db
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            country: req.body.country,
            membership: req.body.membership
        });
        newUser.save((err)=>{
            if(err){
                res.type('html').status(500);
                res.send('Error in sign up process: '+err);
            }
            else{
                res.send('user succesfully registered on database');
            }
        })
    },

    postAddRest(req,res){
        var newRestaurant= new req.reastaurant_db ({//changed from Restaurant to req.restaurant_db
            name: req.body.RestName,
            country: req.body.RestCoutnry,
            city: req.body.RestCity,
            address: req.body.RestAddress,
            phone: req.body.RestPhone,
            website: req.body.RestWeb,
            email: req.body.RestEmail,
            owner: req.body.RestOwner,
            menus: [],
        })
        newRestaurant.save((err)=>{
            if(err){
                console.log(req.body.RestName);
                res.type('html').status(500);
                res.send('Error in Resturant Registration process: '+err);
            }
            else{
                console.log(req.body.RestName);
                console.log("record successfully saved")
                res.send("resturant registered")

            }
        })
    },

}
