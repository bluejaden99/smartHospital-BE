var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var dotenv = require('dotenv').config() //supaya .env nya bisa jalan
var cors = require('cors')
var bodyParser = require('body-parser');

var UsersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var rapidTestRouter = require ('./routes/rapidTestRouter');
var usersRouter = require('./routes/users');
var newsRouter = require('./routes/newsRouter');
var questionRouter = require('./routes/questionRouter');
var hospitalsRouter = require('./routes/hospitalsRouter');
var docRouter = require('./routes/docRouter');
var registerRouter = require('./routes/register');

var app = express();

//url mongodbserver
var url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-shard-00-00.x0xn8.mongodb.net:27017,cluster0-shard-00-01.x0xn8.mongodb.net:27017,cluster0-shard-00-02.x0xn8.mongodb.net:27017/${process.env.DATABASE}?ssl=true&replicaSet=atlas-frowu0-shard-0&authSource=admin&retryWrites=true&w=majority`;
var connect = mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });

connect.then((db)=>{
  console.log('Success');
}, (err)=>{
  console.log(err);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors()) // Use this after the variable declaration
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/rapidtest', rapidTestRouter);
app.use('/users', usersRouter);
app.use('/news', newsRouter);
app.use('/question', questionRouter);
app.use('/hospital', hospitalsRouter);
app.use('/users', UsersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/dokter', docRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
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
