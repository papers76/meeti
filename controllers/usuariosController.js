const Usuarios = require('../models/usuarios');
const { body, validationResult } = require('express-validator');

exports.formCrearCuenta = (req, res) => {
    res.render('crear-cuenta', {
        nombrePagina: 'Crea tu cuenta'
    });
};

exports.crearNuevaCuenta = async (req, res) => {
    const usuario = req.body;

    // Validaciones con express-validator
    await body('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req);
    await body('email').isEmail().withMessage('El email no es válido').run(req);
    await body('password').notEmpty().withMessage('La contraseña es obligatoria').run(req);
    await body('confirmar').equals(usuario.password).withMessage('Las contraseñas no coinciden').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const erroresExpressValidator = errors.array().map(err => err.msg);
        req.flash('error', erroresExpressValidator);
        return res.redirect('/crear-cuenta');
    }

    try {
        const nuevoUsuario = await Usuarios.create(usuario);
        console.log("Usuario creado", nuevoUsuario);
        
        //TODO: flash Message y redireccionar
        res.redirect('/');  // Redireccionar a la página principal o a donde corresponda

    } catch (error) {
        const erroresSequelize = error.errors.map(err => err.message);
        req.flash('error', erroresSequelize);
        res.redirect('/crear-cuenta');
    }
};