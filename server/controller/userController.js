'use strict'
var mongoose =  require('mongoose'),
jwt = require('jsonwebtoken'),
bcrypt =require('bcrypt'),
User = require('../model/model.js');
exports.register = function(req,res){
var newUser = new User(req.body);
newUser._doc.hash_password = bcrypt.hashSync(req.body.hash_password,8);
console.log(newUser.hash_password);
newUser.save(function(err,User){
  console.log(User);

  if(User){
    //  User.hash_password=undefined;
    console.log(User.hash_password);
    console.log(User.firstname+" "+User.lastname+" "+"User Saved Sucesfully to database");
    res.json(User.firstname+" "+"saved to data base");
   }
  else{
  console.log('An err occured');
  return res.status(400).send({
    mesg:err
  });
  }
});
};
exports.sign_in = function(req,res){
User.findOne({
email:req.body.email},
  function(err,User){
    if(err)throw err;
    if(!User){
      res.status(401).json({msessage: 'Authentication failed. User not found'});
  }else if (User) {
    if(!User.comparePassword(req.body.hash_password)){
      res.status(401).json({msessage:'Authentication failed. Wrong Password'});
    }else{
      return res.json({token:jwt.sign({email:User.email,fullName:User.firstname && User.lastname,_id:User._id,},'RESTFULAPIs'),expiresIn:7200});
    }
  }
})
};
// exports.gAuth = function(req,res){
//   User.
// }

exports.loginRequired = function(req,res,next){
if(req.user){
  next();
}else{
  return res.status(401).json({message:'Unauthorize user!'});
}
};
