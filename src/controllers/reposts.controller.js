import { STATUS_CODE } from "../enums/status.code.js";
import * as repostsRepository from "../repositories/reposts.repository.js";

async function createRepost(req, res) {
	const { id } = req.params;
	const { userId } = res.locals;

	try {
		const postId = Number(id);
		console.log({ userId, postId });

		await repostsRepository.insertRepost(userId, postId);

		return res.sendStatus(STATUS_CODE.OK);
	} catch (error) {
		console.log(error.message);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

/* async function listReposts(req, res) {
	const { postId } = req.body;
	console.log({postId})
	try {
		const {rows: reposts} = await repostsRepository.getReposts(id);
	console.log({reposts})

		//return res.status(STATUS_CODE.OK).send(result.rows);
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
} */
/*
const listRepostsById = async (req, res) => {
	const { data } = res.locals;
	try {
		return res.status(STATUS_CODE.OK).send(data[0]);
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
};*/

export { createRepost /*  listReposts  */ /* getRepostsById */ };
