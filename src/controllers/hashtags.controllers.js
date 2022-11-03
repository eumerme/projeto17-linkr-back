import { STATUS_CODE } from "../enums/status.code.js";
import * as hashtagsRepository from "../repositories/hashtags.repository.js";

async function listHashtags(req, res) {
	try {
		const { rows: hashtags } = await hashtagsRepository.listHashtags();
		return res.status(STATUS_CODE.OK).send(hashtags);
	} catch (error) {
		return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
	}
}

async function listPostHashtag(req, res) {
	const { hashtagName } = req.params;

	try {
		const { rows: postsByHashtag } = await hashtagsRepository.listPostbyHashtag(
			hashtagName
		);
		return res.status(STATUS_CODE.OK).send(postsByHashtag);
	} catch (error) {
		return res.status(STATUS_CODE.SERVER_ERROR);
	}
}

async function createHashtag(req, res, next) {
	const { hashtagText } = req.body;

	try {
		const { rows: hashtagExists } =
			await hashtagsRepository.selectHashtagByName(hashtagText);
		if (hashtagExists.length === 0) {
			await hashtagsRepository.insertHashtag(hashtagText);
		}
		next();
	} catch (error) {
		res.status(STATUS_CODE.SERVER_ERROR);
	}
}

async function insertIntoHashtagsPosts(req, res) {
	const { hashtagText, userId } = req.body;

	try {
		const { postId } = (await hashtagsRepository.selectPostId(userId)).rows[0];
		const { hashtagId } = (
			await hashtagsRepository.selectHashtagByName(hashtagText)
		).rows[0];

		if (postId.length !== 0 && hashtagId.length !== 0) {
			await hashtagsRepository.insertHashtagsPosts(postId, hashtagId);
		}
		return res.sendStatus(STATUS_CODE.OK);
	} catch (error) {
		res.status(STATUS_CODE.SERVER_ERROR);
	}
}

/* async function insertIntoHashtagsPostsEdit(req, res) {
	console.log("entrou insert edit post");

	try {
		return res.sendStatus(STATUS_CODE.OK);
	} catch (error) {
		res.status(STATUS_CODE.SERVER_ERROR);
	}
} */

export {
	listPostHashtag,
	listHashtags,
	createHashtag,
	insertIntoHashtagsPosts,
	//insertIntoHashtagsPostsEdit,
};
