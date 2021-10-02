const express = require("express");
const Ingredient = require("../models/ingredients");
const router = express.Router();

router.get('/getAll', (req, res) => {
    Ingredient.find({}).lean().exec(function (err, ingredients) {
        if (err){
            throw err
        } else {
            res.send(ingredients);
        }
    })
    //res.send({"name": "WUSSUP"})
});


module.exports = router;