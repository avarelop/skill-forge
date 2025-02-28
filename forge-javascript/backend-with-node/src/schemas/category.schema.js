const Joi = require("joi");

// Schemas are created individually in order to be reused.
const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const image = Joi.string().uri();

const getCategoryByIdSchema = Joi.object({
	id: id.required(),
});

const createCategorySchema = Joi.object({
	name: name.required(),
	image: image.required(),
});

const updateCategorySchema = Joi.object({
	name,
	image,
});

module.exports = { getCategoryByIdSchema, createCategorySchema, updateCategorySchema };

