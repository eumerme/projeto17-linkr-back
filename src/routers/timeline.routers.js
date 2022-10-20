import { Router } from "express";
import { listPosts, publishPost } from "../controllers/timeline.controllers.js";
import { validateNewPost } from "../middlewares/timeline.middlewares.js";
import { tokenValidation } from "../middlewares/token.validation.js";

const timelineRouter = Router();

timelineRouter.post(
  "/timeline/publish",
  tokenValidation,
  validateNewPost,
  publishPost
);

timelineRouter.get('/timeline/posts', listPosts);

export { timelineRouter };
