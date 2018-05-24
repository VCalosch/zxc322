const express = require('express');
const socoRoutes = express.Router();
const User = require('../app/models/user');
const COOsolcPlaya = require('../app/models/COOsolcPlaya');
const modelPlaya = require('../app/models/playa');
const PerfilUsuario = require('../app/models/PerfilUsuario');
const request = require('request');


socoRoutes.get('/coordinador', (req, res) => { //Listar Todo
	modelPlaya.find({}, (err, playa) => {
		if (err) throw err;
		User.find({},(err,users) =>{
			if(err){throw err;}
			else{
			res.render('coordinador', {
			Playas: playa,
			lista: users
		});
			}
		})
	});
});


socoRoutes.post('/SolicitarPlaya' , (req, res) =>{ //Agregar solicitud playa
	let body = req.body;
	body.status = false;
	COOsolcPlaya.create(body, (err, newSolPlaya) =>{
		if(err){ throw err;}
		else{
			res.redirect('/coordinador');
		}
	})
});




socoRoutes.post('/AgregarUsuario' , (req, res) =>{ //Agregar Usuario
	let body = req.body;
	body.status = false;
	PerfilUsuario.create(body, (err, newUsuario) =>{
		if(err){ throw err;}
		else{
			request.post(
			    '/signup',
			    { json: { body } },
			    function (error, response, body) {
			        if (!error && response.statusCode == 200) {
			            response.send(body);
			            
			        }
			    }
			);

			res.redirect('/coordinador');
		}
	})
});
module.exports = socoRoutes;
