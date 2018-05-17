let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://localhost/plsNode');
}

 var Riesgos = new Schema({
        nombre: String,
        descripcion: String,
        ubicacion: String
    });

module.exports = mongoose.model('Riesgos', Riesgos);