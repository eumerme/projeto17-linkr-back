import { Router } from "express";
import { registerUser } from "../controllers/auth.controllers.js";
import { validateRegister } from "../middlewares/auth.middlewares.js";

const authRouter = Router();

authRouter.post('/signup', validateRegister, registerUser);

export { authRouter };