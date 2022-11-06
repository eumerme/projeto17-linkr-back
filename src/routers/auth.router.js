import { Router } from "express";
import { signup, signin, logout } from "../controllers/auth.controllers.js";
import { userValidation } from "../middlewares/auth.middlewares.js";
import { tokenValidation } from "../middlewares/token.validation.js";
import {
	schemasValidation,
	urlValidation,
} from "../middlewares/schemas.validation.js";
const authRouter = Router();

authRouter.post(
	"/sign-up",
	schemasValidation,
	urlValidation,
	userValidation,
	signup
);
authRouter.post("/sign-in", schemasValidation, userValidation, signin);
authRouter.post("/logout", tokenValidation, logout);

export { authRouter };
