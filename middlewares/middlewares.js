const UserModel = require('../models/usermodel');
const database = require('../database/connect');

async function validateCreate(req, res, next) {
  const {email, password } = req.body

  // Validando envio
  if(!email){
    return res.status(422).json({ msg: 'email é obrigatório' })
  }
  if(!password){
    return res.status(422).json({ msg: 'Senha é obrigatório'})
  }

  // Validando se ja existe usuario
  const db = await database.connectDatabase();
  const userExist = await UserModel.findOne({ email: email })

  if(userExist){
    return res.status(422).json({ msg: 'Email já em uso!'})
  }
  next();
}

module.exports = { validateCreate };
