const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send({"data": "User does not exist"});
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          User.updateOne({username: req.user.username}, 
            {offsetMin:0, offsetMax:0}, (err, docs) => {
                if (err) {
                    console.log(err)
                    //res.send({data: "Error"})
                } else {
                    //console.log("UPDATED OFFSET")
                    //res.send({data: "Updated pantry"})
                }
          });
          res.send({"data": "Successfully Authenticated"});
        });
      }
    })(req, res, next);
  });
  
  
  router.get("/logout", (req, res, next) => {
      req.logOut();
      res.send({"data":"LOGGED OUT"});
  });
  
  
  router.post("/register", (req, res) => {
    User.findOne({username: req.body.username}, async (err, doc) => {
      if (err) throw err;
      if (doc) res.send({"data":"User Already Exists"});
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
        const newUser = new User({
          fullName: req.body.fullName,
          username: req.body.username,
          password: hashedPassword,
          pantry: Array,
          recipes: Array,
          friends: Array,
          offsetMin: 0,
          offsetMax: 0,
        });
        await newUser.save();
        res.send({"data": "User created"});
      }
    });
  });


  module.exports = router;