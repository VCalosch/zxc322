let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://playas:playas@localhost/plsNode');
}

 var Test = new Schema({
        Nombre: String,
        Apellido: String,
        Mensaje: String
    });

module.exports = mongoose.model('Test', Test);