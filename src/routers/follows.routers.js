import { Router } from "express";
import { tokenValidation } from "../middlewares/token.validation.js";
import { follows } from "../controllers/follows.controllers.js";

const followsRouter = Router();

followsRouter.post("/is-following", tokenValidation, follows);
followsRouter.post("/follow-unfollow", tokenValidation, follows);

export { followsRouter };
