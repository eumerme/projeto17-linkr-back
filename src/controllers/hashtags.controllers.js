import { STATUS_CODE } from "../enums/status.code.js";
import * as hashtagsRepository from "../repositories/hashtags.repository.js";

async function listHashtags(req, res) {
	try {
		const result = await hashtagsRepository.listHashtags();
		res.status(STATUS_CODE.OK).send(result.rows);
		return;
	} catch (error) {
		res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
		return;
	}
}

async function listPostHashtag(req, res) {
	const { hashtagName } = req.params;
	try {
		const result = await hashtagsRepository.listPostbyHashtag(hashtagName);
		res.status(STATUS_CODE.OK).send(result.rows);
		return;
	} catch (error) {
		res.status(STATUS_CODE.SERVER_ERROR);
		return;
	}
}

async function createHashtag(req, res, next) {
	const { hashtagText } = req.body;

	try {
		const { rows: hashtagExists } = await hashtagsRepository.selectHashtag(
			hashtagText
		);
		if (hashtagExists.length === 0) {
			await hashtagsRepository.insertHashtag(hashtagText);
		}
		next();
	} catch (error) {
		res.status(STATUS_CODE.SERVER_ERROR);
	}
}

async function insertIntoHashtagsPosts(req, res) {
	const { hashtagText, id } = req.body;

	try {
		const { postId } = (await hashtagsRepository.selectPostId(id)).rows[0];
		const { hashtagId } = (await hashtagsRepository.selectHashtag(hashtagText))
			.rows[0];

		if (postId.length !== 0 && hashtagId.length !== 0) {
			await hashtagsRepository.insertHashtagsPosts(postId, hashtagId);
		}
		return res.sendStatus(STATUS_CODE.OK);
	} catch (error) {
		res.status(STATUS_CODE.SERVER_ERROR);
	}
}

export {
	listPostHashtag,
	listHashtags,
	createHashtag,
	insertIntoHashtagsPosts,
};
