const productsRouter = require("./products.router");

function router(app) {
  app.use("/products", productsRouter);
}

module.exports = router;
