import Router from "express";
import { authRouter } from "./auth.router.js";
import { hashtagsRouter } from "./hashtags.router.js";
import { followsRouter } from "./follows.router.js";
import { postsRouter } from "./posts.router.js";
import { commentsRouter } from "./comments.router.js";
import { likesRouter } from "./likes.router.js";
import { repostsRouter } from "./reposts.router.js";

const router = Router();

router.use(authRouter);
router.use(hashtagsRouter);
router.use(followsRouter);
router.use(postsRouter);
router.use(commentsRouter);
router.use(likesRouter);
router.use(repostsRouter);

export { router };
