import { Router } from "express";
import {
	deletePost,
	listPosts,
	publishPost,
	updatePost,
} from "../controllers/posts.controller.js";
import { tokenValidation } from "../middlewares/token.validation.js";
import { validateFollows } from "../middlewares/follows.middleware.js";
import {
	schemasValidation,
	urlValidation,
} from "../middlewares/schemas.validation.js";
import { validatePost } from "../middlewares/posts.middleware.js";
import { checkHashtag } from "../middlewares/hashtags.middleware.js";

const postsRouter = Router();

postsRouter.post(
	"/timeline/publish",
	tokenValidation,
	schemasValidation,
	urlValidation,
	publishPost
);
postsRouter.patch(
	"/timeline/posts/update/:id",
	tokenValidation,
	validatePost,
	updatePost
);
postsRouter.get("/timeline/posts", tokenValidation, validateFollows, listPosts);
postsRouter.delete(
	"/timeline/posts/delete/:id",
	tokenValidation,
	validatePost,
	checkHashtag,
	deletePost
);

export { postsRouter };
