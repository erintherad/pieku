var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PiekusSchema = new Schema({
  title: String,
  author: String,
  line1: String,
  line2: String,
  line3: String,
  date: String
});

var Pieku = mongoose.model('Pieku', PiekusSchema);

module.exports = Pieku;