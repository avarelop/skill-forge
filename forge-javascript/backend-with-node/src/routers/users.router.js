const express = require("express");
const UsersService = require("../services/users.service");
const validatorHandler = require("../handlers/validator.handler");
const { getUserByIdSchema, createUserSchema, updateUserSchema } = require("../schemas/user.schema");

const router = express.Router();
const service = new UsersService();

// getUsers()
router.get("/", async (req, res, next) => {
	try {
		const users = await service.getUsers();
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
});

// getUserById()
router.get("/:id",
	validatorHandler(getUserByIdSchema, "params"),
	async (req, res) => {
		const { id } = req.params;
		const user = await service.getUserById(id);
		res.status(200).json(user);
	}
)

// createUser()
router.post("/",
	validatorHandler(createUserSchema, "body"),
	async (req, res) => {
		const newUser = await service.createUser(req.body);
		res.status(201).json(newUser);
	}
)

// updateUser()
router.patch("/:id",
	validatorHandler(getUserByIdSchema, "params"),
	validatorHandler(updateUserSchema, "body"),
	async (req, res) => {
		const { id } = req.params;
		const updatedUser = await service.updateUser(id, req.body);
		res.status(200).json(updatedUser);
	}
)

// deleteUser()
router.delete("/:id",
	validatorHandler(getUserByIdSchema, "params"),
	async (req, res) => {
		try {
			const { id } = req.params;
			await service.deleteUser(id);
			res.status(204).send();
	} catch (error) {
		next(error);
	}
})

module.exports = router;
