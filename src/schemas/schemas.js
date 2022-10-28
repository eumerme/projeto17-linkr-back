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
  type: Joi.string().valid('like', 'noLike').required()
});

const repostsSchema = Joi.object({
  postId: Joi.number().required(),
  userId: Joi.number().required()
});

export { signUpSchema, signInSchema, publishSchema, likesSchema, repostsSchema};
