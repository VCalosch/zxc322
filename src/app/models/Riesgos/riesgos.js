let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://playas:playas@localhost/plsNode');
}

 var Riesgos = new Schema({
        playa: String,
        nombre: String,
        latitud: String,
        longitud: String,
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
        descripcion: [{ name1: String }, { name2: String }],
        fecha: String
    });

module.exports = mongoose.model('Riesgos', Riesgos);