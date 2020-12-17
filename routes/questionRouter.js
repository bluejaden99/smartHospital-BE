const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const QuestionList = require('../models/questionList');

const questionRouter = express.Router();

questionRouter.use(bodyParser.json());

const cek_covid = require( '../service/cek-covid')

questionRouter.route('/result')
  .post((req, res, next) => {
    let result = cek_covid(req.body.data)
    if(result != null){
      res.status = 200;
      res.setHeader('Content-type', 'application/json');
      res.json(result);
    }
    else{
      res.status = 404;
      res.end("Error")
    }
})

questionRouter.route('/')
  .get((req, res, next)=>{
    QuestionList.findOne({},{_id:0}).then((questionList)=>{
      try{
        res.status = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(questionList);
      }
      catch (err) {
        res.status = 500;
        next(err);
      }
    })
  })
  .post((req, res, next)=>{
    QuestionList.create(req.body)
      .then((questionList)=>{
      try{
        res.status = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(questionList);
      }
      catch (err) {
        res.status = 500;
        next(err);
      }
    })
  })
  .put((req, res, next) => {
    QuestionList.findOneAndUpdate({}, {
      $set: req.body 
    }, { new: true })
      .then((question) => {
        if (question != null) {
          res.status = 200;
          res.setHeader('Content-type', 'application/json');
          res.json(question);
        } else {
          res.status = 404;
          res.end('List pertanyaan tidak ada');
        }
      });
  })
  .delete((req, res, next) => {
    QuestionList.remove({})
      .then((questionList) => {
        try{
          res.status = 200;
          res.setHeader('Content-type', 'application/json');
          res.json(questionList);
        }
        catch (err) {
          res.status = 500;
          next(err);
        }
      });
  });

questionRouter.route('/:questionId')
  .get((req, res, next) => {
    var questionId = parseInt(req.params.questionId, 10)
    QuestionList.findOne({'questionList.id' : questionId})
      .then((question) => {
        if (question != null) {
          res.status = 200;
          res.setHeader('Content-type', 'application/json');
          res.json(question.questionList[0]);
        } else {
          res.status = 404;
          res.end('Pertanyaan tidak ada');
        }
      });
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end('Tidak support untuk fungsionalitas ini');
  })
  .put((req, res, next) => {
    var questionId = parseInt(req.params.questionId, 10)
    QuestionList.findOneAndUpdate({'questionList.id' : questionId}, {
      '$set': {
        'questionList.$.question': req.body.question,
    }
    }, { new: true })
      .then((question) => {
        if (question != null) {
          res.status = 200;
          res.setHeader('Content-type', 'application/json');
          res.json(question);
        } else {
          res.status = 404;
          res.end('Pertanyaan tidak ada');
        }
      });
  })
  .delete((req, res, next) => {
    var questionId = parseInt(req.params.questionId, 10)
    QuestionList.findOneAndRemove({'questionList.id' : questionId})
      .then((question) => {
        if (question != null) {
          res.status = 200;
          res.setHeader('Content-type', 'application/json');
          res.end('Berhasil menghapus komentar');
        } else {
          res.status = 404;
          res.end('Comment tidak ada');
        }
      });
  })


module.exports = questionRouter