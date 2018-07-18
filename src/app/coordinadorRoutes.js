/*const express = require('express');
const socoRoutes = express.Router();
const User = require('../app/models/user');
const COOsolcPlaya = require('../app/models/COOsolcPlaya');
const modelPlaya = require('../app/models/playa');
const PerfilUsuario = require('../app/models/PerfilUsuario');
const request = require('request');


socoRoutes.get('/coordinador', (req, res) => { //Listar Todo
	modelPlaya.find({}, (err, playa) => {
		if (err) throw err;
		User.find({},(err,users) =>{
			if(err){throw err;}
			else{
			res.render('coordinador', {
			Playas: playa,
			lista: users
		});
			}
		})
	});
});


socoRoutes.post('/SolicitarPlaya' , (req, res) =>{ //Agregar solicitud playa
	let body = req.body;
	body.status = false;
	COOsolcPlaya.create(body, (err, newSolPlaya) =>{
		if(err){ throw err;}
		else{
			res.redirect('/coordinador');
		}
	})
});




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
module.exports = socoRoutes;*/

const express = require('express');
const socoRoutes = express.Router();
const User = require('../app/models/user');
const COOsolcPlaya = require('../app/models/COOsolcPlaya');
const modelPlaya = require('../app/models/playa');
const PerfilUsuario = require('../app/models/PerfilUsuario');
const Servicio = require('../app/models/ServicioPlaya');
const addServicio = require('../app/models/addServicio');
const Actuacionesactivas = require('../app/models/Actuacionesactivas');
const Actuacionesreactivas = require('../app/models/Actuacionesreactivas');
const request = require('request');


socoRoutes.get('/coordinador', (req, res) => { //Listar Todo
	modelPlaya.find({}, (err, playa) => {
		if (err) throw err;
		User.find({},(err,users) =>{
			if(err){throw err;}
			else{
				Actuacionesactivas.find({}, (err,Act) =>{
					if(err){ throw err;}
					else{
						PerfilUsuario.find({} , (err, usr) =>{
							if(err){throw err;}
							else{
							res.render('coordinador', {
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

socoRoutes.post('/SolicitarPlaya' , (req, res) =>{ //Agregar solicitud playa ̈́
	let body = req.body;
	body.status = false;
	COOsolcPlaya.create(body, (err, newSolPlaya) =>{
		if(err){ throw err;}
		else{
			res.redirect('/coordinador');
		}
	})
});




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
module.exports = socoRoutes;
