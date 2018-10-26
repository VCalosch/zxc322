
const express = require('express');
const socoRoutes = express.Router();
const User = require('../app/models/user');
const COOsolcPlaya = require('../app/models/COOsolcPlaya');
const modelPlaya = require('../app/models/playa');
const PerfilUsuario = require('../app/models/PerfilUsuario');
const Servicio = require('../app/models/ServicioPlaya');
const addServicio = require('../app/models/addServicio');

const request = require('request');



//********************************------- CV --------------********************************************************* */
const UbicarServiciosModel = require('../app/models/UbicarServicios');
const CoordinadorRoutes = express.Router();
const riesgoModel = require('../app/models/Riesgos/riesgos');


const showActuacionesActivas = require('../app/models/Actuacionesactivas');
const showActuacionesReactivas = require('../app/models/Actuacionesreactivas');
const addActuacionActiva = require('../app/models/addActuacionActiva');
const addActuacionReactiva = require('../app/models/addActuacionReactiva');
/******************************************************************************************************************* */


socoRoutes.get('/coordinador',  (req, res) => { //Listar Todo
	modelPlaya.find({}, (err, playa) => {
		if (err) throw err;
		User.find({},(err,users) =>{
			if(err){throw err;}
			else{
				showActuacionesActivas.find({}, (err,Act) =>{
					if(err){ throw err;}
					else{
						PerfilUsuario.find({} , (err, usr) =>{
							if(err){throw err;}
							else{
							res.render('coordinador', {
							user: req.user,
							Playas: playa,
							lista: users,
							Actuaciones: Act, //SOLO CAMBIE ESTOOO ME VOY ALV
							Usrs: usr, 
							isLoggedIn: req.isAuthenticated() 
							});
							}
						});
					}
				});
			}
		})
	});
});

socoRoutes.get('/coordPlayas', (req, res) => {
    res.render('coordPlayas');
});

// socoRoutes.post('/ss' , (req, res) =>{ //Agregar solicitud playa ̈́
// 	let body = req.body;
// 	body.status = false;
// 	modelPlaya.create(body, (err, newSolPlaya) =>{
// 		if(err){ throw err;}
// 		else{
// 			res.redirect('back');
// 		}
// 	})
// });




socoRoutes.post('/AgregarUsuario' , (req, res) =>{ //Agregar Usuario
	let body = req.body;
	body.status = false;
	PerfilUsuario.create(body, (err, newUsuario) =>{
		if(err){ throw err;}
		else{
			request.post(
			    '/signup',
			    { json: { body } },
			    function (error, response, body) {
			        if (!error && response.statusCode == 200) {
			            response.send(body);
			            
			        }
			    }
			);

			res.redirect('/coordinador');
		}
	})
});

//:::::::::::::::::::::::Servicios:::::::::::::::::
socoRoutes.get('/addServicioPlaya', (req, res) => {
	Servicio.find({}, (err, servicio) => {
		if (err) throw err;
		res.render('addServicioPlaya', {
			Servicios: servicio
		});
	});
});
socoRoutes.get('/addServicioPlaya', (req, res) => {
	res.render('addServicioPlaya');
});
socoRoutes.post('/addServicioPlaya', (req, res) => {
	let body = req.body;
	body.status = false;

	Servicio.create(body, (err, servicio) => {
		if (err) throw err;
		res.redirect('/addServicioPlaya');
	});
});
socoRoutes.get('/addServicioPlaya/delete/:id', (req, res) => {
	let id = req.params.id;
	Servicio.findByIdAndRemove({ _id: id }, (err, servicio) => {
		if (err) throw err;
		res.redirect('/addServicioPlaya');
	});
});
//:::::::::::::::::::::::Servicios Vista Coordinador::::::::::::::::
socoRoutes.get('/FormServiCoor', (req, res) => {
	Servicio.find({}, (err, servicio) => {
		if (err) throw err;
		res.render('FormServiCoor', {
			Servicios: servicio
		});
	});
});

socoRoutes.post('/FormServiCoor', (req, res) => {
	let body = req.body;
	body.status = false;

	addServicio.create(body, (err, servicio) => {
		if (err) throw err;
		res.redirect('/FormServiCoor');
	});
});


