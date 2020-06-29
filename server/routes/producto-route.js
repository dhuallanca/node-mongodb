const express = require('express');
const { verificaToken } = require('../middleware/authentication');
const Producto = require('../models/producto');
const app = express();

app.get('', (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);
  Producto.find({ disponible: true })
    .skip(desde)
    .limit(5)
    .populate('usuarioId', 'nombre email')
    .populate('categoriaId', 'nombre')
    .exec((err, productoResponse) => {
      if (err) {
        return res.status(500).json({
          succeded: false,
          err
        });
      }
      return res.json({
        succeded: true,
        productos: productoResponse
      });
    });
});

app.get('/:id', (req, res) => {
  const { id } = req.params;
  let desde = req.query.desde || 0;
  let cantidadRegistros = req.query.cantidadRegistros || 5;
  cantidadRegistros = Number(cantidadRegistros);
  desde = Number(desde);

  Producto.findById(id)
    .skip(desde * cantidadRegistros)
    .limit(cantidadRegistros)
    .populate('usuarioId', 'nombre email')
    .populate('categoriaId', 'nombre')
    .exec((err, productoResponse) => {
      if (err) {
        return res.status(500).json({
          succeded: false,
          err
        });
      }
      return res.json({
        succeded: true,
        producto: productoResponse
      })
    });
});

app.get('/buscar/:termino', (req, res) => {
  const { termino } = req.params;
  let desde = req.query.desde || 0;
  let cantidadRegistros = req.query.cantidadRegistros || 5;
  cantidadRegistros = Number(cantidadRegistros);
  desde = Number(desde);
  const regExp = new RegExp(termino, 'i');

  Producto.find({ nombre: regExp })
    .skip(desde * cantidadRegistros)
    .limit(cantidadRegistros)
    .populate('usuarioId', 'nombre email')
    .populate('categoriaId', 'nombre')
    .exec((err, productoResponse) => {
      if (err) {
        return res.status(500).json({
          succeded: false,
          err
        });
      }
      return res.json({
        succeded: true,
        productos: productoResponse
      })
    });
})

app.post('', verificaToken, (req, res) => {
  const { nombre, precioUnidad, descripcion, disponible, categoriaId } = req.body;
  const newProducto = new Producto({
    nombre,
    precioUnidad,
    descripcion,
    disponible,
    categoriaId,
    usuarioId: req.user._id
  })
  newProducto.save((err, productoResponse) => {
    if (err) {
      return res.status(500).json({
        succeded: false,
        err
      });
    }
    return res.json({
      succeded: true,
      producto: productoResponse
    });
  })
});

app.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, precioUnidad, descripcion, disponible, categoriaId, usuarioId } = req.body;
  const producto = { nombre, precioUnidad, descripcion, disponible, categoriaId, usuarioId };
  Producto.findByIdAndUpdate(id, producto, (err, productoResponse) => {
    if (err) {
      return res.status(500).json({
        succeded: false,
        err
      });
    }
    return res.json({
      succeded: true,
      producto: productoResponse
    });
  });
});


module.exports = app;