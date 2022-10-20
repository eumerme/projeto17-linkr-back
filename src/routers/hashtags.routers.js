import { Router } from "express";
import { listPostbyHashtag } from "../controllers/hashtags.controllers.js";
import { tokenValidation } from "../middlewares/token.validation.js";

const hashtagsRouter = Router();

hashtagsRouter.get("/hashtags/:hashtagName", listPostbyHashtag);

export { hashtagsRouter };
