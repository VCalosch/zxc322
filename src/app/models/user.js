const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
	//se definen los tipos de inicio de seccion 
	//1- LOCAL
	local:{
		Usuario:String,
		Password: String,
		Role: Number,
		Sexo:String,
		Playa:String,
		NTemporadas:String,
		Experiencia:String,
		Descripcion1:String,
		HorasFormacion:String,
		UltimaFormacion:String,
		EntidadFormadora:String,
		Descripcion2:String,
		Email:String,
		Codigo:String,
		InicioContrato:String	
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

