const express = require('express');
const path = require('path');
const router = require('./routes');
const expressLayouts = require('express-ejs-layouts')

const db = require('./config/db');
db.sync().then(() => console.log('DB CONECTADA')).catch((error) => console.log(error));

require('dotenv').config( { path: 'variables.env' } );   

const app = express();

//Habilitar EJS como template engine

app.use(expressLayouts);
app.set('view engine', 'ejs');

//Ubicacion vistas
app.set('views', path.join(__dirname, './views'));

// Archivos estaticos
app.use(express.static('public'));

//Middleware (usuario logueado, flash messages, fecha actual)
app.use((req, res, next) =>{
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