'use strict'
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser  = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');
const passport = require('passport');
//Get our api route
const app = express();
const urlencoded_body_parser = bodyParser.urlencoded({
    extended: true
});
app.use(passport.initialize());
app.use(passport.session());
require('./server/controller/passport.js')(passport);
//Parser for Post Data
app.use (bodyParser.json()); // basically tells the system that you want json to be used.
app.use(urlencoded_body_parser);  // basically tells the system whether you want to use a simple algorithm for shallow parsing (i.e. false) or complex algorithm for deep parsing that can deal with nested objects (i.e. true).

// Point static path to public
app.use(express.static(path.join(__dirname,'dist')));

const mongo = require('./server/config/db.js');
app.use(function(req,res,next){
  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]=='JWT'){
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs',  function(err,decode){
      if(err) req.user = undefined;
      req.user = decode;
      next();
    });
  }else{
    req.user = undefined;
    next();
  }
})
// Set our api routes
var routes = require('./server/routes/api.js');
routes(app,passport);


// Catch all other routes and return the index file
app.all('*',(req,res)=>{                                     //This catch all route, denoted with *, MUST come last after all other API routes have been defined.
	res.sendFile(path.join(__dirname,'dist/index.html'));
});

const port = process.env.PORT || '7000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
