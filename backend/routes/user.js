const express = require("express");
const router = express.Router();

//ANY DATA REGARDING THE USER SHOULD BE IN THIS FILE
//ASSUMES THAT THE GIVEN API SEARCH BEGINS WITH:
//      /api/v1/user
//ANY ADD ONS TO ABOVE URL NEED TO BE SPECIFIED BELOW

router.get('', (req, res) => {
    if (req.hasOwnProperty("user")) {
        res.send(req.user);
    } else {
        res.send({data: "No user"});
    }
});

//testing separate route files, this route is accessable from:
//          /api/v1/user/testing
router.get('/testing', (req, res) => {
    res.send({data: "testing stuff"});
});


module.exports = router;