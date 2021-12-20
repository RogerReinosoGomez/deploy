const express = require('express');
const { secureHaribo } = require('../middlewares/auth');
const { Usuario } = require('../models/Usuario');
const { validarUsuario } = require('../utils/authUtils');

const router = express.Router();

router.get('/usuariosregistrados', secureHaribo, async (request, response) => {
    console.log("Listado de usuarios.");
    try {
        const page = Number(request.query.page);
        const limit = Number(request.query.limit);
        const datos = await Usuario.find({},{},{ sort: { cedula:1 }, skip: ((page-1)*limit), limit: limit }).exec();
        response.send(datos);
    } catch (error) {
        console.log("Error al consultar los usuarios.");
        console.log(error);
    }
});

router.post('/registrar', secureHaribo, async (request, response) => {
    console.log("Iniciando el proceso de registro.");
    try {
        const usuario = await Usuario.findOne({ cedula: request.body.cedula }).exec();
        console.log(usuario);
        if (!usuario) {
            console.log(`Registrando al usuario ${ request.body.nombre } con CC No. ${ request.body.cedula }.`);
            const usuario = new Usuario(request.body);
            await usuario.save();
            response.send({
                            "cedula": usuario.cedula,
                            "mensaje" :"Usuario registrado con exito."
                        });
        } else{
            response.send({
                            "mensaje": "Ya existe un usuario con el número de cédula."
                        });
        }
    }catch (error) {
        response.status(500).send("Ocurrió un error en la base de datos de usuarios.");
        console.log(error);
    }
});

router.put('/estado', secureHaribo, async (request, response) => {
    console.log(`Cambiando el estado del usuario ${ request.body.cedula }`);
    try {
        const usuario = await Usuario.findOne({ cedula: request.body.cedula });
        console.log(usuario);
        usuario.status = !usuario.status;
        await usuario.save();
        response.json({ cedula: request.cedula } );
    } catch (error) {
        response.sendStatus(500);
        console.log(error);
    }
});

router.put('/editar', secureHaribo, async (request, response) => {
    console.log(`Actualizanzo los datos del usuario ${ request.body.nombre }, con CC No. ${ request.body.cedula }.`);
    try {
        const datosActualizados = request.body;
        const usuario = await Usuario.findByIdAndUpdate(datosActualizados.cedula, datosActualizados);
        console.log(usuario);
        response.json({ cedula: request.body.cedula } );
    } catch (error) {
        response.sendStatus(500);
        console.log(error);
    }
});

router.delete('/eliminar', secureHaribo, async (request, response) => {
    try {
        if (!Usuario.find({ cedula: request.body.cedula })) {
            console.log(`Borrando usuario con CC No. ${request.body.cedula}`);
            const cedula = request.body.cedula;
            const usuario = await Usuario.deleteOne({ cedula: cedula });
            console.log(usuario);
            response.json({ cedula: cedula } );
        } else {
            response.json({ mensaje: "No existe un usuario con la cédula indicada." } );
        }
    }catch(error) {
        response.sendStatus(500);
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