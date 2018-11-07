let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://playas:playas@localhost/plsNode');
}

var Playa = new Schema({
	nombre: String,
	mail: String,
	latitud: String,
	longitud: String,
	comentarios: String,

	// Datos luego de editar caracteristicas de Playa
	Municipio: String, 
	Provincia: String,
	CCAA: String, 
	Longitud: String, 
	Anchura: String, 
	DescripcionPlaya: String, 
	CarreteraProxima: String, 
	ParadaAutobus: String, 
	PuertoDeportivo: String, 
	DistanciaPuertoPlaya: String, 
	ObservacionesGenerales: String, 
	NombreHospital: String , 
	Direccion: String
});

module.exports = mongoose.model('Playa', Playa);