import { STATUS_CODE } from "../enums/status.code.js";
import * as postsRepository from "../repositories/posts.repository.js";
import * as followsRepository from "../repositories/follows.repository.js";
import * as hashtagsRepository from "../repositories/hashtags.repository.js";
import * as likesRepository from "../repositories/likes.repository.js";
import * as commentsRepository from "../repositories/comments.repository.js";
import * as repostsRepository from "../repositories/reposts.repository.js";

async function validatePost(req, res, next) {
	const { id } = req.params;

	try {
		const { rows: post } = await postsRepository.selectPostById(id);

		if (post.length === 0) return res.sendStatus(STATUS_CODE.NOT_FOUND);

		next();
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

async function checkFollows(req, res, next) {
	const { userId } = res.locals;

	try {
		const { rows: follows } = await followsRepository.checkUserFollows(userId);

		if (follows.length === 0) res.locals.followSomeone = false;

		next();
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

async function checkHashtag(req, res, next) {
	const { id } = req.params;

	try {
		const { rows } = await hashtagsRepository.selectHashtag(id);
		if (rows.length !== 0) {
			const { name: hashtagName, id: hashtagId } = rows[0];
			const hashtagPostExist = (
				await hashtagsRepository.selectHashtagsPosts(hashtagName)
			).rows[0];

			if (hashtagPostExist.amount === "1") {
				await hashtagsRepository.deleteHashtagsPosts(id);
				await hashtagsRepository.deleteHashtag(hashtagId);
			} else {
				await hashtagsRepository.deleteHashtagsPosts(id);
			}
		}

		next();
	} catch (error) {
		res.status(STATUS_CODE.SERVER_ERROR);
	}
}

async function checkLikes(req, res, next) {
	const { id } = req.params;

	try {
		const { rows: likes } = await likesRepository.selectLikes(id);
		if (likes.length !== 0) {
			const { userId, postId } = likes[0];
			await likesRepository.deletePostsLikes(userId, postId);
		}

		next();
	} catch (error) {
		res.status(STATUS_CODE.SERVER_ERROR);
	}
}

async function checkComments(req, res, next) {
	const { id } = req.params;

	try {
		const { rows: comments } = await commentsRepository.selectComments(id);
		if (comments.length !== 0) {
			const { userId, postId } = comments[0];
			await commentsRepository.deletePostsComments(userId, postId);
		}

		next();
	} catch (error) {
		res.status(STATUS_CODE.SERVER_ERROR);
	}
}

async function checkReposts(req, res, next) {
	const { id } = req.params;

	try {
		const { rows: reposts } = await repostsRepository.selectRepost(id);
		if (reposts.length !== 0) {
			const { repostBy, postId } = reposts[0];
			await repostsRepository.deletePostsReposts(repostBy, postId);
		}

		next();
	} catch (error) {
		res.status(STATUS_CODE.SERVER_ERROR);
	}
}

export {
	validatePost,
	checkFollows,
	checkHashtag,
	checkLikes,
	checkComments,
	checkReposts,
};
