import { Router } from "express";
import { likeDislike, listLikes } from "../controllers/likes.controller.js";
import { validatePost } from "../middlewares/posts.middleware.js";
//import { validateLikes } from "../middlewares/timeline.middlewares.js";
import { tokenValidation } from "../middlewares/token.validation.js";

const likesRouter = Router();

likesRouter.post("/likes", tokenValidation, likeDislike);
likesRouter.get("/postsLikes/:id", tokenValidation, validatePost, listLikes);

export { likesRouter };
