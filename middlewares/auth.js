const { verify } = require('jsonwebtoken');

const secureHaribo = (_request, _response, next) => {
    const authorization = _request.headers.authorization;
    if (!authorization) {
        _response.status(401).send("No cuenta con permisos de acceso.");
    }else {
        try {
            console.log("Validando petición.");
            const token = authorization.split(' ')[1];
            const datosToken = verify(token, process.env.JWT_ACCESS_SECRET);
            _request.jwtData = datosToken;
            return next();
        }catch (error) {
            console.log(error);
            _response.status(401).send("No cuenta con permisos de acceso.");
        }
    }
}

exports.secureHaribo = secureHaribo;