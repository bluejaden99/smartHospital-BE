const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const QuestionList = require('../models/questionList');

const questionRouter = express.Router();

questionRouter.use(bodyParser.json());

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
    res.statusCode = 403;
    res.end('Tidak support untuk fungsionalitas ini');
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

questionRouter.route('/:questionListId')
  .get((req, res, next) => {
    QuestionList.findById(req.params.questionListId)
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
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end('Tidak support untuk fungsionalitas ini');
  })
  .put((req, res, next) => {
    QuestionList.findOneAndUpdate(req.params.questionListId, {
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
    QuestionList.findByIdAndRemove(req.params.questionListId)
      .then((question) => {
        if (question != null) {
          res.status = 200;
          res.setHeader('Content-type', 'application/json');
          res.end('Berhasil menghapus list pertanyaan');
        } else {
          res.status = 404;
          res.end('List pertanyaan tidak ada');
        }
      });
  })

  questionRouter.route('/:questionListId/:questionId')
  .get((req, res, next) => {
    QuestionList.findOne({"_id" : req.params.questionListId, "questionList._id" : req.params.questionId}, { 'questionList.$': 1 })
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
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end('Tidak support untuk fungsionalitas ini');
  })
  .put((req, res, next) => {
    console.log(req.body.question)
    QuestionList.findOneAndUpdate({"_id" : req.params.questionListId, "questionList._id" : req.params.questionId}, {
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
    QuestionList.findOneAndRemove({"_id" : req.params.questionListId, "questionList._id" : req.params.questionId})
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