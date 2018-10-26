let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://playas:playas@localhost/plsNode');
}

 var consecuencia = new Schema({
        consecuencia: String
    });

module.exports = mongoose.model('consecuencia', consecuencia);

