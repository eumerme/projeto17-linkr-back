import Joi from "joi";

const signUpSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().trim().min(3).required(),
	name: Joi.string().trim().required(),
	imageUrl: Joi.string().regex(
		/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
	),
});

const signInSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().trim().min(3).required(),
});

export { signUpSchema, signInSchema };
