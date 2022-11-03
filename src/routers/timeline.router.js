/* import { Router } from "express";
import newRepost,
	getReposts,
	getRepostsById,
"../controllers/timeline.controllers.js";

import 	validateExistPost,
	validateRepost,
	validateRepostId,
"../middlewares/timeline.middlewares.js";
import { tokenValidation } from "../middlewares/token.validation.js";

const timelineRouter = Router();


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
);

timelineRouter.get(
	"/timeline/setinterval",
	tokenValidation,
	validateFollows,
	listNewPosts
);

export { timelineRouter }; */
