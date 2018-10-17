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
const modelPlaya = require('../app/models/playa');
const Paises = require('../app/models/Paises'); 
const ActividadDrp = require('../app/models/ActividadDrp'); 
const Incidente = require('../app/models/Incidente'); 

//DROP EVENTOS Y CONSECUENCIAS
IncidenteInter.get('/GestionEventos/:id', (req, res) => {
 let id = req.params.id;
 modelPlaya.findById({_id:id}, (err, playa) =>{
 	if (err) {throw err;}
 	else{
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
									Playas: playa,
									Eventos: eventos,
									consecuencia: consecu,
									Actuacionesactivas : ActActivas,
									Actuacionesreactivas : ActReactivas,
									isLoggedIn: req.isAuthenticated()
								});
							});
						}
					});
				}
			});
		}
	});
 	}
 });
});

IncidenteInter.get('/addEvento', (req, res) => {
    Eventos.find({}, (err, eventos) => {
   	 if (err) throw err;
   	 res.render('addEvento', {
			Eventos: eventos,
			isLoggedIn: req.isAuthenticated()
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
   	 res.redirect('/addEvento');
    });
});
IncidenteInter.get('/addEvento/delete/:id', (req, res) => {
    let id = req.params.id;
    Eventos.findByIdAndRemove({ _id: id }, (err, eventos) => {
   	 if (err) throw err;
   	 res.redirect('/addEvento');
    });
});



IncidenteInter.get('/addEvento/addDescripcion/:id', (req, res) => {
	let id = req.params.id;
	let body = req.body;
	Eventos.findById({ _id: id }, (err, evento) => {
		if (err) throw err;
		res.render('addDescripcion', {
			Eventos: evento,
			isLoggedIn: req.isAuthenticated()
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

IncidenteInter.post('/addIncidente', (req, res) => {
	let body = req.body;
	body.status = false;

	Incidente.create(body, (err, consecu) => {
		if (err) throw err;
		res.redirect('back');
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
			consecuencia: consecu,
			isLoggedIn: req.isAuthenticated()
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

IncidenteInter.get('/addActuacionesactivas', (req, res) => {
	Actuacionesactivas.find({}, (err, ActActivas) => {
		if (err) throw err;
		res.render('addActuacionesactivas', {
			ActuacionActivas  : ActActivas,
			isLoggedIn: req.isAuthenticated()
		});
	});
});
IncidenteInter.get('/addActuacionesactivas', (req, res) => {
	res.render('addActuacionesactivas');
});
IncidenteInter.post('/addActuacionesactivas', (req, res) => {
	let body = req.body;
	body.status = false;
	Actuacionesactivas.create(body, (err, ActActivas) => {
		if (err) throw err;
		res.redirect('/addActuacionesactivas');
	});
});
IncidenteInter.get('/addActuacionesactivas/delete/:id', (req, res) => {
	let id = req.params.id;
	Actuacionesactivas.findByIdAndRemove({ _id: id }, (err, ActActivas) => {
		if (err) throw err;
		res.redirect('/addActuacionesactivas');
	});
});


IncidenteInter.get('/AlphaCored', (req,res) =>{
	res.render('AlphaCored', {isLoggedIn: req.isAuthenticated()});
});

//FIN DE Consecuencia ////////////////////////////// 
//::===:::====:::====:::====:::=====:::====:::====:::===:::====:::====:::====:::=====:::====:::====::
//ADMINISTRACION DEL DROP ACTUACIONES REACTIVAS

IncidenteInter.get('/addActuacionesreactivas', (req, res) => {
	Actuacionesreactivas.find({}, (err, ActReactivas) => {
		if (err) throw err;
		res.render('addActuacionesreactivas', {
			Actuacionesreactivas : ActReactivas,
			isLoggedIn: req.isAuthenticated()
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

IncidenteInter.get('/GestionEventos/addReactForm/:id/:idPlaya', (req, res) => {
	let id = req.params.id;
	Actuacionesreactivas.findById({ _id: id }, (err, ActReact) => {
		if (err) throw err;
		res.render('addReactForm', {
			idPlaya: req.params.idPlaya,
			ActividadReact : ActReact
		});
	});

});
IncidenteInter.post('/GestionEventos/addReactForm/', (req, res) => {
	let body = req.body;
	let id = req.body.idPlaya;
	body.status = false;

	ActReact.create(body, (err, consecu) => {
		if (err) throw err;
		res.redirect('/GestionEventos/' + id);
	});
});



//FIN DE ACTUACIONES REACTIVAS ////////////////////////////// 
//::===:::====:::====:::====:::=====:::====:::====:::===:::====:::====:::====:::=====:::====:::====::
//ADMINISTRACION Para el guardado de Actuacionessave se piensa usar en general para poder listar todos los datos



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
	let idPlaya = req.body.idPlaya;
	body.status = false;

	ActuacionesSave.create(body, (err, consecu) => {
		if (err) throw err;
		res.redirect('/GestionEventos/' + idPlaya);
	});
});

//FIN DE ACTUACIONES Actuaciones ////////////////////////////// 
//::===:::====:::====:::====:::=====:::====:::====:::===:::====:::====:::====:::=====:::====:::====::
//MOSTRAR TODOS LOS DATOS DE BASE DE DATOS
IncidenteInter.get('/GestionEventos/Incidencias/:id', (req, res) => {
	ActuacionesSave.find({idPlaya: req.params.id}, (err, actsav) => {
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

IncidenteInter.get('/Incidencias/delete/:id', (req, res) => {
	let id = req.params.id;
	ActuacionesSave.findByIdAndRemove({ _id: id }, (err, actsa) => {
		if (err) throw err;
		res.redirect('/Incidencias');
	});
});




//FIN DE MOSTRAR INCIDENCIAS ////////////////////////////// 
//::===:::====:::====:::====:::=====:::====:::====:::===:::====:::====:::====:::=====:::====:::====::
//Guardar Incidente/Intervencion

IncidenteInter.post('/addIncInt/', (req, res) => {
	let body = req.body;
	let bodyCom = req.body.descripcion;
	let bodyEve = req.body.idEvento;
	let idPlaya = req.body.idPlaya;
	console.log(body);
	console.log(bodyEve);

	body.status = false;

	IncIntSave.create(body, (err, Incidencias) => {
		if (err) throw err;
		res.redirect('/GestionEventos/' + idPlaya);
	});
});


IncidenteInter.get('/addPais', (req,res) =>{ //Listar
	Paises.find({} , (err, pais) =>{
		res.render('addPais',{
			ListPaises : pais
		});
	});
});

//::===:::====:::====:::====:::=====:::====:::====:::===:::====:::====:::====:::=====:::====:::====::
IncidenteInter.post('/agregarPais' , (req, res) =>{ //Agregar Pais
	let body = req.body;
	body.status = false;
	Paises.create(body, (err, newPais) =>{
		if(err){ throw err;}
		else{
			res.redirect('/addPais');
		}
	})
});

IncidenteInter.get('/addPais/delete/:id' , (req, res) =>{ //Eliminar pais
	let id = req.params.id;
	Paises.findByIdAndRemove({_id: id},(err, delpais) =>{
		if(err){throw err;}
		else{
			res.redirect('/addPais');
		}
	});
});

//:::===:::====:::====:::===:::====:::====:::====:::=====:::====:::====:::
//Administracion de los Drop de  Actividad 
IncidenteInter.get('/addActividadDrop', (req,res) =>{ //Listar
	ActividadDrp.find({} , (err, Actividad) =>{
		res.render('addActividadDrop',{
			Actividades : Actividad
		});
	});
});


IncidenteInter.post('/agregarActividadDrop' , (req, res) =>{ //Agregar Pais
	let body = req.body;
	body.status = false;
	ActividadDrp.create(body, (err, newActividad) =>{
		if(err){ throw err;}
		else{
			res.redirect('/addActividadDrop');
		}
	})
});

IncidenteInter.get('/addActividadDrop/delete/:id' , (req, res) =>{ //Eliminar pais
	let id = req.params.id;
	ActividadDrp.findByIdAndRemove({_id: id},(err, delActividad) =>{
		if(err){throw err;}
		else{
			res.redirect('/addActividadDrop');
		}
	});
});



module.exports = IncidenteInter;