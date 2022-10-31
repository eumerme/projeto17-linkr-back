import Router from "express";
import { authRouter } from "./auth.router.js";
import { hashtagsRouter } from "./hashtags.router.js";
import { timelineRouter } from "./timeline.router.js";
import { followsRouter } from "./follows.router.js";
import { postsRouter } from "./posts.router.js";

const router = Router();

router.use(authRouter);
router.use(timelineRouter);
router.use(hashtagsRouter);
router.use(followsRouter);
router.use(postsRouter);

export { router };
