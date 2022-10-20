import { Router } from "express";
import { listPostHashtag } from "../controllers/hashtags.controllers.js";
import { tokenValidation } from "../middlewares/token.validation.js";

const hashtagsRouter = Router();

hashtagsRouter.get("/hashtags/:hashtagName", listPostHashtag);

export { hashtagsRouter };
