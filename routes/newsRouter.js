var express = require('express');
var router = express.Router();
var news = require('./scripts/news_api');

/* GET home page. */
router.get('/', async function(req, res, next) {
    const news = await news.articles;
    console.log(news);
    res.render('news', {news});
});

module.exports = router;