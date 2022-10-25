import { Router } from "express";
import { tokenValidation } from "../middlewares/token.validation.js";
import { isFollowing } from "../controllers/follows.controllers.js";

const followsRouter = Router();

followsRouter.post("/is-following", tokenValidation, isFollowing);

export { followsRouter };
