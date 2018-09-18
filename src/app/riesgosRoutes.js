
const express = require('express');
const routRiesgos = express.Router();
const modelRiesgos = require('../app/models/riesgos');
const TipologiaRiesgos = require('../app/models/TipologiaRiesgo');
const RiesgosNombres = require('../app/models/RiesgosNombres');
const UbicarServiciosModel = require('../app/models/UbicarServicios');


//Listar riesgos
routRiesgos.get('/riegosAdmin', isLoggedIn, (req, res) => {
	modelRiesgos.find({}, (err, riesgo) => {
		if (err) { throw err; }
		else {
			res.render('riegosAdmin', {
				Riesgos: riesgo,
				isLoggedIn: req.isAuthenticated() 
			});
		}
	});
});



//render de riesgos
routRiesgos.get('/addRiesgo', isLoggedIn, (req, res) => {
	RiesgosNombres.find({}, (err, riesgo) => {
		if (err)  throw err;
		UbicarServiciosModel.find({}, (err, UbicarServiciosModel) => {
			if (err)  throw err; 
		else {
			res.render('addRiesgo', {
				Riesgos: riesgo,
				Ubicar: UbicarServiciosModel,
				isLoggedIn: req.isAuthenticated() 
			});
		}
	});
	});
	//res.render('addRiesgo',{isLoggedIn: req.isAuthenticated() });
});


//Agregar riesgos
routRiesgos.post('/addRiesgo', isLoggedIn, (req, res) => {
	let body = req.body;
	body.status = false;

	modelRiesgos.create(body, (err, riesgo) => {
		if (err) { throw err; }
		res.redirect('/riegosAdmin');
	});
});



//Eliminar Riesgo
routRiesgos.get('/riegosAdmin/delete/:id', isLoggedIn, (req, res) => {
	let id = req.params.id;
	modelRiesgos.findByIdAndRemove({ _id: id }, (err, riesgo) => {
		if (err) { throw err; }
		else {
			res.redirect('/riegosAdmin');
		}
	});
});


//render de modificar riesgos
routRiesgos.get('/riegosAdmin/modRiesgo/:id', isLoggedIn, (req, res) => {
	let id = req.params.id;
	modelRiesgos.findById({ _id: id }, (err, riesgo) => {
		if (err) { throw err; }
		else {
			res.render('modRiesgo', {
				Riesgos: riesgo,
				isLoggedIn: req.isAuthenticated() 
			});
		}
	});
});

//modificar riesgos
routRiesgos.post('/riegosAdmin/modRiesgo/:id', isLoggedIn, (req, res) => {
	let id = req.params.id;
	let body = req.body;
	modelRiesgos.findByIdAndUpdate({ _id: id }, body, (err, riesgo) => {
		if (err) { throw err; }
		else {
			res.redirect('/riegosAdmin');
		}
	});
});

// ---------------------- Riesgos CV --------------------------------

//Agregar TipologiaRiesgos
routRiesgos.post('/Tipologia', isLoggedIn, (req, res) => {
	let body = req.body;
	body.status = false;

	RiesgosNombres.create(body, (err, ss) => {
		if (err) throw err;
		res.redirect('back');
	});
});



//Validar si el usario esta loggeado
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

module.exports = routRiesgos;