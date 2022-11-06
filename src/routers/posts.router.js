import { Router } from "express";
import {
	deletePost,
	listPosts,
	listUserPosts,
	publishPost,
	updatePost,
} from "../controllers/posts.controller.js";
import { tokenValidation } from "../middlewares/token.validation.js";
import {
	schemasValidation,
	urlValidation,
} from "../middlewares/schemas.validation.js";
import {
	validatePost,
	checkFollows,
	checkHashtag,
	checkLikes,
	checkComments,
	//validateRepost,
	checkReposts,
} from "../middlewares/posts.middleware.js";
import { validateRepost } from "../middlewares/reposts.middleware.js";

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
	schemasValidation,
	validatePost,
	updatePost
);
postsRouter.get(
	"/timeline/posts",
	tokenValidation,
	checkFollows,
	validateRepost,
	listPosts
);
postsRouter.delete(
	"/timeline/posts/delete/:id",
	tokenValidation,
	validatePost,
	checkHashtag,
	checkLikes,
	checkComments,
	checkReposts,
	deletePost
);
postsRouter.get("/url/:id", tokenValidation, validateRepost, listUserPosts);

export { postsRouter };
