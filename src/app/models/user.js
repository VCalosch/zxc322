const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
	//se definen los tipos de inicio de seccion 
	//1- LOCAL
	local:{
		usuario:String,
		password: String,
		role: Number,
		sexo: String,
		playa: String,
		numeroTemporadas: String,
		experiencia: String,
		descripcion1: String,
		horasFormacion: String,
		ultimaActualizacion: String,
		entidadFormadora: String,
		descripcion2: String,
		email:String,
		codigo: String,
		fechaInicioContrato: String,
		date: {
			type: Date,
			default: Date.now
		}	
	} //, <-- poner coma
	
	// Para configurar inicio de secion por Redes:
//	facebook:{
//		email: String,
//		password: String,
//		id: String,
//		token: String
//	}

});

//Creando una contraseña encriada mediante hash

userSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
};

userSchema.methods.validatePassword = function (password){
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('user',userSchema);

