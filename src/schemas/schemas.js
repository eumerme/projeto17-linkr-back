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
	publish: Joi.object().keys({
		comment: Joi.string().trim().required(),
		url: Joi.string().trim().required(),
	}),
	editComment: Joi.object().keys({
		comment: Joi.string().trim().required(),
	}),
	/* paramsId: Joi.object().keys({
		id: Joi.number().positive().integer(),
	}), */
};

export { schemas };
