const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let schema = mongoose.Schema;

// el atributo usuario hace referencia al objeto Usuario de mongoose
let categoriaSchema = new schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'el nombre es requerido']
    },
    usuario: {
        type: schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

categoriaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' })
module.exports = mongoose.model('Categoria', categoriaSchema);