const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send("User does not exist");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send("Successfully Authenticated");
          console.log(req.user);
        });
      }
    })(req, res, next);
  });
  
  
  router.get("/logout", (req, res, next) => {
      req.logOut();
      res.send("LOGGED OUT");
  });
  
  
  router.post("/register", (req, res) => {
    User.findOne({username: req.body.username}, async (err, doc) => {
      if (err) throw err;
      if (doc) res.send("User Already Exists");
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
        const newUser = new User({
          fullName: req.body.fullName,
          username: req.body.username,
          password: hashedPassword,
        });
        await newUser.save();
        res.send("User created");
      }
    });
  });


  module.exports = router;