//**************************************************-------- VC -------------************************************************** */

//Coordinador -> MostrarMapa

// socoRoutes.get('/MostrarMapa', (req, res) => {
// 	UbicarServiciosModel.find({}, (err, UbicarServicio) => {
// 		if (err) throw err;
// 		res.render('MostrarMapa', {
// 			UbicarServicio: UbicarServicio,
// 			isLoggedIn: req.isAuthenticated()
// 		});
// 	});
// });

socoRoutes.get('/MostrarMapa/:id', (req, res) => {
	let id = req.params.id;
	modelPlaya.findById({_id:id}, (err, playa) =>{
		if (err) throw err;
	UbicarServiciosModel.find({}, (err, UbicarServicio) => {
		if (err) throw err;
		riesgoModel.find({}, (err, riesgo) => {
		if (err) throw err;
		res.render('MostrarMapa', {
			UbicarServicio: UbicarServicio,
			Playas: playa,
			Riesgos: riesgo,
			isLoggedIn: req.isAuthenticated()
		});
	});
	});
	});
});

socoRoutes.get('/avisos/:id', (req, res) => {
	let id = req.params.id;
	modelPlaya.findById({_id:id}, (err, playa) =>{
		if (err) throw err;
		addActuacionActiva.find({}, (err, ActuacionActiva) => {
			if (err) throw err;
				showActuacionesActivas.find({},(err, ActActivas) => {
					if(err){ throw err;}
					showActuacionesReactivas.find({},(err, Actuacionesreactivas) => {
						if(err){ throw err;}
						addActuacionReactiva.find({},(err, ActuacionReactiva) => {
							if(err){ throw err;}
		res.render('avisos', {
			addActuacionActiva: ActuacionActiva,
			showActuacionesActivas : ActActivas,
			showActuacionesReactivas : Actuacionesreactivas,
			addActuacionReactiva: ActuacionReactiva,
			Playas: playa,
			isLoggedIn: req.isAuthenticated()
		});
	});});});
});
});});


socoRoutes.get('/avisos/modAvisosPreventivos/:id', (req, res) => {
	let id = req.params.id;
	addActuacionReactiva.findById({_id:id}, (err, ActuacionReactiva) =>{
		if (err) throw err;
		addActuacionActiva.find({}, (err, ActuacionActiva) => {
			if (err) throw err;
			modelPlaya.find({}, (err, playa) => {
				if (err) throw err;
				showActuacionesActivas.find({},(err, ActActivas) => {
					if(err){ throw err;}
					showActuacionesReactivas.find({},(err, Actuacionesreactivas) => {
						if(err){ throw err;}
						showActuacionesReactivas.find({},(err, Actuacionesreactivas) => {
							if(err){ throw err;}
		res.render('modAvisosPreventivos', {
			addActuacionActiva: ActuacionActiva,
			showActuacionesActivas : ActActivas,
			showActuacionesReactivas : Actuacionesreactivas,
			addActuacionReactiva: ActuacionReactiva,
			Playas: playa,
			isLoggedIn: req.isAuthenticated()
		});
	});});});
});
});
});
});






socoRoutes.post('/addPlaya', isLoggedIn, (req, res) => {
	let body = req.body;
	body.status = false;

	socoRoutes.create(body, (err, Playa) => {
		if (err) throw err;
		res.redirect('back');
	});
});

// socoRoutes.post('/addAviso', isLoggedIn, (req, res) => {
// 	let body = req.body;
// 	body.status = false;

// 	Avisos.create(body, (err, Aviso) => {
// 		if (err) throw err;
// 		res.redirect('back');
// 	});
// });

socoRoutes.post('/addActivas', isLoggedIn, (req, res) => {
		let body = req.body;
		body.status = false;
	
		addActuacionActiva.create(body, (err, Aviso) => {
			if (err) throw err;
			res.redirect('back');
		});
});

socoRoutes.post('/addReactivas', isLoggedIn, (req, res) => {
	let body = req.body;
	body.status = false;

	addActuacionReactiva.create(body, (err, Aviso) => {
		if (err) throw err;
		res.redirect('back');
	});
});




function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}


module.exports = socoRoutes;
