let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://localhost/plsNode');
}

var Playa = new Schema({
	nombre: String,
	mail: String,
	latitud: String,
	longitud: String,
	comentarios: String
});

module.exports = mongoose.model('Playa', Playa);