var express = require('express');
var router = express.Router();
var news = require('../scripts/news_api');

/* GET the news. */
router.get('/', function(req, res, next) {
    console.log(news);
    res.json(news);
});

module.exports = router;