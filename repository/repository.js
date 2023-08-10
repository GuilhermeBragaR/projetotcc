const database = require('../database/connect');
const UserModel = require('../models/user');
const ProductModel = require('../models/product');
const PurchaseModel = require('../models/purchase')

async function getUsers() {
  const db = await database.connectDatabase();
  return UserModel.find();
}

async function getUsersId(id) {
  const db = await database.connectDatabase();
  return UserModel.findById(id);
}

async function postValidateLogin(email) {
  const db = await database.connectDatabase();
  return UserModel.findOne({ email: email });
}

async function postCreateUser(user) {
  const db = await database.connectDatabase();
  return UserModel.create(user);
}

async function patchUpdateUser(id, user) {
  const db = await database.connectDatabase();
  return UserModel.findByIdAndUpdate(id, user, { new: true });
}

async function deleteUser(id) {
  const db = await database.connectDatabase();
  return UserModel.findByIdAndRemove(id);
}

//produtos
async function getProduct() {
  const db = await database.connectDatabase();
  return ProductModel.find();
}

async function getProductById(id) {
  const db = await database.connectDatabase();
  return ProductModel.findById(id);
}

async function postCreateProduct(product) {
  const db = await database.connectDatabase();
  return ProductModel.create(product);
}

async function patchUpdateProduto(id, product) {
  const db = await database.connectDatabase();
  return ProductModel.findByIdAndUpdate(id, product, { new: true });
}

async function deleteProduct(id) {
  const db = await database.connectDatabase();
  return ProductModel.findByIdAndRemove(id);
}

//vendas
async function purchaseItens(itens) {
  const db = await database.connectDatabase();
  return PurchaseModel.create(itens);
}


module.exports = {
  getUsers,
  getUsersId,
  postValidateLogin,
  postCreateUser,
  patchUpdateUser,
  deleteUser,
  getProduct,
  getProductById,
  postCreateProduct,
  patchUpdateProduto,
  deleteProduct,
  purchaseItens
};
