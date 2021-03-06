var mongoose = require('mongoose');

var user = new mongoose.Schema({
  fullName: String,
  username: String,
  password: String,
  pantry: Array,
  recipes: Array,
  friends: Array,
  offsetMin: Number,
  offsetMax: Number,
});

module.exports = mongoose.model("User", user);