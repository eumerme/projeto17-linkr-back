import { STATUS_CODE } from "../enums/status.code.js";
import * as timelineRepository from "../repositories/timeline.repository.js";

/* const newRepost = async (req, res) => {
	const { postId, userId } = req.body;

	try {
		timelineRepository.createNewRepost(postId, userId);
		return res.sendStatus(STATUS_CODE.OK);
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
};

const getReposts = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await timelineRepository.countReposts(id);
		return res.status(STATUS_CODE.OK).send(result.rows);
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
};

const getRepostsById = async (req, res) => {
	const { data } = res.locals;
	try {
		return res.status(STATUS_CODE.OK).send(data[0]);
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
};

export { listNewPosts, newRepost, getReposts, getRepostsById }; */
