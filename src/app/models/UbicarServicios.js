let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://localhost/plsNode');
}

 var UbicacionServicios = new Schema({
        Playa: String,
        Latitud: Number,
        Longitud: Number,
        Servicio: String

    });

module.exports = mongoose.model('UbicacionServicios', UbicacionServicios);