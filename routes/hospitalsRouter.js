var express = require('express');
var router = express.Router();
const open = require('open');

/* GET */
router.get('/', function(req, res, next) {

    // req.params.link
    var query = encodeURI("Rumah Sakit Pertamina");
    var destination = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

    open(destination, function (err) {
        if ( err ) throw err;    
    });
});

module.exports = router;