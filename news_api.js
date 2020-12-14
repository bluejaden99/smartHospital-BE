require('dotenv').config()
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.API_KEY);

// console.log(`Your key is ${news_key}`);

newsapi.v2.everything({
    q: 'health',
    language: 'id',
    sortBy: 'recent',
    page: 1
  }).then(response => {
    console.log(response);
  });