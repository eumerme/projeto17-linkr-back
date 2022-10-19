import { Router } from "express";
import { registerUser, signin } from "../controllers/auth.controllers.js";
import {
	validateRegister,
	validateSigninBody,
} from "../middlewares/auth.middlewares.js";

const authRouter = Router();

authRouter.post("/sign-up", validateRegister, registerUser);
authRouter.post("/sign-in", validateSigninBody, signin);

export { authRouter };
