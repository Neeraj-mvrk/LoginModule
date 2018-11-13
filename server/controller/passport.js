'use strict'
// load all the things we need
var passport=require('passport');
//jwt = require('jsonwebtoken');
var LocalStrategy    = require('passport-local').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;
// var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var jwt = require('jsonwebtoken');
// load up the user model
var User  = require('../model/googleModel.js');

// load the auth variables
var configAuth = require('../config/auth');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user){
        console.log(user);
          if(!err) done(null, user);
          else done(err, null);
        });
    });

    // code for login (use('local-login', new LocalStategy))
    // code for signup (use('local-signup', new LocalStategy))
    // code for facebook (use('facebook', new FacebookStrategy))
    // code for twitter (use('twitter', new TwitterStrategy))

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================

    passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,

    },

    function(request, accessToken, refreshToken, profile, done) {
    User.findOne({ oauthID: profile.id }, function(err, user) {
      if(err) {
        console.log(err);  // handle errors!
      }
      if (!err && user !== null) {
        done(null, user);
      } else {
        user = new User({
          oauthID: profile.id,
          name: profile.displayName,
          created: Date.now()
        });
        console.log(user);
        user.save(function(err) {
          if(err) {
            console.log(err);  // handle errors!
          } else {
            console.log("saving user ...");
            done(null, user);
            return res.json({token:jwt.sign({name:User.name,oauthID:User.oauthID,_id:User._id,},'RESTFULAPIs'),expiresIn:7200});
          }
        });
      }
    });
  }
));

};
