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
	const { userId, followSomeone } = res.locals;
	console.log({ userId });
	console.log({ followSomeone });
	try {
		const { rows: userPosts } = await timelineRepository.getUserPosts(userId);
		console.log("userPosts ", userPosts);

		if (followSomeone === false) {
			return res
				.status(STATUS_CODE.OK)
				.send({ followSomeone, posts: userPosts });
		}

		// const result = await timelineRepository.listPost();
		const { rows: postsFromFollowee } = await timelineRepository.listPost(
			userId
		);
		console.log("followeePosts ", postsFromFollowee);

		/* 	if (posts.length !== 0) {
			//tem post
			
		} else {
			//nao tem post
			return res.status(STATUS_CODE.OK).send({ followeePosts: false });
		} */

		const posts = [...postsFromFollowee, ...userPosts];

		console.log("posts ", posts);

		return res.status(STATUS_CODE.OK).send({ followSomeone: true, posts });
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
};

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

const deletePost = async (req, res) => {
	const { id } = req.params;
	try {
		await timelineRepository.deleteFatalPost(id);
		return res.sendStatus(STATUS_CODE.OK);
	} catch (error) {
		console.log(error.message);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
};

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
	try {
		const { rows: users } = await timelineRepository.getUsers();
		return res.status(STATUS_CODE.OK).send(users);
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
};

const listUserPosts = async (req, res) => {
	const { id } = req.params;
	try {
		const { rows: posts } = await timelineRepository.getUserPosts(id);
		return res.status(STATUS_CODE.OK).send(posts);
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
};

export {
	publishPost,
	listPosts,
	updatePost,
	deletePost,
	likes,
	listLikes,
	listUsers,
	listUserPosts,
};
