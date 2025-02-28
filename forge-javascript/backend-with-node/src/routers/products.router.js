const express = require("express");
const ProductsService = require("../services/products.service");
const validatorHandler = require("../handlers/validator.handler");
const { getProductSchema, createProductSchema, updateProductSchema } = require("../schemas/product.schema");
const { Boom } = require("@hapi/boom");

const router = express.Router();
const service = new ProductsService();

router.get("/", async (req, res) => {
  const products = await service.getProducts();
  res.json(products);
});

router.get("/:id",
	validatorHandler(getProductSchema, "params"),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const product = await service.getProductById(id)
			res.json(product)
		} catch (error) {
			next(error) // This will be handled by the error handler middleware
		}
	}
)

router.post("/",
	validatorHandler(createProductSchema, "body"),
	async (req, res) => {
		const body = req.body;
		const newProduct = await service.createProduct(body);
		// This is a way to send a response with the status code 201
		res.status(Boom.created().output.statusCode).json(newProduct);
	}
)

router.patch("/:id",
	validatorHandler(getProductSchema, "params"),
	validatorHandler(updateProductSchema, "body"),
	async (req, res) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const product = await service.updateProduct(id, body);
			res.json(product);
		} catch (error) {
			next(error)
		}
	}
)

router.delete("/:id",
	validatorHandler(getProductSchema, "params"),
	async (req, res) => {
		try {
			const { id } = req.params;
			await service.deleteProduct(id);
			res.status(204).json();
		} catch (error) {
			next(error)
		}
	}
)

module.exports = router;
