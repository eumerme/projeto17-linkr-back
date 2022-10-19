import { Router } from "express";
import { publishPost } from "../controllers/timeline.controllers.js";
import { validateNewPost } from "../middlewares/timeline.middlewares.js";
import { tokenValidation } from "../middlewares/token.validation.js";

const timelineRouter = Router();

timelineRouter.post(
  "/timeline/publish",
  tokenValidation,
  validateNewPost,
  publishPost
);

export { timelineRouter };
