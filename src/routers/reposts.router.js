import { Router } from "express";
import {
	createRepost,
	deleteRepost,
} from "../controllers/reposts.controller.js";
import { validatePost } from "../middlewares/posts.middleware.js";

import { tokenValidation } from "../middlewares/token.validation.js";

const repostsRouter = Router();

repostsRouter.post("/reposts/:id", tokenValidation, validatePost, createRepost);

repostsRouter.delete(
	"/delete-reposts/:id",
	tokenValidation,
	validatePost,
	deleteRepost
);

export { repostsRouter };
