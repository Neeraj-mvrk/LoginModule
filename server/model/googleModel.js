var db = require('../config/db'),
googleSignin = new db.Schema({
 oauthID: Number,
 name: String,
 created: Date
});
module.exports = db.mongoose.model('Guser',googleSignin);
