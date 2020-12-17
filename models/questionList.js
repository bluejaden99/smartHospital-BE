const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  
var questionListSchema = new Schema({
    questionList:{
      type : Schema.Types.Mixed
    }
});

var QuestionList = mongoose.model('QuestionList', questionListSchema);
 
module.exports = QuestionList;