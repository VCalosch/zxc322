let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
    db = mongoose.connect('mongodb://localhost/plsNode');
}

var ListaRiesgos = new Schema({
    Riesgo: String,
    Tipologia: [{ name: String }],
});

module.exports = mongoose.model('ListaRiesgos', ListaRiesgos);

