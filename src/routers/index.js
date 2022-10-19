import Router from 'express';
import { authRouter } from './auth.routers.js';

const router = Router();

router.use(authRouter);

export { router };