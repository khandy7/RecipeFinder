var mongoose = require('mongoose');

var ingredient = new mongoose.Schema({
  name: String,
  apiID: String,
});

module.exports = mongoose.model("Ingredient", ingredient);