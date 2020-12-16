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
    })
  })

  .post((req, res, next)=>{
    FormRapid.create(req.body).then((formRapid)=>{
      console.log("Insert Success")
      res.status = 200;
      res.setHeader('Content-type', 'application/json');
      res.json(formRapid);
    })
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('Not Support for Updating');
  })

  .delete((req, res, next) => {
    FormRapid.remove({}).then((formRapid) => {
        res.status = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(formRapid);
      });
  });

rapidTestRouter.route('/:rapidId')

  .delete((req, res, next) => {
    FormRapid.findByIdAndRemove(req.params.rapidId)
      .then((formRapid) => {
        res.status = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(formRapid);
      });
  });

module.exports = rapidTestRouter;