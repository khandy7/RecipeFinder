var mongoose = require('mongoose');

var user = new mongoose.Schema({
  fullName: String,
  username: String,
  password: String,
  pantry: Array,
});

module.exports = mongoose.model("User", user);