import { STATUS_CODE } from "../enums/status.code.js";
import * as hashtagsRepository from "../repositories/hashtags.repository.js";

async function checkHashtag(req, res, next) {
	const { id } = req.params;

	try {
		const { rows } = await hashtagsRepository.selectHashtag(id);
		if (rows.length !== 0) {
			const { name: hashtagName } = rows[0];
			const { rows: hashtagPostExist } =
				await hashtagsRepository.selectHashtagsPosts(hashtagName);

			if (hashtagPostExist.amount === 1) {
				await hashtagsRepository.deleteHashtagsPosts(id);
				await hashtagsRepository.deleteHashtag(hashtagName);
			} else {
				await hashtagsRepository.deleteHashtagsPosts(id);
			}
		}
		next();
	} catch (error) {
		res.status(STATUS_CODE.SERVER_ERROR);
	}
}

/* async function checkHashtagPost(req, res, next) {
	const { postId, comment } = req.body;

	try {
		const { rows } = await hashtagsRepository.selectHashtag(postId);

		if (rows.length !== 0) {
			const { id: hashtagId } = rows[0];
			const { rows: postContainsHashtag } =
				await hashtagsRepository.selectPostContainsHashtag(postId, hashtagId);

			if (postContainsHashtag.length !== 0) {
				//res.locals.hasHashtagId = hashtagId;
				//return res.sendStatus(STATUS_CODE.OK);
			}
		}
		next();
	} catch (error) {
		res.status(STATUS_CODE.SERVER_ERROR);
	} 
}*/

export { checkHashtag /* checkHashtagPost  */ };
