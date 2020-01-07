const express = require('express');
const app = express();

app.use('/login', require('./login-route'));
app.use('/usuario', require('./usuario-route'));
app.use('/categoria', require('./categoria-route'));
app.use('/producto', require('./producto-route'));

module.exports = app;