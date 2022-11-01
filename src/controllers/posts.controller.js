import { STATUS_CODE } from "../enums/status.code.js";
import * as postsRepository from "../repositories/posts.repository.js";
import urlMetadata from "url-metadata";

async function publishPost(req, res) {
	const { userId } = res.locals;
	const { comment, url } = req.body;

	try {
		const urlmetadata = await urlMetadata(url);
		let body = { userId, comment, url };

		if (urlmetadata.title === null) {
			body = {
				...body,
				urlTitle: "Cannot load title information",
				urlImage: "https://cdn-icons-png.flaticon.com/512/3097/3097257.png",
				urlDescription: "Cannot load description information",
			};
		} else {
			body = {
				...body,
				urlTitle: urlmetadata.title,
				urlImage: urlmetadata.image,
				urlDescription: urlmetadata.description,
			};
		}

		await postsRepository.insertPost(body);
		return res.sendStatus(STATUS_CODE.CREATED);
	} catch (error) {
		console.log("publish post ", error.message);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

async function listPosts(req, res) {
	const { userId, followSomeone } = res.locals;

	try {
		if (followSomeone === false) {
			const { rows: userPosts } = await postsRepository.listUserPosts(userId);
			return res
				.status(STATUS_CODE.OK)
				.send({ followSomeone, posts: userPosts });
		}

		const { rows: posts } = await postsRepository.listAllPosts(userId);
		return res.status(STATUS_CODE.OK).send({ followSomeone: true, posts });
	} catch (error) {
		console.log("list post ", error.message);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

async function deletePost(req, res) {
	const { id } = req.params;
	try {
		await postsRepository.deletePost(id);
		return res.sendStatus(STATUS_CODE.OK);
	} catch (error) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

export { publishPost, listPosts, deletePost };