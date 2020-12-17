//import module
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

//import models
const Dokter = require('../models/dokter');

//handle route req.
const docRouter = express.Router();
docRouter.use(bodyparser.json());

//crud
docRouter.route('/')
    //read all
    .get((req,res,next) => {
        Dokter.find({})
        .then((docs) => {
            res.status = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(docs);
        });
    })
    //create
    .post((req,res,next) => {
        Dokter.create(req.body)
        .then((doc) => {
            console.log("Insert Success, data : ", doc);

            res.status = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(doc);
        });
    })
    //!!can't update
    .put((req,res,next) => {
        res.status = 403;
        res.end('You must choose which item to update');
    })
    //!!delete all
    .delete((req,res,next) => {
        Dokter.remove({})
        .then((resp) => {
            res.status = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(resp);
        })
    });

//crud by id
docRouter.route('/:docId')
    //read by id
    .get((req,res,next) => {
        Dokter.findById(req.params.docId)
        .then((doc) => {
            res.status = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(doc);
        });
    })
    //!!can't create
    .post((req,res,next) => {
        res.status = 403;
        res.end('You must choose root routes to create item');
    })
    //update by id
    .put((req,res,next) => {
        Dokter.findByIdAndUpdate(req.params.docId, {
            $set: req.body
        }, { new: true})
        .then((doc) => {
            res.status = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(doc);
        })
    })
    //delete by id
    .delete((req,res,next) => {
        Dokter.findByIdAndRemove(req.params.docId)
        .then((resp) => {
            res.status = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(resp);
        })
    });


//crud by name
docRouter.route('/nama/:docNama')
    //read by name
    .get((req,res,next) => {
        Dokter.findOne({nama : req.params.docNama})
        .then((doc) => {
            res.status = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(doc);
        });
    })
    //!!can't create
    .post((req,res,next) => {
        res.status = 403;
        res.end('You must choose root routes to create item');
    })
    //update by name
    .put((req,res,next) => {
        Dokter.findOneAndUpdate({nama : req.params.docNama}, {
            $set: req.body
        }, { new: true})
        .then((doc) => {
            res.status = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(doc);
        })
    })
    //delete by name
    .delete((req,res,next) => {
        Dokter.findOneAndDelete({nama : req.params.docNama})
        .then((resp) => {
            res.status = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(resp);
        })
    });

//filter by name
docRouter.route('/filter/nama/:docNama')
    .get((req,res,next) => {
    Dokter.find({nama : req.params.docNama})
        .then((docs) => {
            res.status = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(docs);
        });
    })

//filter by jenis
docRouter.route('/filter/jenis/:docJenisDokter')
    .get((req,res,next) => {
        Dokter.find({jenisDokter : req.params.docJenisDokter})
        .then((docs) => {
            res.status = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(docs);
        });
    })

module.exports = docRouter;