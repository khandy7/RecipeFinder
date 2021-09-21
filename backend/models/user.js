var mongoose = require('mongoose');

var user = new mongoose.Schema({
  fullName: String,
  username: String,
  password: String,
});

module.exports = mongoose.model("User", user);