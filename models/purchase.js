const mongoose = require('mongoose');

const PurchaseModel = mongoose.model('Purchase', {
    nomeCliente: {
        type: String,
        required: true,
    },
    produtos:[
        {   
            _id:{
                type: String,
                required: true,
            },
            nome:{
                type: String,
                required: true,
            },
            peso:{
                type: Number,
                required: true,
            },
            preco:{
                type: Number,
                required: true,
            },
            quantidade:{
                type: Number,
                required: true
            }
        }
    ],
    valortotal:{
        type: String,
        required: true,
    },
    formaPagamento:{
        type: String,
        required: true,
    },
    endereco: {
        type: String,
        required: true,
    },
    numero:{
        type: Number,
        required: true,
    },
    bairro:{
        type: String,
        required: true,
    },
    telefone:{
        type: String,
        required: true,
    }
})

module.exports = PurchaseModel