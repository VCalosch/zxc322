let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://localhost/plsNode');
}

 var Riesgos = new Schema({
        nombre: String,
        latitud: Number,
        longitud: Number,
        tipo: String,
        riesgo: String,
        tipologia: String,
        viento: String,
        oleaje: String,
        marea: String,
        v_nudos: String,
        v_direccion: String,
        o_tipo: String,
        o_direccion: String,
        m_altura: String,
        m_coeficiente: String,
        m_momento: String,
        probabilidad: String,
        severidad: String,
        evaluacion: String,
        fecha: String
    });

module.exports = mongoose.model('Riesgos', Riesgos);