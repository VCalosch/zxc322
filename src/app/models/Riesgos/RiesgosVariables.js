let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://localhost/plsNode');
}

 var RiesgosVariables = new Schema({
        Nudos: String,
        Direccion: String,
        Tipo: String,
        Altura: String,
        Coeficiente: String,
        Momento: String
    });

module.exports = mongoose.model('RiesgosVariables', RiesgosVariables);