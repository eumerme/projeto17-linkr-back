import Router from "express";
import { authRouter } from "./auth.routers.js";
import { hashtagsRouter } from "./hashtags.routers.js";
import { timelineRouter } from "./timeline.routers.js";
import { followsRouter } from "./follows.routers.js";

const router = Router();

router.use(authRouter);
router.use(timelineRouter);
router.use(hashtagsRouter);
router.use(followsRouter);

export { router };
