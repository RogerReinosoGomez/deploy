const express = require('express');
const { Usuario } = require('../models/Usuario');

const router = express.Router();

router.get('/usuariosregistrados', async (request, response) => {
    console.log("Listado de usuarios.");
    try {
        const datos = await Usuario.find().exec();
        response.send(datos);
    } catch (error) {
        console.log("Error al consultar los usuarios.");
        console.log(error);
    }
});

router.post('/registrar/usuario', async (request, response) => {
    const usuario = new Usuario(request.body);
    try {
        await usuario.save();
        response.send({
                        "login": usuario.login,
                        "mensaje" :"Usuario registrado con exito."
                    });
    }catch (error) {
        response.status(500).send("Ocurrió un error en la base de datos de usuarios.");
        console.log(error);
    }
});

//Autenticación de usuarios (al hacer login).


module.exports = router;