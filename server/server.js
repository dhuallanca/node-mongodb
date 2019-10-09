require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(require('./routes/usuario-route'));

mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
    if (err) throw err;
    console.log('conexión ONLINE de cafe');
})

app.listen(process.env.PORT, () => {
    console.log('escuchando puerto', process.env.PORT);
});