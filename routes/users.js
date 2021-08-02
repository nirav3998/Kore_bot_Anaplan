var express = require('express');
var crypt = require('crypto');
var router = express.Router();
var fs = require('fs');
var config = require('../config');

var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resources');
});



router.post('/', function(req, res, next) {
  var identity = req.body.identity;
  var clientId = req.body.clientId;
  var clientSecret = req.body.clientSecret;
  var isAnonymous = req.body.isAnonymous || false;
  var aud = req.body.aud || "https://idproxy.kore.com/authorize";
  //var aud = "https://idproxy.kore.com/authorize";
  //res.send("i have written");
  //console.log("hiiii");
  var val = crypt.randomBytes(64).toString('hex')
  var options = {
    
    //"jti":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYWlsdG86bWlrZUBmb28uY29tIn0.Cd7gS9Vk4BiTjNPxhN6R14wAnR70CMW5v-AzfUrsNHU",
    "jti" : val,
    "iat": new Date().getTime(),
    "exp": (new Date(new Date().getTime() + 60 * 59 * 1000).getTime())/1000,
    "aud": aud,
    "iss": clientId,
    "sub": identity,
    "isAnonymous": isAnonymous
  }
	var token = jwt.sign(options, clientSecret);
  //var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYWlsdG86bWlrZUBmb28uY29tIn0.Cd7gS9Vk4BiTjNPxhN6R14wAnR70CMW5v-AzfUrsNHU"
  res.header('alg', "HS256");
  res.header('JWT')
  res.header('Access-Control-Allow-Origin', "*");
  res.send({"jwt":token});
});

module.exports = router;
