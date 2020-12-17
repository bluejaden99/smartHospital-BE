const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var hospitalSchema = new Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    alamat: {
      type: String,
      required: true,
    },
    kota: {
      type: String,
      required: true,
    },
    telepon: {
      type: Number,
      required: true,
    },
    provinsi: {
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
