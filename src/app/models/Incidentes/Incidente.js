let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://playas:playas@localhost/plsNode');
}

 var Incidente = new Schema({
        Playa: String,
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
        Longitud: String,
        DeteccionSuceso: String,
        LugarAntesSuceso: String,
        DistanciaRecorrida: String,
        TipoDesplazamientoHaciaVictima: String,
        TipoTraslado: String,
        DistanciaDesplazamiento: String,
        ProfundidadVictima: String,
        MaterialesUtilizados: String,
        EstadoAccidentadoPrimerContacto: String,
        AyudaRecibidaPor: String,
        TipoExtraccionVictima: String,
        QuienInicia: String,
        QuienParticipa: String

    });

module.exports = mongoose.model('Incidente', Incidente);