// Owner: Aakash Jha
// Version: 1.0.0

const Joi = require('@hapi/joi')

// Register user validation
const registerValidation = (data) => {
	const newUserValidationSchema = Joi.object({
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(8).required(),
	})

	return newUserValidationSchema.validate(data)
}

const loginValidation = (data) => {
	const loginValidationSchema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(8).required(),
	})

	return loginValidationSchema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
