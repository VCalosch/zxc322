let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
    db = mongoose.connect('mongodb://localhost/plsNode');
}

var Avisos = new Schema({
    AccionesPreventivas: String,
    AvisosPreventivos: String
    
});

module.exports = mongoose.model('Avisos', Avisos);
