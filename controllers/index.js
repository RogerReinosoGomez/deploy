const UsuariosController = require('./UsuariosController');

exports.registrarControladores = (app) => {
    app.use('/usuarios', UsuariosController);
}