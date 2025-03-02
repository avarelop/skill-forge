const boom = require("@hapi/boom");

// This function allow us to validate the data that we receive from the request.
function validatorHandler(schema, property) {
	return (req, res, next) => {
		const data = req[property];
		const { error } = schema.validate(data);
		if (error) {
			next(boom.badRequest(error));
		}
		next();
	}
}

module.exports = validatorHandler;
