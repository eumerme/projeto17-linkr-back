import { Router } from "express";
import { listPosts, publishPost } from "../controllers/posts.controller.js";
import { tokenValidation } from "../middlewares/token.validation.js";
import { validateFollows } from "../middlewares/follows.middleware.js";
import {
	schemasValidation,
	urlValidation,
} from "../middlewares/schemas.validation.js";

const postsRouter = Router();

postsRouter.post(
	"/timeline/publish",
	tokenValidation,
	schemasValidation,
	urlValidation,
	publishPost
);
postsRouter.get("/timeline/posts", tokenValidation, validateFollows, listPosts);

export { postsRouter };
