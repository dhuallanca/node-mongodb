const express = require('express');
const Usuario = require('../models/usuario');
const app = express();

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json('Hola Dennis');
})

app.get('/usuario', (req, res) => {
    res.json({ usuario: 'Dennis' });
})
app.post('/usuario', (req, res) => {
    let body = req.body;
    let user = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        role: body.role
    });

    user.save((err, userResponse) => {
        if (err) {
            return res.status(400).json({
                succeded: false,
                err
            });
        }
        res.json({
            succeded: true,
            persona: userResponse
        });
    });
})
app.put('/usuario/:id', (req, res) => {
    const { id } = req.params;
    res.json({ idUsuario: id });
})

module.exports = app;