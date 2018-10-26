let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://localhost/plsNode');
}

 var Paises = new Schema({
        pais: String       
    });

module.exports = mongoose.model('Paises', Paises);