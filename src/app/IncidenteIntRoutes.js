const express = require('express');
const IncidenteInter = express.Router();


const Eventos = require('../app/models/EventosX');
const Descripcion = require('../app/models/descripcion');
const consecuencia = require('../app/models/consecuencia');
const Actuacionesactivas = require('../app/models/Actuacionesactivas');
const Actuacionesreactivas = require('../app/models/Actuacionesreactivas');
const ActReact = require('../app/models/ActReact');
const ActuacionesSave = require('../app/models/ActuacionesSave');
const IncIntSave = require('../app/models/IncIntSave');



//DROP EVENTOS Y CONSECUENCIAS
IncidenteInter.get('/GestionEventos', (req, res) => {
	Eventos.find({}, (err, eventos) => {
		if (err) throw err;
		else{
			consecuencia.find({},(err,consecu) =>{
				if (err) {throw err;}
				else{
					Actuacionesactivas.find({},(err, ActActivas) => {
						if(err){ throw err;}
						else{
							Actuacionesreactivas.find({},(err, ActReactivas) =>{
								res.render('GestionEventos', {
									Eventos: eventos,
									consecuencia: consecu,
									Actuacionesactivas : ActActivas,
									Actuacionesreactivas : ActReactivas
								});
							});
						}
					});
				}
			});
		}
	});
});


//ADMINISTRACION DEL DROP EVENTOOOOOOOS
IncidenteInter.get('/addEvento', (req, res) => {
	Eventos.find({}, (err, eventos) => {
		if (err) throw err;
		res.render('addEvento', {
			Eventos: eventos
		});
	});
});
IncidenteInter.get('/addEvento', (req, res) => {
	res.render('addEvento');
});
IncidenteInter.post('/addEvento', (req, res) => {
	let body = req.body;
	body.status = false;

	Eventos.create(body, (err, Eventos) => {
		if (err) throw err;
		res.redirect('/GestionEventos');
	});
});
IncidenteInter.get('/addEvento/delete/:id', (req, res) => {
	let id = req.params.id;
	Eventos.findByIdAndRemove({ _id: id }, (err, eventos) => {
		if (err) throw err;
		res.redirect('/addEvento');
	});
});
//FIN DE LA ADMINISTRACION DE EVENTOS

//::===:::====:::====:::====:::=====:::====:::====:::===:::====:::====:::====:::=====:::====:::====::
//ADMINISTRACION DEL DROP Descripcion

IncidenteInter.get('/addEvento/addDescripcion/:id', (req, res) => {
	let id = req.params.id;
	let body = req.body;
	Eventos.findById({ _id: id }, (err, evento) => {
		if (err) throw err;
		res.render('addDescripcion', {
			Eventos: evento
		});
	});
});


