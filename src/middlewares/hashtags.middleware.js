import { connection } from "../database/db.js";
import { STATUS_CODE } from "../enums/status.code.js";
import * as hashtagsRepository from "../repositories/hashtags.repository.js";

const checkHashtag = async (req, res, next) => {
	const { path } = req.route;

	try {
		if (path === "/hashtags") {
			const { hashtagText, id } = req.body;
			const { postId } = (await hashtagsRepository.selectPostId(id)).rows[0];

			const { hashtagId } = (
				await hashtagsRepository.selectHashtag(hashtagText)
			).rows[0];

			if (postId.length !== 0 && hashtagId.length !== 0) {
				await hashtagsRepository.insertHashtagsPosts(postId, hashtagId);
			}
			return res.sendStatus(STATUS_CODE.OK);
		}

		if (path === "/timeline/posts/delete/:id") {
			const { id } = req.params;
			const { rows } = await hashtagsRepository.selectHashtagName(id);

			if (rows.length !== 0) {
				const { name: hashtagName } = rows[0];
				const { rows: hashtagPostExist } =
					await hashtagsRepository.selectHashtagsPosts(hashtagName);

				if (hashtagPostExist.amount === 1) {
					await hashtagsRepository.deleteHashtagsPosts(id);
					await hashtagsRepository.deleteHashtags(hashtagName);
				} else {
					await hashtagsRepository.deleteHashtagsPosts(id);
				}
			}
			next();
		}
	} catch (error) {
		res.status(STATUS_CODE.SERVER_ERROR);
	}
};

export { checkHashtag };
