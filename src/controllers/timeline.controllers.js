import { STATUS_CODE } from "../enums/status.code.js";
import * as timelineRepository from "../repositories/timeline.repository.js";

async function publishPost(req, res) {
	const { userId } = res.locals;
	const { comment, url } = req.body;

	try {
		await timelineRepository.publishNewPost(userId, comment, url);
		res.sendStatus(STATUS_CODE.CREATED);
		return;
	} catch (error) {
		res.sendStatus(STATUS_CODE.SERVER_ERROR);
		return;
	}
}

const listPosts = async (req, res) => {
	try {
		const result = await timelineRepository.listPost();
		return res.status(STATUS_CODE.OK).send(result.rows);
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
};

const listUsers = async (req, res) => {
	try {
		const { rows: users } = await timelineRepository.getUsers();
		return res.status(STATUS_CODE.OK).send(users);
	} catch (error) {
		console.log(error.message);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
};

export { publishPost, listPosts, listUsers };
