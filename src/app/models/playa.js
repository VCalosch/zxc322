let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://localhost/plsNode');
}

var Playa = new Schema({
	nombre: String,
	descripcion: String,
	tipoarena: String,
	ubicacion: String
});

module.exports = mongoose.model('Playa', Playa);