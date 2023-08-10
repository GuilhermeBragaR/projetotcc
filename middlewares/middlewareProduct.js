function validateCreateProduct(req, res, next){ 
    const { nome, tipo, peso, estoque, preco } = req.body;
    
    if(!nome){
        return res.status(417).json({msg: "Nome do produto Necessario"})
    }

    if(!tipo){
        return res.status(417).json({msg: "Tipo Necessario"})
    }
    
    if(!estoque){
        return res.status(417).json({msg: "Estoque Necessario"})
    }

    if(!peso){
        return res.status(417).json({msg: "Peso Necessario"})
    }

    if(!preco){
        return res.status(417).json({msg: "Preço Necessario"})
    }

    next();
}

module.exports = {
    validateCreateProduct
}