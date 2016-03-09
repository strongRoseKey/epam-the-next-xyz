var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create a schema for articles
var UserSchema = new Schema({
  username:String,
  password:{ type: String, required: true },
  email:{ type: String, required: true },
});

UserSchema.method('validPassword', function(password, callback) {

    if (password == this.password) {
      return true;
    } else {
      return false;
    }
});

// mongoose.model('Userinfo',UserSchema);
module.exports = mongoose.model('Userinfo',UserSchema);