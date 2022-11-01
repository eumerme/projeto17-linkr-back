import { Router } from "express";
import {
	likes,
	listLikes,
	//updatePost,
	listUsers,
	listUserPosts,
	/* newRepost,
	getReposts,
	getRepostsById, */
} from "../controllers/timeline.controllers.js";

import {
	/* 	validateExistPost, */
	validateLikes,
	/* 	validateRepost,
	validateRepostId, */
} from "../middlewares/timeline.middlewares.js";
import { tokenValidation } from "../middlewares/token.validation.js";

const timelineRouter = Router();

timelineRouter.post("/timeline/like", tokenValidation, validateLikes, likes);
timelineRouter.get(
	"/timeline/postsLikes/:id",
	tokenValidation,
	/* 	validateExistPost, */
	listLikes
);
/*
timelineRouter.post(
	"/timeline/reposts",
	tokenValidation,
	validateRepost,
	newRepost
);
timelineRouter.get(
	"/timeline/reposts/:id",
	tokenValidation,
	validateExistPost,
	getReposts
);
timelineRouter.get(
	"/timeline/repost/:id",
	tokenValidation,
	validateRepostId,
	getRepostsById
); */

/* timelineRouter.put(
	"/timeline/posts/update/:id",
	tokenValidation,
	validateExistPost, 
	updatePost
); */

timelineRouter.get("/listusers", tokenValidation, listUsers);
timelineRouter.get("/url/:id", tokenValidation, listUserPosts);
/* timelineRouter.get(
	"/timeline/setinterval",
	tokenValidation,
	validateFollows,
	listNewPosts
); */

export { timelineRouter };
