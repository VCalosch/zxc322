/*const express = require('express'); //lamar a express	
const routPlaya = express.Router(); //crear un objeto de tipo express con nombre routPlaya
const modelPlaya = require('../app/models/playa'); //llamar al modelo del base de datos

//Crear un nuevo modelo para Relacion  de colecciones



//::::::::::Listar todas las playas::::::::::
routPlaya.get('/playaAdmin', isLoggedIn, (req, res) => {
	modelPlaya.find({}, (err, playa) => {
		if (err) throw err;
		//Anexar riesgo a la busqueda de playas
		res.render('playaAdmin', {
			Playas: playa
		});
	});
});


//::::::::::render addPlaya::::::::::
routPlaya.get('/addPlaya', isLoggedIn, (req, res) => {
	res.render('addPlaya');
});


//::::::::::Agregar playa ::::::::::::::
routPlaya.post('/addPlaya', isLoggedIn, (req, res) => {
	let body = req.body;
	body.status = false;

	modelPlaya.create(body, (err, Playa) => {
		if (err) throw err;
		res.redirect('/playaAdmin');
	});
});


//::::::::::Eliminar playa:::::::::::
routPlaya.get('/playaAdmin/delete/:id', isLoggedIn, (req, res) => {
	let id = req.params.id;
	modelPlaya.findByIdAndRemove({ _id: id }, (err, playa) => {
		if (err) throw err;
		res.redirect('/playaAdmin');
	});
});


//::::::::::MODIFICAR PLAYA :::::::::: 
routPlaya.get('/playaAdmin/modPlaya/:id', isLoggedIn, (req, res) => {
	let id = req.params.id;

	modelPlaya.findById({ _id: id }, (err, playa) => {
		if (err) throw err;
		res.render('modPlaya', {
			Playas: playa
		});
	});

});


routPlaya.post('/playaAdmin/modPlaya/:id', isLoggedIn, (req, res) => {
	let id = req.params.id;
	let body = req.body;
	modelPlaya.findByIdAndUpdate({ _id: id }, body, (err, Playa) => {
		if (err) {
			console.log(err);
		}
		res.redirect('/playaAdmin');
	});
});


//:::::::::::Validar si esta logeado::::::::::::::
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

module.exports = routPlaya;*/

const express = require('express'); //lamar a express	
const routPlaya = express.Router(); //crear un objeto de tipo express con nombre routPlaya
const modelPlaya = require('../app/models/playa'); //llamar al modelo del base de datos

//Crear un nuevo modelo para Relacion  de colecciones



//::::::::::Listar todas las playas::::::::::
routPlaya.get('/playaAdmin', isLoggedIn, (req, res) => {
	modelPlaya.find({}, (err, playa) => {
		if (err) throw err;
		//Anexar riesgo a la busqueda de playas
		res.render('playaAdmin', {
			Playas: playa,
			isLoggedIn: req.isAuthenticated()
		});
	});
});


//::::::::::render addPlaya::::::::::
routPlaya.get('/addPlaya', isLoggedIn, (req, res) => {
	res.render('addPlaya', {isLoggedIn: req.isAuthenticated()});
});


//::::::::::Agregar playa ::::::::::::::
routPlaya.post('/addPlaya', isLoggedIn, (req, res) => {
	let body = req.body;
	body.status = false;

	modelPlaya.create(body, (err, Playa) => {
		if (err) throw err;
		res.redirect('back');
	});
});


//::::::::::Eliminar playa:::::::::::
routPlaya.get('/playaAdmin/delete/:id', isLoggedIn, (req, res) => {
	let id = req.params.id;
	modelPlaya.findByIdAndRemove({ _id: id }, (err, playa) => {
		if (err) throw err;
		res.redirect('/playaAdmin');
	});
});


//::::::::::MODIFICAR PLAYA :::::::::: 
routPlaya.get('/playaAdmin/modPlaya/:id', isLoggedIn, (req, res) => {
	let id = req.params.id;

	modelPlaya.findById({ _id: id }, (err, playa) => {
		if (err) throw err;
		res.render('modPlaya', {
			Playas: playa,
			isLoggedIn: req.isAuthenticated()
		});
	});

});


routPlaya.post('/playaAdmin/modPlaya/:id', isLoggedIn, (req, res) => {
	let id = req.params.id;
	let body = req.body;
	modelPlaya.findByIdAndUpdate({ _id: id }, body, (err, Playa) => {
		if (err) {
			console.log(err);
		}
		res.redirect('/playaAdmin');
	});
});


//:::::::::::Validar si esta logeado::::::::::::::
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

module.exports = routPlaya;