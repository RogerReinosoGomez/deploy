const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
    cedula: {
        type: Number,
        max: [20, 'La longitud del campo supera lo permitido (10)'],
        required: [true, 'La cedula es obligatoria.']
    },
    nombre: {
        type: String,
        max: [25, 'La longitud del campo supera lo permitido (25)'],
        required: [true, 'El nombre es obligatorio.']
    },
    apellido: {
        type: String,
        max: [50, 'La longitud del campo supera lo permitido (50)'],
        required: [true, 'El apellido es obligatorio.']
    },
    email: {
        type: String,
        max: [50, 'La longitud del campo supera lo permitido (50)'],
        required: [true, 'El email es obligatorio.']
    },
    genero: {
        type: String,
        max: [10, 'La longitud del campo supera lo permitido (10)'],
        required: [true, 'El genero es obligatorio.']
    },
    ciudad: {
        type: String,
        required: [true, 'La ciudad es obligatoria.']
    },
    telefono: {
        type: String,
        required: [true, 'El telefono es obligatoria.']
    },
    password: {
        type: String,
        max: [250, 'La longitud del campo supera lo permitido (250)'],
        required: [true, 'La contraseña es obligatoria.']
    },
    status: {
        type: Boolean,
        default: true
    },
    nacimiento: {
        type: Date,
        required: [true, 'La fecha de nacimiento es obligatoria.']
    }
},
{
    collection: 'Usuarios'
});

exports.Usuario = model('Usuario', usuarioSchema);