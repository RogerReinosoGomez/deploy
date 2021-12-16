const { Schema, model } = require('mongoose');

const inventarioSchema = new Schema({
    nombre: {
        type: String,
        max: [25, 'La longitud del campo supera lo permitido (25)'],
        required: [true, 'El nombre es obligatorio.']
    },
    unidad: {
        type: String,
        max: [5, 'La longitud del campo supera lo permitido (5), utilice abreviaciones.'],
        required: [true, 'la unidad es obligatoria.']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria.']
    },
    cantidad_disponible: {
        type: Number,
        required: [true, 'La cantidad disponible es obligatoria.']
    },
    ventas: {
        type: Number,
        required: [true, 'El numero de ventas es obligatoria.']
    },
    fecha_despacho: {
        type: Date,
        required: [true, 'La fecha de despacho es obligatoria.']
    }
},
{
    collection: 'Inventario'
});

exports.Inventario = model('Inventario', inventarioSchema);