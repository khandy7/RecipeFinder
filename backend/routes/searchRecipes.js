const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const axios = require("axios")
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
    
    const searchURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + process.env.SPOONACULAR_API_KEY + ings + rank

    axios.get(searchURL)
    .then(function (response) {
        res.send({data: response.data})
    })
    .catch(function (error) {
        res.send({data: error})
    })
    //res.send({data: "Hey there"})
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