const jwebtoken = require('jsonwebtoken');


// req : data del payload en el token
// res: response
//next: call the next step
function verificaToken(req, res, next) {
    const token = req.get('token');
    jwebtoken.verify(token, process.env.SEED, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({
                succeded: false,
                err: { message: 'token invalido' }
            })
        }
        req.user = decodedToken;
        next();
    });
}

function verificaPerfilUsuario(req, res, next) {
    // user se obtiene de verificar token
    const role = req.user.role;
    if (role != 'ADMIN_ROLE') {
        return res.status(400).json({
            succeded: false,
            err: {
                message: 'usuario no autorizado',
            }
        })
    }

    next();
}

module.exports = { verificaToken, verificaPerfilUsuario };