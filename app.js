var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var dotenv = require('dotenv').config() //supaya .env nya bisa jalan

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersRouter = require('./routes/newsRouter');
var questionRouter = require('./routes/questionRouter');
var hospitalRouter = require('./routes/hospitalRouter');

var app = express();

//url mongodbserver
var url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-shard-00-00.x0xn8.mongodb.net:27017,cluster0-shard-00-01.x0xn8.mongodb.net:27017,cluster0-shard-00-02.x0xn8.mongodb.net:27017/${process.env.DATABASE}?ssl=true&replicaSet=atlas-frowu0-shard-0&authSource=admin&retryWrites=true&w=majority`;
var connect = mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });

connect.then((db)=>{
  console.log('berhasil');
}, (err)=>{
  console.log(err);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/news', newsRouter);
app.use('/question', questionRouter);
app.use('/hospital', hospitalRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
