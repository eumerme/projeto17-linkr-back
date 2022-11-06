import { Router } from "express";
import {
	listPostHashtag,
	listHashtags,
	createHashtag,
	insertIntoHashtagsPosts,
} from "../controllers/hashtags.controllers.js";
import { validateRepost } from "../middlewares/reposts.middleware.js";
import { tokenValidation } from "../middlewares/token.validation.js";

const hashtagsRouter = Router();

hashtagsRouter.get("/hashtags", tokenValidation, listHashtags);
hashtagsRouter.get(
	"/hashtags/:hashtagName",
	tokenValidation,
	validateRepost,
	listPostHashtag
);
hashtagsRouter.post(
	"/hashtags",
	tokenValidation,
	createHashtag,
	insertIntoHashtagsPosts
);

export { hashtagsRouter };
