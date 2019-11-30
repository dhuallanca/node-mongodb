const express = require('express');
const Usuario = require('../models/usuario');
const _underscore = require('underscore');
const bcrypt = require('bcrypt');
const app = express();

app.get('/test', (req, res) => {
    console.log('prueba de test', req.body);
    res.json('Hola Dennis');
})

app.get('', (req, res) => {

    let desde = req.query.desde || 0;
    let cantidadRegistros = req.query.cantidadRegistros || 5;
    cantidadRegistros = Number(cantidadRegistros);
    desde = Number(desde);
    Usuario.find({})
        .skip(desde * cantidadRegistros)
        .limit(cantidadRegistros)
        .exec((err, listUsuarios) => {
            if (err) {
                return res.status(400).json({
                    succeded: false,
                    err
                });
            }

            return res.status(200).json({
                succeded: true,
                listUsuarios
            });
        })
        // res.json({ usuario: 'Dennis' });
})
app.post('', (req, res) => {
    let body = req.body;
    let user = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
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
app.put('/:id', (req, res) => {
    const { id } = req.params;
    let body = _underscore.pick(req.body, ['nombre', 'email', 'img', 'role']);
    const optionsToUpdate = { new: true, runValidators: true };
    Usuario.findByIdAndUpdate(id, body, optionsToUpdate, (err, userResponse) => {
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
    })
})

app.delete('/:id', (req, res) => {
    const { id } = req.params;
    Usuario.findByIdAndDelete(id, (err, res) => {
        if (err) {
            return res.status(400).json({
                succeded: false,
                err
            });
        }

        return res.status(200).json({
            succeded: true,
            persona: res,
        });
    });
});

module.exports = app;