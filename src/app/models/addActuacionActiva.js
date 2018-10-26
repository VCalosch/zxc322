let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://localhost/plsNode');
}

 var addActuacionActiva = new Schema({
        ActuacionActiva: String,
        playa: String
    });

module.exports = mongoose.model('addActuacionActiva', addActuacionActiva);