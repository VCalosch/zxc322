let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://localhost/plsNode');
}

 var Incidente = new Schema({
        Horario: String,
        Evento: String,
        Descripcion: String,
        Consecuencias: String,
        Fecha: String,
        Hora: String,
        Minuto: String,
        Segundo: String,
        Sexo: String,
        CampañaPrevencion: String,
        Pais: String,
        Edad: String,
        Actividad: String,
        Latitud: String,
        Longitud: String

    });

module.exports = mongoose.model('Incidente', Incidente);