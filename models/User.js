const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// require("mongoose-currency").loadType(mongoose);
// var Currency = mongoose.Types.Currency;

var usersSchema = new Schema(
  {
    nama : {
      type: String,
    },
    tanggal_lahir : {
        type: Number,
  
    },
    email : {
        type: String,
  
    },
    alamat : {
        type: String,
        
        
    },
    password : {
    type: String,
    
  }
}
);

var users = mongoose.model("Users", usersSchema);
module.exports = users;