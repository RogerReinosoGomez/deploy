const UsuariosController = require('./UsuariosController');
const InventarioController =  require('./InventarioController');

exports.registrarControladores = (app) => {
    app.use('/usuarios', UsuariosController);
    app.use('/inventario', InventarioController);
}