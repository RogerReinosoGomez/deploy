const express = require('express');
const { Usuario } = require('../models/Usuario');

const router = express.Router();

router.get('/all', async (request, response) =>{
    console.log("Listado de proyectos.");

    const datos = await Usuario.find().exec();
    console.log(datos)
    response.send(datos);
});

module.exports = router;