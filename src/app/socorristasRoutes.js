/*const express = require('express');
const socoRoutes = express.Router();
const User = require('../app/models/user');
const modelPlaya = require('../app/models/playa');



socoRoutes.get('/socorrista', (req, res) => {
	modelPlaya.find({}, (err, playa) => {
		if (err) throw err;
		User.find({},(err,users) =>{
			if(err){throw err;}
			else{
			res.render('socorrista', {
			Playas: playa,
			lista: users
		});
			}
		})
	});
});

module.exports = socoRoutes;*/

const express = require('express');
const socoRoutes = express.Router();
const User = require('../app/models/user');
const modelPlaya = require('../app/models/playa');



socoRoutes.get('/socorrista', (req, res) => {
	modelPlaya.find({}, (err, playa) => {
		if (err) throw err;
		User.find({},(err,users) =>{
			if(err){throw err;}
			else{
			res.render('socorrista', {
			Playas: playa,
			lista: users,
			isLoggedIn: req.isAuthenticated()
		});
			}
		})
	});
});

module.exports = socoRoutes;