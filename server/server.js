require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// routes
app.use(require('./routes/index'));


mongoose.connect(process.env.UrlDataBase, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err;
    console.log('conexión ONLINE de cafe');
})

app.listen(process.env.PORT, () => {
    console.log('escuchando puerto', process.env.PORT);
});