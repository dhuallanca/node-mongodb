var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var productoSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    precioUnidad: { type: Number, required: [true, 'El precio únitario es necesario'] },
    descripcion: { type: String, required: false },
    disponible: { type: Boolean, required: true, default: true },
    categoriaId: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
    usuarioId: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});


module.exports = mongoose.model('Producto', productoSchema);