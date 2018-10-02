const LocalStrategy = require('passport-local').Strategy;

const User = require('../app/models/user');  //modelo a usar para guardar los datos

module.exports = function(passport){ //recive los datos de parssport

	passport.serializeUser(function (user, done) { //guarda los datos en cookies 
		done(null, user.id);
	});
	
	passport.deserializeUser(function (id, done){ //Desloguea o borra datos serializados
		User.findById(id, function (err, user){
			done(err, user);
		});
	});

	//resgistrarse
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, 

	function (req, email, password, done){
		//console.log("Llego hasta aquí"); Imprimir por consola
		User.findOne({'local.email': email}, function (err, user) {
			if(err){return done(err);}
			if(user){
				return done(null, false, req.flash('signupMessage', 'Correo ya usado.'));
			}

			else{
				var newUser = new User();
				newUser.local.email = email;
				newUser.local.password = newUser.generateHash(password);

				newUser.local.role = req.body.role;
				newUser.local.sexo = req.body.sexo;
				newUser.local.playa = req.body.playa;
				newUser.local.numeroTemporadas = req.body.numeroTemporadas;
				newUser.local.experiencia = req.body.experiencia;
				newUser.local.descripcion1 = req.body.descripcion1;
				newUser.local.horasFormacion = req.body.horasFormacion;
				newUser.local.ultimaActualizacion = req.body.ultimaActualizacion;
				newUser.local.entidadFormadora = req.body.entidadFormadora;
				newUser.local.descripcion2 = req.body.descripcion2;
				newUser.local.usuario = req.body.usuario;
				newUser.local.codigo = req.body.codigo;
				newUser.local.fechaInicioContrato = req.body.fechaInicioContrato;
				newUser.local.date = req.body.date;

				newUser.save(function (err){
					if(err){throw err;}
				return done(null, newUser);
				});
			}
		
	})
	}));



	//IValidar el login

	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, 

	function (req, email, password, done){
	/*	console.log("Hasta aquì llego");
		console.log(email);
		console.log(password);
	*/
		User.findOne({'local.email': email}, function (err, user) {
			if(err){return done(err);}
			if(!user){				
				return done(null, false, req.flash('loginMessage', 'Error correo'));
			}
			if(!user.validatePassword(password)){
				return done(null, false, req.flash('loginMessage', 'Error de contraseña'));
			}
				return done(null, user);
		
	})
	}));


}