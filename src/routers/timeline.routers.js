import { Router } from "express";
import {
  deletePost,
  likes,
  listLikes,
  listPosts,
  publishPost,
  updatePost,
  listUsers,
  listUserPosts
} from "../controllers/timeline.controllers.js";
import { checkHashtag } from "../middlewares/hashtags.middleware.js";
import {
  validateExistPost,
  validateLikes,
  validateNewPost,
} from "../middlewares/timeline.middlewares.js";
import { tokenValidation } from "../middlewares/token.validation.js";

const timelineRouter = Router();

timelineRouter.post(
	"/timeline/publish",
	tokenValidation,
	validateNewPost,
	publishPost
);

timelineRouter.get("/timeline/posts", listPosts);
timelineRouter.post("/timeline/like", validateLikes, likes);
timelineRouter.get("/timeline/postsLikes/:id", validateExistPost, listLikes);

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

export { timelineRouter };
