import { connection } from "../database/db.js";
import { STATUS_CODE } from "../enums/status.code.js";
import * as hashtagsRepository from "../repositories/hashtags.repository.js";

const checkHashtag = async (req, res, next) => {
	console.log("entrou");

	const { path } = req.route;
	console.log(path);

	try {
		if (path === "/hashtags") {
			const { hashtagText, id } = req.body;
			console.log("entrou if 1");
			const { postId } = (await hashtagsRepository.selectPostId(id)).rows[0];
			console.log(postId);

			const { hashtagId } = (
				await hashtagsRepository.selectHashtag(hashtagText)
			).rows[0];

			if (postId.length !== 0 && hashtagId.length !== 0) {
				console.log("entrou if 2");

				const { rows: result } = await hashtagsRepository.insertHashtagsPosts(
					postId,
					hashtagId
				);
				console.log(result);
			}

			return res.sendStatus(STATUS_CODE.OK);
		}

		if (path === "/timeline/posts/delete/:id") {
			const { id } = req.params;
			console.log(id);
			const { rows } = await hashtagsRepository.selectHashtagName(id);
			console.log("hashtag ", rows);

			if (rows.length !== 0) {
				const { name: hashtagName } = rows[0];
				const { rows: hashtagPostExist } =
					await hashtagsRepository.selectHashtagsPosts(hashtagName);
				console.log("existe ", hashtagPostExist);

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
