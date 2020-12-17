var express = require('express');
var hospitalRouter = express.Router();
const open = require('open');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hospitals = require('../models/hospitals');

/* rute ke rumah sakit*/
hospitalRouter.get('/route', function(req, res, next) {

    var query = encodeURI("req.params.hospital_name");
    var destination = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

    open(destination, function (err) {
        res.send(`Opening ${destination}`);
        if ( err ) throw err;    
    });
});

/* pengolahan data rumah sakit */
hospitalRouter.route('/data')
  .get((req, res, next)=>{
    hospitals.find({nama: req.params.hospital_name}).then((hospital)=>{
      try{
        res.status = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(hospital);
      }
      catch (err) {
        res.status = 404;
        next(err);
      }
    })
  })
  .post((req, res, next)=>{
    hospitals.create(req.body)
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
    hospitals.findOneAndUpdate({name: req.params.hospital_name}, {
      $set: req.body 
    }, { new: true })
      .then((hospital) => {
        if (hospital != null) {
          res.status = 200;
          res.setHeader('Content-type', 'application/json');
          res.json(hospital);
        } else {
          res.status = 404;
          res.end('Query rumah sakit tidak ada');
        }
      });
  })
  .delete((req, res, next) => {
    hospitals.deleteOne({nama: req.params.hospital_name})
      .then((hospital) => {
        try{
          res.status = 200;
          res.setHeader('Content-type', 'application/json');
          res.json(hospital);
        }
        catch (err) {
          res.status = 500;
          next(err);
        }
      });
  });

module.exports = hospitalRouter;