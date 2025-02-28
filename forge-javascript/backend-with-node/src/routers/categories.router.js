const express = require("express");
const CategoriesService = require("../services/categories.service");
const validatorHandler = require("../handlers/validator.handler");
const { getCategoryByIdSchema, createCategorySchema, updateCategorySchema } = require("../schemas/category.schema");

const router = express.Router();
const service = new CategoriesService();

// getCategories()
router.get("/", async (req, res, next) => {
	try {
		const categories = await service.getCategories();
		res.status(200).json(categories);
	} catch (error) {
		next(error);
	}
});

// getCategoryById()
router.get("/:id",
	validatorHandler(getCategoryByIdSchema, "params"),
	async (req, res) => {
		const { id } = req.params;
		const category = await service.getCategoryById(id);
		res.status(200).json(category);
	}
)

// createCategory()
router.post("/",
	validatorHandler(createCategorySchema, "body"),
	async (req, res) => {
		const { name } = req.body;
		const newCategory = await service.createCategory({ name });
		res.status(201).json(newCategory);
	}
)

// updateCategory()
router.patch("/:id",
	validatorHandler(getCategoryByIdSchema, "params"),
	validatorHandler(updateCategorySchema, "body"),
	async (req, res) => {
		const { id } = req.params;
		const { name } = req.body;
		const updatedCategory = await service.updateCategory(id, { name });
		res.status(200).json(updatedCategory);
	}
)

// deleteCategory()
router.delete("/:id",
	validatorHandler(getCategoryByIdSchema, "params"),
	async (req, res) => {
		try {
			const { id } = req.params;
			await service.deleteCategory(id);
			res.status(204).send();
	} catch (error) {
		next(error);
	}
})

module.exports = router;
