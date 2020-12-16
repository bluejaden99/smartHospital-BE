const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
// require("mongoose-currency").loadType(mongoose);
// var Currency = mongoose.Types.Currency;
 
var rapidtestSchema = new Schema(
  {
    bookingDate: {
      type: Number,
    },
    name: {
        type: String,
 
    },
    nik: {
        type: Number,
 
    },
    email: {
        type: String,
    }
  },
  {
    versionKey : false 
  }
);
 

var rapidtest = mongoose.model("Rapidtest", rapidtestSchema);
module.exports = rapidtest;