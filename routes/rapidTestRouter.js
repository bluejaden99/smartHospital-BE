var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
const mongoose = require('mongoose');

const FormRapid = require('../models/formRapid');
const rapidTestRouter = express.Router();
rapidTestRouter.use(bodyParser.json());

rapidTestRouter.route('/')
  .get((req, res, next)=>{
    FormRapid.find().then((formRapid)=>{
        try{
        res.status = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(formRapid); }
        catch (err) {
          res.status = 500;
          next(err); }
    });
  })

  .post((req, res, next)=>{
    FormRapid.create(req.body).then((formRapid)=>{
    console.log("Insert Success")
      try{
      res.status = 200;
      res.setHeader('Content-type', 'application/json');
      res.json(formRapid); }
      catch (err) {
      res.status = 500;
      next(err); }
    });
  })

  .put((req, res, next) => {
    res.status = 403; //respon not supported
    res.end('Not Supported by the time')
})

  .delete((req, res, next) => {
    FormRapid.remove({})
    .then((rapid) => {
        try{
        res.status = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(rapid); }
        catch (err) {
        res.status = 500;
        next(err);
        }
      });
  });

rapidTestRouter.route('/:rapidId')
  .get((req, res, next) => {
    console.log(req.params.dishId);
    FormRapid.findById(req.params.rapidId)
    .then((rapid) => {
        if (rapid !=null) {
        res.status = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(rapid); }
        else {
        res.status = 404;
        res.end ('Something Happend');
        }
    });
})
  
  .post((req, res, next) => {
        res.statusCode = 403;
        res.end('Not Support for Input Data');
    })

  .put((req, res, next) => {
    FormRapid.findByIdAndUpdate(req.params.rapidId, {
    $set: req.body
  }, { new: true })
    .then((rapid) => {
      if (rapid != null) {
      res.status = 200;
      res.setHeader('Content-type', 'application/json');
      res.json(rapid); }
      else {
      res.status = 404;
      res.end ('Something Happend');
      }
    });
})

  .delete((req, res, next) => {
    FormRapid.findByIdAndRemove(req.params.rapidId)
      .then((rapid) => {
        if (rapid != null) {
        res.status = 200;
        res.setHeader('Content-type', 'application/json');
        res.end ('Remove Success'); }
        else {
        res.status = 404;
        res.end ('Something Happend');
        }
    });
});

module.exports = rapidTestRouter;