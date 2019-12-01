const jwebtoken = require('jsonwebtoken');

function verificaToken(req, res, next) {
    const token = req.get('token');
    console.log(token);
    console.log('seed', process.env.SEED);
    jwebtoken.verify(token, process.env.SEED, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({
                succeded: false,
            })
        }
        let user = decodedToken.nombre;
        console.log(user);
        next();
    });

}

module.exports = verificaToken;