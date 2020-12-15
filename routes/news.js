var express = require('express');
var router = express.Router();
var news = require('./news_api.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    const news = await BlogPost.findById(req.params.id).populate('userid');
    console.log(news);
    res.render('news', {news});
});

module.exports = router;