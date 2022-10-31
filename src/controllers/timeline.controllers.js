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

const updatePost = async (req, res) => {
	const { comment } = req.body;
	const { id } = req.params;
	try {
		await timelineRepository.editPostText(comment, id);
		res.sendStatus(STATUS_CODE.CREATED);
		return;
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
};

/* const deletePost = async (req, res) => {
	const { id } = req.params;
	try {
		const resultId = await timelineRepository.deleteFatalPost(id);
		if (resultId !== null) timelineRepository.deteleRepost(resultId);
		return res.sendStatus(STATUS_CODE.OK);
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}; */

const listLikes = async (req, res) => {
	const { id } = req.params;

	try {
		const result = await timelineRepository.likes(id);
		return res.status(STATUS_CODE.OK).send(result.rows);
	} catch (error) {
		console.log(error.message);
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

const listComments = async (req, res) => {
	const { postId } = req.params;
	const { userId } = res.locals;

	console.log({ userId, postId });
	try {
		const result = await timelineRepository.listPostComments(userId, postId);
		console.log("comments ", result.rows);

		return res.status(STATUS_CODE.OK).send(result.rows);
	} catch (error) {
		console.log("comments ", error.message);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
};

const newComment = async (req, res) => {
	const { comment, postId } = req.body;
	const { userId } = res.locals;
	try {
		await timelineRepository.createNewComment(comment, postId, userId);
		return res.sendStatus(STATUS_CODE.CREATED);
	} catch (error) {
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
	updatePost,
	/* 	deletePost, */
	likes,
	listLikes,
	listUsers,
	listUserPosts,
	listComments,
	listNewPosts,
	newComment,
	newRepost,
	getReposts,
	getRepostsById,
};