IncidenteInter.post('/addEvento/update/:id', (req, res) => {
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
//FIN DE LA ADMINISTRACION DE EVENTOS////////////////////////////// 

//::===:::====:::====:::====:::=====:::====:::====:::===:::====:::====:::====:::=====:::====:::====::
//ADMINISTRACION DEL DROP Consecuencia
IncidenteInter.get('/addConsecuencia', (req, res) => {
	consecuencia.find({}, (err, consecu) => {
		if (err) throw err;
		res.render('addConsecuencia', {
			consecuencia: consecu
		});
	});
});
IncidenteInter.get('/addConsecuencia', (req, res) => {
	res.render('addConsecuencia');
});
IncidenteInter.post('/addConsecuencia', (req, res) => {
	let body = req.body;
	body.status = false;

	consecuencia.create(body, (err, consecu) => {
		if (err) throw err;
		res.redirect('/addConsecuencia');
	});
});
IncidenteInter.get('/addConsecuencia/delete/:id', (req, res) => {
	let id = req.params.id;
	consecuencia.findByIdAndRemove({ _id: id }, (err, consecu) => {
		if (err) throw err;
		res.redirect('/addConsecuencia');
	});
});

//FIN DE Consecuencia ////////////////////////////// 
//::===:::====:::====:::====:::=====:::====:::====:::===:::====:::====:::====:::=====:::====:::====::
//ADMINISTRACION DEL DROP ActuacionesActivas

IncidenteInter.get('/AlphaCored', (req, res) => {
	Actuacionesactivas.find({}, (err, ActActivas) => {
		if (err) throw err;
		res.render('AlphaCored', {
			ActuacionActivas  : ActActivas 
		});
	});
});
IncidenteInter.get('/AlphaCored', (req, res) => {
	res.render('AlphaCored');
});
IncidenteInter.post('/AlphaCored', (req, res) => {
	let body = req.body;
	body.status = false;
	Actuacionesactivas.create(body, (err, ActActivas) => {
		if (err) throw err;
		res.redirect('/AlphaCored');
	});
});
IncidenteInter.get('/AlphaCored/delete/:id', (req, res) => {
	let id = req.params.id;
	Actuacionesactivas.findByIdAndRemove({ _id: id }, (err, ActActivas) => {
		if (err) throw err;
		res.redirect('/AlphaCored');
	});
});


IncidenteInter.get('/AlphaCored', (req,res) =>{
	res.render('AlphaCored');
});

//FIN DE Consecuencia ////////////////////////////// 
//::===:::====:::====:::====:::=====:::====:::====:::===:::====:::====:::====:::=====:::====:::====::
//ADMINISTRACION DEL DROP ACTUACIONES REACTIVAS

IncidenteInter.get('/addActuacionesreactivas', (req, res) => {
	Actuacionesreactivas.find({}, (err, ActReactivas) => {
		if (err) throw err;
		res.render('addActuacionesreactivas', {
			Actuacionesreactivas : ActReactivas
		});
	});
});
IncidenteInter.get('/addActuacionesreactivas', (req, res) => {
	res.render('addActuacionesreactivas');
});
IncidenteInter.post('/addActuacionesreactivas', (req, res) => {
	let body = req.body;
	body.status = false;
	Actuacionesreactivas.create(body, (err, ActReactivas) => {
		if (err) throw err;
		res.redirect('/addActuacionesreactivas');
	});
});
IncidenteInter.get('/addActuacionesreactivas/delete/:id', (req, res) => {
	let id = req.params.id;
	Actuacionesreactivas.findByIdAndRemove({ _id: id }, (err, ActReactivas) => {
		if (err) throw err;
		res.redirect('/addActuacionesreactivas');
	});
});
//FIN DE Consecuencia ////////////////////////////// 
//::===:::====:::====:::====:::=====:::====:::====:::===:::====:::====:::====:::=====:::====:::====::
//ADMINISTRACION DEL FORMULARIO ACTUACIONES REACTIVAS

IncidenteInter.get('/GestionEventos/addReactForm/:id', (req, res) => {
	let id = req.params.id;
	Actuacionesreactivas.findById({ _id: id }, (err, ActReact) => {
		if (err) throw err;
		res.render('addReactForm.ejs', {
			ActividadReact : ActReact
		});
	});

});
IncidenteInter.post('/GestionEventos/addReactForm/', (req, res) => {
	let body = req.body;
	body.status = false;

	ActReact.create(body, (err, consecu) => {
		if (err) throw err;
		res.redirect('/GestionEventos');
	});
});

IncidenteInter.get('/GestionEventosAct/:id', (req, res) => {
	let id = req.params.id;
	Actuacionesactivas.findById({ _id: id }, (err, actac) => {
		if (err) throw err;
		res.render('GestionEventos.ejs', {
			ActividadAct : actac
		});
	});

});
IncidenteInter.post('/GestionEventosAct/', (req, res) => {
	let body = req.body;
	body.status = false;

	ActuacionesSave.create(body, (err, consecu) => {
		if (err) throw err;
		res.redirect('/GestionEventos');
	});
});

//FIN DE ACTUACIONES Actuaciones ////////////////////////////// 
//::===:::====:::====:::====:::=====:::====:::====:::===:::====:::====:::====:::=====:::====:::====::
//MOSTRAR TODOS LOS DATOS DE BASE DE DATOS
IncidenteInter.get('/Incidencias', (req, res) => {
	ActuacionesSave.find({}, (err, actsav) => {
		if (err) throw err;
			else{
				ActReact.find({},(err ,actre) =>{
					if(err) throw err;
					else{
						IncIntSave.find({},(err, IncInter) =>{
							res.render('Incidencias', {
							ActuacionActivasSave  : actsav,
							ActuacionActivasRe  : actre,
							IncidentInter: IncInter
							});
						});
					}
				});
			}
		});
});



//FIN DE MOSTRAR INCIDENCIAS ////////////////////////////// 
//::===:::====:::====:::====:::=====:::====:::====:::===:::====:::====:::====:::=====:::====:::====::
//Guardar Incidente/Intervencion

IncidenteInter.post('/addIncInt/', (req, res) => {
	let body = req.body;
	body.status = false;

	IncIntSave.create(body, (err, Incidencias) => {
		if (err) throw err;
		res.redirect('/GestionEventos');
	});
});
module.exports = IncidenteInter;