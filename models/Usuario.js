const { Schema, model } = require('mongoose');
const { hash, genSalt, compare } = require('bcrypt');

const usuarioSchema = new Schema({
    cedula: {
        type: Number,
        unique: true,
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
        required: [true, 'La contraseña es obligatoria.']
    },
    status: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    rol: {
        type: String,
        required: [true, 'Seleccione un rol']
    },
    nacimiento: {
        type: String,
        required: [true, 'La fecha de nacimiento es obligatoria.']
    }
},
{
    collection: 'Usuarios',
    versionKey: false
});

usuarioSchema.pre('save', async function (next) {
    console.log('Encriptando password...');
    const salt = await genSalt(Number(process.env.BCRYPT_ROUNDS));
    this.password =  await hash(this.password, salt);
    next();
});

usuarioSchema.methods.compararPassword = async function(textoPassword) {
    console.log("Comparando passwords...");
    return await compare(textoPassword, this.password);
}

exports.Usuario = model('Usuario', usuarioSchema);