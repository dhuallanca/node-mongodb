const express = require('express');
const app = express();

app.use('/login', require('./login-route'));
app.use('/usuario', require('./usuario-route'));

module.exports = app;