const express = require('express'); //lamar a express	
const routServicio = express.Router(); //crear un objeto de tipo express con nombre routPlaya
const ServicioModel = require('../app/models/ServicioPlaya'); //llamar al modelo del base de datos

//::::::::::render serviciosPlaya::::::::::
routServicio.get('/ss/:id', isLoggedIn, (req, res) => {
	ServicioModel.findById({ _id: id }, (err, servicio) => {
	if (err) throw err;
	res.render('servicioPlaya_v', {Servicio: servicio, isLoggedIn: req.isAuthenticated()});
	});
});

routServicio.post('/ss', isLoggedIn, (req, res) => {
	let body = req.body;
	body.status = false;

	ServicioModel.create(body, (err, Playa) => {
		if (err) throw err;
		res.redirect('/ss');
	});
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

module.exports = routServicio;