import { Router } from "express";
import { createRepost } from "../controllers/reposts.controller.js";
import { validatePost } from "../middlewares/posts.middleware.js";

import { tokenValidation } from "../middlewares/token.validation.js";

const repostsRouter = Router();

repostsRouter.post(
	"/timeline/reposts/:id",
	tokenValidation,
	validatePost,
	createRepost
);

export { repostsRouter };
