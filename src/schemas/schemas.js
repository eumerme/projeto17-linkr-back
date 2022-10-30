import Joi from "joi";

const schemas = {
	signup: Joi.object().keys({
		email: Joi.string().trim().email().required(),
		password: Joi.string().trim().min(3).required(),
		name: Joi.string().trim().required(),
		imageUrl: Joi.string().trim().required(),
	}),
	signin: Joi.object().keys({
		email: Joi.string().trim().email().required(),
		password: Joi.string().trim().min(3).required(),
	}),
	/* paramsId: Joi.object().keys({
		id: Joi.number().positive().integer(),
	}), */
};

const publishSchema = Joi.object({
	comment: Joi.string().required(),
	url: Joi.string()
		.regex(
			/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
		)
		.required(),
});

const likesSchema = Joi.object({
	id: Joi.number().required(),
	userId: Joi.number().required(),
	type: Joi.string().valid("like", "noLike").required(),
});

const repostsSchema = Joi.object({
	postId: Joi.number().required(),
	userId: Joi.number().required(),
});

export { publishSchema, likesSchema, repostsSchema, schemas };
