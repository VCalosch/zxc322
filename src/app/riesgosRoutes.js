
const express = require('express');
const routRiesgos = express.Router();
const modelRiesgos = require('../app/models/riesgos');
const TipologiaRiesgos = require('../app/models/TipologiaRiesgo');
const RiesgosNombres = require('../app/models/RiesgosNombres');
const RiesgosVariables = require('../app/models/RiesgosVariables');
const UbicarServiciosModel = require('../app/models/UbicarServicios');
const modelPlaya = require('../app/models/playa');
const ListaRiesgos = require('../app/models/ListaRiesgos');


//Listar riesgos
// routRiesgos.get('/riegosAdmin', isLoggedIn, (req, res) => {
// 	modelRiesgos.find({}, (err, riesgo) => {
// 		if (err) { throw err; }
// 		else {
// 			res.render('riegosAdmin', {
// 				Riesgos: riesgo,
// 				isLoggedIn: req.isAuthenticated() 
// 			});
// 		}
// 	});
// });

//Listar Riesgos
routRiesgos.get('/riesgos/:id', isLoggedIn, (req, res) => {
	let id = req.params.id;
	modelPlaya.findById({_id:id}, (err, playa) =>{
		if (err)  throw err;
	modelRiesgos.find({}, (err, riesgo) => {
		if (err) { throw err; }
		else {
			res.render('riegosAdmin', {
				Riesgos: riesgo,
				Playas: playa,
				isLoggedIn: req.isAuthenticated() 
			});
		}
	});
	});
});

//Agregar Riesgos
routRiesgos.get('/addRiesgo/:id', isLoggedIn, (req, res) => {
	let id = req.params.id;
	modelPlaya.findById({_id:id}, (err, playa) =>{
		if (err)  throw err;
	RiesgosNombres.find({}, (err, riesgo) => {
		if (err)  throw err;
		UbicarServiciosModel.find({}, (err, UbicarServiciosModel) => {
			if (err)  throw err;
			RiesgosVariables.find({}, (err, RiesgosVariables) => {
				if (err)  throw err;
				TipologiaRiesgos.find({}, (err, TipologiaRiesgos) => {
					if (err)  throw err;
					ListaRiesgos.find({}, (err, ListaRiesgos) => {
						if (err)  throw err;
				else {
			res.render('addRiesgo', {
				Riesgos: riesgo,
				Ubicar: UbicarServiciosModel,
				Playas: playa,
				ListaRiesgos: ListaRiesgos,
				Variables: RiesgosVariables,
				Tipologias: TipologiaRiesgos,
				isLoggedIn: req.isAuthenticated() 
			});
		}
	});
	});
});
	});
	});
	});
	//res.render('addRiesgo',{isLoggedIn: req.isAuthenticated() });
});

//::::::::::::::::::CSV Riesgos ::::::::::::::::
routRiesgos.get('/exporttocsvRiesgos/:id', function(req, res, next) {
    let filename   = "Riesgos.csv"; //Nombre del doc
    let dataArray;
    let id = req.params.id;
	let body = req.body;
    modelRiesgos.find({ _id: id }, body).lean().exec({}, function(err, Playas) {
        if (err) res.send(err);
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader("Content-Disposition", 'attachment; filename='+filename);
        res.csv(Playas, true);
    });
});
//::::::::::Generar CSV::::::::::
routRiesgos.get('/exporttocsvRiesgos', function(req, res, next) {
    let filename = "Riesgos.csv"; //Nombre del documento
    let dataArray;
	//Se llama al modelo (Igual que antes)
    modelRiesgos.find().lean().exec({}, function(err, Playas) {
        if (err) res.send(err);
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader("Content-Disposition", 'attachment; filename='+filename);
        res.csv(Playas, true);
    });
});


//Agregar riesgos
routRiesgos.post('/addRiesgo', isLoggedIn, (req, res) => {
	let body = req.body;
	body.status = false;

	modelRiesgos.create(body, (err, riesgo) => {
		if (err) { throw err; }
		res.redirect('back');
	});
});



//Eliminar Riesgo
// routRiesgos.get('/riegosAdmin/delete/:id', isLoggedIn, (req, res) => {
// 	let id = req.params.id;
// 	modelRiesgos.findByIdAndRemove({ _id: id }, (err, riesgo) => {
// 		if (err) { throw err; }
// 		else {
// 			res.redirect('/riegosAdmin');
// 		}
// 	});
// });


//render de modificar riesgos
// routRiesgos.get('/riegosAdmin/modRiesgo/:id', isLoggedIn, (req, res) => {
// 	let id = req.params.id;
// 	modelRiesgos.findById({ _id: id }, (err, riesgo) => {
// 		if (err) { throw err; }
// 		else {
// 			res.render('modRiesgo', {
// 				Riesgos: riesgo,
// 				isLoggedIn: req.isAuthenticated() 
// 			});
// 		}
// 	});
// });

//modificar riesgos
// routRiesgos.post('/riegosAdmin/modRiesgo/:id', isLoggedIn, (req, res) => {
// 	let id = req.params.id;
// 	let body = req.body;
// 	modelRiesgos.findByIdAndUpdate({ _id: id }, body, (err, riesgo) => {
// 		if (err) { throw err; }
// 		else {
// 			res.redirect('/riegosAdmin');
// 		}
// 	});
// });

// ---------------------- Riesgos CV --------------------------------

//Agregar TipologiaRiesgos
routRiesgos.post('/Variables', isLoggedIn, (req, res) => {
	let body = req.body;
	body.status = false;

	RiesgosVariables.create(body, (err, ss) => {
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