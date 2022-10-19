import Joi from 'joi';

const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().trim().min(3).required(),
    username: Joi.string().trim().required(),
    pictureurl: Joi.string().regex(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/).required()
});

export { signUpSchema };