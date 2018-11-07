let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://playas:playas@localhost/plsNode');
}

 var ServicioPlaya = new Schema({
        servicio: String       
    });

module.exports = mongoose.model('ServicioPlaya', ServicioPlaya);