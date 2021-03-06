const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Users = require('../models/User');
const bcrypt = require('bcrypt')

const loginRouter = express.Router();

loginRouter.use(bodyParser.json());

loginRouter.route('/')
  .post((req, res, next) => {
    Users.findOne({email : req.body.email})
    .then((users) => {
        try{
          if(req.body.password===users.password){
            const token = jwt.sign({ sub: users.id }, "huahuahua", { expiresIn: '7d' });
            res.status = 200; //respon
            res.setHeader('Content-type', 'application/json');
            let result = {
              "username" : users.username,
              "jenis kelamin" : users.jenis_kelamin,
              "token" : token
            }
            res.json(result);
          }
          else{
            res.status = 400; //respon
            res.setHeader('Content-type', 'application/json');
            res.end("Email atau password salah");
          }
        }
        catch(e){
          next(e)
        }
      })
    })


module.exports = loginRouter;