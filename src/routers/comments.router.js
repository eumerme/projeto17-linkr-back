import { Router } from "express";
import {
	insertComment,
	listComments,
	deleteComment,
} from "../controllers/comments.controller.js";
import { tokenValidation } from "../middlewares/token.validation.js";

const commentsRouter = Router();

commentsRouter.post("/newcomment", tokenValidation, insertComment);
commentsRouter.get("/comments/:postId", tokenValidation, listComments);
commentsRouter.delete("/comment/:commentId", tokenValidation, deleteComment);

export { commentsRouter };
