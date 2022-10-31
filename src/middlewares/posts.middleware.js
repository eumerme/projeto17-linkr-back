import { STATUS_CODE } from "../enums/status.code.js";
import * as postsRepository from "../repositories/posts.repository.js";

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

export { validatePost };
