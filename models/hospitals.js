const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var hospitalSchema = new Schema(
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
      type: Number,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

var hospital = mongoose.model("Hospitals", hospitalSchema);
module.exports = hospital;
