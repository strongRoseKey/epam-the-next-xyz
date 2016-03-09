var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create a schema for articles
var UserSchema = new Schema({
  username:String,
  password:String,
  email:String,
});

mongoose.model('Userinfo',UserSchema);
var Userinfo = mongoose.model('Userinfo');