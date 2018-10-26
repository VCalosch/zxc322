let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://playas:playas@localhost/plsNode');
}

 var RiesgosNombres = new Schema({
        Riesgo: String
    });

module.exports = mongoose.model('RiesgosNombres', RiesgosNombres);