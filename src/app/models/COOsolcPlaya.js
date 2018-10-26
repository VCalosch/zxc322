let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://localhost/plsNode');
}

 var solcPlaya = new Schema({
        nombrePlaya: String,
        CorreoElectronico : String,
        latitud: String,
        longitud: String,
        Comentarios:  String
    });

module.exports = mongoose.model('solcPlaya', solcPlaya);