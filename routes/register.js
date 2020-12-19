const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Users = require('../models/User');
const bcrypt = require('bcrypt')

const registerRouter = express.Router();

registerRouter.use(bodyParser.json());

registerRouter.route('/')
  .post((req, res, next) => {
    Users.create(req.body)
    .then((users) => {
      console.log("REGISTER BERHASIL", users);
        res.status = 200; //respon
        res.setHeader('Content-type', 'application/json');
        res.json(users);
    });
  })


module.exports = registerRouter;