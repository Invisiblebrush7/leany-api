const joi = require('joi');

function validateSignUp(data) {
	const signUpSchema = joi.object({
		username: joi.string().min(1).max(1024).required(),
		email: joi.string().min(1).max(1024).email().required(),
		password: joi.string().min(6).max(1024).required(),
	});
	const { error } = signUpSchema.validate(data);
	return error?.details[0]?.message;
}
function validateLogin(data) {
	const loginSchema = joi.object({
		email: joi.string().min(1).max(1024).email().required(),
		password: joi.string().min(6).max(1024).required(),
	});
	const { error } = loginSchema.validate(data);
	return error?.details[0]?.message;
}

exports.validateSignUp = validateSignUp;
exports.validateLogin = validateLogin;
