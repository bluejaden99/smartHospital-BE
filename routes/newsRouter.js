var express = require('express');
var router = express.Router();
var news = require('../scripts/news_api');

/* GET home page. */
router.get('/', async function(req, res, next) {
    console.log(news);
    res.json(news);
});

module.exports = router;