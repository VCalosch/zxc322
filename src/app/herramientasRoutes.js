const express = require('express'); //lamar a express	
const herraRoutes = express.Router(); //crear un objeto de tipo express con nombre routPlaya
const ServicioModel = require('../app/models/ServicioPlaya'); //llamar al modelo del base de datos
const UbicarServiciosModel = require('../app/models/UbicarServicios');
const modelPlaya = require('../app/models/playa');
const Actuacionesactivas = require('../app/models/Actuacionesactivas');
const Actuacionesreactivas = require('../app/models/Actuacionesreactivas');
const Eventos = require('../app/models/EventosX');
const User = require('../app/models/user');
const SucesoIntervencion = require('../app/models/SucesoIntervencion');
const modelRiesgos = require('../app/models/Riesgos/riesgos');
const Incidente = require('../app/models/Incidente');

//---------BORRAR ESTO DESPUES DE AGREGAR RIESGOS--------


//-------------------------------------------------------

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
					modelRiesgos.find({}, (err, riesgo) => {
						if (err) { throw err; }
						Incidente.find({},(err, incidente) =>{
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
					Incidente: incidente,
					Riesgos: riesgo,
					isLoggedIn: req.isAuthenticated()});
				   }
		  	 })
		  });
		});
	});
	});
		});
	});
	})
});


herraRoutes.get('/eventos/:id', (req,res) =>{
	let id = req.params.id;
	modelPlaya.findById({_id: id}, (err, playa) =>{
		if(err) throw err;
		  ServicioModel.find({ }, (err,servicio) =>{
			if (err) throw err;
			UbicarServiciosModel.find({ }, (err,UbicarServicio) =>{
			if (err) throw err;
			Incidente.find({ }, (err,incidente) =>{
				if (err) throw err;

		  	 else{
		  	 	res.render('eventos', {
					Playas: playa,
					Servicio: servicio,
					UbicarServicio: UbicarServicio,
					Incidente: incidente,
					
					isLoggedIn: req.isAuthenticated()});
				   }
		  	 })
		  });
		});
	})
});




herraRoutes.post('/incidentes/:id', (req, res) => {
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

herraRoutes.get('/incidentes/:id/', (req,res) =>{
	let id = req.params.id;
	modelPlaya.findById({_id: id}, (err, playa) =>{
		if(err) throw err;
			Eventos.find({ }, (err,evento) =>{
			if (err) throw err;
			Incidente.find({ }, (err,incidente) =>{
			if (err) throw err;
		  	 else{
		  	 	res.render('Incidentes', {
					Playas: playa,
					Incidente: incidente,
					Eventos: evento,
					isLoggedIn: req.isAuthenticated()});
				   }
		  	 })
		  });
	})
});

// herraRoutes.get('/incidentes/:id/', (req,res) =>{
// 	let id = req.params.id;
// 	modelPlaya.findById({_id: id}, (err, playa) =>{
// 		if(err) throw err;
// 		Incidente.find({ }, (err,incidente) =>{
// 			if (err) throw err;
// 			Eventos.find({ }, (err,eventos) =>{
// 				if (err) throw err;
// 		  	 else{
// 		  	 	res.render('Incidentes', {
// 					Playas: playa,
// 					Incidente: incidente,
// 					Eventos: evento,
// 					isLoggedIn: req.isAuthenticated()});
// 				   }
// 		  	 });
// 		  });
// 		});
// 		});


		// herraRoutes.post('/sxs', isLoggedIn, (req, res) => {
		// 	let body = req.body;
		// 	body.status = false;
		
		// 	SucesoIntervencion.create(body, (err, Aviso) => {
		// 		if (err) throw err;
		// 		res.redirect('back');
		// 	});
		// });

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

module.exports = herraRoutes;