const express = require('express');
const app = express();

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json('HOla Dennis');
})

app.get('/usuario', (req, res) => {
    res.json({ usuario: 'Dennis' });
})
app.post('/usuario', (req, res) => {
    let body = req.body;
    if (!body.nombre) {
        res.status(400).json({
            succeded: false,
            mensaje: 'Campo nombre es requerido'
        })
    } else {
        res.json({ persona: req.body });
    }
})
app.put('/usuario/:id', (req, res) => {
    const { id } = req.params;
    res.json({ idUsuario: id });
})

module.exports = app;