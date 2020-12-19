const { use } = require("../routes/users");
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode')
const Users = require('../models/User');

async function auth(req) {
  console.log(req.headers);
  if (!req.signedCookies.user) { // added
    var authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("Failed")
      return false;
    }
    console.log(authHeader)//Bearer token
    var authorization = authHeader.split(' ')[1],decoded;
    console.log(authorization)
    var decoded = jwt_decode(authorization);
    var userId = decoded.sub
    const users = await Users.findById(userId)
    console.log(users)

    if (users) {
      if(users.username === "ADMIN"){
        return true;
      }
      else return false
    } 
    else {
      return false
    }
    };
  }
module.exports = auth;