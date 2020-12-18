const mongoose = require("mongoose");
var schema = mongoose.Schema;

var hospitalSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
  }
);

var hospital = mongoose.model("hospitals", hospitalSchema);
module.exports = hospital;
