const Joi = require("joi");

// Schemas are created individually in order to be reused.
const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().valid("customer", "employee", "admin");

const getUserByIdSchema = Joi.object({
	id: id.required(),
});

const createUserSchema = Joi.object({
	name: name.required(),
	email: email.required(),
	password: password.required(),
	role: role.required(),
});

const updateUserSchema = Joi.object({
	name,
	email,
	password,
	role,
});

module.exports = { getUserByIdSchema, createUserSchema, updateUserSchema };

