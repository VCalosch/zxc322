const express = require('express'); //lamar a express	
const herraRoutes = express.Router(); //crear un objeto de tipo express con nombre routPlaya
const ServicioModel = require('../app/models/ServicioPlaya'); //llamar al modelo del base de datos
const UbicarServiciosModel = require('../app/models/UbicarServicios');
const modelPlaya = require('../app/models/playa');


//::::::::::render serviciosPlaya::::::::::
herraRoutes.get('/herramientas/:id/', (req,res) =>{
	let id = req.params.id;
	modelPlaya.findById({_id: id}, (err, playa) =>{
		if(err) throw err;
		  ServicioModel.find({ }, (err,servicio) =>{
			if (err) throw err;
			UbicarServiciosModel.find({ }, (err,UbicarServicio) =>{
			if (err) throw err;
		  	 else{
		  	 	res.render('herramientas', {
					Playas: playa,
					Servicio: servicio,
					UbicarServicio: UbicarServicio,
					isLoggedIn: req.isAuthenticated()});
				   }
		  	 })
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