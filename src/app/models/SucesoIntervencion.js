let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://localhost/plsNode');
}

 var SucesoIntervencion = new Schema({
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

module.exports = mongoose.model('SucesoIntervencion', SucesoIntervencion);