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
const Incidente = require('../app/models/Incidentes/Incidente');
const addIncidente = require('../app/models/Incidentes/DatosIncidente');

const DatosIncidente = require('../app/models/Incidentes/DatosIncidente');

const ListaRiesgos = require('../app/models/Riesgos/ListaRiesgos');

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
		ListaRiesgos.find({},(err, ListaRiesgos) => {
			if(err){ throw err;}
   	 res.render('addEvento', {
			Eventos: eventos,
			ListaRiesgos: ListaRiesgos,
			isLoggedIn: req.isAuthenticated()
		});
	});
    });
});
IncidenteInter.get('/addEvento', (req, res) => {
    res.render('addEvento');
});
IncidenteInter.post('/addEvento', (req, res) => {
    let body = req.body;
    body.status = false;

    ListaRiesgos.create(body, (err, ListaRiesgos) => {
   	 if (err) throw err;
   	 res.redirect('/addEvento');
    });
});






IncidenteInter.get('/addEvento/addDescripcion/:id', (req, res) => {
	let id = req.params.id;
	let body = req.body;
	ListaRiesgos.findById({ _id: id }, (err, ListaRiesgos) => {
		if (err) throw err;
		res.render('addDescripcion', {
			ListaRiesgos: ListaRiesgos,
			isLoggedIn: req.isAuthenticated()
		});
	});
});


IncidenteInter.post('/addEvento/update/:id', (req, res) => {
	let body = req.body;
	body.status = false;
	const id = req.params.id;

	ListaRiesgos.findById({ _id: id }, (err, Riesgo) => {
		if (err) throw err;

		let Tipologia = [...Riesgo.Tipologia]
		Tipologia.push({ name: body.Tipologia })

		Riesgo.Tipologia = Tipologia;

		Riesgo.save((err2, updatedTank) => {
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

IncidenteInter.post('/submitshit', (req, res) => {
	let body = req.body;
	body.status = false;

	addIncidente.create(body, (err, consecu) => {
		if (err) throw err;
		res.redirect('back');
	});
});



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

	ActReact.update(body, (err, consecu) => {
		if (err) throw err;
		res.redirect('/GestionEventos/' + id);
	});
});




IncidenteInter.get('/Incidencias/delete/:id', (req, res) => {
	let id = req.params.id;
	ActuacionesSave.findByIdAndRemove({ _id: id }, (err, actsa) => {
		if (err) throw err;
		res.redirect('/Incidencias');
	});
});

//GET y POST para poder actualizar los incidentes guardos previamente
IncidenteInter.get('/modIncidente/:id/', (req,res) =>{
	let id = req.params.id;
	Incidente.findById({_id: id}, (err, incidente) =>{ //Busca el Incidente por medio del ID que se le pasa en la vista '/eventos'
		if(err) throw err;
			Eventos.find({ }, (err,evento) =>{ //Lista de Eventos Disponibles con sus descripciones
			if (err) throw err;
			modelPlaya.find({ }, (err,playa) =>{ // 
			if (err) throw err;
			DatosIncidente.find({ }, (err,datosIncidente) =>{ //Toda la informacion para los ComboBox
				if (err) throw err;
			
		  	 else{
		  	 	res.render('modIncidente', {
					Playas: playa,
					Incidente: incidente,
					Eventos: evento,
					DatosIncidente: datosIncidente,
					isLoggedIn: req.isAuthenticated()});
				   }
		  	 })
		  });
	})
});
});

IncidenteInter.post('/modIncidente', (req, res) => {
	let body = req.body;
	body.status = false;

	Incidente.create(body, (err, consecu) => {
		if (err) throw err;
		res.redirect('back');
	});
});





module.exports = IncidenteInter;