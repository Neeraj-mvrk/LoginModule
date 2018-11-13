var mongoose = require('mongoose');
mongoose.Promise = Promise;
var Schema = mongoose.Schema;
mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost:27017/ProjectX",function(err,db){
    if(err){
    console.log("Cannot connect to Database")
}
else{
    console.log("Connection Established");
}
});

module.exports = {
Schema:Schema,
mongoose:mongoose
};
