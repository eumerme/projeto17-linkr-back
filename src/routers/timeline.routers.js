import { Router } from "express";
import {
  deletePost,
  listPosts,
  publishPost,
  updatePost,
} from "../controllers/timeline.controllers.js";
import { validateNewPost } from "../middlewares/timeline.middlewares.js";
import { tokenValidation } from "../middlewares/token.validation.js";

const timelineRouter = Router();

timelineRouter.post(
  "/timeline/publish",
  tokenValidation,
  validateNewPost,
  publishPost
);

timelineRouter.get("/timeline/posts", listPosts);

timelineRouter.put("/timeline/posts/update/:id", tokenValidation, updatePost);

timelineRouter.delete(
  "/timeline/posts/delete/:id",
  tokenValidation,
  deletePost
);

export { timelineRouter };
