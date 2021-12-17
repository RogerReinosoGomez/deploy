const express = require('express');
const { secureHaribo } = require('../middlewares/auth');
const { Usuario } = require('../models/Usuario');
const { validarUsuario } = require('../utils/authUtils');

const router = express.Router();

router.get('/usuariosregistrados', secureHaribo, async (request, response) => {
    console.log("Listado de usuarios.");
    try {
        const datos = await Usuario.find().exec();
        response.send(datos);
    } catch (error) {
        console.log("Error al consultar los usuarios.");
        console.log(error);
    }
});

router.post('/registrar', secureHaribo, async (request, response) => {
    const usuario = new Usuario(request.body);
    try {
        await usuario.save();
        response.send({
                        "cedula": usuario.cedula,
                        "mensaje" :"Usuario registrado con exito."
                    });
    }catch (error) {
        response.status(500).send("Ocurrió un error en la base de datos de usuarios.");
        console.log(error);
    }
});

//Autenticación de usuarios (al hacer login).
router.post('/auth', async (request, response) => {
    try {
        const { tokenRefresco, tokenAcceso } = await validarUsuario(request.body);
        console.log("Iniciando sesion.")
        response.cookie('RTC',tokenRefresco, { httpOnly: true })
                .json({
                        token: tokenAcceso
                });
    } catch (error) {
        console.log("Error al intentar iniciar sesión: ");
        console.log(error);
        response.status(403).send("Nombre de usuario o contraseña incorrecta.");
    }
});

module.exports = router;