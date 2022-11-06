import { Router } from "express";
import {
	listPostHashtag,
	listHashtags,
	createHashtag,
	insertIntoHashtagsPosts,
	//insertIntoHashtagsPostsEdit,
} from "../controllers/hashtags.controllers.js";
//import { checkHashtagPost } from "../middlewares/hashtags.middleware.js";
import { tokenValidation } from "../middlewares/token.validation.js";

const hashtagsRouter = Router();

hashtagsRouter.get("/hashtags", tokenValidation, listHashtags);
hashtagsRouter.get("/hashtags/:hashtagName", tokenValidation, listPostHashtag);
hashtagsRouter.post(
	"/hashtags",
	tokenValidation,
	createHashtag,
	insertIntoHashtagsPosts
);

export { hashtagsRouter };
