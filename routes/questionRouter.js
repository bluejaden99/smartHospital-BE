const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const QuestionList = require('../models/questionList');

const questionRouter = express.Router();

questionRouter.use(bodyParser.json());

questionRouter.route('/')
  .get((req, res, next)=>{
    QuestionList.find().then((questionList)=>{
      res.status = 200;
      res.setHeader('Content-type', 'application/json');
      res.json(questionList);
    })
  })
  .post((req, res, next)=>{
    QuestionList.create(req.body).then((questionList)=>{
      console.log("insert berhasil")
      res.status = 200;
      res.setHeader('Content-type', 'application/json');
      res.json(questionList);
    })
  })
  .delete((req, res, next) => {
    QuestionList.remove({})
      .then((questionList) => {
        res.status = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(questionList);
      });
  });

module.exports = questionRouter