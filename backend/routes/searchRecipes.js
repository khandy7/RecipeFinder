const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const axios = require("axios")
const User = require('../models/user');
dotenv.config();

router.get('', (req, res) => {
    //console.log(req.body.cuisine)
    res.send({data: "PROVIDE ANOTHER ROUTE TO URL"});
});


//Get recipes based on cuisine type
router.post('/cuisineSearch', (req, res) => {
    let cuisine = ""
    if (req.body.cuisine !== "All Cuisines") {
        cuisine = "&cuisine=" + req.body.cuisine
    }

    const searchURL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + process.env.SPOONACULAR_API_KEY + cuisine
    axios.get(searchURL)
    .then(function (response) {
       // console.log(response.data)
        res.send({data: response.data})
    })
    .catch(function (error) {
        res.send({data: error})
    })

});


//get recipes based on users virtual pantry
router.post("/pantrySearch", (req, res) => {
    let ings = "&ingredients="
    const rank = "&ranking=" + req.body.rank
    let offset = "&offset="
    let min = req.user.offsetMin
    let max = req.user.offsetMax
    if (req.body.rank === 1) {
        offset += max
        max += 3
    } else {
        offset += min
        min += 3
    }
    console.log(min)
    console.log(max)
    const userRecipes = req.user.recipes

    //parse ingredients to get list that works with api
    for (let i = 0; i < req.body.pantry.length; i++) {
        if (i == req.body.pantry.length - 1) {
            ings += "+" + req.body.pantry[i].replace(/\s/g, '')
        } else if(i == 0) {
            ings += req.body.pantry[i].replace(/\s/g, '') + ","
        } else {
            ings += "+" + req.body.pantry[i].replace(/\s/g, '') + ","
        }
    }

    //OFFSET NOW WORKS FOR PANTRY SEARCH, MAY NEED TO CHANGE INCREMENT AMOUNT, FIX FRONTEND SO IT SAYS NO
    //MORE RECIPES WHEN THE LIST IS EMPTY

    User.updateOne({username: req.user.username}, 
    {offsetMin:min, offsetMax:max}, (err, docs) => {
        if (err) {
            console.log(err)
            //res.send({data: "Error"})
        } else {
            //console.log("UPDATED OFFSET")
            //res.send({data: "Updated pantry"})
        }
    });
    
    const searchURL = "https://api.spoonacular.com/recipes/findByIngredients?&apiKey=" + process.env.SPOONACULAR_API_KEY + ings + rank + offset

    axios.get(searchURL)
    .then(function (response) {

        //need to fix algorithm here to get new recipes to user instead of ones they have already added
        //maybe add a state in findRecipes that I can send here to keep track of current sessions progress, use it as an offset

        res.send({data: response.data})
    })
    .catch(function (error) {
        res.send({data: error})
    })
});


//get info on one recipe
router.post("/getRecipeInfo", (req, res) => {
    const id = req.body.id;
    const searchUrl = "https://api.spoonacular.com/recipes/" + id + "/information?apiKey=" + process.env.SPOONACULAR_API_KEY
    //send req to spoonacular to get recipe info
    axios.get(searchUrl)
    .then(function (response) {
        res.send({data: response.data})
    })
    .catch(function (error) {
        res.send({data: error});
    })
    //res.send({data: "hey"})
})



module.exports = router;