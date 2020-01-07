const express = require('express');

const { verificaToken } = require('../middleware/authentication');
const Categoria = require('../models/categoria');
const app = express();


app.get('', verificaToken, (req, res) => {
    Categoria.find((err, categoriaResponse) => {
        if (err) {
            return res.status(400).json({
                succeded: false,
                err
            });
        }

        if (!categoriaResponse) {
            return res.status(204).json({});
        }

        return res.json({
            succeded: true,
            categoria: categoriaResponse
        });

    });
});

app.get('/orderedBy', verificaToken, (req, res) => {
    // populate carga la data de otro objeto del schema, para este caso carga datos de Usuario
    Categoria.find()
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .exec((err, categoriaResponse) => {
            if (err) {
                return res.status(400).json({
                    succeded: false,
                    err
                });
            }

            if (!categoriaResponse) {
                return res.status(204).json({});
            }

            return res.json({
                succeded: true,
                categoria: categoriaResponse
            });

        });
});

app.get('/:id', verificaToken, (req, res) => {
    const { id } = req.params;
    Categoria.findById({ _id: id }, (err, categoriaResponse) => {
        if (err) {
            return res.status(500).json({
                succeded: false,
                err
            });
        }
        if (!categoriaResponse) {
            return res.status(203).json({});
        }
        return res.json({
            succeded: true,
            categoria: categoriaResponse
        })
    });
});

app.post('', verificaToken, (req, res) => {
    const categoria = new Categoria({
        nombre: req.body.nombre,
        usuario: req.user._id
    });
    categoria.save({}, (err, categoriaCreated) => {
        if (err) {
            return res.status(500).json({
                succeded: false,
                err
            });
        }
        if (!categoriaCreated) {
            return res.status(203).json({});
        }
        return res.json({
            succeded: true,
            categoria: categoriaCreated
        });
    })
});

app.put('', verificaToken, (req, res) => {
    const { id } = req.params;
    const categoria = {
        nombre: req.body.nombre
    }
    Categoria.findByIdAndUpdate(id, categoria, { new: true, runValidators: true }, (err, categoriaUpdated) => {
        if (err) {
            return res.status(500).json({
                succeded: false,
                err
            });
        }
        if (!categoriaResponse) {
            return res.status(203).json({});
        }
        return res.json({
            succeded: true,
            categoria: categoriaUpdated
        })
    })
});

module.exports = app;