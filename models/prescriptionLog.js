const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("mongoose-currency").loadType(mongoose);
var Currency = mongoose.Types.Currency;

var medicationsSchema = new Schema(
  {
    nama_obat: {
      type: String,
      min: 1,
      max: 5,
      required: true
    },
    dosis: {
        type: Number,
        required: true
    },
    satuan: {
        type: String,
        required: true
    },
    tujuan: {
        type: String,
        required: true,
        default: ""
    }
  }
);

var logSchema = new Schema(
  {
    idPasien: {
      type: String,
      required: true,
      unique: true,
    },
    idDoctor: {
      type: String,
      required: true,
    },
    tanggal: {
      type: Date,
      required: true,
      default: Date.now()
    },
    keterangan: {
      type: String,
      required: true,
      default: ""
    },
    medikasi: [medicationsSchema],
  },
  {
    timestamps: true,
  }
);

var Dishes = mongoose.model("Log", logSchema);
var Comments = mongoose.model("Medication", medicationsSchema);
module.exports = { Dishes, Comments };