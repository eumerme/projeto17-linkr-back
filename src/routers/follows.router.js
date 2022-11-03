import { Router } from "express";
import { tokenValidation } from "../middlewares/token.validation.js";
import { follows, listUsers } from "../controllers/follows.controllers.js";

const followsRouter = Router();

followsRouter.post("/is-following", tokenValidation, follows);
followsRouter.post("/follow-unfollow", tokenValidation, follows);
followsRouter.get("/listusers", tokenValidation, listUsers);

export { followsRouter };
