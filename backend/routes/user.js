const express = require("express");
const User = require('../models/user');
const router = express.Router();

//ANY DATA REGARDING THE USER SHOULD BE IN THIS FILE
//ASSUMES THAT THE GIVEN API SEARCH BEGINS WITH:
//      /api/v1/user
//ANY ADD ONS TO ABOVE URL NEED TO BE SPECIFIED BELOW

//route to get current user
//returns 'No user' if there is no one authenticated
router.get('', (req, res) => {
    if (req.hasOwnProperty("user")) {
        res.send(req.user);
    } else {
        res.send({data: "No user"});
    }
});

//route to update users pantry
router.post('/updatePantry', (req, res) => {
    //console.log(req.body.pantry);
    User.updateOne({username: req.user.username}, 
        {pantry: req.body.pantry, offsetMin:0, offsetMax:0}, (err, docs) => {
            if (err) {
                console.log(err)
                res.send({data: "Error"})
            } else {
                res.send({data: "Updated pantry"})
            }
        });
});

router.post("/updateRecipes", (req, res) => {
    User.updateOne({username: req.user.username},
        {recipes: req.body.recipes}, (err, docs) => {
            if (err) {
                //console.log(err)
                res.send({data:"Error"})
            } else {
                //console.log("BOUTTA SEND UPDATE")
                res.send({data:"Updated recipes"})
            }
        });
});


router.post("/addFriend", (req, res) => {
    User.findOne({username: req.body.friend}, async (err, doc) => {
        if (err) res.send({data: "Error"});
        if (doc) {
            console.log("FOUND FRIEND")
            //add friend to current user friend list,
            //send update to mongo
            var tmp = req.user.friends
            tmp.push(req.body.friend)
            User.updateOne({username: req.user.username},
                {friends: tmp}, (err, docs) => {
                    if (err) {
                        //console.log(err)
                        res.send({data:"Error"})
                    } else {
                        //console.log("BOUTTA SEND UPDATE")
                        res.send({data:"Friend added", friends: tmp})
                    }
                });

        } else {
            res.send({data: "User does not exist"});
        }
      });
    //res.send({data: "hey there"})
});

router.post("/getFriend", (req, res) => {
    User.findOne({username: req.body.friend}, async (err, doc) => {
        if (err) res.send({data: "Error"})
        if (doc) {
            res.send({data: doc})
        } else {
            res.send({data: "User does not exist"})
        }
    });
});


module.exports = router;