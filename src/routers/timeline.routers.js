import { Router } from "express";
import {
  deletePost,
  likes,
  listLikes,
  listPosts,
  publishPost,
  updatePost,
  listUsers,
  listUserPosts,
  newComment,
  listComments,
  newRepost,
  getReposts,
} from "../controllers/timeline.controllers.js";
import { checkHashtag } from "../middlewares/hashtags.middleware.js";
import {
  validateExistPost,
  validateLikes,
  validateNewPost,
  validateRepost,
} from "../middlewares/timeline.middlewares.js";
import { tokenValidation } from "../middlewares/token.validation.js";
import { validateFollows } from "../middlewares/follows.middleware.js";

const timelineRouter = Router();

timelineRouter.post(
	"/timeline/publish",
	tokenValidation,
	validateNewPost,
	publishPost
);
timelineRouter.get(
	"/timeline/posts",
	tokenValidation,
	validateFollows,
	listPosts
);

timelineRouter.get("/timeline/posts", tokenValidation, listPosts);
timelineRouter.post("/timeline/like", tokenValidation, validateLikes, likes);
timelineRouter.get("/timeline/postsLikes/:id", tokenValidation, validateExistPost, listLikes);
timelineRouter.post("/timeline/reposts", tokenValidation, validateRepost, newRepost);
timelineRouter.get("/timeline/reposts/:id", tokenValidation, validateExistPost, getReposts);

timelineRouter.put(
	"/timeline/posts/update/:id",
	tokenValidation,
	validateExistPost,
	updatePost
);
timelineRouter.delete(
	"/timeline/posts/delete/:id",
	tokenValidation,
	validateExistPost,
	checkHashtag,
	deletePost
);
timelineRouter.get("/listusers", tokenValidation, listUsers);
timelineRouter.get("/url/:id", tokenValidation, listUserPosts);
timelineRouter.get("/timeline/comments/:postId", listComments);
timelineRouter.post("/timeline/newcomment", tokenValidation, newComment);

export { timelineRouter };
