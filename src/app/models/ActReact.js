let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://localhost/plsNode');
}

 var Actreac = new Schema({
        ActuacionreactivasNombre: String,
        fecha: { type: Date, default: Date.now },
        hora: String,
        sexo: String,
        Edad: String,
        Actividad: String,
        PaisdeOrigen: String,
        Latitud: Number,
        Longitud: Number,
        cordenadas: String        
    });

module.exports = mongoose.model('Actreac', Actreac);

