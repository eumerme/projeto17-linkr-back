import { Router } from "express";
import { likes, listPosts, publishPost } from "../controllers/timeline.controllers.js";
import { validateId, validateNewPost } from "../middlewares/timeline.middlewares.js";
import { tokenValidation } from "../middlewares/token.validation.js";

const timelineRouter = Router();

timelineRouter.post(
  "/timeline/publish",
  tokenValidation,
  validateNewPost,
  publishPost
);

timelineRouter.get('/timeline/posts', listPosts);
timelineRouter.post('/timeline/likes', validateId, likes)

export { timelineRouter };
