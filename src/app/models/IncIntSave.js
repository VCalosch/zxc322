let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
    db = mongoose.connect('mongodb://playas:playas@localhost/plsNode');
}

var IncIntSave = new Schema({
	hora:{ type: String, default:'dentro'},
    evento: String,
    descripcion: String,
    consecuencia: String

});

module.exports = mongoose.model('IncIntSave', IncIntSave);

