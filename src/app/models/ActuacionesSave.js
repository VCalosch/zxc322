let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://localhost/plsNode');
}

 var ActuacionesSave = new Schema({
        ActuacionActivas: String,       
    });

module.exports = mongoose.model('ActuacionesSave', ActuacionesSave);

