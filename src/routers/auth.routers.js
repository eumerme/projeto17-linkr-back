import { Router } from "express";
import {
	registerUser,
	signin,
	logout,
} from "../controllers/auth.controllers.js";
import {
	validateRegister,
	validateSigninBody,
} from "../middlewares/auth.middlewares.js";
import { tokenValidation } from "../middlewares/token.validation.js";

const authRouter = Router();

authRouter.post("/sign-up", validateRegister, registerUser);
authRouter.post("/sign-in", validateSigninBody, signin);
authRouter.post("/logout", tokenValidation, logout);

export { authRouter };
