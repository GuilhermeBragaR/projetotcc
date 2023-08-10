const {
  validateCreate,
  authenticateUser,
  validateAdmin,
  validatePurchase,
} = require("../middlewares/middlewaresUser");
const { validateCreateProduct } = require("../middlewares/middlewareProduct")
const bcrypt = require("bcrypt");

module.exports = (app, repository) => {
  app.get("/users", async (req, res) => {
    const users = await repository.getUsers();
    if (!users || !users.length) return res.sendStatus(404);

    res.json(users);
  });

  app.get("/users/:id", async (req, res) => {
    const userId = req.params.id;
    const user = await repository.getUsersId(userId);
    if (!user) return res.sendStatus(404);

    return res.status(200).json(user);
  });

  app.post(
    "/users/authenticate",
    authenticateUser,
    validateAdmin,
    async (req, res) => {
      const { email } = req.body;
      //const token = res.token;
      const user = await repository.postValidateLogin(email);
      return res.status(200);
    }
  );

  app.post("/users", validateCreate, async (req, res) => {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(req.body.password, salt);
    const user = await repository.postCreateUser({
      email: req.body.email,
      password: passwordHash,
      admin: req.body.admin,
    });
    return res.status(200).json(user);
  });

  app.patch("/users/:id", async (req, res) => {
    const userId = req.params.id;
    const user = await repository.patchUpdateUser(userId, req.body);
    return res.status(200).json(user);
  });

  app.delete("/users/:id", async (req, res) => {
    const userId = req.params.id;
    const user = await repository.deleteUser(userId);
    return res.status(200).json(user);
  });

  //products
  app.get("/product", async (req, res) => {
    const product = await repository.getProduct();
    if (!product || !product.length) return res.sendStatus(404);
    res.json(product);
  });

  app.get("/product/:id", async (req, res) => {
    const productId = req.params.id;
    const product = await repository.getProductById(productId);
    if (!productId) return res.sendStatus(404);
    res.json(product);
  });

  app.post("/product", validateCreateProduct, async (req, res) => {
    const product = await repository.postCreateProduct(req.body);
    return res.status(200).json({msg: "Produto Criado com sucesso"});
  });

  app.patch("/product/:id", async (req, res) => {
    const productId = req.params.id;
    const product = await repository.patchUpdateProduto(productId, req.body);
    return res.status(200).json(product);
  });

  app.delete("/product/:id", async (req, res) => {
    const productId = req.params.id;
    const product = await repository.deleteProduct(productId);
    return res.status(200).json({msg: "Deletado com Sucesso!"});
  });

  //vendas
  app.post("/purchaseitens", validatePurchase, async (req, res,) => {
    const itens = await repository.purchaseItens(req.body);
    return res.status(200).json({msg: "Compra realizada com sucesso"})
  })
};