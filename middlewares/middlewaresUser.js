const UserModel = require("../models/user");
const database = require("../database/connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function findUser(email) {
  const db = await database.connectDatabase();
  const userbd = await UserModel.findOne(email);
  return userbd;
}

async function validateCreate(req, res, next) {
  const { email, password } = req.body;

  // Validando envio
  if (!email) {
    return res.status(422).json({ msg: "email é obrigatório" });
  }
  if (!password) {
    return res.status(422).json({ msg: "Senha é obrigatório" });
  }

  // Validando se ja existe usuario
  const userExist = await findUser({ email: email });

  if (userExist) {
    return res.status(422).json({ msg: "Email já em uso!" });
  }
  next();
}

async function authenticateUser(req, res, next) {
  const { email, password } = req.body;

  if (!email) {
    return res.status(404).json({ msg: "Email incorreto" });
  }

  const user = await findUser({ email: email });

  if (!user) {
    return res.status(404).json("Usuario não encontrado");
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json("Senha incorreta");
  }

  next();
}

async function createToken(req, res, next) {
  const { email } = req.body;
  const user = await findUser({ email: email });
  const secret = process.env.SECRET;

  const token = jwt.sign(
    {
      id: user._id,
    },
    secret
  );

  res.token = token;
  next();
}

async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const secret = process.env.SECRET;
  if (!token) {
    return res.status(401).json({ msg: "Acesso negado" });
  }

  try {
    const payload = jwt.verify(token, secret);
    if (!payload) {
      return res.status(401).json({ msg: "INVALIDO" });
    }
  } catch (error) {
    return res.status(401).json({ msg: "invalid token" });
  }

  jwt.verify(token, secret);
  next();
}

async function validateAdmin(req, res, next) {
  const { email } = req.body;
  const user = await findUser({ email: email });
  
  if (user.admin == true) {
     res.status(200).json(user.admin);
  } else {
     res.status(200).json(user.admin);
  }

  next();
}

async function validatePurchase(req, res, next) {
  const { nomeCliente, endereco, numero, bairro, telefone } = req.body;

  if(nomeCliente === ""){
    return res.status(417).json({msg: "Nome do Cliente Invalido"})
  }else if(endereco === ""){
    return res.status(417).json({msg: "Endereço Invalido"})
  }else if(numero == ""){
    return res.status(417).json({msg: "Numero Invalido"})
  }else if(bairro === ""){
    return res.status(417).json({msg: "Bairro Invalido"})
  }else if(telefone === ""){
    return res.status(417).json({msg: "Telefone Invalido"})
  }

  next();
}

module.exports = {
  validateCreate,
  authenticateUser,
  authenticateToken,
  createToken,
  validateAdmin,
  validatePurchase
};
