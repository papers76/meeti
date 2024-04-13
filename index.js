const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { body, validationResult } = require('express-validator');
const router = require('./routes');
const expressLayouts = require('express-ejs-layouts');

//CONFIGURACION Y MODELOS BD
const db = require('./config/db');
require('./models/usuarios');
db.sync().then(() => console.log('DB CONECTADA')).catch((error) => console.log(error));

//VARIABLES DE DESARROLLO 
require('dotenv').config( { path: 'variables.env' } );   

// Imprimir variables de entorno
console.log("Valor de SECRETO:", process.env.SECRETO);
console.log("Valor de KEY:", process.env.KEY);

//APLICACION PRINCIPAL
const app = express();

//BODY PARSER, LEER FORMULARIOS 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//EXPRESS VALIDATOR (VALIDACION CON BASTANTES FUNCIONES)
app.use(
  body().custom((value, { req }) => {
    // Aquí puedes agregar tus validaciones personalizadas
    return true; // O retorna false si la validación falla
  })
);

//Habilitar EJS como template engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Ubicacion vistas
app.set('views', path.join(__dirname, './views'));

// Archivos estaticos
app.use(express.static('public'));

//HABILITAR COOKIE PARSER 
app.use(cookieParser());

// crear la sesion
app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY, 
    resave: false,
    saveUninitialized: false
}));

//AGREGA FLASH MESSAGES 
app.use(flash());

//Middleware (usuario logueado, flash messages, fecha actual)
app.use((req, res, next) => {
    res.locals.mensajes = req.flash(); 
    const fecha = new Date();
    res.locals.year = fecha.getFullYear();
    next();
});

//Routing
app.use('/', router());

//Agrega el puerto
app.listen(process.env.PORT, () => {
    console.log("El servidor esta funcionando");
});