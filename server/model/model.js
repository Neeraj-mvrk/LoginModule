var dbConfig = require('../config/db'),
    bcrypt = require('bcrypt');

var signupSchema = new dbConfig.Schema({

  firstname :String,
  lastname  :String,
  dob       :String,
  country   :String,
  email     :String,
  hash_password  :String,
 });
signupSchema.methods.comparePassword = function(password){
  return  bcrypt.compareSync(password,this.hash_password);
};
module.exports = dbConfig.mongoose.model('User',signupSchema);
