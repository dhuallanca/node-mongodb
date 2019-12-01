const express = require('express');
const crypto = require('bcrypt');
const Usuario = require('../models/usuario');
const jwtoken = require('jsonwebtoken');

const app = express();


app.post('', (req, res) => {
    const { email, pass } = req.body;
    Usuario.findOne({ email }, (err, userDb) => {

        if (err) {
            return res.status(500).json({
                succeded: false,
                err,
            });
        }
        if (!userDb) {
            return res.status(400).json({
                succeded: false,
                message: 'Usuario o Clave incorrectas'
            });
        }
        // valida contraseña encriptada
        if (!crypto.compareSync(pass, userDb.password)) {
            return res.status(400).json({
                succeded: false,
                message: 'Clave incorrectas'
            });
        }
        // secret code = seed
        const token = jwtoken.sign({ user: userDb }, process.env.SEED, { expiresIn: process.env.TIME_TOKEN });
        return res.status(200).json({
            succeded: true,
            message: `Bienvenido ${userDb.nombre}`,
            persona: userDb,
            token
        });
    });


});

module.exports = app;