const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var docSchema = new Schema ({
    nama : {
        type: String,
        required: true
    },
    foto : {
        type: String,
        default: 'doc.jpg'
    },
    jenisDokter : {
        type: String,
        required: true,
        default: 'Dokter Umum'
    },
    tempatPraktek : {
        type: String,
        required: true
    },
    alamatPraktek : {
        type: String,
        required: true
    },
    telp : {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var Dokter = mongoose.model('Doc', docSchema);

module.exports = Dokter;

/*

{
	"nama": "Isnan",
	"foto": "isnan.jpg",
	"jenisDokter": "Dokter Umum",
	"tempatPraktek": "Klinik indonesia bersatu",
	"alamatPraktek": "jalan indonesia nomor. 1",
	"telp": "+6289669588904"
}

*/