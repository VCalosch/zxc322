let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://playas:playas@localhost/plsNode');
}

 var Informacion = new Schema({
        Edad: String     
    });

module.exports = mongoose.model('Informacion', Informacion);