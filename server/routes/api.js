const express = require('express');
const User  = require('../model/googleModel.js');
const jwt = require('jsonwebtoken');
module.exports = function(app,passport){
var userHandler = require('../controller/userController.js');
//var passport = require('../controller/passport.js');
app.route('/auth/register')
     .post(userHandler.register);
app.route('/auth/sign_in')
   .post(userHandler.sign_in);
// app.route('auth/googleData')
//     .get(userHandler.gAuth);
app.route('/googleData')
   .post(userHandler.loginRequired);

   // =====================================
   // GOOGLE ROUTES =======================
   // =====================================
   // send to google to do the authentication
   // profile gets us their basic information including their name
   // email gets their emails
   app.get('/auth/google',
     passport.authenticate('google', { scope: [
       'https://www.googleapis.com/auth/plus.login',
       'https://www.googleapis.com/auth/plus.profile.emails.read'
     ] }
   ));
   app.get('/auth/google/callback',
     passport.authenticate('google', { failureRedirect: '/' }),
     function(req, res) {
       var value = User._id;
       res.redirect('/googleData?{token:value}');
      // res.json({token:jwt.sign({name:User.name,oauthID:User.oauthID,_id:User._id,},'RESTFULAPIs'),expiresIn:7200});
     });
};
// app.post('/signup', (req, res) => {
//   new User({
//     firstname: req.body.firstname,
//     lastname : req.body.lastname,
//     dob      : req.body.dob,
//     country  : req.body.country,
//     email    : req.body.email
//   }).save(function(err,User){
//     console.log(User);
//     if(User){
//       console.log(User+" "+"User Saved Sucesfully to database");
//       res.json(User.firstname+" "+"saved to data base");
//      }
//     else{
//     console.log('An err occured');
//     }
//   });
// });
//};
