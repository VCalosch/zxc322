const express = require('express'); //lamar a express	
const herraRoutes = express.Router(); //crear un objeto de tipo express con nombre routPlaya
const ServicioModel = require('../app/models/ServicioPlaya'); //llamar al modelo del base de datos
const UbicarServiciosModel = require('../app/models/UbicarServicios');
const modelPlaya = require('../app/models/playa');
const Actuacionesactivas = require('../app/models/Actuacionesactivas');
const Actuacionesreactivas = require('../app/models/Actuacionesreactivas');
const Eventos = require('../app/models/EventosX');
const User = require('../app/models/user');


//::::::::::render serviciosPlaya::::::::::

herraRoutes.get('/herramientas/:id/', (req,res) =>{
	let id = req.params.id;
	modelPlaya.findById({_id: id}, (err, playa) =>{
		if(err) throw err;
		  ServicioModel.find({ }, (err,servicio) =>{
			if (err) throw err;
			Eventos.find({ }, (err,eventos) =>{
				if (err) throw err;
			UbicarServiciosModel.find({ }, (err,UbicarServicio) =>{
			if (err) throw err;
			Actuacionesactivas.find({},(err, ActActivas) => {
				if(err){ throw err;}
				Actuacionesreactivas.find({},(err, ActReactivas) =>{
					if(err){ throw err;}
		  	 else{
		  	 	res.render('herramientas', {
					user: req.user,
					Playas: playa,
					Servicio: servicio,
					Eventos: eventos,
					Actuacionesactivas : ActActivas,
					UbicarServicio: UbicarServicio,
					ActuacionesReactivas:ActReactivas,
					isLoggedIn: req.isAuthenticated()});
				   }
		  	 })
		  });
		});
		});
	});
	})
});

herraRoutes.post('/herramientas/:id', (req, res) => {
	let body = req.body;
	body.status = false;
	const id = req.params.id;

	Eventos.findById({ _id: id }, (err, evento) => {
		if (err) throw err;

		let descripcion = [...evento.descripcion]
		descripcion.push({ name: body.descripcion })

		evento.descripcion = descripcion;

		evento.save((err2, updatedTank) => {
			if (err2) throw err2;
			res.redirect('/GestionEventos');
		});

	})
});

herraRoutes.get('/caracteristicasPlaya/:id/', (req,res) =>{
	let id = req.params.id;
	modelPlaya.findById({_id: id}, (err, playa) =>{
		if(err) throw err;
		  ServicioModel.find({ }, (err,servicio) =>{
			if (err) throw err;
			UbicarServiciosModel.find({ }, (err,UbicarServicio) =>{
			if (err) throw err;
		  	 else{
		  	 	res.render('caracteristicasPlaya', {
					Playas: playa,
					Servicio: servicio,
					UbicarServicio: UbicarServicio,
					isLoggedIn: req.isAuthenticated()});
				   }
		  	 })
		  });
	})
});

	




function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

module.exports = herraRoutes;