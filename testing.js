const {log, medication} = require('./models/prescriptionLog');

var mongoose = require('mongoose');
 
// make a connection
mongoose.connect('mongodb://localhost:27017/database');
 
// get reference to database
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    var dummy = new log({
        idPasien: 69,
        idDoctor: 72,
        keterangan: "pengujian 1",
        medikasi: [
          {
            nama_obat: 'abc',
            dosis: 42,
            satuan: "mlg",
            tujuan: "meredakan batuk berdahak"
          },{
            nama_obat: 'abc',
            dosis: 10,
            satuan: "mg",
            tujuan: "meredakan nyeri"
          }
        ]
    });

    // save model to database
    dummy.save(function (err, log) {
        if (err){
            return console.error(err);
        } 
        console.log(dummy._id + " saved to Log collection.");
    });

    // db.close();
});