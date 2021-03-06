const express = require('express');
const app = express();


const path = require('path'); //Manejar las rutas de las carpetas
const mongoose = require('mongoose'); //Conectar a mongoDB
const passport = require('passport');//Configurar el login
const flash = require('connect-flash');//Para mostrar en consola errores
const morgan = require('morgan');//dfinir los metodos http
const cookieParser = require('cookie-parser');//administrar cookies
const bodyParser = require('body-parser');//body
const session = require('express-session');
/*const bootstrap = require('bootstrap');
const jquery = require('jquery');
const popper = require('popper');*/

const { url } = require('./config/database');

mongoose.connect(url);

require('./config/passport')(passport);
const plsRoutes = require('./app/playaRoutes');
const risRoutes = require('./app/riesgosRoutes');
const socRoutes = require('./app/socorristasRoutes');
const eventRoutes = require('./app/IncidenteIntRoutes');


//setings 
app.set('port', process.env.PORT || 3000); //Busca si un puerto esta predefinido y si no usa el 3000
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(morgan('dev')); //mostrar por consola 
app.use(cookieParser()); //administrar cookies
app.use(bodyParser.urlencoded({ extended: false })); //extended false evita trabajar las cookies de imagenes , interpretar la informacion desde las url
app.use(session({
	secret: 'Redencion', //Variable de entorno o de session
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Rutas
require('./app/routes')(app, passport);
app.use(plsRoutes);
app.use(risRoutes);
app.use(socRoutes);
app.use(eventRoutes);

//static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
	console.log('server on port', app.get('port')); //obtener el puerto
});