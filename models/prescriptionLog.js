const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// require("mongoose-currency").loadType(mongoose);
// var Currency = mongoose.Types.Currency;

var medicationsSchema = new Schema(
  {
    nama_obat: {
      type: String,
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
    idLog:{
      type:mongoose.Schema.ObjectId,
      default:mongoose.Schema.ObjectId
    },
    idPasien: {
      type: String,
      required: true,
    },
    idDoctor: {
      type: String,
      required: true,
    },
    tanggal_pengisian: {
      type: Date,
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
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

var log = mongoose.model("Log", logSchema);
var medications = mongoose.model("Medication", medicationsSchema);
module.exports = { log, medications };