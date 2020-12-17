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
        res.status = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(formRapid);
    });
  })

  .post((req, res, next)=>{
    FormRapid.create(req.body).then((formRapid)=>{
    console.log("Insert Success")
      res.status = 200;
      res.setHeader('Content-type', 'application/json');
      res.json(formRapid);
    });
  })

  .put((req, res, next) => {
    FormRapid.findByIdAndUpdate({}, {
      $set: req.body
    }, {new: true}).then ((rapid)=> {
      res.status = 200;
      res.setHeader('Content-type', 'application/json');
      res.json(rapid);
  });
})

  .delete((req, res, next) => {
    FormRapid.remove({})
    .then((rapid) => {
        res.status = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(rapid);
      });
  });

rapidTestRouter.route('/:rapidId')
  .get((req, res, next) => {
    console.log(req.params.dishId);
    FormRapid.findById(req.params.rapidId)
    .then((rapid) => {
        res.status = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(rapid);
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
      res.status = 200;
      res.setHeader('Content-type', 'application/json');
      res.json(rapid);
    });
})

  .delete((req, res, next) => {
    FormRapid.findByIdAndRemove(req.params.rapidId)
      .then(() => {
        res.status = 200;
        res.setHeader('Content-type', 'application/json');
        res.end ('Remove Success');
    });
});

module.exports = rapidTestRouter;