let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://playas:playas@localhost/plsNode');
}

 var ActividadDrp = new Schema({
        actividad: String     
    });

module.exports = mongoose.model('ActividadDrp', ActividadDrp);