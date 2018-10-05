let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://localhost/plsNode');
}

 var addActuacionReactiva = new Schema({
        ActuacionReactiva: String,
        playa: String,
        sexo: String,
        edad: String,
        actividad: String,
        pais: String,
        campañasPrevencion: String,
        lat: String,
        lng: String
    });

module.exports = mongoose.model('addActuacionReactiva', addActuacionReactiva);