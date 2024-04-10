const Usuarios = require('../models/usuarios');

exports.formCrearCuenta =  (req, res) => {
    res.render('crear-cuenta', {
        nombrePagina : 'Crea tu cuenta'
    })
};

exports.crearNuevaCuenta = async (req, res) => {
        const usuario = req.body;

        const nuevoUsuario = await Usuarios.create(usuario);  

        //TODO :flash Message y redireccionar

        console.log("Usuario creado", nuevoUsuario);
    }