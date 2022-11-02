import { STATUS_CODE } from "../enums/status.code.js";
import * as timelineRepository from "../repositories/timeline.repository.js";
import * as postsRepository from "../repositories/posts.repository.js";

const likes = (req, res) => {
	const { id, type, userId } = req.body;

	try {
		timelineRepository.updateLikes(id, userId, type);
		return res.sendStatus(STATUS_CODE.OK);
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
};

const listUsers = async (req, res) => {
	const { userId } = res.locals;
	try {
		const { rows: following } = await timelineRepository.listUserFollowing(
			userId
		);

		const { rows: notFollowing } =
			await timelineRepository.listUserNotFollowing();

		const users = [...following, ...notFollowing];

		return res.status(STATUS_CODE.OK).send(users);
	} catch (error) {
		console.log("listUser url-id ", error.message);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
};

const listUserPosts = async (req, res) => {
	const { id } = req.params;
	try {
		const { rows: posts } = await postsRepository.listUserPosts(id);
		return res.status(STATUS_CODE.OK).send(posts);
	} catch (error) {
		console.log("listUserPost url-id ", error.message);

		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
};

const newRepost = async (req, res) => {
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

const listNewPosts = async (req, res) => {
	const { userId, followSomeone } = res.locals;

	try {
		if (followSomeone === false) {
			const { rows: userPosts } = await timelineRepository.getUserPosts(userId);
			return res
				.status(STATUS_CODE.OK)
				.send({ followSomeone, posts: userPosts });
		}

		const { rows: posts } = await timelineRepository.listPost(userId);
		return res.status(STATUS_CODE.OK).send({ followSomeone: true, posts });
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
};

export {
	likes,
	listUsers,
	listUserPosts,
	listNewPosts,
	newRepost,
	getReposts,
	getRepostsById,
};
