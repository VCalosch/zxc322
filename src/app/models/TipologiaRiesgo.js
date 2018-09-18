let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://localhost/plsNode');
}

 var TipologiaRiesgo = new Schema({
        Nombre: String,
        Rocas: String,
        Corrientes: String,
        ZonaRompiente: String,
        ActividadesDeportivasRecreos: String,
        ZambullidasRocas: String,
        EstructuraFondo: String,
        RayosUVA: String,
        AnimalesAcuaticos: String,
        Arena: String,
        ObjetosHinchables: String,       
        RiesgosAfluenciaPersonas: String,
        AccesoEmbarcaciones: String,
        CondicionesMetereologicas: String,
        Desprendimientos: String,
        FocosContaminacion: String,
        Morfologia: String,
        Acceso: String
    });

module.exports = mongoose.model('TipologiaRiesgo', TipologiaRiesgo);