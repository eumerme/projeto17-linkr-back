import { Router } from "express";
import {
  deletePost,
  likes,
  listPosts,
  publishPost,
  updatePost,
} from "../controllers/timeline.controllers.js";
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
  deletePost
);

export { timelineRouter };
