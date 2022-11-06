import { Router } from "express";
import {
	insertComment,
	listComments,
} from "../controllers/comments.controller.js";
import { tokenValidation } from "../middlewares/token.validation.js";

const commentsRouter = Router();

commentsRouter.post("/timeline/newcomment", tokenValidation, insertComment);
commentsRouter.get("/timeline/comments/:postId", tokenValidation, listComments);

export { commentsRouter };
