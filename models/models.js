var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var deepPopulate = require('mongoose-deep-populate');    

// Comment schema on posts
var CommentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author'
  },
  text: String
});

// Author schema on posts
var AuthorSchema = new Schema ({
  name: String
})    

// Pieku schema for posts
var PiekusSchema = new Schema({
  title: String,
  author: {
  	type: Schema.Types.ObjectId,
  	ref: 'Author'
  },
  line1: String,
  line2: String,
  line3: String,
  date: String,
  comments: [CommentSchema]
});

PiekusSchema.plugin(deepPopulate);

var Pieku = mongoose.model('Pieku', PiekusSchema);
var Comment = mongoose.model('Comment', CommentSchema);
var Author = mongoose.model('Author', AuthorSchema);

module.exports.Pieku = Pieku;
module.exports.Comment = Comment;
module.exports.Author = Author;