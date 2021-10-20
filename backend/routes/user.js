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
        {pantry: req.body.pantry}, (err, docs) => {
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
        })
});

//testing separate route files, this route is accessable from:
//          /api/v1/user/testing
router.get('/testing', (req, res) => {
    res.send({data: "testing stuff"});
});


module.exports = router;