const mongoose = require('mongoose');

const conectarMongoDb = async () => {
    try {
        console.log('Conectado con DB Haribo mediante Mongoose...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conexion exitosa.');
    } catch (error) {
        console.log('Error al conectar a la DB Haribo.');
        console.log(error);
    }
}

const desconectarMongoDb = async () => {
    if (mongoose.connection) {
        try {
            console.log('Cerrando conexion de DB Haribo mediante Mongoose...');
            await mongoose.connection.close();
            console.log('Desconexion exitosa.');
        } catch (error) {
            console.log('Error al desconectar a la DB Haribo.');
            console.log(error);
        }
    }
}

const subscribirCierres = async () => {
    process.on('exit', desconectarMongoDb);
    process.on('SIGINT', desconectarMongoDb);
    process.on('SIGTERM', desconectarMongoDb);
    process.on('SIGKILL', desconectarMongoDb);
    process.on('uncaughtException', desconectarMongoDb);
}

exports.conectarMongoDb = conectarMongoDb;
exports.desconectarMongoDb = desconectarMongoDb;
exports.subscribirCierres = subscribirCierres;