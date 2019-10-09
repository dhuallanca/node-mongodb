const mongoose = require('mongoose');
let schema = mongoose.schema;

let usuarioSchema = new schema({
    nombre: {
        type: String,
        required: [true, 'el nombre es requerido']
    },
    email: {
        type: String,
        required: [true, 'el email es requerido']
    },
    password: {
        type: String,
        required: [true, 'clave invalida']
    },
    img: {
        type: String,
        required: [false]
    },
    role: {
        default: 'user role'
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);