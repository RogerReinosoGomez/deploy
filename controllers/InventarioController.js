const express = require('express');
const { Inventario } = require('../models/Inventario');

const router = express.Router();

router.get('/all', async (request, response) => {
    console.log("Listado de inventario.");
    try {
        const datos = await Inventario.find().exec();
        response.send(datos);
    } catch (error) {
        console.log("Error al consultar el inventario.");
        console.log(error);
    }
});

module.exports = router;