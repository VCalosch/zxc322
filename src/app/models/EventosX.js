let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
    db = mongoose.connect('mongodb://playas:playas@localhost/plsNode');
}

var Eventos = new Schema({
    evento: String,
    descripcion: [{ name: String }],
});

module.exports = mongoose.model('Eventos', Eventos);

