import { STATUS_CODE } from "../enums/status.code.js";
import * as repostsRepository from "../repositories/reposts.repository.js";

async function createRepost(req, res) {
	const { id } = req.params;
	const { userId } = res.locals;

	try {
		const postId = Number(id);

		await repostsRepository.insertRepost(userId, postId);

		return res.sendStatus(STATUS_CODE.OK);
	} catch (error) {
		console.log(error.message);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

export { createRepost };
