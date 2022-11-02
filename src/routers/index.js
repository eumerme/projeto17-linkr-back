import Router from "express";
import { authRouter } from "./auth.router.js";
import { hashtagsRouter } from "./hashtags.router.js";
import { timelineRouter } from "./timeline.router.js";
import { followsRouter } from "./follows.router.js";
import { postsRouter } from "./posts.router.js";
import { commentsRouter } from "./comments.router.js";
import { likesRouter } from "./likes.router.js";

const router = Router();

router.use(authRouter);
router.use(timelineRouter);
router.use(hashtagsRouter);
router.use(followsRouter);
router.use(postsRouter);
router.use(commentsRouter);
router.use(likesRouter);

export { router };
