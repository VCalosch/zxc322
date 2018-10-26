//Actuacionesreactivas

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://localhost/plsNode');
}

 var Actuacionesreactivas = new Schema({
        ActuacionreactivasNombre: String
    });

module.exports = mongoose.model('Actuacionesreactivas', Actuacionesreactivas);

