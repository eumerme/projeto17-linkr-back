import { Router } from "express";
import {
	createRepost,
	//listReposts,
} from "../controllers/reposts.controller.js";
import { validatePost } from "../middlewares/posts.middleware.js";

import { tokenValidation } from "../middlewares/token.validation.js";

const repostsRouter = Router();

repostsRouter.post(
	"/timeline/reposts/:id",
	tokenValidation,
	validatePost,
	createRepost
);

/* repostsRouter.get(
	"/timeline/reposts/:id",
	tokenValidation,
	//validateExistPost,
	listReposts
); */

/* 
repostsRouter.get(
	"/timeline/repost/:id",
	tokenValidation,
	validateRepostId,
	getRepostsById
);

repostsRouter.get(
	"/timeline/setinterval",
	tokenValidation,
	validateFollows,
	listNewPosts
);
*/
export { repostsRouter };
