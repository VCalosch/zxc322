let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let db;

if (!db) {
	db = mongoose.connect('mongodb://localhost/plsNode');
}

 var perfilUsuario = new Schema({
        
       email: String,
        password: String,
        rol: String,
        ChecPlaya: String,
        experienciaPoints:  String,
        experiencia: String,
        descripcion: String,
        horasForm :String,
        LastActForm:String,
        entidadaForma:String,
        descripcion2:String,
        sexo:String,
        correo:String,
        codigo:String,
        fecha:String
    });

module.exports = mongoose.model('perfilUsuario', perfilUsuario);