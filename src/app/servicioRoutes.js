const express = require('express'); //lamar a express	
const routServicio = express.Router(); //crear un objeto de tipo express con nombre routPlaya
const ServicioModel = require('../app/models/ServicioPlaya'); //llamar al modelo del base de datos
const UbicarServiciosModel = require('../app/models/UbicarServicios');
const modelPlaya = require('../app/models/playa');


//::::::::::render serviciosPlaya::::::::::
routServicio.get('/ss/:id', (req,res) =>{
	let id = req.params.id;
	modelPlaya.findById({_id:id}, (err, playa) =>{
		if(err) throw err;
		  ServicioModel.find({ }, (err,servicio) =>{
			if (err) throw err;
			UbicarServiciosModel.find({ }, (err,UbicarServicio) =>{
			if (err) throw err;
		  	 else{
		  	 	res.render('servicioPlaya_v', {
					Playas: playa,
					Servicio: servicio,
					UbicarServicio: UbicarServicio,
					isLoggedIn: req.isAuthenticated()});
				   }
		  	 })
		  });
	})
});

routServicio.get('/ss/:id', (req,res) =>{
	let id = req.params.id;
	UbicarServiciosModel.find((err, playa) =>{
			if (err) throw err;
		  	 else{
		  	 	res.render('servicioPlaya_v', {
					UbicarServicio: UbicarServicio
					});
				   }
		  	 })
		  });
	


routServicio.post('/ss', isLoggedIn, (req, res) => {
	let body = req.body;
	body.status = false;

	UbicarServiciosModel.create(body, (err, Playa) => {
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

module.exports = routServicio;