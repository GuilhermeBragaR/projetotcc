const mongoose = require('mongoose');

const ProductModel = mongoose.model('Product', {
    nome: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    peso: {
        type: Number,
        required: true
    },
    estoque:{
        type: Number,
        required: true
    }
})

module.exports = ProductModel