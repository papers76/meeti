const Usuarios = require('../models/usuarios');

exports.formCrearCuenta =  (req, res) => {
    res.render('crear-cuenta', {
        nombrePagina : 'Crea tu cuenta'
    })
};

exports.crearNuevaCuenta = async (req, res) => {
        const usuario = req.body;

        try {
            const nuevoUsuario = await Usuarios.create(usuario);  

        //TODO :flash Message y redireccionar

        console.log("Usuario creado", nuevoUsuario);
            
        
    } catch (error) {
            const erroresSequelize = error.errors.map(err => err.message);
            
            // console.log(erroresSequelize); 
            req.flash('error', erroresSequelize);
            res.redirect('/crear-cuenta');
        }

        
    }

