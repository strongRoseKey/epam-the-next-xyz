var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create a schema for articles
var ArticleSchema = new Schema({
  title:String,
  url:String,
  image:String,
  username:String,
  summary:String,
  data:Date
});

// mongoose.model('Article',ArticleSchema);
module.exports = mongoose.model('Article', ArticleSchema);


