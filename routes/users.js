const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
//import module

const Users = require('../models/User');
//import model

const UsersRouter = express.Router();

//menangani request user
UsersRouter.use(bodyparser.json());

//CRUD Users===========================================================================//

UsersRouter.route('/')
    //READ User
    .get((req, res, next) => {
        Users.find({})
        .then((users) => {
            try{
            res.status = 200; //respon
            res.setHeader('Content-type', 'application/json');
            res.json(users);
            }
            catch (err) {
            res.status = 500;
            next(err); }
            });
    })
    //CREATE User
    .post((req, res, next) => {
        Users.create(req.body)
        .then((users) => {
            console.log("INSERT DATA BERHASIL", users);

            res.status = 200; //respon
            res.setHeader('Content-type', 'application/json');
            res.json(users);
        });
    })
    // ! UPDATE Users NOT SUPPORTED in this Route, need id parameter on URI
    .put((req, res, next) => {
        res.status = 403; //respon not supported
        res.end('Not Supported by the time')
    })
    // DELETE !!! ALL DATA !!!
    .delete((req, res, next) => {
        Users.remove({})
        .then((resp) => {
            res.status = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(resp);
        })
    });

//CRUD Users By Id=========================================================================//

UsersRouter.route('/:UsersId')
    //READ Users by id
    .get((req,res,next) => {
        Users.findById(req.params.UsersId)
        .then((users) => {
            res.status = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(users);
        })
    })
    //CREATE Users by id NOT SUPPORTED in this Route, need no parameter on URI for POST Method
    .post((req, res, next) => {
        res.status = 403; //respon not supported
        res.end('Not Supported by the time')
    })
    //UPDATE Users by id
    .put((req, res, next) => {
        Users.findByIdAndUpdate(req.params.UsersId, {
            $set: req.body
        }, { new: true})
        .then((users) => {
            res.status = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(users);
        })
    })
    //DELETE Users by id
    .delete((req, res, next) => {
        Users.findByIdAndRemove(req.params.UsersId)
        .then((users) => {
            res.status = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(users);
        })
    });

module.exports = UsersRouter;