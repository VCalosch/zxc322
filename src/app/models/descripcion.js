let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://localhost/plsNode');
}

 var descripcion = new Schema({
        descripcion: String
    });

module.exports = mongoose.model('descripcion', descripcion);

