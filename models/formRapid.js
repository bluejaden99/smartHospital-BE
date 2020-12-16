const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
// require("mongoose-currency").loadType(mongoose);
// var Currency = mongoose.Types.Currency;
 
var rapidtestSchema = new Schema(
  {
    bookingDate: {
        type: Date,
        default: Date.now()
    },
    name: {
        type: String,
        required: true,
    },
    nik: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
  },
  {
    versionKey : false 
  }
);
 
var rapidtest = mongoose.model("Rapidtest", rapidtestSchema);
module.exports = rapidtest;