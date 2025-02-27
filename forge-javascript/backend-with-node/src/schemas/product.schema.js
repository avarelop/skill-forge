const Joi = require("joi");

// Schemas are created individually in order to be reused.
const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);

const getProductSchema = Joi.object({
	id: id.required(),
});

const createProductSchema = Joi.object({
	name: name.required(),
	price: price.required(),
});

const updateProductSchema = Joi.object({
	name,
	price,
});

module.exports = { getProductSchema, createProductSchema, updateProductSchema };

