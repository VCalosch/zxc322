let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://playas:playas@localhost/plsNode');
}

var addServicio = new Schema({
	servicio : String
});

module.exports = mongoose.model('addServicio', addServicio);