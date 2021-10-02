//--------------------IMPORTS--------------------
const express = require('express'); 
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
//--------------------END-IMPORTS--------------------


//--------------------MIDDLEWARE--------------------
dotenv.config();
const app = express(); 
const port = process.env.PORT || 8000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);

app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use(cookieParser(process.env.SECRET));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/authentication');
const ingredientRoutes = require('./routes/ingredients');
//--------------------END-MIDDLEWARE--------------------



//--------------------MONGO-CONNECTION--------------------
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.catch(err => {
  //if error connecting log it and exit
  console.log(err)
  process.exit(1)
})
//otherwise connected and start listening on specified port
.then(async client => {
  app.listen(port, () => {
      console.log(`Connected to MongoDB\nListening on port ${port}`);
  })
})
//--------------------END-MONGO-CONNECTION--------------------





//--------------------ROUTES--------------------

//User routes
app.use("/api/v1/user", userRoutes);

//Authentication routes
app.use("/api/v1/auth", authRoutes);

//Ingredients routes
app.use("/api/v1/ingredients", ingredientRoutes);


//--------------------END-ROUTES--------------------