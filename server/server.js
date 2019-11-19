require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(require('./routes/usuario-route'));

mongoose.connect(process.env.UrlDataBase, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
    if (err) throw err;
    console.log('conexión ONLINE de cafe');
})

app.listen(process.env.PORT, () => {
    console.log('escuchando puerto', process.env.PORT);
});