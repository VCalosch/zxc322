
/*const User = require('../app/models/user');  //modelo a usar para guardar los datos

module.exports = (app, passport) => {

	app.get('/', (req, res) => {
		res.render('index');
	});

	app.get('/login', (req, res) => {
		res.render('login', {
			message: req.flash('loginMessage')
		});
	});

	app.post('/login', passport.authenticate('local-login', {
		failureRedirect: '/login', // Error y te quedas en el login
		failureFlash: true
	}), function (req, res) {
		res.redirect('/profile');
	});


	app.get('/signup', (req, res) => {
		res.render('signup', {
			message: req.flash('signupMessage')
		});
	});


	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile', // redirect to the secure profile section
		failureRedirect: '/signup', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}));

	app.get('/profile', isLoggedIn, (req, res) => {
		res.render('profile', {
			user: req.user
		});
	});



	app.get('/userAdmin', isLoggedIn, (req, res) => {

		console.log('Buscando Usuarios');
		User.find({})
			.exec(function (err, users) {
				// Listar Usuarios en: console.log(users);
				if (err) { res.send('Error en lectura'); console.log("Error de lectura de Usuarios"); }
				else {

					res.render('userAdmin', {
						lista: users
					});
				}
			});
	});



	app.get('/delUser/:id', function (req, res) {

		User.findByIdAndRemove(req.params.id, function (err, user) {
			console.log('deleting user', user);
			res.redirect("/userAdmin");
		});

	});


	app.get('/userAdmin/MofUser/:id', isLoggedIn, function (req, res) {
		let id = req.params.id;
		User.findById({ _id: id }, (err, user) => {
			if (err) throw err;
			res.render('MofUser', {
				user: req.user
			});
		});
	});






	app.get('/logout', (req, res) => {
		req.logout(); //metodo preimplementado de passport
		res.redirect('/');
	});


};
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}*/

const User = require('../app/models/user');  //modelo a usar para guardar los datos

module.exports = (app, passport) => {

	app.get('/', (req, res) => {
		res.render('index');
	});

	app.get('/login', (req, res) => {
		res.render('login', {
			message: req.flash('loginMessage')
		});
	});

	app.post('/login', passport.authenticate('local-login', {
		failureRedirect: '/login', // Error y te quedas en el login
		failureFlash: true
	}), function (req, res) {
		res.redirect('/profile');
	});


	app.get('/signup', (req, res) => {
		res.render('signup', {
			message: req.flash('signupMessage')
		});
	});


	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile', // redirect to the secure profile section
		failureRedirect: '/signup', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}));

	app.get('/profile', isLoggedIn, (req, res) => {
		res.render('profile', {
			user: req.user
		});
	});



	app.get('/userAdmin', isLoggedIn, (req, res) => {

		console.log('Buscando Usuarios');
		User.find({})
			.exec(function (err, users) {
				// Listar Usuarios en: console.log(users);
				if (err) { res.send('Error en lectura'); console.log("Error de lectura de Usuarios"); }
				else {

					res.render('userAdmin', {
						lista: users
					});
				}
			});
	});



	app.get('/delUser/:id', function (req, res) {

		User.findByIdAndRemove(req.params.id, function (err, user) {
			console.log('deleting user', user);
			res.redirect("/userAdmin");
		});

	});


	app.get('/userAdmin/MofUser/:id', isLoggedIn, function (req, res) {
		let id = req.params.id;
		User.findById({ _id: id }, (err, user) => {
			if (err) throw err;
			res.render('MofUser', {
				user: req.user
			});
		});
	});






	app.get('/logout', (req, res) => {
		req.logout(); //metodo preimplementado de passport
		res.redirect('/');
	});


};
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}


